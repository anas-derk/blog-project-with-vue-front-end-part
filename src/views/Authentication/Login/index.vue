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
        v-model.trim="email"
        required
      />
      <label for="#password">كلمة السر *</label>
      <input
        type="password"
        placeholder="من فضلك أدخل كلمة سر حسابك هنا"
        class="form-control mt-2 mb-3"
        id="password"
        v-model.trim="password"
        required
      />
      <h6 class="mt-4 mb-3 text-danger fw-bold">
        ملاحظة : الإشارة * تعني أنّ الحقول مطلوبة .
      </h6>
      <button type="submit" class="btn btn-secondary">تسجيل الدخول الآن</button>
      <p class="alert alert-info mt-3 text-center" v-if="waitMessage">
        {{ waitMessage }}
      </p>
      <p
        class="alert alert-danger mt-3 text-center text-black"
        v-if="errorMessage"
      >
        {{ errorMessage }}
      </p>
      <hr />
      <p class="mb-2">
        إذا لم يكن لديك حساب من قبل فيمكنك إنشاء حساب جديد من هنا
        <router-link to="/sign-up"> إنشاء حساب جديد </router-link>
      </p>
    </form>
  </section>
  <!-- End Login -->
</template>

<script>
import Header from "@/components/Header/index.vue";
import axios from "axios";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      waitMessage: "",
      errorMessage: "",
    };
  },
  components: {
    Header,
  },
  mounted() {
    let userInfo = this.userInfo;
    if(userInfo) {
      this.redirectToPage("/");
    }
  },
  computed: {
    ...mapGetters(["base_api_url", "userInfo"]),
  },
  methods: {
    ...mapMutations(["setUserInfo"]),
    ...mapActions(["redirectToPage"]),
    login() {
      this.waitMessage =
        "الرجاء الانتظار قليلاً ريثما يتم التحقق وتسجيل الدخول ...";
      axios
        .get(
          `${this.base_api_url}/users/login?email=${this.email}&password=${this.password}`
        )
        .then((response) => {
          setTimeout(() => {
            this.waitMessage = "";
            let result = response.data;
            if (typeof result == "string") {
              this.errorMessage = result;
              setTimeout(() => {
                this.errorMessage = "";
              }, 4000);
            } else {
              this.setUserInfo(result);
              this.redirectToPage("/");
            }
          }, 2000);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>