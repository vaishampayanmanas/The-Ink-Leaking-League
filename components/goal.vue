<template>
  <div class="goal">
    <div class="goalCount" v-if="goal">
      <p class="count">Goal: <i class="goal-green">{{ goal }}pts</i></p>
      <button class="changeButton" @click="emit('setGoal')">Change</button>
    </div>
    <div class="goalCount" v-else>
      <p class="count">You have not set a goal</p>
      <button class="changeButton" @click="emit('setGoal')">Set</button>
    </div>
    <div class="progress" v-if="goal">
      <p class="statement">You have finished {{ progressBarWidth }}% of your goal.</p>
      <div class="progressBar--shell">
        <div ref="progress" class="progressBar--progress"></div>
        <div ref="highlight" class="progressBar--highlight"></div>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts" setup>
const { goal, points } = defineProps({
  goal: {
    type: Number,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['setGoal']);

const finished = computed(() => {
  return points >= goal;
});

const progressPercent = computed(finished.value ? (() => 100) : () => {
  if (goal === 0) return 0;
  return Math.round((points / goal) * 100);
});

const progressBar = useTemplateRef('progress');
const progressBarHighlight = useTemplateRef('highlight');
const progressBarWidth = ref(0);

onMounted(() => {
  const intervalId = setInterval(() => {
    if (progressBarWidth.value < progressPercent.value) {
      progressBarWidth.value++;
      progressBar.value!.style.width = `${progressBarWidth.value}%`;

      if (progressBarWidth.value > 2) {
        progressBarHighlight.value!.style.width = `${progressBarWidth.value - 2}%`;
      }
    } else {
      clearInterval(intervalId);
    }
  }, 2000 / progressPercent.value);
});
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

.goalCount {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  p {
    font-size: 1rem;
    color: $ink;
    font-family: 'Roboto Mono', monospace;
  }

  button {
    padding: 5px 10px;
    background-color: $cool-grey;
    color: $ink;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Roboto Mono', monospace;
    transition: all 0.3s ease;

    &:hover {
      background-color: $gold;
      color: $paper;
    }
  }
}

.goal-green{
  color: $success-green; /* Added color for goal-green */
}

// progress

.statement {
  font-size: 1rem;
  color: $ink;
  font-family: 'Roboto Mono', monospace;
  margin-top: 10px;
  text-align: center;
  margin: 20px;
}

.progressBar--shell {
  width: 100%;
  height: 20px;
  background-color: $cool-grey;
  border-radius: 10px;
  position: relative;
}

.progressBar--progress {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: $success-green;
    border-radius: 10px;
  }

.progressBar--highlight {
    position: absolute;
    height: 35%;
    top: 13%;
    left: 1%;
    background-color: lighten($success-green, 20%); /* Highlight color */
    border-radius: 10px;
    z-index: 1; /* Added z-index for layering */
  }
</style>