<template>
  <div
    v-if="tutorialIsOpen && config"
    class="tutorial-container"
    @click.stop=""
  >
    <span :style="dynamicStyle()" class="tutorial_spotlight is-visible"> </span>
    <div
      v-if="config.fields[currentIndex]"
      class="tutorial_cell d-flex justify-center align-center"
    >
      <div
        id="tutorialCardId"
        class="d-flex justify-center items-center flex-column modal_element"
      >
        <div style="height: fit-content">
          <div class="tutorial_header">
            <div class="tutorial_header_title">
              {{ $translate.getTranslation(config.title || "Tutorial") }}
            </div>
          </div>
          <v-btn
            color="red"
            @click="tutorialIsOpen = false"
            icon
            class="tutorial_button-left"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </div>
        <div
          v-if="config.fields && config.fields[currentIndex]"
          style="height: fit-content"
        >
          <div class="d-flex justify-center flex-column tutorial_body">
            <div id="tutorial_text">
              <span>
                {{
                  $translate.getTranslation(config.fields[currentIndex].text)
                }}
              </span>
            </div>
            <div class="bullets d-inline-flex justify-center align-center">
              <v-btn
                :disabled="currentIndex <= 0"
                @click="changeStep(currentIndex - 1)"
                icon
                x-small
                color="black"
              >
                <v-icon size="25px"> mdi-chevron-left</v-icon>
              </v-btn>
              <span
                :style="index === currentIndex ? 'background: #06f;' : ''"
                v-for="(item, index) in config.fields"
                @click="changeStep(index)"
                :key="index"
              ></span>
              <v-btn
                :disabled="currentIndex >= config.fields.length - 1"
                @click="changeStep(currentIndex + 1)"
                icon
                x-small
                color="black"
              >
                <v-icon size="25px"> mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      Type: Object,
      required: true,
    },
  },
  data() {
    return {
      myTimeout: undefined,
      currentId: 0,
      tutorialIsOpen: true,
      element: undefined,
      elementStyle: undefined,
      scrollY: 0,
      scrollX: 0,
      currentIndex: 0,
      observer: undefined,
    };
  },
  mounted() {
    this.makeObserver();

    document.addEventListener("scroll", function() {
      this.scrollY = window.scrollY;
      this.scrollX = window.scrollX;
    });
  },
  methods: {
    makeObserver() {
      if (this.observer) {
        this.observer.disconnect();
      }

      if (this.config.fields[this.currentIndex]) {
        let id = this.config.fields[this.currentIndex].id
          ? this.config.fields[this.currentIndex].id
          : "tutorialCardId";
        if (Array.isArray(id)) {
          id = id[this.currentId];
          this.currentId += 1;
          if (this.currentId >= this.config.fields[this.currentIndex].id.length)
            this.currentId = 0;
          this.myTimeout = setTimeout(() => {
            this.makeObserver();
          }, 2000);
        }
        const element = document.getElementById(id);
        if (element) {
          if (!this.config.fields[this.currentIndex].scrollToPage) {
            element.scrollIntoView({
              behavior: "smooth",
              inline: "nearest",
            });
          } else {
            window.scrollTo(
              0,
              window.innerHeight *
                this.config.fields[this.currentIndex].scrollToPage
            );
          }
          this.element = element;
          this.elementStyle = element.getBoundingClientRect();
        }

        this.observer = new MutationObserver(() => {
          const element = document.getElementById(id);
          if (element) {
            if (!this.config.fields[this.currentIndex].scrollToPage) {
              element.scrollIntoView({
                behavior: "smooth",
                inline: "nearest",
              });
            } else {
              window.scrollTo(
                0,
                window.innerHeight *
                  this.config.fields[this.currentIndex].scrollToPage
              );
            }
            this.element = element;
            this.elementStyle = element.getBoundingClientRect();
            return;
          }
        });

        this.observer.observe(document, {
          childList: true,
          subtree: true,
          observer: undefined,
        });
      }
    },
    dynamicStyle() {
      let borderRadius = "10px";
      if (!this.elementStyle) return "";
      if (this.config.fields[this.currentIndex].borderRadius) {
        borderRadius = this.config.fields[this.currentIndex].borderRadius;
      } else if (this.element && this.element.style["border-radius"]) {
        borderRadius = this.element.style["border-radius"];
      }
      return (
        "border-radius: " +
        borderRadius +
        "; width: " +
        this.elementStyle.width +
        "px ; height: " +
        this.elementStyle.height +
        "px; transform: translate3d(" +
        (this.elementStyle.left - this.scrollX) +
        "px, " +
        (this.elementStyle.top - this.scrollY) +
        "px, 0px);"
      );
    },
    changeStep(step) {
      this.currentId = 0;
      this.currentIndex = step;
      clearTimeout(this.myTimeout);
      this.makeObserver();
    },
  },
  watch: {
    currentIndex() {
      this.$emit("event", this.currentIndex);
    },
    tutorialIsOpen() {
      if (this.tutorialIsOpen) {
        this.$emit("open");
      } else {
        clearTimeout(this.myTimeout);
        this.$emit("close");
      }
    },
  },
};
</script>

<style scoped>
.bullets span {
  border-radius: 50%;
  display: inline-block;
  width: 8px;
  height: 8px;
  margin: 0 3px;
  background: #d8d8da;
  transition: background 0.15s ease, border-radius 0.01s ease;
  cursor: pointer;
}
.bullets {
  text-align: center;
}
#tutorial_text span {
  display: block;
  line-height: 1.4em;
  color: #636369;
}
#tutorial_text {
  height: 60px;
  margin-bottom: 24px;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tutorial_body {
  position: relative;
  padding: 24px;
}
.tutorial_button-left,
.tutorial_button-right {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 2;
}

.tutorial_button-right {
  right: 10px;
  left: auto;
}
.tutorial_header_title {
  padding: 0 90px;
  overflow: hidden;
  color: #000;
  font-size: 16px;
  line-height: 46px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: -0.03em;
}
.tutorial_header {
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.075) 0 1px;
  height: 46px;
  z-index: 2;
}
.tutorial_cell {
  vertical-align: middle;
  width: 100%;
  height: 100%;
  padding: 54px;
  text-align: center;
  overflow: hidden;
}
.tutorial-container > .tutorial_cell > .modal_element {
  position: relative;
  transform: translate3d(0, 0, 0) scale(1) !important;
  opacity: 1 !important;
  z-index: 10003;
  background: white;
  width: 468px;
  height: fit-content;
  border-radius: 14px;
}
.tutorial-container {
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  z-index: 10000;
}
.tutorial_spotlight {
  position: absolute;
  width: 0;
  height: 0;
  top: 0;
  left: 0;
  box-shadow: inset #fff 0 0 0 2px, #000 0 0 0 4000px;
  transition: all 0.3s cubic-bezier(0.6, 0.4, 0, 1), opacity 0.15s ease 0.1s;
  opacity: 0;
  z-index: 10001;
  border-radius: 10px;
}
.tutorial_spotlight.is-visible {
  opacity: 0.6;
  transition: all 0.3s cubic-bezier(0.6, 0.4, 0, 1), opacity 0.15s ease;
}
</style>
