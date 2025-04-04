<template>
    <h1 class="title">Welcome To The Ink Leaking League!</h1>
    <!-- <h2>{{ asyncStatus }}</h2> -->

    <div class="form">
        <FormComp @submit="handleSubmit" :inputs="formInputs" />
        <NuxtLink class="form--link" to="/auth/login">already have an account? Login!</NuxtLink>
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
const userStore = useUsersStore()

interface Res {
    status: string,
    data: any,
    error: any
}

const res: Ref<{}> | Ref<Res> = ref({})

// let state: any;
// let asyncStatus: any;

const formInputs = ref([
    {
        type: 'text',
        placeholder: 'username',
        name: 'username'
    },
    {
        type: 'password',
        placeholder: 'password',
        name: 'password1'
    },
    {
        type: 'email',
        placeholder: 'email',
        name: 'email'
    },
    {
        type: 'password',
        placeholder: 'password(again)',
        name: 'password2'
    }
]);

const handleSubmit = async function (event: any) {
    // ({ state, asyncStatus } = useQuery({
    //     key: ['test'],
    //     query: () => fetch('/api/todos').then((res) => res.json())
    // }));
    res.value = await userStore.register({
        username: event.username,
        password: event.password1,
        email: event.email,
    })
    console.log(res.value)
}
</script>