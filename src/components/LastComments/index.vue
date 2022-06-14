<template>
  <!-- Start Last Comments -->
  <aside class="last-comments">
    <div class="card">
      <h5 class="card-title text-center bg-secondary text-white pt-3 pb-3">
        آخر التعليقات
      </h5>
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item"
          v-for="comment in lastFiveComments"
          :key="comment._id"
          style="cursor: pointer;"
          @click="go_to_the_blog_page_which_is_related_to_the_comment(comment.blogId)"
        >
          {{ comment.commentContent }}
        </li>
      </ul>
    </div>
  </aside>
  <!-- End Last Comments -->
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "LastComments",
  data() {
    return {
      lastFiveComments: [],
    };
  },
  mounted() {
    this.getLastFiveComments();
  },
  computed: {
    ...mapGetters(["base_api_url"]),
  },
  methods: {
    getLastFiveComments() {
      axios
        .get(`${this.base_api_url}/comments/last-five-comments`)
        .then((response) => {
          this.lastFiveComments = response.data;
        })
        .catch((err) => console.log(err));
    },
    go_to_the_blog_page_which_is_related_to_the_comment(blogId) {
      document.location.hash = `/blog/${blogId}`;
      document.location.reload();
    }
  },
};
</script>