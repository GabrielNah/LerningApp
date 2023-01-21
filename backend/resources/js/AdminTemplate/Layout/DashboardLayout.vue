<template>
    <div class="d-flex flex-row">
        <side-bar-component/>
        <div class="container">
            <router-view/>
        </div>
    </div>
</template>

<script>
import SideBarComponent from "./SideBarComponent.vue";
export default {
    name: "DashboardLayout",
    components: {SideBarComponent}
}
</script>

<style scoped>

</style>
