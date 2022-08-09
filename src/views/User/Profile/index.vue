<template>
  <!-- Start Profile Page -->
  <div class="profile">
    <Header />
    <h3>أهلاً بك {{ userData.userName }} في صفحة الملف الشخصي الخاصة بك :</h3>
    <hr />
    <!-- Start Profile Info -->
    <div class="profile-info p-3 border-style border-radius-3">
      <!-- Start Grid System -->
      <div class="row">
        <!-- Start Column -->
        <div class="col-md-4 text-center">
          <i class="fas fa-user rounded-circle border mx-auto"></i>
          <router-link
            :to="{ name: 'تحرير الملف الشخصي', userId: userData._id }"
            class="btn btn-danger"
            style="margin-left: 20px"
            >تحرير</router-link
          >
          <router-link
            :to="{ name: 'حذف الملف الشخصي', userId: userData._id }"
            class="btn btn-danger"
            >حذف</router-link
          >
        </div>
        <!-- End Column -->
        <!-- Start Column -->
        <div class="col-md-8">
          <!-- Start Info Box -->
          <div class="info-box">
            <h4 class="mb-4">اسم المستخدم: {{ userData.firstName }}</h4>
            <p>الاسم : {{ userData.userName }}</p>
            <p>البريد الالكتروني : {{ userData.email }}</p>
          </div>
          <!-- Start Info Box -->
        </div>
        <!-- End Column -->
      </div>
      <!-- End Grid System -->
    </div>
    <!-- End Profile Info -->
    <h3 class="mt-5">عدد التدوينات التي دونتها :</h3>
    <hr />
    <!-- Start Blogs Count Box -->
    <div
      class="
        blogs-count-box
        text-center
        fw-bold
        bg-secondary
        text-white
        pt-2
        pb-2
      "
      v-if="userBlogsListLength > 0"
    >
      {{ userBlogsListLength }}
    </div>
    <div
      class="text-center fw-bold bg-secondary text-white pt-3 pb-3"
      style="font-size: 18px"
      v-else
    >
      {{ errorMessage }}
    </div>
    <!-- End Blogs Count Box -->
    <h3 class="mt-5">تدويناتي :</h3>
    <hr />
    <!-- Start My Blogs List -->
    <ul class="my-blogs-list" v-if="userBlogsListLength > 0">
      <li
        class="mb-3"
        v-for="blog in userBlogsList"
        :key="blog._id"
        @click="goToBlogInfoPage(blog._id)"
        style="cursor: pointer"
      >
        {{ blog.blogTitle }}
      </li>
    </ul>
    <!-- End My Blogs List -->
    <hr v-if="userBlogsListLength > 0" />
    <div class="pagination-box text-center" v-if="userBlogsListLength > 0">
      <button class="btn btn-secondary">التالي</button>
      <span>صفحة 1 من 10</span>
      <button class="btn btn-secondary">السابق</button>
    </div>
    <div
      class="text-center fw-bold bg-secondary text-white pt-3 pb-3"
      style="font-size: 18px"
      v-if="userBlogsListLength === 0"
    >
      {{ errorMessage }}
    </div>
  </div>
  <!-- End Profile Page -->
</template>

<style lang="scss" scoped>
.profile {
  .profile-info {
    i {
      display: block;
      width: 75px;
      height: 75px;
      text-align: center;
      line-height: 75px;
      font-size: 40px;
      margin-bottom: 20px;
    }
    .info-box{
      @media(max-width: 767px) {
        padding-top: 25px;
      }
    }
  }
  .blogs-count-box {
    font-size: 25px;
  }
  .my-blogs-list {
    list-style-type: square;
    list-style-position: inside;
  }
  .pagination-box{
    span{
      margin: 0 20px
    }
  }
}
</style>

<script>
import Header from "@/components/Header";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "Profile",
  data() {
    return {
      userData: "",
      userBlogsList: [],
      userBlogsListLength: null,
      errorMessage: "",
    };
  },
  computed: {
    ...mapGetters(["userInfo", "base_api_url"]),
  },
  mounted() {
    this.userData = this.userInfo;
    if (!this.userData) this.redirectToPage("/");
    else this.getBlogsByUserId();
  },
  components: {
    Header,
  },
  methods: {
    ...mapActions(["redirectToPage"]),
    getBlogsByUserId() {
      axios
        .get(
          `${this.base_api_url}/blogs/user-blogs?userId=${this.userData._id}`
        )
        .then((response) => {
          let userBlogsList = response.data;
          this.userBlogsListLength = userBlogsList.length;
          if (this.userBlogsListLength === 0) {
            this.errorMessage = "عذراً لا يوجد تدوينات خاصة بك ....";
          } else this.userBlogsList = userBlogsList;
        })
        .catch((err) => console.log(err));
    },
    goToBlogInfoPage(blogId) {
      this.$router.push({
        name: "تفاصيل التدوينة",
        params: { id: blogId },
      });
    },
  },
};
</script>