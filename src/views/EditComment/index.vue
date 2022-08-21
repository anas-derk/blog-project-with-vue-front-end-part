<template>
  <!-- Start Edit Comment Page -->
  <div class="edit-comment">
    <Header />
    <h3>أهلاً بك في صفحة تعديل التعليق الخاص بك :</h3>
    <hr />
    <form
      class="edit-comment-form border-style p-3"
      @submit.prevent="editComment()"
      v-if="commentInfo"
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
    <p class="alert alert-danger mt-3 text-center" v-else>
      {{ noCommentFoundError }}
    </p>
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
      commentInfo: null,
      commentContent: "",
      waitMessage: "",
      successMessage: "",
      noCommentFoundError: "",
    };
  },
  mounted() {
    if (this.userInfo) {
      this.commentId = this.$route.params.commentId;
      // Get Previos Comment Info
      this.getCommentInfo(this.commentId).then((data) => {
        // Check if Comment Is Exists
        if (typeof data === "string") {
          this.noCommentFoundError = data;
        } else {
          // Store Reponsed Data In Comment Info Object
          this.commentInfo = data;
          this.userId = this.$route.params.userId;
          this.blogId = this.$route.params.blogId;
          /* Start Check if This User Write This Blog */
          if (
            this.commentInfo.userId !== this.userId ||
            this.userId !== this.userInfo._id ||
            this.blogId !== this.commentInfo.blogId
          )
            // Auto Redirect To Home Page because This User Don't Write This Comment
            this.redirectToPage("/");
          else {
            this.commentContent = this.commentInfo.commentContent;
          }
          /* End Check if This User Write This Comment */
        }
      });
      this.userName = this.userInfo.userName;
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
    getCommentInfo(commentId) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${this.base_api_url}/api/comments/user-comment?commentId=${commentId}`
          )
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => reject(err));
      });
    },
    editComment() {
      this.waitMessage = "الرجاء الانتظار قليلاً ريثما يتم التعديل ...";
      axios
        .put(`${this.base_api_url}/api/comments/${this.commentId}`, {
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