<template>
  <!-- Start Blog Details Page -->
  <div class="blog-details">
    <Header />
    <h3>معلومات التدوينة :</h3>
    <hr />
    <!-- Start Blog -->
    <div
      class="blog p-3 border-style border-radius-3"
      style="position: relative"
    >
      <!-- Start Author Img And Post Date Time Box -->
      <div
        class="author-img-and-post-date-time-box pb-3 d-flex align-items-center"
      >
        <!-- <img src="" alt="صورة الناشر" class="rounded-circle border" /> -->
        <i
          class="fas fa-user rounded-circle border"
          style="
            display: inline-block;
            width: 75px;
            height: 75px;
            text-align: center;
            line-height: 75px;
            font-size: 40px;
            margin-left: 10px;
          "
        ></i>
        <span>تاريخ النشر : {{ blogInfo.blogPostDate }}</span>
      </div>
      <!-- Start Deal Buttons With Blog Box -->
      <div
        class="deal-button-with-blog-box"
        style="position: absolute; left: 15px; top: 15px"
      >
        <button
          class="btn btn-secondary"
          style="margin-left: 15px"
          @click="goToBlogEditPage()"
        >
          تحرير
        </button>
        <button
          class="btn btn-danger"
          @click="goToBlogDeletePage()"
          :to="{
            name: 'حذف التدوينة',
            params: { id: blogInfo._id },
          }"
        >
          حذف
        </button>
      </div>
      <!-- End Deal Buttons With Blog Box -->
      <!-- Start Blog Info -->
      <div class="blog-info">
        <h4 class="blog-title">{{ blogInfo.blogTitle }}</h4>
        <p class="blog-content">{{ blogInfo.blogContent }}</p>
        <h6 class="text-capitalize">اسم الكاتب : {{ blogInfo.blogWriterName }}</h6>
      </div>
      <!-- End Blog Info -->
    </div>
    <!-- End Blog -->
    <!-- Start Comments Section -->
    <section class="comments mt-4">
      <h3>التعليقات على التدوينة :</h3>
      <hr />
      <div
        class="comment-details p-3"
        style="background-color: #eee; border: 2px dashed var(--two-color)"
      >
        <h6
          class="pb-3 fw-bold"
          style="border-bottom: 1px solid var(--two-color)"
        >
          <span>(محمد)</span>
          <time> 2019-4-02 </time>
        </h6>
        <p class="comment-content mb-1 mt-3">محتوى التعليق</p>
      </div>
    </section>
    <!-- End Comments Section -->
    <!-- Start Add New Comment Form Section -->
    <section class="add-new-comment mt-4">
      <h3>إضافة تعليق جديد :</h3>
      <hr />
      <form
        class="add-new-comment-form border-style p-3"
        @submit.prevent="addNewComment()"
      >
        <label for="#user-name">الاسم *</label>
        <input
          type="text"
          placeholder="من فضلك أدخل اسمك هنا"
          class="form-control mt-2 mb-3"
          id="user-name"
          autofocus
          v-model.trim="userName"
          required
        />
        <label for="#email">البريد الالكتروني *</label>
        <input
          type="email"
          placeholder="من فضلك أدخل البريد الالكتروني هنا"
          class="form-control mt-2 mb-3"
          id="email"
          v-model.trim="email"
          required
        />
        <label for="#comment">التعليق *</label>
        <textarea
          placeholder="من فضلك اكتب التعليق هنا"
          class="form-control mt-2 mb-3"
          id="comment"
          v-model.trim="comment"
          required
          style="resize: none; height: 200px"
        ></textarea>
        <h6 class="mt-4 mb-3 text-danger fw-bold">
          ملاحظة : الإشارة * تعني أنّ الحقول مطلوبة .
        </h6>
        <button type="submit" class="btn btn-secondary">نشر التعليق</button>
        <p class="alert alert-info mt-3 text-center" v-if="waitMessage">
          {{ waitMessage }}
        </p>
      </form>
    </section>
    <!-- End Add New Comment Form Section -->
  </div>
  <!-- End Blog Details Page -->
</template>

<script>
import Header from "@/components/Header";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "BlogDetails",
  data() {
    return {
      userName: "",
      email: "",
      comment: "",
      blogInfo: {},
      waitMessage: "",
      blogId: null,
    };
  },
  mounted() {
    this.blogId = this.$route.params.id;
    // Call Get Blog Info Function
    this.getBlogInfo(this.blogId);
  },
  components: {
    Header,
  },
  computed: {
    ...mapGetters(["base_api_url"]),
  },
  methods: {
    getBlogInfo(blogId) {
      axios
        .get(`${this.base_api_url}/blogs?blogId=${blogId}`)
        .then((response) => {
          this.blogInfo = response.data;
        })
        .catch((err) => console.log(err));
    },
    goToBlogEditPage() {
      this.$router.push({
        name: "تحرير التدوينة",
        params: { id: this.blogInfo._id },
      });
    },
    goToBlogDeletePage() {
      this.$router.push({
        name: "حذف التدوينة",
        params: { id: this.blogInfo._id },
      });
    },
    addNewComment() {},
  },
};
</script>