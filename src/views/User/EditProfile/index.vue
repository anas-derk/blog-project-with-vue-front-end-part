<template>
  <!-- Start Edit Profile Page -->
  <div class="edit-profile">
    <Header />
    <h3>تعديل الملف الشخصي :</h3>
    <hr />
    <form
      class="edit-profile-form border-style p-3"
      @submit.prevent="editProfile()"
    >
      <label for="#user-name">اسم المستخدم الجديد *</label>
      <input
        type="text"
        placeholder="من فضلك أدخل اسم المستخدم الجديد الذي تريده هنا"
        class="form-control mt-2 mb-3"
        id="user-name"
        autofocus
        v-model.trim="userName"
        required
      />
      <label for="#email">البريد الالكتروني الجديد *</label>
      <input
        type="email"
        placeholder="من فضلك أدخل البريد الالكتروني الجديد الذي تريده هنا"
        class="form-control mt-2 mb-3"
        id="email"
        v-model.trim="email"
        required
      />
      <label for="#first-name">الاسم الأول الجديد *</label>
      <input
        type="text"
        placeholder="من فضلك أدخل الاسم الأول الجديد الذي تريده هنا"
        class="form-control mt-2 mb-3"
        id="first-name"
        v-model.trim="firstName"
        required
      />
      <label for="#middle-name">الاسم الثاني الجديد *</label>
      <input
        type="text"
        placeholder="من فضلك أدخل الاسم الثاني الجديد الذي تريده هنا"
        class="form-control mt-2 mb-3"
        id="middle-name"
        v-model.trim="middleName"
        required
      />
      <label for="#password">كلمة السر الجديدة *</label>
      <input
        type="text"
        placeholder="من فضلك أدخل كلمة السر الجديدة التي تريدها هنا"
        class="form-control mt-2 mb-3"
        id="password"
        v-model.trim="password"
        required
      />
      <h6 class="mt-4 mb-3 text-danger fw-bold">
        ملاحظة : الإشارة * تعني أنّ الحقول مطلوبة .
      </h6>
      <button type="submit" class="btn btn-secondary">تعديل الآن</button>
      <p class="alert alert-info mt-3 text-center" v-if="waitMessage">
        {{ waitMessage }}
      </p>
      <p
        class="alert alert-success mt-3 text-center text-black"
        v-if="successMessage"
      >
        {{ successMessage }}
      </p>
    </form>
  </div>
  <!-- End Edit Profile -->
</template>

<script>
import Header from "@/components/Header/index.vue";
import axios from "axios";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "Signup",
  data() {
    return {
      userId: null,
      userName: "",
      email: "",
      firstName: "",
      middleName: "",
      password: "",
      waitMessage: "",
      successMessage: "",
    };
  },
  mounted() {
    if (!this.userInfo) {
      this.redirectToPage("/login");
    } else {
      this.userId = this.userInfo._id;
      // Get User Information
      axios
        .get(`${this.base_api_url}/users/user-info?userId=${this.userId}`)
        .then((response) => {
          let userInfo = response.data;
          this.userName = userInfo.userName;
          this.email = userInfo.email;
          this.firstName = userInfo.firstName;
          this.middleName = userInfo.middleName;
          this.password = userInfo.password;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  components: {
    Header,
  },
  computed: {
    ...mapGetters(["base_api_url", "userInfo"]),
  },
  methods: {
    ...mapMutations(["setUserInfo"]),
    ...mapActions(["redirectToPage"]),
    editProfile() {
      this.waitMessage = "الرجاء الانتظار قليلاً ريثما يتم التعديل ...";
      axios
        .put(`${this.base_api_url}/users/${this.userId}`, {
          userName: this.userName,
          email: this.email,
          firstName: this.firstName,
          middleName: this.middleName,
          password: this.password,
        })
        .then((response) => {
          setTimeout(() => {
            this.setUserInfo(response.data);
            this.waitMessage = "";
            this.successMessage = `تهانينا ${this.userName} لقد تمت عملية تعديل بياناتك الشخصية بنجاح ..`;
            setTimeout(() => {
              this.successMessage = "";
              this.$router.push({
                name: "الملف الشخصي",
                params: {
                  userId: this.userId,
                },
              });
            }, 2000);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>