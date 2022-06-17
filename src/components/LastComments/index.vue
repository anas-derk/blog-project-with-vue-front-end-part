<template>
  <!-- Start Last Comments -->
  <aside class="last-comments">
    <div class="card">
      <h5 class="card-title text-center bg-secondary text-white pt-3 pb-3">
        آخر التعليقات
      </h5>
      <p
        class="text-center pt-3 pb-3 alert alert-info m-0"
        style="cursor: pointer"
        @click="getLastFiveComments()"
      >
        اضغط هنا لجلب آخر التعليقات ..
      </p>
      <ul class="list-group list-group-flush" v-if="last_five_comments_list_Length > 0">
        <li
          class="list-group-item"
          v-for="comment in last_five_comments_list"
          :key="comment._id"
          style="cursor: pointer;"
          @click="go_to_the_blog_page_which_is_related_to_the_comment(comment.blogId)"
        >
          {{ comment.commentContent }}
        </li>
      </ul>
      <p
        v-else-if="last_five_comments_list_Length === 0 && is_get_last_comments_btn_clicked"
        class="text-center alert alert-danger pt-3 pb-3 m-0"
      >
        {{ errorMessage }}
      </p>
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
      last_five_comments_list: [],
      last_five_comments_list_Length: 0,
      is_get_last_comments_btn_clicked: false,
      errorMessage: "",
    };
  },
  computed: {
    ...mapGetters(["base_api_url"]),
  },
  methods: {
    getLastFiveComments() {
      this.is_get_last_comments_btn_clicked = true;
      axios
        .get(`${this.base_api_url}/comments/last-five-comments`)
        .then((response) => {
          this.last_five_comments_list = response.data;
          this.last_five_comments_list_Length = this.last_five_comments_list.length;
          if (this.last_five_comments_list_Length === 0) {
            this.errorMessage = "عذراً لا توجد تعليقات على التدوينات حالياً ...";
          }
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