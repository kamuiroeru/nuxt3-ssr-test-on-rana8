<script setup lang="ts">
import { Icon } from "@iconify/vue";
import Colors from "tailwindcss/colors";

type DiceN = 4 | 6 | 8 | 10 | 12 | 20;
const icons: Record<DiceN, string> = {
  4: 'ph:triangle-fill',
  6: 'ph:square-fill',
  8: 'mdi:rhombus',
  10: 'mdi:rhombus',
  12: 'uis:pentagon',
  20: 'bi:hexagon-fill',
}
const colors: Record<DiceN, string> = {
  4: Colors["red"][600],
  6: Colors["yellow"][600],
  8: Colors["green"][600],
  10: Colors["blue"][600],
  12: Colors["purple"][600],
  20: Colors["pink"][600],
};
const colorDef: Record<DiceN, { color: string; rollingColor: string }> = {
  4: {
    color: "bg-red-600",
    rollingColor: "bg-red-400",
  },
  6: {
    color: "bg-yellow-600",
    rollingColor: "bg-yellow-400",
  },
  8: {
    color: "bg-green-600",
    rollingColor: "bg-green-400",
  },
  10: {
    color: "bg-blue-600",
    rollingColor: "bg-blue-400",
  },
  12: {
    color: "bg-purple-600",
    rollingColor: "bg-purple-400",
  },
  20: {
    color: "bg-pink-600",
    rollingColor: "bg-pink-400",
  },
};

interface Props {
  rolling: boolean;
  n: number;
  maxN: DiceN;
}

const props = defineProps<Props>();
const randomDice = createRandomDice(props.maxN);

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
      <div class="flex flex-row align-middle">
        <div class="font-bold text-xl mb-2">D{{ maxN }}</div>
        <div class="flex-auto"></div>
        <Icon :icon="icons[maxN]" class="mt-0.5" :class="rolling ? 'rotate-animation' : ''" :style="{ color: colors[maxN], fontSize: '1.5em' }" />
      </div>
      <div
        class="rounded shadow-lg w-16 h-16 flex justify-center items-center"
        :class="rolling ? colorDef[maxN].rollingColor : colorDef[maxN].color"
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
  animation: 0.5s linear infinite rotation;
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
