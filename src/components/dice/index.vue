<script setup lang="ts">
import { Icon } from "@iconify/vue";
import Colors from "tailwindcss/colors";
import { type DiceType, diceTypeMapper } from '@/domain/dice'

const icons: Record<DiceType, string> = {
  'D4': 'ph:triangle-fill',
  'D6': 'ph:square-fill',
  'D8': 'mdi:rhombus',
  'D10': 'mdi:rhombus',
  'D12': 'uis:pentagon',
  'D20': 'bi:hexagon-fill',
}
const colors: Record<DiceType, string> = {
  'D4': Colors["red"][600],
  'D6': Colors["yellow"][600],
  'D8': Colors["green"][600],
  'D10': Colors["blue"][600],
  'D12': Colors["purple"][600],
  'D20': Colors["pink"][600],
};
const colorDef: Record<DiceType, { color: string; rollingColor: string }> = {
  'D4': {
    color: "bg-red-600",
    rollingColor: "bg-red-400",
  },
  'D6': {
    color: "bg-yellow-600",
    rollingColor: "bg-yellow-400",
  },
  'D8': {
    color: "bg-green-600",
    rollingColor: "bg-green-400",
  },
  'D10': {
    color: "bg-blue-600",
    rollingColor: "bg-blue-400",
  },
  'D12': {
    color: "bg-purple-600",
    rollingColor: "bg-purple-400",
  },
  'D20': {
    color: "bg-pink-600",
    rollingColor: "bg-pink-400",
  },
};

interface Props {
  rolling: boolean;
  n: number;
  diceType: DiceType;
}

const props = defineProps<Props>();
const randomDice = createRandomDice(diceTypeMapper[props.diceType]);

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
        <div class="font-bold text-xl mb-2">{{ diceType }}</div>
        <div class="flex-auto"></div>
        <Icon :icon="icons[diceType]" class="mt-0.5" :class="rolling ? 'rotate-animation' : ''" :style="{ color: colors[diceType], fontSize: '1.5em' }" />
      </div>
      <div
        class="rounded shadow-lg w-16 h-16 flex justify-center items-center"
        :class="rolling ? colorDef[diceType].rollingColor : colorDef[diceType].color"
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
