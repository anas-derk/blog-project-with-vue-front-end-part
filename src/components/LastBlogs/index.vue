<template>
  <!-- Start Last Blogs -->
  <aside class="last-blogs mb-4">
    <div class="card">
      <h5 class="card-title text-center bg-secondary text-white pt-3 pb-3">
        آخر التدوينات
      </h5>
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item"
          v-for="blog in blogsList"
          :key="blog._id"
          @click="goToBlogInfoPage(blog._id)"
          style="cursor: pointer"
        >
          {{ blog.blogTitle }}
        </li>
      </ul>
    </div>
  </aside>
  <!-- End Last Blogs -->
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "LastBlogs",
  data() {
    return {
      blogsList: [],
    };
  },
  mounted() {
    this.getLastFiveBlogs();
  },
  computed: {
    ...mapGetters(["base_api_url"]),
  },
  methods: {
    getLastFiveBlogs() {
      axios
        .get(`${this.base_api_url}/blogs/all-blogs`)
        .then((response) => {
          this.blogsList = response.data;
        })
        .catch((err) => console.log(err));
    },
    goToBlogInfoPage(blogId) {
      document.location.hash = `/blog/${blogId}`;
      document.location.reload();
    },
  },
};
</script>