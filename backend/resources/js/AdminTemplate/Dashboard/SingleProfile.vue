<template>
    <h1>{{user_id}}</h1>
</template>

<script>
export default {
    name: "SingleProfile"
}
</script>
<script setup>
import {useRoute} from "vue-router/dist/vue-router";
import {computed, onMounted, ref, watchEffect} from "vue";
import httpWithBearer from "../../Axios/httpWithBearer";
const route=useRoute()
const user_id=computed(()=>route.params?.id)
const customer=ref({})
const fetchUser=async ()=>{
    let {data}=await httpWithBearer().get('/admin/users/'+user_id.value)
    console.log(data)
}
onMounted(()=>{
    if (user_id.value){
        fetchUser()
    }
})
</script>

<style scoped>

</style>
