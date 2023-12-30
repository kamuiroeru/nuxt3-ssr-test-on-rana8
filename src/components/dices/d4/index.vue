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
        class="rounded shadow-lg w-20 h-20 bg-red-600 flex justify-center items-center"
      >
        <p class="text-white text-2xl">
          {{ rolling ? randomDice.randomN : n }}
        </p>
      </div>
    </div>
  </div>
</template>
