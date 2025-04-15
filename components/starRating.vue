<template>
  <div>
    <FontAwesomeIcon :class="`icon ${item.hover ? 'hover' : ''} ${item.active ? 'active' : ''}`" @mouseover="onHover(item.value)" :icon="['fas', 'star']" v-for="item in list" :key="item.value" @click="onSetRating(item.value)" @mouseleave="onHover(0)" size="2xl" />
  </div>
</template>

<script lang="ts" setup>
const model = defineModel({
  type: Number,
  default: 0
});
const props = defineProps({
  max: {
    type: Number,
    default: 5
  }
});

const list = ref(Array.from({ length: props.max }, (_, i) => {
  return {
    value: i + 1,
    hover: false,
    active: false,
}
}));

const onHover = function(index: number) {
  list.value.forEach(item => {
    item.hover = item.value <= index;
  });
};

const onSetRating = function(index: number) {
  model.value = index;
  list.value = list.value.map((item: any) => {
    return {
      ...item,
      active: item.value <= index,
      hover: false
    };
  });
};
</script>

<style scoped lang="scss">
$ink: #2f2f2f;
$paper: #f5f5f5;
$gold: #ffb400;
$indigo: #4b0082;
$success-green: #2ECC71;
$cool-grey: #e8e8e8;
$error-red: #E74C3C;

div {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $paper;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin: 10px 0;
}

.icon {
  cursor: pointer;
  color: $ink;
  font-size: 2rem;
  margin-right: 0.5rem;
}

.active {
  color: $gold; /* Example active color */
}

.hover {
  color: lighten($gold, 25%);
}
</style>