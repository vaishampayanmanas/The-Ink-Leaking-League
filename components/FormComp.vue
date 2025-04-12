<template>
    <form @submit.prevent="submit">
        <inputComp v-for="input in form.inputs" :type="input.type" :placeholder="input.placeholder" v-model="formOutputs[input.name].value" />
        <button type="submit">submit</button>
    </form>
</template>

<script lang="ts" setup>

interface FormInput {
    type: string,
    placeholder: string,
    name: string
}

const form = defineProps({
    inputs: {
        type: Array as PropType<FormInput[]>,
        required: true
    }
});

const formOutputs = form.inputs.reduce((acc: Record<string, Ref<string>>, val: FormInput) => {
    acc[val.name] = ref('');
    return acc;
}, {});

const emit = defineEmits(['submit']);

const submit = function () {
    const output = Object.getOwnPropertyNames(formOutputs).reduce((acc: Record<string, string>, val: string) => {
        acc[val] = formOutputs[val].value;
        formOutputs[val].value = ''
        return acc
    }, {});

    emit('submit', output);
}

</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');
$gold: #ffb400;
$ink: #2f2f2f;
$paper: #f5f5f5;

button {
    width: 100%;
    font-size: 16px;
    padding: 8px;
    border-radius: 30px;
    border: 0;
    background-color: white;
    font-family: 'Roboto Mono';
    transition: all 0.8s ease;
    color: $ink;

    &:hover {
        background-color: $gold;
        color: $paper;
    }
}
</style>