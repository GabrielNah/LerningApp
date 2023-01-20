import {createStore} from "vuex";
import AuthModule from "./Modules/AuthModule";
const store = createStore({
    modules:{
        AuthModule
    }
})
export default store
