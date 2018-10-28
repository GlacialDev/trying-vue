<template lang='pug'>
  .chat(ref="chat")
    .chat_header(ref="chat_header")
      .chat_header-text Чат с ботом
    .chat_body
      ul.chat_body-list
        li.chat_body-item asdsadsa
        li.chat_body-item asdsadsa
        li.chat_body-item asdsadsa
        li.chat_body-item asdsadsa
        li.chat_body-item asdsadsa
        li.chat_body-item asdsadsa
        li.chat_body-item asdsadsa
        li.chat_body-item asdsadsa
        li.chat_body-item asdsadsa
        li.chat_body-item asdsadsa
        li.chat_body-item asdsadsa
        li.chat_body-item asdsadsa
        li.chat_body-item asdsadsa
        li.chat_body-item asdsadsa
        li.chat_body-item asdsadsa
        li.chat_body-item asdsadsa
        li.chat_body-item asdsadsa
        li.chat_body-item asdsadsa
        li.chat_body-item asdsadsa
        li.chat_body-item asdsadsa
        li.chat_body-item asdsadsa
        li.chat_body-item asdsadsa
        li.chat_body-item asdsadsa
        li.chat_body-item asdsadsa
    .chat_input-field
      form.chat_input-form
        input(type="text")
        button(type="submit" @click.prevent="chatRequest") Enter
</template>

<script>
import axios from "axios";

export default {
  name: "Chat",
  components: {},
  data() {
    return {};
  },
  methods: {
    drag: function() {
      var chat = this.$refs.chat;
      var chat_header = this.$refs.chat_header;
      var chat_width = parseInt(
        window.getComputedStyle(chat, null).getPropertyValue("width")
      );
      var chat_height = parseInt(
        window.getComputedStyle(chat, null).getPropertyValue("height")
      );

      chat_header.onmousedown = function(e) {
        var coords = getCoords(chat);
        var shiftX = e.pageX - coords.left;
        var shiftY = e.pageY - coords.top;

        chat.style.position = "absolute";
        moveAt(e);

        chat.style.zIndex = 1000; // над другими элементами

        function moveAt(e) {
          var Xcoord = e.pageX - shiftX;
          var Ycoord = e.pageY - shiftY;
          if (Xcoord < 0) Xcoord = 0;
          else if (Xcoord + chat_width > window.innerWidth) {
            Xcoord = window.innerWidth - chat_width;
          }
          if (Ycoord < 0) Ycoord = 0;
          else if (Ycoord + chat_height > window.innerHeight) {
            Ycoord = window.innerHeight - chat_height;
          }
          chat.style.left = Xcoord + "px";
          chat.style.top = Ycoord + "px";
        }

        document.onmousemove = function(e) {
          moveAt(e);
        };

        document.onmouseup = function() {
          document.onmousemove = null;
          chat_header.onmousemove = null;
        };
      };

      chat_header.ondragstart = function() {
        return false;
      };

      function getCoords(elem) {
        // кроме IE8-
        var box = elem.getBoundingClientRect();
        return {
          top: box.top + pageYOffset,
          left: box.left + pageXOffset
        };
      }
    },
    chatRequest: function() {
      const DIALOG_FLOW_TOKEN = "73d8ac0fca364dddbc531bd0fe06cd5a";
      const DIALOG_FLOW_API_ROOT_URL =
        "https://api.dialogflow.com/v1/query?v=20150910";
      const YOUR_PROJECT_ID = "newagent-1f076";
      const SESSION_ID = "Site_talk_to_you";
      const URL = `${DIALOG_FLOW_API_ROOT_URL}/projects/${YOUR_PROJECT_ID}/agent/sessions/${SESSION_ID}`;

      var config = {
        headers: {
          Authorization: "Bearer " + DIALOG_FLOW_TOKEN,
          "Content-Type": "application/json"
        }
      };

      // export function sendText(text) {
      var bodyParameters = {
        queryInput: { text: { text: "привет", languageCode: "ru" } }
      };

      const request = axios.post(URL, bodyParameters, config);

      console.log(request);
      // console.log(response);
      return request;
      // }
    }
  },
  mounted: function() {
    this.drag();
  }
};
</script>

<style lang='scss' scoped>
@import "../../components/common/mixins.scss";

.chat {
  width: 270px;
  height: 350px;
  border: rem(2px) solid $medium_green;
  border-radius: rem(5px);
  position: absolute;
  left: 60px;

  &_header {
    width: 100%;
    height: 10%;
    background-color: $medium_green;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: move;

    &-text {
      color: #ffffff;
    }
  }

  &_body {
    width: 100%;
    height: 80%;
    background-color: #c8c8c8;

    &-list {
      width: 100%;
      height: 100%;
      overflow: hidden;
      overflow-y: scroll;
    }

    &-item {
      width: 100%;
      padding: rem(5px);
      border-bottom: rem(1px) solid #8b8b8b;
    }
  }

  &_input-field {
    width: 100%;
    height: 10%;
    background-color: $medium_green;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
