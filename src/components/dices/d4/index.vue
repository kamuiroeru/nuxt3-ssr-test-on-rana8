<script setup lang="ts">
interface Props {
  rolling: boolean;
  n: number;
}

const props = defineProps<Props>()
</script>

<template>
  <h1>D4</h1>
  <p>Rolling: {{ props.rolling }}</p>
  <p>N: {{ props.n }}</p>
</template>
