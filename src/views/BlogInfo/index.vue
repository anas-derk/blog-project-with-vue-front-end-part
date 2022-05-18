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
        <span>تاريخ النشر :</span>
      </div>
      <!-- Start Deal Buttons With Blog Box -->
      <div
        class="deal-button-with-blog-box"
        style="position: absolute; left: 15px; top: 15px"
      >
        <router-link
          class="btn btn-secondary"
          style="margin-left: 15px"
          to="/blog/1/edit"
          >تحرير</router-link
        >
        <router-link class="btn btn-danger" to="/blog/1/delete">حذف</router-link>
      </div>
      <!-- End Deal Buttons With Blog Box -->
      <!-- Start Blog Info -->
      <div class="blog-info">
        <h4 class="blog-title">عنوان التدوينة</h4>
        <p class="blog-content">محتوى التدوينة</p>
        <h6>اسم الكاتب :</h6>
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
        <p
          class="alert alert-danger mt-3 text-center text-black"
          v-if="errorMessage"
        >
          {{ errorMessage }}
        </p>
      </form>
    </section>
    <!-- End Add New Comment Form Section -->
  </div>
  <!-- End Blog Details Page -->
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "BlogDetails",
  data() {
    return {
      userName: "",
      email: "",
      comment: "",
      waitMessage: "",
      errorMessage: "",
      blogId: null,
    };
  },
  mounted() {
    this.blogId = this.$route.params.id;
  },
  components: {
    Header,
  },
  methods: {
    addNewComment() {},
  },
};
</script>