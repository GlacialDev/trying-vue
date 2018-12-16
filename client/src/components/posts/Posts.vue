<template lang='pug'>
  .posts
    .posts_pagination-wrapper
      ul.posts_pagination-list
        li.posts_pagination-item(v-for="(btn, index) in BtnsAmount" @click.prevent="getPosts" v-bind:class="{active: index===currentIndex}") {{ btn }}
    .posts_list-wrapper
      ul.posts_list
        transition-group(name="fade")
          .posts_item(v-for="post in currentPosts" :key="post.id")
            .posts_title {{post.title}}
            .posts_date {{post.date}}
            .posts_text {{post.text}}
</template>

<script>
import axios from "axios";

export default {
  name: "Posts",
  components: {},
  data() {
    return {
      currentIndex: 0,
      posts: [],
      currentPosts: [],
      BtnsAmount: 0
    };
  },
  methods: {
    getPostsCount: function() {
      axios.get("http://localhost:9000/blogposts_count").then(result => {
        this.BtnsAmount = Math.ceil(Number(result.data) / 10);
      });
    },
    getInitialPosts: function() {
      let btnIndex = 1;
      this.currentIndex = btnIndex - 1;
      let firstPostIndex = btnIndex * 10 - 10;
      let lastPostIndex = btnIndex * 10 - 1;
      axios
        .get(
          `http://localhost:9000/blogposts?firstPostIndex=${firstPostIndex}&lastPostIndex=${lastPostIndex}`
        )
        .then(result => {
          this.currentPosts = result.data;
        });
    },
    getPosts: function(event) {
      let button = event.target;
      let btnIndex = Number(button.innerText);
      this.currentIndex = btnIndex - 1;
      let firstPostIndex = btnIndex * 10 - 10;
      let lastPostIndex = btnIndex * 10 - 1;
      axios
        .get(
          `http://localhost:9000/blogposts?firstPostIndex=${firstPostIndex}&lastPostIndex=${lastPostIndex}`
        )
        .then(result => {
          this.currentPosts = result.data;
        });
    }
  },
  mounted: function() {
    // this.getPosts();
    this.getPostsCount();
    this.getInitialPosts();
  }
};
</script>

<style lang='scss' scoped>
@import "../../components/common/mixins.scss";

.posts {
  margin-top: rem(16px);

  &_item {
    padding: rem(16px);
    margin-bottom: rem(16px);
    box-shadow: 0 0 rem(10px) rgba(0, 0, 0, 0.5);
    max-width: rem(700px);
  }
  &_title {
    font-size: rem(24px);
  }
  &_date {
    font-size: rem(14px);
  }

  &_pagination {
    &-wrapper {
      margin-bottom: rem(16px);
    }
    &-list {
      display: flex;
      flex-direction: row;
    }
    &-item {
      cursor: pointer;
      min-width: rem(48px);
      min-height: rem(48px);
      text-align: center;
      line-height: rem(48px);
      border: rem(1px) solid $medium_green;
      border-left: none;
      &:nth-child(1) {
        border-left: rem(1px) solid $medium_green;
        border-top-left-radius: rem(3px);
        border-bottom-left-radius: rem(3px);
      }
      &:nth-last-child(1) {
        border-top-right-radius: rem(3px);
        border-bottom-right-radius: rem(3px);
      }

      &:hover,
      &.active {
        transition: 0.3s;
        background-color: $medium_green;
        color: #fff;
      }
    }
  }
}

.fade-enter-active {
  transition: all 0.3s ease;
  transition-delay: 0.3s;
}
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
