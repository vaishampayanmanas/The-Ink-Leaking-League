<template>
    <div class="navbar">
        <div class="navbar--logo">
            <img :src="Logo" alt="" class="navbar--logo__img">
            <h1 class="navbar--logo__heading">The Ink Leaking League</h1>
        </div>

        <div class="navbar--links">
            <NuxtLink v-for="link in links" :to="link.to" class="navbar--links__link">{{ link.name }}</NuxtLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Luxurious+Script&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

$ink: #2f2f2f;
$paper: #f5f5f5;
$gold: #ffb400;
$indigo: #4b0082;
$success-green: #2ECC71;
$error-red: #E74C3C;

.navbar {
    background-color: $ink;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;

    &--logo {
        display: flex;
        align-items: center;
        gap: 30px;

        &__img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }

        &__heading {
            color: $paper;
            font-family: 'Luxurious Script';
            font-size: 42px;
            font-weight: 100;
        }
    }

    &--links {
        display: flex;
        align-items: center;
        gap: 30px;

        &__link {
            text-decoration: none;
            color: $paper;
            font-size: 18px;
            font-family: 'Roboto Mono';
            letter-spacing: 2px;
            transition: color 0.5s ease-in-out;

            &:hover {
                color: $gold;
                text-decoration: underline;
            }
        }
    }
}
</style>

<script setup lang="ts">
import Logo from '@/assets/images/logo.webp'

interface Link {
    to: string,
    name: string
}

const { links } = defineProps({
    links: {
        type: Array as PropType<Link[]>,
        required: true
    }
});
</script>