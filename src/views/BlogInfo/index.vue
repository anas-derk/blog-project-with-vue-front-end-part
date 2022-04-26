<template>
  <Header />
  <!-- Start Blog Details Section -->
  <section class="blog-details">
    <h3>معلومات التدوينة :</h3>
    <hr />
    <!-- Start Blog -->
    <div class="blog p-3 border-style border-radius-3">
      <!-- Start Author Img And Post Date Time Box -->
      <div
        class="author-img-and-post-date-time-box pb-3 d-flex align-items-center"
      >
        <!-- <img src="" alt="صورة الناشر" class="rounded-circle border" /> -->
        <i
          class="fas fa-user rounded-circle border"
          style="
            display: inline-block;
            width: 75px;
            height: 75px;
            text-align: center;
            line-height: 75px;
            font-size: 40px;
            margin-left: 10px;
          "
        ></i>
        <span>تاريخ النشر :</span>
      </div>
      <!-- Start Blog Details -->
      <div class="blog-details">
        <h4 class="blog-title">عنوان التدوينة</h4>
        <p class="blog-content">محتوى التدوينة</p>
        <h6>اسم الكاتب :</h6>
      </div>
      <!-- End Blog Details -->
    </div>
    <!-- End Blog -->
  </section>
  <!-- End Home Page -->
</template>

<style lang="scss" scoped>
.home {
  .blog {
    .author-img-and-post-date-time-box {
    }
  }
}
</style>

<script>
import Header from "@/components/Header";
export default {
  name: "BlogDetails",
  components: {
    Header,
  },
};
</script>