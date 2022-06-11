<template>
  <!-- Start Header -->
  <header class="header-section">
    <!-- Start Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
      <!-- Start Container -->
      <div class="container">
        <a class="navbar-brand" href="#">مدونة الكترونية</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link
                to="/"
                class="nav-link"
                aria-current="page"
                exact-active-class
              >
                الصفحة الرئيسية
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/sign-up"
                class="nav-link"
                aria-current="page"
                exact-active-class
              >
                من أنا
              </router-link>
            </li>
          </ul>
          <ul class="navbar-nav" style="margin-right: auto">
            <li class="nav-item">
              <router-link
                to="/login"
                class="nav-link"
                aria-current="page"
                exact-active-class
                v-if="!userData"
              >
                تسجيل الدخول
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/sign-up"
                class="nav-link"
                aria-current="page"
                exact-active-class
                v-if="!userData"
              >
                إنشاء حساب جديد
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/blog/add-new-blog"
                class="nav-link"
                aria-current="page"
                exact-active-class
                v-if="userData"
              >
                تدوينة جديدة
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                :to="{
                  name: 'الملف الشخصي',
                  params: { userId: userId },
                }"
                class="nav-link"
                aria-current="page"
                exact-active-class
                v-if="userData"
              >
                الملف الشخصي
              </router-link>
            </li>
            <li class="nav-item">
              <button
                class="nav-link btn btn-danger text-white"
                aria-current="page"
                exact-active-class
                @click="logout()"
                v-if="userData"
              >
                تسجيل الخروج
              </button>
            </li>
          </ul>
        </div>
      </div>
      <!-- End Container -->
    </nav>
    <!-- End Navbar -->
  </header>
  <!-- End Header -->
</template>

<style lang="scss" scoped>
.header-section {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 1;
  .navbar {
    * a {
      color: #fff;
    }
    .navbar-collapse {
      margin-right: 20px;
      .navbar-nav {
        .dropdown-item {
          text-align: right;
          color: #000;
        }
      }
    }
  }
}
</style>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      userData: "",
      userId: null,
    };
  },
  mounted() {
    if (this.userInfo) {
      this.userData = this.userInfo;
      this.userId = this.userData._id;
    }
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    ...mapMutations(["clearUserInfo"]),
    ...mapActions(["redirectToPage"]),
    logout() {
      // clear user info
      this.clearUserInfo();
      // redirect to home page
      this.redirectToPage("/login");
    },
  },
};
</script>