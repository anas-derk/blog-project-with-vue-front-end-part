<template>
  <!-- Start Home -->
  <div class="home">
    <Header />
    <h3>كل التدوينات :</h3>
    <hr />
    <p class="alert alert-success" v-if="successMessage">
      {{ successMessage }}
    </p>
    <p class="alert alert-success" v-if="blogsList.length === 0">
      {{ errorMessage }}
    </p>
    <!-- Start All Blogs Section -->
    <div class="all-blogs" v-else>
      <!-- Start Blog -->
      <div
        class="blog p-3 border-style border-radius-3 mb-5"
        v-for="blogInfo in blogsList"
        :key="blogInfo._id"
      >
        <!-- Start Author Img And Post Date Time Box -->
        <div
          class="
            author-img-and-post-date-time-box
            pb-3
            d-flex
            align-items-center
          "
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
          <span>تاريخ النشر : {{ blogInfo.blogPostDate }}</span>
        </div>
        <!-- Start Blog Details -->
        <div class="blog-details">
          <h4 class="blog-title pb-3">
            <router-link :to="{
              name: 'تفاصيل التدوينة',
              params: { id: blogInfo._id }
            }">{{ blogInfo.blogTitle }}</router-link>
          </h4>
          <p class="blog-content">محتوى التدوينة : انقر على الرابط أعلى هذا السطر تماماً .</p>
          <h6 class="text-capitalize">كاتب التدوينة : {{ blogInfo.blogWriterName }}</h6>
        </div>
        <!-- End Blog Details -->
      </div>
      <!-- End Blog -->
    </div>
    <!-- End All Blogs Section -->
  </div>
  <!-- End Home -->
</template>

<script>
import Header from "@/components/Header";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      successMessage: "",
      errorMessage: "",
      blogsList: [],
      blogListLength: null,
    };
  },
  computed: {
    ...mapGetters(["base_api_url"]),
  },
  mounted() {
    this.successMessage = this.$route.params.successMessage;
    setTimeout(() => {
      this.successMessage = "";
    }, 6000);
    // Get All Blogs
    axios
      .get(`${this.base_api_url}/blogs/all-blogs`)
      .then((response) => {
        let blogsList = response.data;
        this.blogListLength = blogsList.length;
        if(this.blogListLength === 0) {
          this.errorMessage = "عذراً لا يوجد تدوينات حالياً ....";
        } else this.blogsList = blogsList;
      })
      .catch((err) => console.log(err));
  },
  components: {
    Header,
  },
};
</script>