<template>
<div class="input">
    <input class="input--input" :type="props.type" :required="props.required" v-model="model">
    <label class="input--placeholder">{{ props.placeholder }}</label>
    <br>
    <span class="input--underline"></span>
</div>
</template>

<script setup lang="ts">
const model = defineModel()

const props = defineProps({
    type: {
        type: String,
        default: 'text'
    },
    required: {
        type: Boolean,
        default: true
    },
    placeholder: {
        type: String,
        default: 'placeholder'
    }
});
</script>

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

.input {
    position: relative;
    background-color: white;
    margin: 20px 0;
    height: 30px;
    display: block;
    border-radius: 30px;


    &--underline {
        position: absolute;
        width: calc(100% - 30px);
        background-color: $indigo;
        left: 15px;
        top: calc(100% - 1px);
        height: 2px;
        transform: scaleX(0);
        transition: transform 0.88s ease-in-out;
    }

    &--input {
        position: absolute;
        border: 0;
        background-color: transparent;
        width: 100%;
        height: 100%;
        font-size: 16px;
        font-family: 'Roboto Mono';
        color: $ink;
        left: 18px;

        &:focus {
            outline: 0;
        }
    }

    &--placeholder {
        position: absolute;
        font-size: 16px;
        transition: all 0.5s ease;
        left: 8px;
        font-family: 'Roboto Mono';
        color: $ink;
        top: 2px;
    }
}

.input--input:focus + .input--placeholder,
.input--input:valid + .input--placeholder,
.input--input[type="date"] + .input--placeholder {
    transform: translateY(-100%);
    font-size: 12px;
    color: $indigo;
}

.input--input:focus ~ .input--underline {
    transform: scaleX(1);
}


</style>