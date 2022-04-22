<template>
  <router-view />
  <Footer></Footer>
</template>

<style lang="scss">
  #app{
    height: 100%;
  }
</style>

<script>
import Footer from "./components/Footer/index.vue";

export default {
  components: {
    Footer,
  },
};
</script>