<template>
  <!-- Start Delete Profile Page -->
  <div class="delete-profile-page">
    <Header />
    <h3>حذف التعليق :</h3>
    <hr />
    <section class="delete-comment border-style p-3" v-if="commentInfo">
      <h4 class="mb-4">هل أنت متأكد من حذف التعليق ؟</h4>
      <!-- Start Delete Comment Form -->
      <form
        class="delete-comment-form d-flex justify-content-between"
        @submit.prevent="deleteComment()"
      >
        <button type="submit" class="btn btn-danger">حذف التعليق</button>
        <button
          type="button"
          class="btn btn-secondary"
          @click="backToBlogInfoPage()"
        >
          تراجع
        </button>
      </form>
      <!-- End Delete Comment Form -->
      <p class="alert alert-info mt-4 text-center" v-if="waitMessage">
        {{ waitMessage }}
      </p>
      <p
        class="alert alert-success mt-4 text-center text-black"
        v-if="successMessage"
      >
        {{ successMessage }}
      </p>
    </section>
    <p class="alert alert-danger mt-3 text-center" v-else>
      {{ noCommentFoundError }}
    </p>
  </div>
  <!-- End Delete Comment Page -->
</template>

<script>
import Header from "@/components/Header";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "DeleteComment",
  data() {
    return {
      userId: null,
      blogId: null,
      commentId: null,
      userName: "",
      waitMessage: "",
      successMessage: "",
      noCommentFoundError: "",
      commentInfo: null,
    };
  },
  mounted() {
    if (this.userInfo) {
      this.commentId = this.$route.params.commentId;
      this.getCommentInfo(this.commentId).then((data) => {
        if (typeof data === "string") {
          this.noCommentFoundError = data;
        } else {
          this.commentInfo = data;
          this.userId = this.$route.params.userId;
          this.blogId = this.$route.params.blogId;
          this.userName = this.userInfo.userName;
          if (
            this.commentInfo.userId !== this.userId ||
            this.userId !== this.userInfo._id ||
            this.blogId !== this.commentInfo.blogId
          )
            this.redirectToPage("/");
        }
      });
    } else this.redirectToPage("/login");
  },
  components: {
    Header,
  },
  computed: {
    ...mapGetters(["base_api_url", "userInfo"]),
  },
  methods: {
    ...mapActions(["redirectToPage"]),
    backToBlogInfoPage() {
      this.$router.push({
        name: "تفاصيل التدوينة",
        params: {
          id: this.blogId,
        },
      });
    },
    deleteComment() {
      this.waitMessage = "الرجاء الانتظار قليلاً ريثما يتم حذف التعليق ...";
      axios
        .delete(`${this.base_api_url}/comments/${this.commentId}`)
        .then(() => {
          this.waitMessage = "";
          setTimeout(() => {
            this.waitMessage = "";
            this.successMessage = `تهانينا ${this.userName} لقد تمت عملية حذف تعليقك الشخصي على المدونة بنجاح ..`;
            setTimeout(() => {
              this.successMessage = "";
              this.$router.push({
                name: "تفاصيل التدوينة",
                params: { id: this.blogId },
              });
            }, 2000);
          }, 2000);
        })
        .catch((err) => console.log(err));
    },
    getCommentInfo(commentId) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${this.base_api_url}/comments/user-comment?commentId=${commentId}`
          )
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => reject(err));
      });
    },
  },
};
</script>