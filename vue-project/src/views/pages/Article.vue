<template>
  <div>
    <h1 class="text-center mb-5">{{ article.title }}</h1>
    <p>By {{ article.author }}</p>
    <p>{{ article.article_text }}</p>
    <form class="form-group d-flex" @submit.prevent="addComment">
      <label >
        Comment:
        <textarea class="form-control" v-model="newComment"></textarea>
      </label>
      <button class="btn btn-primary mt-4 " type="submit">Add Comment</button>
    </form>
    <h2 class="text-center mt-5 ">Comments ({{ num_comments }})</h2>
    <div class="comments" v-for="comment in comments">
      <p>{{ comment.comment_text }}</p>
    </div>
  </div>
</template>




<script>
import { articleService } from ".././services/article.service";
import { commentsService } from ".././services/commentsService.js";
import 'bootstrap/dist/css/bootstrap.min.css'
export default {
  data() {
    return {
      article: {},
      comments: [],
      num_comments: "",
      error: "",
      newComment: ""
    };
  },
  created() {
    this.article.loading = true;
    this.comments.loading = true;

    articleService.getOne(this.$route.params.id)
      .then((article) => {
        this.article = article;
        commentsService.getAll(this.$route.params.id)
          .then((comments) => {
            this.comments = comments;
            this.num_comments = comments.length;
          })
          .catch((error) => (this.error = error));
      })
      .catch((error) => (this.error = error));
  },
  methods: {
    addComment() {
      if (!this.newComment) {
        this.error = "Comment field is required";
        return;
      }
      commentsService
        commentsService.add(this.newComment, this.$route.params.id)
        .then(() => {
          this.newComment = "";
          commentsService
            .getAll(this.$route.params.id)
            .then((comments) => {
              this.comments = comments;
              this.num_comments = comments.length;
            })
            .catch((error) => (this.error = error));
        })
        .catch((error) => (this.error = error));
    }
  }
};
</script>
