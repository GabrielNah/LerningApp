import { createRouter, createWebHistory } from 'vue-router'
import FirstPage from "../AdminTemplate/FirstPage.vue";
// setup routes
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: FirstPage
        },
    ]
})
export default router
