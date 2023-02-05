import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from "../AdminTemplate/Auth/LoginComponent.vue";
import {DASHBOARD_ROUTE, LOGIN_ROUTE, SINGLE_PROFILE} from "./routeNames";
import DashboardLayout from "../AdminTemplate/Layout/DashboardLayout.vue";
import Dashboard from "../AdminTemplate/Dashboard/Dashboard.vue";
import AuthGuard from "./AuthGuard";
import SingleProfile from "../AdminTemplate/Dashboard/SingleProfile.vue";
// setup routes
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            children:[
                {
                    path: LOGIN_ROUTE.path,
                    name: LOGIN_ROUTE.path,
                    component: LoginComponent,
                    meta:{auth:false},
                    alias:['/','/admin']
                },
            ]
        },
        {
            path:'/admin',
            component:DashboardLayout,
            children:[
                {
                    path: DASHBOARD_ROUTE.path,
                    name: DASHBOARD_ROUTE.name,
                    component: Dashboard,
                    meta: {auth: true}
                },
                {
                    path: SINGLE_PROFILE.path,
                    name: SINGLE_PROFILE.name,
                    component: SingleProfile,
                    meta: {auth: true}
                }
            ]
        }

    ]
})
AuthGuard(router)
export default router
