<template>
    <div class="about">
        <h1 class="about--header">The Ink Leaking League</h1>
        <h2 class="about--subheader">About us</h2>
        <p class="about--text">The Ink Leaking League is a group of english enthusiasts. We believe that English, a marvelous language, should be used to it's fullest potential. We strive to improve our english writing skills. We support each other. We make challenges, complete challenges, review others' work, learn from it,  and offer suggestions, and support. We commit ourselves to make english even more beautiful than it is today. We will happily welcome you to this growing community.</p>
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

.about {
    background-color: $cool-grey;
    padding: 10px 20px;
    padding-bottom: 200px;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 74%);
    margin-bottom: -16%;

    &--header {
        color: $ink;
        font-family: 'Luxurious Script';
        font-size: 56px;
        font-weight: 100;
    }

    &--subheader {
        color: $ink;
        font-family: 'Roboto Mono';
        font-size: 36px;
        font-weight: 100;
        letter-spacing: 2px;
    }

    &--text {
        color: $ink;
        font-family: 'Roboto Mono';
        font-size: 16px;
        font-weight: 100;
        letter-spacing: 1px;
        font-weight: 100;
    }
}
</style>