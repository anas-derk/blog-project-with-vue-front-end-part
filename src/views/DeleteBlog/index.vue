<template>
  <!-- Start Delete Blog Page -->
  <div class="delete-blog">
    <Header />
    <h3>حذف التدوينة :</h3>
    <hr />
    <section class="delete-blog border-style p-3" v-if="blogInfo">
      <h4 class="mb-4">هل أنت متأكد من حذف التدوينة ؟</h4>
      <!-- Start Delete Blog Form -->
      <form
        class="delete-blog-form d-flex justify-content-between"
        @submit.prevent="deleteBlog()"
      >
        <button type="submit" class="btn btn-danger">حذف التدوينة</button>
        <button
          type="submit"
          class="btn btn-secondary"
          @click="backToBlogInfoPage()"
        >
          تراجع
        </button>
      </form>
      <!-- End Delete Blog Form -->
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
    <p class="alert alert-danger mt-3 text-center" v-else>
      {{ noBlogFoundError }}
    </p>
  </div>
  <!-- End Delete Blog Page -->
</template>

<script>
import Header from "@/components/Header";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "DeleteBlog",
  data() {
    return {
      userId: null,
      blogId: null,
      blogInfo: null,
      userName: "",
      waitMessage: "",
      successMessage: "",
      noBlogFoundError: "",
    };
  },
  mounted() {
    if (!this.userInfo) this.redirectToPage("/login");
    else {
      this.userId = this.$route.params.userId;
      this.blogId = this.$route.params.id;
      this.userName = this.userInfo.userName;
      this.getBlogInfo(this.blogId).then((data) => {
        if (typeof data === "string") {
          this.noBlogFoundError = data;
        } else {
          this.blogInfo = data;
          if (
            this.blogInfo.userId !== this.userId ||
            this.userId !== this.userInfo._id
          )
            this.redirectToPage("/");
        }
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
    ...mapActions(["redirectToPage"]),
    getBlogInfo(blogId) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${this.base_api_url}/blogs?blogId=${blogId}`)
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => reject(err));
      });
    },
    backToBlogInfoPage() {
      this.$router.push({
        name: "تفاصيل التدوينة",
        params: {
          id: this.blogId,
        },
      });
    },
    deleteBlog() {
      this.waitMessage = "الرجاء الانتظار قليلاً ريثما يتم تنفيذ المهمة ...";
      axios
        .delete(`${this.base_api_url}/blogs/${this.blogId}`)
        .then(() => {
          setTimeout(() => {
            this.waitMessage = "";
            this.successMessage = `تهانينا ${this.userName} لقد تمت عملية حذف مدونتك الشخصية بنجاح ..`;
            setTimeout(() => {
              this.successMessage = "";
              this.$router.push("/");
            }, 2000);
          }, 2000);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>