<template>
  <div class="container">
    <div> <Login /> 
    </div>
    <h1 class="text-center my-3">Welcome to My Blog</h1>
   
    <div v-if="loading" class="text-center">
        <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <div v-else>
        <ul v-if="articles.length" class="list-group">
            <li v-for="article in articles" :key="article.article_id" class="list-group-item">
                <router-link :to="`/article/${article.article_id}`">
                    {{ article.title }}
                </router-link>
            </li>
        </ul>
        <div v-if="error" class="alert alert-danger">
            {{error}}
        </div>
        
    </div>
  </div>
</template>

<script>
import Login from "./Login.vue";
import { articleService } from "../services/article.service";
import 'bootstrap/dist/css/bootstrap.min.css'


export default {
    data() {
        return {
            articles: [],
            error: "",
            loading: true,
        };
    },
   
    mounted() {
        articleService
            .getAll()
            .then((articles) => {
                this.articles = articles;
                this.loading = false;
            })
            .catch((error) => (this.error = error));
    },
    components: {
        Login
    }
};
</script>
