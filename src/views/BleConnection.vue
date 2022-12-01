<template>
  <div class="grid grid-cols-1 gap-x-4 gap-y-4">
    <div>
      {{
        isSupported
          ? "Bluetooth Web API Supported"
          : "Your browser does not support the Bluetooth Web API"
      }}
    </div>

    <form v-on:submit="getDevices" class="form form-inline">
      <input
        v-model="message"
        class="form-control"
        id="message"
        type="text"
        placeholder="Message to the module"
      />
      <br />
      <br />
      <input class="btn btn-success" type="submit" value="Connect and Write" />
    </form>

    <!-- <div v-if="device">
      <p>Device Name: {{ device.name }}</p>
    </div>

    <div v-if="isConnected" class="bg-green-500 text-white p-3 rounded-md">
      <p>Connected</p>
    </div>

    <div v-if="!isConnected" class="bg-orange-800 text-white p-3 rounded-md">
      <p>Not Connected</p>
    </div>

    <div v-if="error">
      <div>Errors:</div>
      <pre>
      <code class="block p-5 whitespace-pre">{{ error }}</code>
    </pre>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "ArkPos2 BLE Configuration",
      user: {
        firstName: "Nick",
        lastName: "Tsilivis",
      },
      message: "",
      version: "0.7.2",
    };
  },
  mounted: function () {
    if (!navigator.bluetooth) {
      this.setStatus("Web Bluetooth API is not available.\n");
      // alert("Encoded Message: " + encoder.encode("Makis"));
    }
  },
  computed: {
    isSupported() {
      if (navigator.bluetooth) {
        return true;
      }
      return false;
    },
  },
  methods: {
    getDevices: function (e) {
      e.preventDefault();
      // this.clearLog();
      if (navigator.bluetooth) {
        var bluetoothDevice;

        // let serviceUuid = document.querySelector('#service').value;
        let serviceUuid = "0x00FF";
        if (serviceUuid.startsWith("0x")) {
          serviceUuid = parseInt(serviceUuid);
        }
        // console.debug('Service UUID: ' + serviceUuid);
        let characteristicUuid = "0xFF01";
        // let characteristicUuid = document.querySelector('#characteristic').value;
        if (characteristicUuid.startsWith("0x")) {
          characteristicUuid = parseInt(characteristicUuid);
        }
        let message = document.querySelector("#message").value;
        // console.debug('Characteristic UUID: ' + characteristicUuid);
        console.debug("Requesting Bluetooth Device...");
        navigator.bluetooth
          .requestDevice({
            filters: [
              {
                services: [serviceUuid],
              },
            ],
          })
          .then((device) => {
            bluetoothDevice = device;
            console.debug("-> Name:      " + device.name);
            // console.debug('-> ID:        ' + device.id);
            bluetoothDevice.addEventListener(
              "gattserverdisconnected",
              this.onDisconnected
            );
            return device.gatt.connect();
          })
          .then((server) => {
            // console.debug('Getting Service');
            return server.getPrimaryService(serviceUuid);
          })
          .then((service) => {
            // console.debug('Getting characteristic');
            if (characteristicUuid) {
              return service.getCharacteristic(characteristicUuid);
            }
          })
          .then((characteristic) => {
            let encoder = new TextEncoder("utf-8");
            console.debug("Encoded Message: " + encoder.encode(message));
            return characteristic.writeValue(encoder.encode(message));
          })
          .then(() => {
            console.debug("Message successfully sent !");
          })
          // .then(characteristics => {
          //   console.log(characteristics);
          //   console.debug('> Characteristics: ' + characteristics.map(c => c.uuid).join('\n' + ' '.repeat(19)));
          // })
          .catch((error) => {
            console.debug("Error: " + error);
          });
      } else {
        alert("No Bluetooth detected");
      }
    },
  },
};
</script>
