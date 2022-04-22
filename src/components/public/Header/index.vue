<template>
  <!-- Start Header -->
  <header class="header-section">
    <!-- Start Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <!-- Start Container -->
      <div class="container-fluid">
        <a class="navbar-brand" href="#"> مدونة </a>
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
                to="/about"
                class="nav-link"
                aria-current="page"
                exact-active-class
              >
                الصفحة الثانية
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
</style>

<script>
export default {
  name: "Header",
};
</script>