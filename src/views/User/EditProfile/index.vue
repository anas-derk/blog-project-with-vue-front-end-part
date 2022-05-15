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
        v-model.trim="newUserName"
        required
      />
      <label for="#email">البريد الالكتروني الجديد *</label>
      <input
        type="email"
        placeholder="من فضلك أدخل البريد الالكتروني الجديد الذي تريده هنا"
        class="form-control mt-2 mb-3"
        id="email"
        v-model.trim="newEmail"
        required
      />
      <label for="#first-name">الاسم الأول الجديد *</label>
      <input
        type="text"
        placeholder="من فضلك أدخل الاسم الأول الجديد الذي تريده هنا"
        class="form-control mt-2 mb-3"
        id="first-name"
        v-model.trim="newFirstName"
        required
      />
      <label for="#middle-name">الاسم الثاني الجديد *</label>
      <input
        type="text"
        placeholder="من فضلك أدخل الاسم الثاني الجديد الذي تريده هنا"
        class="form-control mt-2 mb-3"
        id="middle-name"
        v-model.trim="newMiddleName"
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
        class="alert alert-danger mt-3 text-center text-black"
        v-if="errorMessage"
      >
        {{ errorMessage }}
      </p>
    </form>
  </div>
  <!-- End Edit Profile -->
</template>

<script>
import Header from "@/components/Header/index.vue";
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Signup",
  data() {
    return {
      userId: null,
      newUserName: "",
      newEmail: "",
      newFirstName: "",
      newMiddleName: "",
      waitMessage: "",
      errorMessage: "",
    };
  },
  mounted() {
    if (!this.userInfo) {
      this.redirectToPage("/login");
    } else {
      this.userId = this.userInfo._id;
    }
  },
  components: {
    Header,
  },
  computed: {
    ...mapGetters(["base_api_url", "userInfo"]),
  },
  methods: {
    ...mapActions(["redirectToPage"]),
    editProfile() {
      this.waitMessage = "الرجاء الانتظار قليلاً ريثما يتم التعديل ...";
      axios
        .put(`${this.base_api_url}/users/${this.userId}`, {
          userName: this.newUserName,
          email: this.newEmail,
          firstName: this.newFirstName,
          middleName: this.newMiddleName,
        })
        .then(() => {
          setTimeout(() => {
            // this.waitMessage = "";
            // if (this.errorMessage) {
            //   setTimeout(() => {
            //     this.errorMessage = "";
            //   }, 2000);
            // } else
            //   this.$router.push({
            //     name: "الصفحة الرئيسية",
            //     params: {
            //       successMessage: `تهانينا ${this.userName} لقد تمت عملية التسجيل بنجاح ..`,
            //     },
            //   });
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>