<template>
    <section :class="`section ${ section / 2 === Math.round(section / 2) ? 'even' : 'odd'}`">
        <h3 class="section--number">{{ section.toString().padStart(2, '0') }}</h3>
        <h2 class="section--title">{{ title }}</h2>
        <p class="section--body"><slot /></p>
    </section>
</template>

<script lang="ts" setup>

const { section, title } = defineProps({
    section: {
        type: Number as PropType<number>,
        required: true
    },

    title: {
        type: String as PropType<string>,
        required: true
    },
})
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Luxurious+Script&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');
$ink: #2f2f2f;
$cool-grey: #e8e8e8;

    .section {
        padding-top: 190px;
        padding-bottom: 190px;
        margin-bottom: -12%;
        font-family: 'Roboto Mono';
        color: $ink;

        &--number {
            font-size: 36px;
        }

        &--title {
            font-size: 36px;
        }
    }

    .even {
        background-color: $cool-grey;
        clip-path: polygon(0 28%, 100% 12%, 100% 100%, 0 84%);

        .section--number {
            text-align: right;
            margin-right: 20px;
        }

        .section--title {
            text-align: right;
            margin-right: 20px;
        }
    }

    .odd {
        background-color: white;
        clip-path: polygon(0 16%, 100% 46%, 100% 84%, 0 100%);
    }
</style>

