<template>
  <div class="container d-flex justify-content-end">
    <button @click="logout" class="btn btn-danger">Logout</button>
  </div>
    <div class="container">

      <h1 class="text-center my-5">Welcome to the Dashboard</h1>
      <p class="text-center">You are now logged in!</p>
      <div class="text-center my-5">
        <button @click="toggleCreateForm" class="btn btn-secondary mx-5">Create Article</button>
        <button @click="toggleUpdateForm" class="btn btn-secondary mx-5">Update Article</button>
        <button @click="toggleDeleteForm" class="btn btn-secondary mx-5">Delete Article</button>
        <button @click="toggleEditCommentForm" class="btn btn-secondary mx-5">edit comment </button>
        <button @click="togglecreateUser" class="btn btn-secondary mx-5">create new user</button>

      </div>
      <transition name="slide-fade">
      <div v-if="showCreateuserForm" @submit.prevent="createUser" class="mx-auto w-50 ">
      <CreateUser/>
      </div>

    </transition>
    <transition name="slide-fade">
  <div v-if="showEditCommentForm" @submit.prevent="EditComment" class="mx-auto w-50 ">
  <Comment/>
  </div>

</transition>
      <transition name="slide-fade">
        <form v-if="showCreateForm" @submit.prevent="createArticle" class="mx-auto w-50">
            <div class="form-group">
                <label for="title">Title</label>
                <input v-model="newArticle.title" type="text" class="form-control" id="title" placeholder="Enter title">
            </div>
            <div class="form-group">
                <label for="content">Content</label>
                <textarea v-model="newArticle.article_text" class="form-control" id="content" rows="3"></textarea>
            </div>
            <div class="form-group">
                <label for="author">Author</label>
                <input v-model="newArticle.author" type="text" class="form-control" id="author" placeholder="Enter author">
            </div>
            <button type="submit" class="btn btn-primary">Create</button>
            <div>{{message}}</div>
        </form>
      </transition>
      <transition name="slide-fade">
        <form v-if="showUpdateForm" @submit.prevent="updateArticle" class="mx-auto w-50">
            <div class="form-group">
                <label for="Id">ArticleID</label>
                <input v-model="existingArticle.id" type="text" class="form-control" id="id" placeholder="Enter Article ID">
            </div>
            <div class="form-group">
                <label for="title">Title</label>
                <input v-model="existingArticle.title" type="text" class="form-control" id="title" placeholder="Enter title">
            </div>
            <div class="form-group">
                <label for="content">Content</label>
                <textarea v-model="existingArticle.article_text" class="form-control" id="content" rows="3"></textarea>
            </div>
            <div class="form-group">
                <label for="author">Author</label>
                <input v-model="existingArticle.author" type="text" class="form-control" id="author" placeholder="Enter author">
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
            <div>{{updatearticle}}</div>
        </form>
      </transition>
      <transition name="slide-fade">
        <form v-if="showDeleteForm" @submit.prevent="deleteArticle" class="form-inline">
            <div class="form-group">
            <label for="Id" class="mr-2">Article ID</label>
            <input v-model="deleteoneArticle.id" type="text" class="form-control mr-2" id="id" placeholder="Enter Article ID">
            </div>
            <button type="submit" class="btn btn-danger">Delete</button>
            <div class="text-danger">{{deletearticle}}</div>
            </form>
            </transition>
            </div>
            </template>
            
            <script>
            import createUser from "./createUser.vue";
            import { articleService } from "../services/article.service";
            import 'bootstrap/dist/css/bootstrap.min.css'
import CreateUser from "./createUser.vue";
import Comment  from "./Comment.vue";
            export default {
    data() {
        return {
          showEditCommentForm:false,
            showCreateForm: false,
            showUpdateForm: false,
            showDeleteForm: false,
            showCreateuserForm:false,
            newArticle: {
                title: "",
                article_text: "",
                author: ""
            },
            existingArticle: {
                id: "",
                title: "",
                article_text: "",
                author: ""
            },
            deleteoneArticle: {
                id: ""
            },
            message: "",
            updatearticle: "",
            deletearticle: ""
        };
    },
    methods: {
      logout(){
        localStorage.removeItem("session_token")
        this.$router.push("/Login");

      },
        toggleCreateForm() {
            this.showCreateForm = !this.showCreateForm;
            this.showUpdateForm = false;
            this.showDeleteForm = false;
        },
        toggleUpdateForm() {
            this.showUpdateForm = !this.showUpdateForm;
            this.showCreateForm = false;
            this.showDeleteForm = false;
        },
        toggleDeleteForm() {
            this.showDeleteForm = !this.showDeleteForm;
            this.showCreateForm = false;
            this.showUpdateForm = false;
        },
        togglecreateUser() {
          this.showCreateuserForm = !this.showCreateuserForm;
            this.showCreateForm = false;
            this.showUpdateForm = false;
            this.showDeleteForm=false;
        },
        toggleEditCommentForm(){
          this.showEditCommentForm=!this.showEditCommentForm;
          this.showCreateuserForm = false;
            this.showCreateForm = false;
            this.showUpdateForm = false;
            this.showDeleteForm=false;

        },
        createArticle() {
            const token = localStorage.getItem("session_token");
            if (token) {
                articleService
                    .createArticle(this.newArticle, token)
                    .then((article) => {
                    this.articles.push(article);
                    this.newArticle = {
                        title: "",
                        article_text: "",
                        author: ""
                    };
                    this.message = " Article has been created article id : " + article.article_id;
                })
                    .catch((error) => console.log(error));
            }
            else {
                console.log("User not logged in.");
            }
        },
        updateArticle() {
            const token = localStorage.getItem("session_token");
            if (token) {
                articleService
                    .editarticle(this.existingArticle.id, this.existingArticle.title, this.existingArticle.author, this.existingArticle.article_text, token)
                    .then((article) => {
                    this.articles.patch(article);
                    this.existingArticle = {
                        id: "",
                        title: "",
                        article_text: "",
                        author: ""
                    };
                    this.updatearticle = " Article has been updated article id : " + article.article_id;
                })
                    .catch(error => this.error = error);
            }
            else {
                console.log("User not logged in.");
            }
        },
        deleteArticle() {
            const token = localStorage.getItem("session_token");
            if (token) {
                articleService
                    .deleteArticle(this.deleteoneArticle.id, token)
                    .then((response) => {
                    this.articles = this.articles.filter(article => article.id !== this.deleteoneArticle.id);
                    this.deleteoneArticle = {
                        id: ""
                    };
                    this.deletearticle = " Article has been deleted article id : " + this.deleteoneArticle.id;
                })
                    .catch((error) => console.log(error));
            }
            else {
                console.log("User not logged in.");
            }
        }
    },
    created() {
        const token = localStorage.getItem("session_token");
        if (token) {
            articleService.getAll(token)
                .then((articles) => {
                this.articles = articles;
            })
                .catch((error) => console.log(error));
        }
        else {
            console.log("User not logged in.");
        }
    },
    components: { CreateUser, Comment }
}
    


</script>
<style scoped>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
  
  
  
  
  
  