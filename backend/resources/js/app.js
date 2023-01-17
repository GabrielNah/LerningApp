import './bootstrap';
import {createApp} from "vue";
import App from "./AdminTemplate/App.vue";
import store from "./Store";
import router from "./Router";
createApp(App)
    .use(store)
    .use(router)
    .mount("#app")
