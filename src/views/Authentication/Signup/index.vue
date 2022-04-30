<template>
  <Header />
  <!-- Start Signup -->
  <section class="sign-up">
    <h3>إنشاء حساب جديد:</h3>
    <hr />
    <form
      class="signup-form border-style p-3"
      @submit.prevent="createNewAccount()"
    >
      <label for="#user-name">اسم المستخدم *</label>
      <input
        type="text"
        placeholder="من فضلك أدخل اسم المستخدم الذي تريده هنا"
        class="form-control mt-2 mb-3"
        id="user-name"
        autofocus
        v-model.trim="userName"
        required
      />
      <label for="#email">البريد الالكتروني *</label>
      <input
        type="email"
        placeholder="من فضلك أدخل البريد الالكتروني الذي تريده هنا"
        class="form-control mt-2 mb-3"
        id="email"
        v-model.trim="email"
        required
      />
      <label for="#first-name">الاسم الأول *</label>
      <input
        type="text"
        placeholder="من فضلك أدخل الاسم الأول الذي تريده هنا"
        class="form-control mt-2 mb-3"
        id="first-name"
        v-model.trim="firstName"
        required
      />
      <label for="#middle-name">الاسم الثاني *</label>
      <input
        type="text"
        placeholder="من فضلك أدخل الاسم الثاني الذي تريده هنا"
        class="form-control mt-2 mb-3"
        id="middle-name"
        v-model.trim="middleName"
        required
      />
      <label for="#password">كلمة السر *</label>
      <input
        type="password"
        placeholder="من فضلك أدخل كلمة السر التي تريدها هنا"
        class="form-control mt-2 mb-3"
        id="password"
        v-model.trim="password"
        required
      />
      <label for="#confirmed-password"> تأكيد كلمة السر *</label>
      <input
        type="password"
        placeholder="من فضلك أعد إدخال كلمة السر هنا"
        class="form-control mt-2 mb-3"
        id="confirmed-password"
        v-model.trim="confirmedPassword"
        required
      />
      <h6 class="mt-4 mb-3 text-danger fw-bold">
        ملاحظة : الإشارة * تعني أنّ الحقول مطلوبة .
      </h6>
      <button type="submit" class="btn btn-secondary">سجّل الآن</button>
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
        إذا كان لديك حساب من قبل فيمكنك تسجيل الدخول من هنا
        <router-link to="/login"> تسجيل الدخول </router-link>
      </p>
    </form>
  </section>
  <!-- End Signup -->
</template>

<script>
import Header from "@/components/Header/index.vue";
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

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
      waitMessage: "",
      errorMessage: "",
    };
  },
  components: {
    Header,
  },
  computed: {
    ...mapGetters(["base_api_url"]),
  },
  methods: {
    ...mapActions(["redirectToPage"]),
    createNewAccount() {
      if (this.password !== this.confirmedPassword) {
        this.errorMessage =
          "عذراً لا يوجد تطابق بين كلمة المرور وتأكيدها ، الرجاء مراعاة التطابق ..";
        setTimeout(() => {
          this.errorMessage = "";
        }, 2000);
      } else {
        this.waitMessage =
          "الرجاء الانتظار قليلاً ريثما يتم التحقق وإنشاء الحساب ...";
        axios
          .post(`${this.base_api_url}/users/sign-up`, {
            userName: this.userName,
            email: this.email,
            firstName: this.firstName,
            middleName: this.middleName,
            password: this.password,
          })
          .then((response) => {
            setTimeout(() => {
              this.waitMessage = "";
              this.errorMessage = response.data;
              if (this.errorMessage) {
                setTimeout(() => {
                  this.errorMessage = "";
                }, 2000);
              } else
                this.$router.push({
                  name: "الصفحة الرئيسية",
                  params: {
                    successMessage: `تهانينا ${this.userName} لقد تمت عملية التسجيل بنجاح ..`,
                  },
                });
            }, 2000);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>