<template>
  <!-- Start Home -->
  <div class="home">
    <Header />
    <h3>كل التدوينات :</h3>
    <hr />
    <p class="alert alert-success" v-if="successMessage">
      {{ successMessage }}
    </p>
    <div v-if="noUserLoggedError">
      <p class="alert alert-danger">
        {{ noUserLoggedError }}
      </p>
      <router-link to="/login" class="btn btn-secondary"
        >تسجيل الدخول</router-link
      >
    </div>
    <p
      class="alert alert-success"
      v-else-if="blogsList.length === 0 && !noUserLoggedError"
    >
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
          <i class="fas fa-user rounded-circle border"></i>
          <span>تاريخ النشر : {{ blogInfo.blogPostDate }}</span>
        </div>
        <!-- Start Blog Details -->
        <div class="blog-details">
          <h4 class="blog-title pb-3">
            <router-link
              :to="{
                name: 'تفاصيل التدوينة',
                params: { id: blogInfo._id, userId: userInfo._id },
              }"
              >{{ blogInfo.blogTitle }}</router-link
            >
          </h4>
          <p class="blog-content">
            محتوى التدوينة : انقر على الرابط أعلى هذا السطر تماماً .
          </p>
          <h6 class="text-capitalize">
            كاتب التدوينة : {{ blogInfo.blogWriterName }}
          </h6>
        </div>
        <!-- End Blog Details -->
      </div>
      <!-- End Blog -->
    </div>
    <!-- End All Blogs Section -->
  </div>
  <!-- End Home -->
</template>

<style lang="scss" scoped>
.home {
  .all-blogs {
    height: 479px;
    overflow-y: auto;
    .blog {
      margin-left: 20px;
      .author-img-and-post-date-time-box {
        i {
          display: inline-block;
          width: 75px;
          height: 75px;
          text-align: center;
          line-height: 75px;
          font-size: 40px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>

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
      noUserLoggedError: "",
      blogsList: [],
      blogListLength: null,
    };
  },
  computed: {
    ...mapGetters(["base_api_url", "userInfo"]),
  },
  mounted() {
    this.successMessage = this.$route.params.successMessage;
    setTimeout(() => {
      this.successMessage = "";
    }, 6000);
    // Get All Blogs If User Is Logged
    if (this.userInfo) {
      this.getAllBlogs();
    } else
      this.noUserLoggedError =
        "عذراً لا يمكن عرض التدوينات لأنك لم تقم بتسجيل الدخول ، من فضلك قم بتسجيل الدخول بالضغط على الزر أدناه ...";
  },
  components: {
    Header,
  },
  methods: {
    getAllBlogs() {
      axios
        .get(`${this.base_api_url}/blogs/all-blogs`)
        .then((response) => {
          let blogsList = response.data;
          this.blogListLength = blogsList.length;
          if (this.blogListLength === 0) {
            this.errorMessage = "عذراً لا يوجد تدوينات حالياً ....";
          } else {
            this.blogsList = blogsList;
            // Programming The Post Date Display Methology For All Blogs
            for(let i = 0; i < this.blogListLength; i++) {
              let blogPostDate = new Date(this.blogsList[i].blogPostDate);
              this.blogsList[i].blogPostDate = `${blogPostDate.toLocaleString()}`;
            }
          };
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>