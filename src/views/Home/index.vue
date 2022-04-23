<template>
  <Header />
  <section class="home pt-4 pb-4">
    <!-- Start Container -->
    <div class="container">
      <!-- Start Grid System -->
      <div class="row">
        <!-- Start Column -->
        <div class="col-md-8">
          <h1>كل التدوينات :</h1>
          <hr />
          <!-- Start Blog -->
          <div class="blog p-3 border-style border-radius-3">
            <!-- Start Author Img And Post Date Time Box -->
            <div class="author-img-and-post-date-time-box pb-3 d-flex align-items-center">
              <!-- <img src="" alt="صورة الناشر" class="rounded-circle border" /> -->
              <i class="fas fa-user rounded-circle border" style="display: inline-block; width: 75px; height: 75px; text-align: center; line-height: 75px; font-size: 40px; margin-left: 10px"></i>
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
        </div>
        <!-- End Column -->
        <!-- Start Column -->
        <div class="col-md">
          <!-- Start Last Blogs And Last Comments Box -->
          <div class="last-blogs-comments-box">
            <LastBlogs />
            <last-comments></last-comments>
          </div>
          <!-- End Last Blogs And Last Comments Box -->
        </div>
        <!-- End Column -->
      </div>
      <!-- End Grid System -->
    </div>
    <!-- End Container -->
  </section>
</template>

<style lang="scss" scoped>
.home {
  .blog {
    .author-img-and-post-date-time-box {

    }
  }
  .last-blogs-comments-box {
    padding-top: 60px;
  }
}
</style>

<script>
import Header from "@/components/Header";
import LastBlogs from "@/components/LastBlogs/index";
import LastComments from "@/components/LastComments/index";
export default {
  name: "Home",
  components: {
    Header,
    LastBlogs,
    LastComments,
  },
};
</script>