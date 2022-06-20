<template>
  <!-- Start Delete Profile Page -->
  <div class="delete-profile">
    <Header />
    <h3>حذف الحساب :</h3>
    <hr />
    <section class="delete-profile border-style p-3">
      <h4 class="mb-4">هل أنت متأكد من حذف الحساب ؟</h4>
      <!-- Start Delete Profile Form -->
      <form
        class="delete-profile-form d-flex justify-content-between"
        @submit.prevent="deleteProfile()"
      >
        <button type="submit" class="btn btn-danger">حذف الحساب</button>
        <button
          type="button"
          class="btn btn-secondary"
          @click="backToProfileInfoPage()"
        >
          تراجع
        </button>
      </form>
      <!-- End Delete Profile Form -->
      <p class="alert alert-info mt-4 text-center" v-if="waitMessage">
        {{ waitMessage }}
      </p>
      <p
        class="alert alert-success mt-4 text-center text-black"
        v-if="successMessage"
      >
        {{ successMessage }}
      </p>
    </section>
  </div>
  <!-- End Delete Profile Page -->
</template>

<script>
import Header from "@/components/Header";
import { mapActions, mapGetters, mapMutations } from "vuex";
import axios from "axios";

export default {
  name: "DeleteProfile",
  data() {
    return {
      userId: null,
      userName: "",
      waitMessage: "",
      successMessage: "",
    };
  },
  mounted() {
    this.userId = this.$route.params.userId;
    this.userName = this.userInfo.userName;
  },
  components: {
    Header,
  },
  computed: {
    ...mapGetters(["base_api_url", "userInfo"]),
  },
  methods: {
    ...mapMutations(["clearUserInfo"]),
    ...mapActions(["redirectToPage"]),
    backToProfileInfoPage() {
      this.$router.push({
        name: "الملف الشخصي",
        params: {
          userId: this.userId,
        },
      });
    },
    deleteProfile() {
      this.waitMessage = "الرجاء الانتظار قليلاً ريثما يتم حذف الحساب ...";
      axios
        .delete(`${this.base_api_url}/users/${this.userId}`, {
          data: {
            email: this.userInfo.email,
          },
        })
        .then(() => {
          this.waitMessage = "";
          setTimeout(() => {
            this.waitMessage = "";
            this.successMessage = `تهانينا ${this.userName} لقد تمت عملية حذف حسابك الشخصي لدى المدونة بنجاح ..`;
            setTimeout(() => {
              this.successMessage = "";
              this.clearUserInfo();
              this.redirectToPage("/");
            }, 2000);
          }, 2000);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>