<template>
  <!-- Start Edit Blog Page -->
  <div class="edit-blog">
    <Header />
    <h3>تعديل التدوينة :</h3>
    <hr />
    <!-- Start Edit Blog Form Section -->
    <form
      class="edit-blog-form border-style p-3"
      @submit.prevent="editBlog()"
      v-if="blogInfo"
    >
      <label for="#blog-title">عنوان التدوينة الجديد *</label>
      <input
        type="text"
        placeholder="من فضلك أدخل عنوان التدوينة الجديد هنا"
        class="form-control mt-2 mb-3"
        id="blog-title"
        autofocus
        v-model.trim="blogTitle"
        required
      />
      <label for="#new-blog-content">نص التدوينة الجديد *</label>
      <textarea
        placeholder="من فضلك اكتب نص التدوينة الجديد هنا"
        class="form-control mt-2 mb-3"
        id="new-blog-content"
        v-model.trim="blogContent"
        required
      ></textarea>
      <h6 class="mt-4 mb-3 text-danger fw-bold">
        ملاحظة : الإشارة * تعني أنّ الحقول مطلوبة .
      </h6>
      <button type="submit" class="btn btn-secondary">تعديل التدوينة</button>
      <p class="alert alert-info mt-3 text-center" v-if="waitMessage">
        {{ waitMessage }}
      </p>
      <p class="alert alert-success mt-3 text-center" v-if="successMessage">
        {{ successMessage }}
      </p>
    </form>
    <!-- End Edit Blog Form Section -->
    <p class="alert alert-danger mt-3 text-center" v-else>
      {{ noBlogFoundError }}
    </p>
  </div>
  <!-- End Edit Blog Page -->
</template>

<style lang="scss" scoped>
.edit-blog {
  .edit-blog-form {
    textarea {
      resize: none;
      height: 200px;
    }
  }
}
</style>

<script>
import Header from "@/components/Header";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "EditBlog",
  data() {
    return {
      userId: null,
      blogId: null,
      blogInfo: null,
      blogTitle: "",
      blogContent: "",
      userName: "",
      waitMessage: "",
      successMessage: "",
      noBlogFoundError: "",
    };
  },
  mounted() {
    if (this.userInfo) {
      this.blogId = this.$route.params.id;
      // Get Previos Blog Info
      this.getBlogInfo(this.blogId).then((data) => {
        // Check if Blog Is Exists
        if (typeof data === "string") {
          this.noBlogFoundError = data;
        } else {
          // Store Reponsed Data In Blog Info Object
          this.blogInfo = data;
          this.userId = this.$route.params.userId;
          /* Start Check if This User Write This Blog */
          if (
            this.blogInfo.userId !== this.userId ||
            this.userId !== this.userInfo._id
          )
          // Auto Redirect To Home Page because This User Don't Write This Blog
            this.redirectToPage("/");
          else {
            this.blogTitle = this.blogInfo.blogTitle;
            this.blogContent = this.blogInfo.blogContent;
          }
          /* End Check if This User Write This Blog */
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
    getBlogInfo(blogId) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${this.base_api_url}/blogs?blogId=${blogId}`)
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => reject(err));
      });
    },
    editBlog() {
      this.waitMessage = "الرجاء الانتظار قليلاً ريثما يتم التعديل ...";
      axios
        .put(`${this.base_api_url}/blogs/${this.blogId}`, {
          blogTitle: this.blogTitle,
          blogContent: this.blogContent,
        })
        .then(() => {
          setTimeout(() => {
            this.waitMessage = "";
            this.successMessage = `تهانينا ${this.userName} لقد تمت عملية تعديل بيانات مدونتك الشخصية بنجاح ..`;
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