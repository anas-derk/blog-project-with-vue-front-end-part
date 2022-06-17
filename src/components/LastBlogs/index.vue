<template>
  <!-- Start Last Blogs -->
  <aside class="last-blogs mb-4">
    <div class="card">
      <h5 class="card-title text-center bg-secondary text-white pt-3 pb-3">
        آخر التدوينات
      </h5>
      <p
        class="text-center pt-3 pb-3 alert alert-info m-0"
        style="cursor: pointer"
        @click="getLastFiveBlogs()"
      >
        اضغط هنا لجلب آخر التدوينات ..
      </p>
      <ul class="list-group list-group-flush" v-if="last_five_blogs_list_Length > 0">
        <li
          class="list-group-item"
          v-for="blog in last_five_blogs_list"
          :key="blog._id"
          @click="goToBlogInfoPage(blog._id)"
          style="cursor: pointer"
        >
          {{ blog.blogTitle }}
        </li>
      </ul>
      <p
        v-else-if="last_five_blogs_list_Length === 0 && is_get_last_blogs_btn_clicked"
        class="text-center alert alert-danger pt-3 pb-3 m-0"
      >
        {{ errorMessage }}
      </p>
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
      last_five_blogs_list: [],
      last_five_blogs_list_Length: 0,
      is_get_last_blogs_btn_clicked: false,
      errorMessage: "",
    };
  },
  computed: {
    ...mapGetters(["base_api_url"]),
  },
  methods: {
    getLastFiveBlogs() {
      this.is_get_last_blogs_btn_clicked = true;
      axios
        .get(`${this.base_api_url}/blogs/last-five-blogs`)
        .then((response) => {
          this.last_five_blogs_list = response.data;
          this.last_five_blogs_list_Length = this.last_five_blogs_list.length;
          if (this.last_five_blogs_list_Length === 0) {
            this.errorMessage = "عذراً لا توجد تدوينات منشورة حالياً ...";
          }
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