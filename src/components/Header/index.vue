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
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                دوراتي
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a class="dropdown-item" href="#">دورة بايثون</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">دورة جانغو</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">دورة نظام إدارة التعلم</a>
                </li>
              </ul>
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
              >
                إنشاء حساب جديد
              </router-link>
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
export default {
  name: "Header",
};
</script>