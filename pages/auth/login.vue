<template>
    <h1 class="title">Welcome Back!</h1>

    <div class="form">
        <FormComp @submit="handleSubmit" :inputs="formInputs" />
        <NuxtLink class="form--link" to="/auth/register">Don't have an account? Create One!</NuxtLink>
    </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Luxurious+Script&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

$ink: #2f2f2f;
$cool-grey: #e8e8e8;
$paper: #f5f5f5;
$gold: #ffb400;
$indigo: #4b0082;
$success-green: #2ECC71;
$error-red: #E74C3C;

.title {
    font-family: 'Luxurious Script';
    color: $ink;
    font-weight: 100;
    font-size: 4.6rem;
    text-align: center;
}

.form {
    background-color: $cool-grey;
    margin-top: 10vh;
    margin-left: 10vw;
    margin-right: 10vw;
    padding: 20px;
    border-radius: 20px;
    display: flex;
    gap: 50px;
    flex-direction: column;
    justify-content: space-between;
    font-family: 'Roboto Mono';

    &--link {
        text-align: center;
        font-size: 18px;
        color: $ink;
        text-decoration: none;
        transition: color 0.3s ease-in-out;

        &:hover {
            color: $gold;
        }
    }
}
</style>

<script setup lang="ts">

const formInputs = ref([
    {
        type: 'text',
        placeholder: 'username',
        name: 'username'
    },
    {
        type: 'password',
        placeholder: 'password',
        name: 'password'
    }
]);

const handleSubmit = function (event: any) {
    console.log(event);
}
</script>