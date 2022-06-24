<template>
  <!-- Start Edit Blog Page -->
  <div class="edit-blog">
    <Header />
    <h3>تعديل التدوينة :</h3>
    <hr />
    <!-- Start Edit Blog Form Section -->
    <form class="edit-blog-form border-style p-3" @submit.prevent="editBlog()">
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
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "EditBlog",
  data() {
    return {
      blogId: null,
      blogTitle: "",
      blogContent: "",
      userName: "",
      waitMessage: "",
      successMessage: "",
    };
  },
  mounted() {
    this.blogId = this.$route.params.id;
    // Get Previos Blog Info
    this.getBlogInfo(this.blogId);
    this.userName = this.userInfo.userName;
  },
  components: {
    Header,
  },
  computed: {
    ...mapGetters(["base_api_url", "userInfo"]),
  },
  methods: {
    getBlogInfo(blogId) {
      axios
        .get(`${this.base_api_url}/blogs?blogId=${blogId}`)
        .then((response) => {
          let blogInfo = response.data;
          this.blogTitle = blogInfo.blogTitle;
          this.blogContent = blogInfo.blogContent;
        })
        .catch((err) => console.log(err));
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