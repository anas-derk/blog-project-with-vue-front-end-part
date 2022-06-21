<template>
  <!-- Start Delete Profile Page -->
  <div class="delete-profile-page">
    <Header />
    <h3>حذف التعليق :</h3>
    <hr />
    <section class="delete-comment border-style p-3">
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
  </div>
  <!-- End Delete Comment Page -->
</template>

<script>
import Header from "@/components/Header";
import { mapGetters } from "vuex";
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
    };
  },
  mounted() {
    this.userId = this.$route.params.userId;
    this.blogId = this.$route.params.blogId;
    this.commentId = this.$route.params.commentId;
    this.userName = this.userInfo.userName;
  },
  components: {
    Header,
  },
  computed: {
    ...mapGetters(["base_api_url", "userInfo"]),
  },
  methods: {
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
  },
};
</script>