<template>
  <!-- Start Add New Blog Page -->
  <div class="add-new-blog">
    <Header />
    <h3>إضافة تدوينة جديدة :</h3>
    <hr />
    <form
      class="add-new-blog-form border-style p-3"
      @submit.prevent="addNewBlog()"
    >
      <label for="#blog-title">عنوان التدوينة *</label>
      <input
        type="text"
        placeholder="من فضلك أدخل عنوان التدوينة هنا"
        class="form-control mt-2 mb-3"
        id="blog-title"
        autofocus
        v-model.trim="blogTitle"
        required
      />
      <label for="#comment">نص التدوينة *</label>
      <textarea
        placeholder="من فضلك اكتب نص التدوينة هنا"
        class="form-control mt-2 mb-3"
        id="blog-content"
        v-model.trim="blogContent"
        required
      ></textarea>
      <h6 class="mt-4 mb-3 text-danger fw-bold">
        ملاحظة : الإشارة * تعني أنّ الحقول مطلوبة .
      </h6>
      <button type="submit" class="btn btn-secondary">نشر التدوينة</button>
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
    <!-- End Add New Comment Form Section -->
  </div>
  <!-- End Add New Blog Page -->
</template>

<style lang="scss" scoped>
.add-new-blog {
  .add-new-blog-form {
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
  name: "AddNewBlog",
  data() {
    return {
      userId: "",
      firstName: "",
      blogTitle: "",
      blogContent: "",
      blogWriterName: "",
      waitMessage: "",
      successMessage: "",
    };
  },
  components: {
    Header,
  },
  mounted() {
    this.userId = this.userInfo._id;
    this.firstName = this.userInfo.firstName;
    this.blogWriterName = this.userInfo.userName;
  },
  computed: {
    ...mapGetters(["userInfo", "base_api_url"]),
  },
  methods: {
    addNewBlog() {
      axios
        .post(`${this.base_api_url}/blogs`, {
          userId: this.userId,
          blogTitle: this.blogTitle,
          blogContent: this.blogContent,
          blogWriterName: this.blogWriterName,
        })
        .then(() => {
          this.waitMessage =
            "الرجاء الانتظار ريثما يتم إنشاء المدونة الخاصة بك ....";
          setTimeout(() => {
            this.waitMessage = "";
            this.successMessage = `تهانينا ${this.firstName} لقد تمت عملية إضافة مدونتك بنجاح ...`;
            setTimeout(() => {
              this.$router.push("/");
            }, 2000);
          }, 2000);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>