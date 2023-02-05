<template>
    <div class="container">
        <table class="table table-striped table-dark">
            <thead>
            <tr>
                <th class="text-center" scope="col">#</th>
                <th class="text-center" scope="col">Name</th>
                <th class="text-center" scope="col">Email</th>
                <th class="text-center" scope="col">Friends Count</th>
                <th class="text-center" scope="col">Posts Count</th>
                <th class="text-center" scope="col">
                   #Actions
                </th>
            </tr>
            </thead>
            <template v-if="customers.length">
            <tbody class="position-relative">
                <tr v-for="user in customers" :key="user.id">
                    <th  class="text-center" scope="row">{{user.id}}</th>
                    <td class="text-center">{{ user.name }}</td>
                    <td class="text-center">{{ user.email }}</td>
                    <td class="text-center">{{ user.friends_count }}</td>
                    <td class="text-center">{{  user.posts_count }}</td>
                    <td class="text-center">
                        <router-link :to="'/admin/profile/'+user.id">
                            View Profile
                        </router-link>
                    </td>
                </tr>

            </tbody>
            </template>
            <template v-else>
                <div class="alert alert-info text-center " >
                    There are no users registered
                </div>
            </template>
        </table>
    </div>
</template>

<script>
export default {
    name: "Dashboard"
}
</script>
<script setup>
import {onMounted, ref} from "vue";
import httpWithBearer from "../../Axios/httpWithBearer";

const customers=ref([])
const fetchUsers=async ()=>{
    try {
        let {data:{users}}=await httpWithBearer().get('users')
        customers.value=users
    }catch (e) {
        console.log(e)
    }
}

onMounted(()=>{
    fetchUsers()
})

</script>

<style scoped>

</style>
