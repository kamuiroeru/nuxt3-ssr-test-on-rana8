<script setup lang="ts">
interface Props {
  rolling: boolean;
  n: number;
}

const props = defineProps<Props>();
const randomDice = createRandomDice(4);

watch(
  () => props.rolling,
  (newValue, _) => {
    if (newValue) {
      randomDice.roll();
    } else {
      randomDice.stop();
    }
  }
);
</script>

<template>
  <div class="rounded shadow-lg w-auto inline-block">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">D4</div>
      <div
        class="rounded shadow-lg w-20 h-20 flex justify-center items-center"
        :class="rolling ? 'bg-red-400 rotate-animation' : 'bg-red-600'"
      >
        <p class="text-2xl" :class="rolling ? 'text-black' : 'text-white'">
          {{ rolling ? randomDice.randomN : n }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rotate-animation {
  animation: 0.5s linear infinite rotation
}

@keyframes rotation {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
