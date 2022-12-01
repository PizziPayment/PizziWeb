<template>
  <div id="app" v-cloak>
    <v-container fluid>
      <v-card
        class="card-container mx-auto"
        header-class="main-card-header"
        header="WiFi Manager"
      >
        <v-row
          sm="4"
          no-gutters
          style="width: 80%; margin: 0 auto; padding-bottom: 15px"
        >
          <v-col>
            <div
              style="display: inline-block; position: relative; top: 2px"
              class="led-green"
              v-bind:class="{ 'led-on': isDeviceConnected }"
            ></div>
            <p
              v-if="isDeviceConnected"
              style="
                margin-top: 0px;
                margin-bottom: 0px;
                display: inline-block;
                padding-left: 10px;
              "
            >
              Connected
            </p>
            <p
              v-else
              style="
                margin-top: 0px;
                margin-bottom: 0px;
                display: inline-block;
                padding-left: 10px;
              "
            >
              Not connected
            </p>
            <p
              v-if="isDeviceConnected"
              style="
                margin-top: 0px;
                margin-bottom: 0px;
                display: inline-block;
                padding-left: 10px;
              "
            >
              {{ macAddress }}
            </p>
          </v-col>
        </v-row>

        <v-item-group class="input-ssid">
          <template v-slot:prepend>
            <span class="input-ssid-label">SSID</span>
          </template>
          <v-text-field v-model="ssid"></v-text-field>
          <template v-slot:append>
            <v-dropdown @show="scanNetworks" right text="Scan" variant="">
              <v-dropdown-item
                v-on:click="setSsid(ssid)"
                v-for="ssid in ssidList"
                :key="ssid"
                >{{ ssid }}</v-dropdown-item
              >
              <!-- <v-dropdown-item>GiosWifi</v-dropdown-item>
              <v-dropdown-item>113</v-dropdown-item> -->
              <div class="text-center">
                <v-spinner
                  v-if="isScanning"
                  type="grow"
                  variant="primary"
                  label="Text Centered"
                ></v-spinner>
              </div>
            </v-dropdown>
          </template>
        </v-item-group>

        <v-item-group class="input-password">
          <template v-slot:prepend>
            <span>Password</span>
          </template>
          <v-text-field :type="passType" v-model="password"></v-text-field>
          <template v-slot:append>
            <v-btn variant="" v-on:click="togglePassField">
              <!-- <img v-if="togglePass" src="./icons/eye-slash.svg" /> -->
              <!-- <img v-if="!togglePass" src="./icons/eye.svg" /> -->
            </v-btn>
          </template>
        </v-item-group>

        <v-form-checkbox
          style="position: left; padding-bottom: 10px"
          v-model="isStaticIp"
          name="check-button"
          switch
          size="lg"
        >
          Static IP
        </v-form-checkbox>

        <transition name="fade">
          <div v-if="isStaticIp">
            <v-item-group class="input-ipaddress">
              <template v-slot:prepend>
                <span>IP Addr</span>
              </template>
              <v-text-field v-model="staticIp"></v-text-field>
            </v-item-group>

            <v-item-group class="input-netmask">
              <template v-slot:prepend>
                <span>Netmask</span>
              </template>
              <v-text-field v-model="netmask"></v-text-field>
            </v-item-group>

            <v-item-group class="input-gateway">
              <template v-slot:prepend>
                <span>Gateway</span>
              </template>
              <v-text-field v-model="gateway"></v-text-field>
            </v-item-group>
          </div>
        </transition>

        <v-row
          no-gutters
          style="position: absolute; bottom: 20px; width: 90%; margin: 0 auto"
        >
          <v-col>
            <v-btn @click="modalSave = true" style="min-width: 75px"
              >Save</v-btn
            >
          </v-col>
          <v-col>
            <v-btn @click="modalErase = true" style="min-width: 75px"
              >Erase</v-btn
            >
          </v-col>
          <v-col>
            <v-btn @click="modalTestWifi = true" style="min-width: 75px"
              >Test</v-btn
            >
          </v-col>
          <v-col>
            <v-btn @click="modalStart" style="min-width: 75px">Start</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <v-dialog
      @ok="modalSaveOk"
      @cancel="modalEraseCancel"
      size="xsm"
      v-model="modalSave"
      centered
      hide-header
    >
      <!-- <template v-slot:modal-title>
        <p style="font-size: 15px;">Testing WiFi Network</p>
      </template> -->
      <div class="d-block text-center">
        <p v-if="!isSaving">
          Are you sure you want to save WiFi configuration?
        </p>
        <div class="text-center">
          <v-spinner
            style="width: 3rem; height: 3rem"
            v-if="isSaving"
            type="grow"
            variant="primary"
            label="Text Centered"
          ></v-spinner>
        </div>
      </div>
      <template v-slot:modal-footer="{ ok, cancel }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <v-btn size="sm" variant="success" @click="ok()"> OK </v-btn>
        <v-btn size="sm" variant="danger" @click="cancel()"> Cancel </v-btn>
      </template>
    </v-dialog>

    <v-dialog
      @ok="modalTestOk"
      @cancel="modalTestCancel"
      size="xsm"
      v-model="modalTestWifi"
      centered
      hide-header
    >
      <!-- <template v-slot:modal-title>
        <p style="font-size: 15px;">Testing WiFi Network</p>
      </template> -->
      <div class="d-block text-center">
        <p v-if="!isTestingWifi">This will test WiFi connection</p>
        <div class="text-center">
          <v-spinner
            style="width: 3rem; height: 3rem"
            v-if="isTestingWifi"
            type="grow"
            variant="primary"
            label="Text Centered"
          ></v-spinner>
        </div>
      </div>
      <template v-slot:modal-footer="{ ok, cancel }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <v-btn size="sm" variant="success" @click="ok()"> OK </v-btn>
        <v-btn size="sm" variant="danger" @click="cancel()"> Cancel </v-btn>
      </template>
    </v-dialog>

    <v-dialog
      @ok="modalEraseOk"
      @cancel="modalEraseCancel"
      size="xsm"
      v-model="modalErase"
      centered
      hide-header
    >
      <!-- <template v-slot:modal-title>
        <p style="font-size: 15px;">Testing WiFi Network</p>
      </template> -->
      <div class="d-block text-center">
        <p v-if="!isErasing">
          Are you sure you want to erase current WiFi configuration?
        </p>
        <div class="text-center">
          <v-spinner
            style="width: 3rem; height: 3rem"
            v-if="isErasing"
            type="grow"
            variant="primary"
            label="Text Centered"
          ></v-spinner>
        </div>
      </div>
      <template v-slot:modal-footer="{ ok, cancel }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <v-btn size="sm" variant="success" @click="ok()"> OK </v-btn>
        <v-btn size="sm" variant="danger" @click="cancel()"> Cancel </v-btn>
      </template>
    </v-dialog>

    <v-dialog
      @ok="modalStartDeviceOk"
      @cancel="modalStartDeviceCancel"
      size="xsm"
      v-model="modalStart"
      centered
      hide-header
    >
      <!-- <template v-slot:modal-title>
        <p style="font-size: 15px;">Testing WiFi Network</p>
      </template> -->
      <div class="d-block text-center">
        <p v-if="!isErasing">Are you sure you want to start your device?</p>
        <div class="text-center">
          <v-spinner
            style="width: 3rem; height: 3rem"
            v-if="isErasing"
            type="grow"
            variant="primary"
            label="Text Centered"
          ></v-spinner>
        </div>
      </div>
      <template v-slot:modal-footer="{ ok, cancel }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <v-btn size="sm" variant="success" @click="ok()"> OK </v-btn>
        <v-btn size="sm" variant="danger" @click="cancel()"> Cancel </v-btn>
      </template>
    </v-dialog>

    <v-dialog
      size="xsm"
      v-model="modalRunningTask"
      centered
      hide-footer
      hide-header
      no-close-on-backdrop
    >
      <!-- <template v-slot:modal-title>
        <p style="font-size: 15px;">Testing WiFi Network</p>
      </template> -->
      <div class="d-block text-center">
        <p v-modal="taskStatus">{{ taskStatus }}</p>
        <div class="text-center">
          <v-spinner
            style="width: 3rem; height: 3rem"
            v-if="isTaskRunning"
            type="grow"
            variant="primary"
            label="Text Centered"
          ></v-spinner>
        </div>
      </div>
      <v-btn
        v-if="!isTaskRunning"
        @click="modalRunningTask = false"
        class="mt-1"
        block
        >Ok</v-btn
      >
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalTestWifi: false,
      modalSave: false,
      modalErase: false,
      modalStart: false,
      modalRunningTask: false,
      name: "Giovanni",
      socket: null,
      togglePass: false,
      isStaticIp: false,
      isDeviceConnected: false,
      isScanning: true,
      isTestingWifi: false,
      isErasing: false,
      isSaving: false,
      isSaveOk: false,
      isWifiOk: false,
      isTaskRunning: false,
      isWebSocketAlive: false,
      lastPongTime: "",
      timeNow: "",
      ssid: "",
      password: "",
      staticIp: "",
      netmask: "",
      gateway: "",
      passType: "password",
      ssidList: "",
      macAddress: "",
      taskStatus: "",
    };
  },
  mounted() {
    this.startWebsocket();

    window.setInterval(() => {
      if (!this.isTestingWifi) {
        console.log("checking connection");
        this.socket.send("ping");
      }
    }, 2000);

    window.setInterval(() => {
      if (!this.isTestingWifi) {
        console.log("checking last pong time");
        this.timeNow = Date.now();
        console.log("Last pong time: " + this.lastPongTime);
        console.log("Epoch time: " + this.timeNow);
        console.log("isDeviceConnected status: " + this.isDeviceConnected);
        if (this.timeNow - this.lastPongTime > 5000) {
          console.log("LAST PONG TIME GREATER");
          this.isDeviceConnected = false;
          this.isWebSocketAlive = false;
        }
      }
    }, 200);

    window.setInterval(() => {
      if (this.isWebSocketAlive == false) {
        //this.socket.close();
        this.startWebsocket();
      }
    }, 2000);
  },
  methods: {
    togglePassField: function () {
      this.togglePass = !this.togglePass;
      if (!this.togglePass) this.passType = "password";
      else this.passType = "text";
      console.log(this.passType);
    },
    // makeToast(variant = null, message) {
    //   this.$bvToast.toast(message, {
    //     title: "Error",
    //     variant: variant,
    //     solid: true,
    //     autoHideDelay: 3000,
    //   });
    // },
    setSsid: function (ssid) {
      console.log(ssid);
      this.ssid = ssid;
    },
    modalSaveOk: function (bvModalEvt) {
      if (
        this.ssid == "" ||
        (this.isStaticIp == true &&
          (this.netmask == "" || this.gateway == "" || this.staticIp == ""))
      ) {
        this.modalRunningTask = true;
        this.isTaskRunning = false;
        this.taskStatus =
          "SSID should not be empty.\nIf IP is static, fill all fields.";
        return;
      }
      if (this.isDeviceConnected == false) {
        this.modalRunningTask = true;
        this.isTaskRunning = false;
        this.taskStatus = "Device not connected";
        return;
      }
      console.log(bvModalEvt.trigger);
      this.modalRunningTask = true;
      this.taskStatus = "Saving to device...";
      this.isTaskRunning = true;
      this.isSaving = true;
      var JsonData = {
        deviceConfiguration: {
          ssid: this.ssid,
          password: this.password,
          isStaticIp: this.isStaticIp,
          staticIp: this.staticIp,
          netmask: this.netmask,
          gateway: this.gateway,
        },
      };
      console.log(JsonData);
      this.socket.send(JSON.stringify(JsonData));
    },
    modalTestOk: function (bvModalEvt) {
      if (this.isDeviceConnected == false) {
        this.modalRunningTask = true;
        this.isTaskRunning = false;
        this.taskStatus = "Device not connected";
        return;
      }
      console.log(bvModalEvt.trigger);
      this.modalRunningTask = true;
      this.taskStatus = "Testing WiFi connection...";
      this.isTaskRunning = true;
      this.isTestingWifi = true;
      this.socket.send("testWifi");
    },
    modalTestCancel: function (bvModalEvt) {
      console.log(bvModalEvt.trigger);
      this.isTaskRunning = false;
      this.isTestingWifi = false;
    },
    modalEraseOk: function (bvModalEvt) {
      if (this.isDeviceConnected == false) {
        this.modalRunningTask = true;
        this.isTaskRunning = false;
        this.taskStatus = "Device not connected";
        return;
      }
      this.modalRunningTask = true;
      this.taskStatus = "Erasing current WiFi data...";
      this.isTaskRunning = true;
      console.log(bvModalEvt.trigger);
      this.socket.send("eraseConfig");
      this.isErasing = true;
    },
    modalEraseCancel: function (bvModalEvt) {
      console.log(bvModalEvt.trigger);
      this.isTaskRunning = false;
    },
    modalStartDeviceOk: function (bvModalEvt) {
      if (this.isDeviceConnected == false) {
        this.modalRunningTask = true;
        this.isTaskRunning = false;
        this.taskStatus = "Device not connected";
        return;
      }
      console.log(bvModalEvt.trigger);
      this.modalRunningTask = true;
      this.taskStatus = "Starting device...";
      this.isTaskRunning = true;
      var JsonData = {
        startDevice: {
          ssid: this.ssid,
          password: this.password,
          isStaticIp: this.isStaticIp,
          staticIp: this.staticIp,
          netmask: this.netmask,
          gateway: this.gateway,
        },
      };
      console.log(JsonData);
      this.socket.send(JSON.stringify(JsonData));
    },
    modalStartDeviceCancel: function (bvModalEvt) {
      console.log(bvModalEvt.trigger);
      this.isTaskRunning = false;
    },
    scanNetworks: function () {
      if (this.isDeviceConnected == false) {
        this.modalRunningTask = true;
        this.isTaskRunning = false;
        this.taskStatus = "Device not connected";
        return;
      }
      console.log("scanNetworks");
      this.ssidList = "";
      this.isScanning = true;
      this.socket.send("scanNetworks");
    },
    startWebsocket: function () {
      console.log("startWebsocket");
      this.socket = new WebSocket("ws://192.168.4.1:9090", "arduino");
      //------ WEBSOCKET ON OPEN ------------
      this.socket.onopen = (e) => {
        console.log("websocket OPEN");
        console.log("Server: " + e.type);
        this.socket.send("ping");
        this.isWebSocketAlive = true;
      };
      //------ WEBSOCKET ON CLOSE ------------
      this.socket.onclose = (e) => {
        console.log("websocket CLOSE");
        console.log("Server: " + e);
        this.isDeviceConnected = false;
        this.isWebSocketAlive = false;
      };
      //------ WEBSOCKET ONMESSAGE EVENTS ------------
      this.socket.onmessage = (e) => {
        console.log("Server: ", e.data);
        var jsonData = JSON.parse(e.data);
        console.log(Object.keys(jsonData)[0]);
        switch (Object.keys(jsonData)[0]) {
          case "deviceInfo":
            console.log(jsonData["deviceInfo"]);
            this.macAddress = jsonData["deviceInfo"]["macAddress"];
            this.ssid = jsonData["deviceInfo"]["ssid"];
            this.password = jsonData["deviceInfo"]["password"];
            this.isStaticIp = jsonData["deviceInfo"]["isStaticIp"];
            this.staticIp = jsonData["deviceInfo"]["staticIp"];
            this.netmask = jsonData["deviceInfo"]["netmask"];
            this.gateway = jsonData["deviceInfo"]["gateway"];
            this.isDeviceConnected = true;
            this.isWebSocketAlive = true;
            this.lastPongTime = Date.now();
            break;
          case "ssidArray":
            console.log(jsonData["ssidArray"]);
            this.ssidList = jsonData["ssidArray"];
            this.isScanning = false;
            this.isWebSocketAlive = true;
            this.isDeviceConnected = true;
            break;
          case "testWifiStatus":
            this.lastPongTime = Date.now();
            switch (jsonData["testWifiStatus"]) {
              case "WL_CONNECTED":
                this.isTestingWifi = false;
                this.isTaskRunning = false;
                this.isWifiOk = true;
                this.taskStatus =
                  "WiFi Ok! " + "[" + jsonData["testWifiStatus"] + "]";
                break;
              case "blankdevice":
                this.isWifiOk = false;
                this.isTestingWifi = false;
                this.isTaskRunning = false;
                this.taskStatus = "Connection failed. Device not configured";
                break;
              case "error":
                this.isWifiOk = false;
                this.isTestingWifi = false;
                this.isTaskRunning = false;
                this.taskStatus = "Connection failed.";
                break;
              case "WL_CONNECT_FAILED":
                this.isWifiOk = false;
                this.isTestingWifi = false;
                this.isTaskRunning = false;
                this.taskStatus =
                  "Connection failed " + "[" + jsonData["testWifiStatus"] + "]";
                break;
              case "WL_NO_SSID_AVAIL":
                this.isWifiOk = false;
                this.isTestingWifi = false;
                this.isTaskRunning = false;
                this.taskStatus =
                  "Could not find WiFi " +
                  "[" +
                  jsonData["testWifiStatus"] +
                  "]";
                break;
              default:
                break;
            }
            break;
          case "saveOk":
            this.isSaveOk = jsonData["saveOk"];
            this.isSaving = false;
            this.isTaskRunning = false;
            this.taskStatus = "Save OK";
            break;
          case "eraseOk":
            this.isWifiOk = jsonData["eraseOk"];
            this.isErasing = false;
            this.isTaskRunning = false;
            this.taskStatus = "Erase OK";
            this.ssid = "";
            this.password = "";
            this.isStaticIp = false;
            this.staticIp = "";
            this.netmask = "";
            this.gateway = "";
            break;
          case "startDeviceOk":
            this.isWifiOk = jsonData["startDeviceOk"];
            this.isTaskRunning = false;
            this.taskStatus = "Device started!";
            break;
          case "eraseDataOk":
            this.isTaskRunning = false;
            this.taskStatus = "Data erased";
            break;
          case "pong":
            this.isWebSocketAlive = jsonData["pong"];
            this.isDeviceConnected = true;
            this.lastPongTime = Date.now();
            console.log("isDeviceConnected status: " + this.isDeviceConnected);
            break;
        }
      };
    },
  },
};
</script>
