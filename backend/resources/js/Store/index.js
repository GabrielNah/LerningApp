import {createStore} from "vuex";
const store = createStore({
    state () {
        return {
            count: 111
        }
    },
    getters:{
      getCount:(state)=>state.count
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
})
export default store
