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
    >
      <label for="#blog-title">عنوان التدوينة الجديد *</label>
      <input
        type="text"
        placeholder="من فضلك أدخل عنوان التدوينة الجديد هنا"
        class="form-control mt-2 mb-3"
        id="blog-title"
        autofocus
        v-model.trim="newBlogTitle"
        required
      />
      <label for="#new-blog-content">نص التدوينة الجديد*</label>
      <textarea
        placeholder="من فضلك اكتب نص التدوينة الجديد هنا"
        class="form-control mt-2 mb-3"
        id="new-blog-content"
        v-model.trim="newBlogContent"
        required
        style="resize: none; height: 200px"
      ></textarea>
      <h6 class="mt-4 mb-3 text-danger fw-bold">
        ملاحظة : الإشارة * تعني أنّ الحقول مطلوبة .
      </h6>
      <button type="submit" class="btn btn-secondary">تعديل التدوينة</button>
      <p class="alert alert-info mt-3 text-center" v-if="waitMessage">
        {{ waitMessage }}
      </p>
      <p
        class="alert alert-danger mt-3 text-center text-black"
        v-if="errorMessage"
      >
        {{ errorMessage }}
      </p>
    </form>
    <!-- End Edit Blog Form Section -->
  </div>
  <!-- End Edit Blog Page -->
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "EditBlog",
  data() {
    return {
      newBlogTitle: "",
      newBlogContent: "",
      waitMessage: "",
      errorMessage: "",
    };
  },
  components: {
    Header,
  },
  methods: {
    editBlog() {},
  },
};
</script>