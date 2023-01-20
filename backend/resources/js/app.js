import './bootstrap';
import {createApp} from "vue";
import App from "./AdminTemplate/App.vue";
import store from "./Store";
import router from "./Router";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
createApp(App)
    .use(store)
    .use(router)
    .mount("#app")
