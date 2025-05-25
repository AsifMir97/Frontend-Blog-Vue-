<template>
    <div class="container">
      <div>
        <h1>Login</h1>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="email">Email</label>
            <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter email">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input v-model="password" type="password" class="form-control" id="password" placeholder="Enter password">
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
      </div>
    </div>
  </template>
  <script>
  import emailValidator from "email-validator";
  import {usersService} from "../services/usersService"
  
  export default {
    data() {
      return {
        email: "",
        password: "",
        error: "",
        submitted: false
      };
    },
    methods:{
        handleSubmit(e){
            this.submitted= true
            this.error=""
            const {email,password}= this
            if(!(email && password)){
                return;
            }
            if (!(emailValidator.validate(email))){
                this.error="Email must be a valid email."
                return;
            }
            
            const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+!=])[A-Za-z\d@#$%^&+!=]{8,}$/
            if(!(password_pattern.test(password))){
                this.error ="Password not strong enough , Password must be between 8 and 16 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$&*)  "
                return;
            }
            usersService.login( email, password )
            .then(result => {
                console.log("auth - go to dash"),
                this.$router.push("/dashboard")
                
            })
            .catch(error => {
                this.error = error;
                this.loading =false;
            });
        }
    }
}
</script>