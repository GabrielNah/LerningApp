<template>
<header-component v-if="!$route.meta.auth"/>
    <router-view/>
</template>

<script>
import HeaderComponent from "./Layout/HeaderComponent.vue";

export default {
    name: "App",
    components: {HeaderComponent},
}
</script>

<style scoped>

</style>
