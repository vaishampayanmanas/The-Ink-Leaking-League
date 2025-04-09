<template>
    <Navbar :links="links" />
</template>

<style lang="scss">

</style>

<script lang="ts" setup>
const userStore = useUsersStore()
const links = ref([{
    to: '/',
    name: 'Home'
}])
if (import.meta.client) {
    userStore.load()

    if (userStore.accessToken) {
        links.value.push({
            to: '/auth/logout',
            name: 'Logout'
        })
        links.value.push({
            to: '/challenges',
            name: 'Challenges'
        })
        links.value.push({
            to: '/dashboard',
            name: 'Dashboard'
        })
    } else {
        links.value.push({
            to: '/auth/login',
            name: 'Login'
        })
    }
}


</script>