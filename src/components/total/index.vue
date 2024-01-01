<script setup lang="ts">

interface Props {
  total: number;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="rounded shadow-lg w-auto inline-block">
    <div class="px-6 py-4">
      <div class="flex flex-row align-middle">
        <div class="font-bold text-xl mb-2">Total</div>
      </div>
      <div
        class="rounded shadow-lg w-16 h-16 flex justify-center items-center bg-gray-900"
      >
        <p class="text-2xl text-white">
          {{ props.total }}
        </p>
      </div>
    </div>
  </div>
</template>
