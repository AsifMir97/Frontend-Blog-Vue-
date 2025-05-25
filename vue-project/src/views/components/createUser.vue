<template>
    <div>
        <form @submit.prevent="createNewUser">
            
            <div class="form-group">
                <label for="first_name">First Name</label>
                <input v-model="newUser.first_name" type="text" class="form-control" id="first_name" placeholder="Enter first name">
            </div>
            <div class="form-group">
                <label for="last_name">Last Name</label>
                <input v-model="newUser.last_name" type="text" class="form-control" id="last_name" placeholder="Enter last name">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="newUser.email" type="email" class="form-control" id="email" placeholder="Enter email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input v-model="newUser.password" type="password" class="form-control" id="password" placeholder="Enter password">
            </div>
            <button type="submit" class="btn btn-primary">Create User</button>
           
        </form>
        <div>{{ message }}</div>
    </div>
</template>

<script>
import {usersService} from "../services/usersService" 
export default {
    data() {
        return {
            newUser: {
                "user_id":"",
                "first_name": "",
                "last_name": "",
                "email": "",
                "password": ""
            },
            message:""
        }
    },
    methods:{
    createNewUser() {
    const token = localStorage.getItem('session_token')
    usersService.createNewUser(this.newUser.first_name, this.newUser.last_name, this.newUser.email, this.newUser.password,token)
        .then((response) => {
            this.message = this.newUser.first_name +" user has been created user id : " + response.user_id;
        })
        .catch(error => {
                this.error = error;
        });
    }
}
}


</script>