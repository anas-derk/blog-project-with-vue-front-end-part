<template>
  <!-- Start Delete Profile Page -->
  <div class="delete-profile">
    <Header />
    <h3>حذف الحساب :</h3>
    <hr />
    <section class="delete-profile border-style p-3">
      <h4 class="mb-4">هل أنت متأكد من حذف الحساب ؟</h4>
      <!-- Start Delete Profile Buttons Box -->
      <div class="delete-profile-buttons-box d-flex justify-content-between">
        <button
          type="button"
          class="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#deleteAccountModal"
        >
          حذف الحساب
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          @click="backToProfileInfoPage()"
        >
          تراجع
        </button>
      </div>
      <!-- End Delete Profile Buttons Box -->
    </section>
    <!-- Start Include Modal From Bootstap Version 5 -->
    <div
      class="modal fade"
      id="deleteAccountModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">نافذة حذف الحساب</h5>
          </div>
          <div class="modal-body">
            <h6 class="mb-3">الرجاء إدخال كلمة السر لحسابك :</h6>
            <input type="password" v-model="password" class="form-control" />
          </div>
          <div class="modal-footer">
            <form
              class="delete-profile-form d-flex justify-content-between w-100"
              @submit.prevent="deleteProfile()"
            >
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                إلغاء الأمر
              </button>
              <button type="submit" class="btn btn-danger">حذف الآن</button>
            </form>
            <p
              class="alert alert-info mt-4 text-center w-100"
              v-if="waitMessage"
            >
              {{ waitMessage }}
            </p>
            <p
              class="alert alert-success mt-4 text-center text-black w-100"
              v-if="successMessage"
            >
              {{ successMessage }}
            </p>
            <p
              class="alert alert-danger mt-4 text-center w-100"
              v-if="wrongPasswordError"
            >
              {{ wrongPasswordError }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- End Include Modal From Bootstap Version 5 -->
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
      password: "",
      waitMessage: "",
      successMessage: "",
      wrongPasswordError: "",
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
        .delete(`${this.base_api_url}/api/users/${this.userId}`, {
          data: {
            email: this.userInfo.email,
            password: this.password,
          },
        })
        .then((response) => {
          setTimeout(() => {
            this.waitMessage = "";
            this.wrongPasswordError = response.data;
            if (this.wrongPasswordError) {
              setTimeout(() => {
                this.wrongPasswordError = "";
                this.password = "";
              }, 2000);
            } else {
              this.successMessage = `تهانينا ${this.userName} لقد تمت عملية حذف حسابك الشخصي لدى المدونة بنجاح ..`;
              setTimeout(() => {
                this.successMessage = "";
                this.clearUserInfo();
                this.redirectToPage("/");
              }, 2000);
            }
          }, 2000);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>