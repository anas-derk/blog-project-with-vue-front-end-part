<template>
  <Header />
  <!-- Start Login -->
  <section class="login">
    <h3>تسجيل الدخول:</h3>
    <hr />
    <form class="login-form border-style p-3" @submit.prevent="login()">
      <label for="#email">البريد الالكتروني *</label>
      <input
        type="email"
        placeholder="من فضلك أدخل البريد الالكتروني لحسابك هنا"
        class="form-control mt-2 mb-3"
        id="email"
        v-model="email"
      />
      <label for="#password">كلمة السر *</label>
      <input
        type="password"
        placeholder="من فضلك أدخل كلمة سر حسابك هنا"
        class="form-control mt-2 mb-3"
        id="password"
        v-model="password"
      />
      <h6 class="mt-4 mb-3 text-danger fw-bold"> ملاحظة : الإشارة * تعني أنّ الحقول مطلوبة  .</h6>
      <button type="submit" class="btn btn-secondary">تسجيل الدخول الآن</button>
      <hr />
      <p class="mb-2">إذا لم يكن لديك حساب  من قبل فيمكنك إنشاء حساب جديد من هنا
        <router-link to="/sign-up">
          إنشاء حساب جديد
        </router-link>
      </p>
    </form>
  </section>
  <!-- End Login -->
</template>

<script>
import Header from "@/components/Header/index.vue";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  components: {
    Header,
  },
  methods: {
    login() {},
  },
};
</script>

<style>
</style>