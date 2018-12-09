<template lang='pug'>
  .chat(ref="chat")
    .chat_header(ref="chat_header")
      .chat_header-text Чат с ботом
      button.chat_header-close(type="button" @click="changeChatHiddenState") Close
    .chat_body
      ul.chat_body-list
        li.chat_body-item(v-for="message in messageList") {{message}}
    .chat_input-field
      form.chat_input-form
        input(type="text" ref="text_input")
        button(type="submit" @click.prevent="chatRequest") Enter
</template>

<script>
import axios from "axios";

export default {
  name: "Chat",
  components: {},
  data() {
    return {
      messageList: ["Введите сообщение..."]
    };
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
      let text = this.$refs.text_input.value;
      this.messageList.push("Вы: " + text);
      this.$refs.text_input.value = "";
      let self = this;
      axios
        .get(`http://js-laboratory.com:9000/chatbot/?text=${text}`)
        .then(response => {
          self.messageList.push("Бот: " + response.data.answer);
        });
    },
    changeChatHiddenState() {
      this.$store.commit("changeChatHiddenState");
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

    &-close {
      margin-left: rem(16px);
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
