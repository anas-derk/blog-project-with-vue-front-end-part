<template>
  <!-- Start Delete Blog Page -->
  <div class="delete-blog">
    <Header />
    <h3>حذف التدوينة :</h3>
    <hr />
    <section class="delete-blog border-style p-3">
      <h4 class="mb-4">هل أنت متأكد من حذف التدوينة: " أنس " ؟</h4>
      <!-- Start Delete Blog Form -->
      <form
        class="delete-blog-form d-flex justify-content-between"
        @submit.prevent="deleteBlog()"
      >
        <button type="submit" class="btn btn-danger">حذف التدوينة</button>
        <button type="submit" class="btn btn-secondary">تراجع</button>
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
      <!-- End Delete Blog Form -->
    </section>
  </div>
  <!-- End Delete Blog Page -->
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "DeleteBlog",
  data() {
    return {
      waitMessage: "",
      errorMessage: "",
    };
  },
  mounted() {},
  components: {
    Header,
  },
  methods: {
    deleteBlog() {},
  },
};
</script>