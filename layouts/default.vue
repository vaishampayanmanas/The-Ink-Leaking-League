<template>
    <Navbar :links="links" />
</template>

<style lang="scss">

</style>

<script lang="ts" setup>
const links = [{
    to: '/',
    name: 'Home'
}, {
    to: '/auth/login',
    name: 'login'
}]
</script>