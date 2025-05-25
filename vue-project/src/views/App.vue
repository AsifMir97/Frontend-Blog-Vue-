<template>
  <div>
    <nav>
      <router-link to="/">Home </router-link>
      <router-link to="/login">Login </router-link>
    </nav>
    <router-view />
    
    

  </div>
</template>

<script>
import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue"
 export default{
  data(){
    return {
     
    }
  },
  methods:{
   
  },
  components :{
    Login,
    Home
  }
 }

</script>

<style scoped>


</style>