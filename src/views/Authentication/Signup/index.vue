<template>
  <Header />
  <!-- Start Signup -->
  <section class="sign-up">
    <h3>إنشاء حساب جديد:</h3>
    <hr />
    <form class="signup-form border-style p-3" @submit.prevent="createNewAccount()">
      <label for="#user-name">اسم المستخدم *</label>
      <input
        type="text"
        placeholder="من فضلك أدخل اسم المستخدم الذي تريده هنا"
        class="form-control mt-2 mb-3"
        id="user-name"
        autofocus
        v-model="userName"
      />
      <label for="#email">البريد الالكتروني *</label>
      <input
        type="email"
        placeholder="من فضلك أدخل البريد الالكتروني الذي تريده هنا"
        class="form-control mt-2 mb-3"
        id="email"
        v-model="email"
      />
      <label for="#first-name">الاسم الأول *</label>
      <input
        type="text"
        placeholder="من فضلك أدخل الاسم الأول الذي تريده هنا"
        class="form-control mt-2 mb-3"
        id="first-name"
        v-model="firstName"
      />
      <label for="#middle-name">الاسم الثاني *</label>
      <input
        type="text"
        placeholder="من فضلك أدخل الاسم الثاني الذي تريده هنا"
        class="form-control mt-2 mb-3"
        id="middle-name"
        v-model="middleName"
      />
      <label for="#password">كلمة السر *</label>
      <input
        type="password"
        placeholder="من فضلك أدخل كلمة السر التي تريدها هنا"
        class="form-control mt-2 mb-3"
        id="password"
        v-model="password"
      />
      <label for="#confirmed-password"> تأكيد كلمة السر *</label>
      <input
        type="password"
        placeholder="من فضلك أعد إدخال كلمة السر هنا"
        class="form-control mt-2 mb-3"
        id="confirmed-password"
        v-model="confirmedPassword"
      />
      <h6 class="mt-4 mb-3 text-danger fw-bold"> ملاحظة : الإشارة * تعني أنّ الحقول مطلوبة  .</h6>
      <button type="submit" class="btn btn-secondary">سجّل الآن</button>
      <hr />
      <p class="mb-2">إذا كان لديك حساب  من قبل فيمكنك تسجيل الدخول من هنا
        <router-link to="/login">
          تسجيل الدخول
        </router-link>
      </p>
    </form>
  </section>
  <!-- End Signup -->
</template>

<script>
import Header from "@/components/Header/index.vue";
export default {
  name: "Signup",
  data() {
    return {
      userName: "",
      email: "",
      firstName: "",
      middleName: "",
      password: "",
      confirmedPassword: "",
    };
  },
  components: {
    Header,
  },
  methods: {
    createNewAccount() {},
  },
};
</script>

<style>
</style>