<template>
  <div class="comment">
        <FontAwesomeIcon v-for="star in stars" :key="star.id" :icon="['fas', 'star']" :class="`icon ${star.filled ? 'filled' : ''}`" />
        <p class="review">{{ review }}</p>
        <p class="author">- {{ username }}</p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  rating: {
    type: Number,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
});

interface Star {
  id: number;
  filled: boolean;
}

const stars: Star[] = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  filled: index < props.rating
}));
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Luxurious+Script&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

$ink: #2f2f2f;
$paper: #f5f5f5;
$gold: #ffb400;
$indigo: #4b0082;
$success-green: #2ECC71;
$cool-grey: #e8e8e8;
$error-red: #E74C3C;

.icon {
  font-size: 1rem;
  color: $ink;
}

.filled {
  color: $gold;
}

.comment {
  background-color: $cool-grey;
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
}

p {
  margin: 0;
  font-family: 'Roboto Mono', monospace;
  color: $ink;
}

.review {
  font-size: 1rem;
  text-align: center;
  margin-top: 10px;
}
.author {
  font-size: 1.2rem;
  margin-top: 12px;
  text-align: right;
}
</style>