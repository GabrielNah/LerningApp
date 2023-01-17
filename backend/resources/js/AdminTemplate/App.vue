<template>
<h1>my app</h1>
    <pre>{{count}}</pre>
    <button @click="increment">Add</button>
    <router-view/>
</template>

<script>
import {useStore} from "vuex"
import {computed, ref} from "vue";

export default {
    name: "App",
    setup(){
        const store=useStore()
        const getCount=store.getters.getCount
        const increment = () => {
          store.commit('increment')
        }
        const count = computed(() => {
            return store.getters.getCount
        })

        return {count,increment}
    }
}
</script>

<style scoped>

</style>
