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
        style="resize: none; height: 200px"
      ></textarea>
      <h6 class="mt-4 mb-3 text-danger fw-bold">
        ملاحظة : الإشارة * تعني أنّ الحقول مطلوبة .
      </h6>
      <button type="submit" class="btn btn-secondary">نشر التدوينة</button>
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
    <!-- End Add New Comment Form Section -->
  </div>
  <!-- End Add New Blog Page -->
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "AddNewBlog",
  data() {
    return {
      blogTitle: "",
      blogContent: "",
      waitMessage: "",
      errorMessage: "",
    };
  },
  components: {
    Header,
  },
  methods: {
    addNewBlog() {},
  },
};
</script>