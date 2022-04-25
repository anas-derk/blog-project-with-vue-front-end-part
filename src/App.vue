<template>
  <section class="home pt-4 pb-4">
    <!-- Start Container -->
    <div class="container">
      <!-- Start Grid System -->
      <div class="row">
        <!-- Start Column -->
        <div class="col-md-8">
          <router-view />
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
  <Footer></Footer>
</template>

<style lang="scss">
#app {
  height: 100%;
}
.last-blogs-comments-box {
  padding-top: 60px;
}
</style>

<script>
import Footer from "./components/Footer/index.vue";
import LastBlogs from "@/components/LastBlogs/index";
import LastComments from "@/components/LastComments/index";

export default {
  components: {
    Footer,
    LastBlogs,
    LastComments,
  },
};
</script>