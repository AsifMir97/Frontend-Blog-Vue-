import {createRouter, createWebHistory} from 'vue-router';


import Home from "../views/pages/Home.vue"
import Login from "../views/pages/Login.vue"
import Article from "../views/pages/Article.vue"
import Dashboard from "../views/components/dashboard.vue"
import createUser from "../views/components/createUser.vue"

const ifAuthenticated =(to,from,next)=>{
    const loggedIn = localStorage.getItem('session_token');
    if(loggedIn){
        next()
        return
    }
    next('/login')
}
const routes =[
    {path: "/", component: Home},
    {path: "/login", component: Login},
    {path:"/article/:id", component: Article},
    {path:"/dashboard",component:Dashboard, beforeEnter: ifAuthenticated},
    { path: '/createUser', name: 'createUser', component: createUser },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router