<template>
  <Header></Header>
  <router-view />
  <Footer></Footer>
</template>

<style lang="scss">

</style>

<script>

  import Header from "./components/public/Header/index.vue"
  import Footer from "./components/public/Footer/index.vue"

  export default {
    components: {
      Header,
      Footer
    }
  }
</script>