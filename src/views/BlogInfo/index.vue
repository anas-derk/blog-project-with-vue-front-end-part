<template>
  <!-- Start Blog Details Page -->
  <div class="blog-details">
    <Header />
    <h3>معلومات التدوينة :</h3>
    <hr />
    <!-- Start Blog -->
    <div class="blog p-3 border-style border-radius-3" v-if="blogInfo">
      <!-- Start Author Img And Post Date Time Box -->
      <div
        class="author-img-and-post-date-time-box pb-3 d-flex align-items-center"
      >
        <!-- <img src="" alt="صورة الناشر" class="rounded-circle border" /> -->
        <i class="fas fa-user rounded-circle border"></i>
        <span>تاريخ النشر : {{ blogInfo.blogPostDate }}</span>
      </div>
      <!-- Start Deal Buttons With Blog Box -->
      <div
        class="deal-button-with-blog-box"
        v-if="userInfo._id === blogInfo.userId"
      >
        <button
          class="btn btn-secondary go-to-blog-edit-page-btn"
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
        <h6 class="text-capitalize">
          اسم الكاتب : {{ blogInfo.blogWriterName }}
        </h6>
      </div>
      <!-- End Blog Info -->
    </div>
    <p class="alert alert-danger mt-3 text-center" v-else>
      عذراً لا توجد تدوينة بهذا الاسم حالياً ( قد تمّ حذفها أو لم يتم نشرها
      أبداً )
    </p>
    <!-- End Blog -->
    <!-- Start Comments Section -->
    <section class="comments mt-4" v-if="blogInfo">
      <h3>التعليقات على التدوينة :</h3>
      <hr />
      <p
        class="alert alert-danger mt-3 text-center"
        v-if="noCommentsFoundError"
      >
        {{ noCommentsFoundError }}
      </p>
      <!-- Start Comment Deatails Box -->
      <div
        class="comment-details p-3 mb-5"
        v-for="commentInfo in commentList"
        :key="commentInfo._id"
        v-else
      >
        <h6 class="pb-3 fw-bold">
          <span>كتب ( {{ commentInfo.userName }} ) هذا التعليق في تاريخ</span>
          <time>&nbsp; {{ commentInfo.commentPostDate }}</time>
        </h6>
        <p class="comment-content mb-1 mt-3">
          {{ commentInfo.commentContent }}
        </p>
      </div>
      <!-- End Comment Deatails Box -->
    </section>
    <!-- End Comments Section -->
    <!-- Start Add New Comment Form Section -->
    <section class="add-new-comment mt-4" v-if="blogInfo">
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
          disabled
        />
        <label for="#email">البريد الالكتروني *</label>
        <input
          type="email"
          placeholder="من فضلك أدخل البريد الالكتروني هنا"
          class="form-control mt-2 mb-3"
          id="email"
          v-model.trim="email"
          disabled
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
        <p class="alert alert-info mt-3 text-center" v-if="successMessage">
          {{ successMessage }}
        </p>
        <p class="alert alert-danger mt-3 text-center" v-if="noBlogFoundError">
          {{ noBlogFoundError }}
        </p>
      </form>
    </section>
    <!-- End Add New Comment Form Section -->
  </div>
  <!-- End Blog Details Page -->
</template>

<style lang="scss" scoped>
.blog-details {
  .blog {
    position: relative;
    .author-img-and-post-date-time-box {
      i {
        display: inline-block;
        width: 75px;
        height: 75px;
        text-align: center;
        line-height: 75px;
        font-size: 40px;
        margin-left: 10px;
      }
    }
    .deal-button-with-blog-box {
      position: absolute;
      left: 15px;
      top: 15px;
      .go-to-blog-edit-page-btn {
        margin-left: 15px;
      }
    }
  }
  .comments {
    .comment-details {
      background-color: #eee;
      border: 2px dashed var(--two-color);
      position: relative;
      h6 {
        border-bottom: 1px solid var(--two-color);
      }
    }
  }
}
</style>

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
      successMessage: "",
      noCommentsFoundError: "",
      blogId: null,
      commentList: [],
      commentListLength: null,
      noBlogFoundError: "",
    };
  },
  mounted() {
    this.blogId = this.$route.params.id;
    this.userName = this.userInfo.userName;
    this.email = this.userInfo.email;
    // Call Get Comment By Id Info Function
    this.getBlogInfo(this.blogId).then(() => {
      if (this.blogInfo) {
        // Call Get Blog Info Function
        this.getCommentsByBlogId(this.blogId);
      }
    });
  },
  components: {
    Header,
  },
  computed: {
    ...mapGetters(["base_api_url", "userInfo"]),
  },
  methods: {
    getBlogInfo(blogId) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${this.base_api_url}/blogs?blogId=${blogId}`)
          .then((response) => {
            this.blogInfo = response.data;
            resolve();
          })
          .catch((err) => reject(err));
      });
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
    addNewComment() {
      this.waitMessage = "الرجاء الانتظار ريثما يتم نشر التعليق ....";
      axios
        .post(`${this.base_api_url}/comments`, {
          userName: this.userName,
          email: this.email,
          commentContent: this.comment,
          blogId: this.blogId,
        })
        .then((response) => {
          setTimeout(() => {
            this.waitMessage = "";
            if (response.data) {
              this.noBlogFoundError = response.data;
              setTimeout(() => {
                this.noBlogFoundError = "";
                document.location.reload();
              }, 2000);
            } else {
              this.successMessage = `تهانينا ${this.userName} لقد تمّ نشر تعليقك بنجاح ....`;
              setTimeout(() => {
                this.successMessage = "";
                document.location.reload();
              }, 2000);
            }
          }, 2000);
        })
        .catch((err) => console.log(err));
    },
    getCommentsByBlogId() {
      axios
        .get(`${this.base_api_url}/comments?blogId=${this.blogId}`)
        .then((response) => {
          this.commentList = response.data;
          this.commentListLength = this.commentList.length;
          if (this.commentList == 0) {
            this.noCommentsFoundError =
              "عذراً لا توجد تعليقات على هذه التدوينة لحد الآن ...";
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>