<template>
  <!-- Start Edit Comment Page -->
  <div class="edit-comment">
    <Header />
    <h3>أهلاً بك في صفحة تعديل التعليق الخاص بك :</h3>
    <hr />
    <form
      class="edit-comment-form border-style p-3"
      @submit.prevent="editComment()"
    >
      <label for="#comment-content">التعليق الجديد :</label>
      <input
        type="text"
        placeholder="من فضلك أدخل التعليق الجديد الذي تريده هنا"
        class="form-control mt-2 mb-3"
        id="comment-content"
        autofocus
        v-model.trim="commentContent"
        required
      />
      <h6 class="mt-4 mb-3 text-danger fw-bold">
        ملاحظة : الإشارة * تعني أنّ الحقل مطلوب .
      </h6>
      <button type="submit" class="btn btn-secondary">تعديل الآن</button>
      <p class="alert alert-info mt-3 text-center" v-if="waitMessage">
        {{ waitMessage }}
      </p>
      <p
        class="alert alert-success mt-3 text-center text-black"
        v-if="successMessage"
      >
        {{ successMessage }}
      </p>
    </form>
  </div>
  <!-- End Edit Comment Page -->
</template>

<script>
import Header from "@/components/Header/index.vue";
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "EditComment",
  data() {
    return {
      userId: null,
      blogId: null,
      commentId: null,
      userName: "",
      commentContent: "",
      waitMessage: "",
      successMessage: "",
    };
  },
  mounted() {
    if (!this.userInfo) {
      this.redirectToPage("/login");
    } else {
      this.blogId = this.$route.params.blogId;
      this.commentId = this.$route.params.commentId;
      this.userName = this.userInfo.userName;
      // Get Comment Info
      this.getCommentInfo();
    }
  },
  components: {
    Header,
  },
  computed: {
    ...mapGetters(["base_api_url", "userInfo"]),
  },
  methods: {
    ...mapActions(["redirectToPage"]),
    getCommentInfo() {
      axios
        .get(`${this.base_api_url}/comments/user-comment?commentId=${this.commentId}`)
        .then((response) => {
          this.commentContent = response.data.commentContent;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editComment() {
      this.waitMessage = "الرجاء الانتظار قليلاً ريثما يتم التعديل ...";
      axios
        .put(`${this.base_api_url}/comments/${this.commentId}`, {
          commentContent: this.commentContent,
        })
        .then(() => {
          setTimeout(() => {
            this.waitMessage = "";
            this.successMessage = `تهانينا ${this.userName} لقد تمت عملية تعديل بياناتك الشخصية بنجاح ..`;
            setTimeout(() => {
              this.successMessage = "";
              this.$router.push({
                name: "تفاصيل التدوينة",
                params: {
                  id: this.blogId,
                },
              });
            }, 2000);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>