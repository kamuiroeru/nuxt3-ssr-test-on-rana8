<script setup lang="ts">
import { Props as DiceProps } from "@/components/dice/index.vue";
import { Props as TotalProps } from "@/components/total/index.vue";
import { DiceType } from "~/domain/dice";

const queryErrorMessage = ref("");
const diceResult = ref<DiceProps[]>([]);
const diceTotal = ref<TotalProps>({ total: 0 });
const diceRollHistory = ref<DiceProps[][]>([]);

const historyDiv = ref(null);

const flowParseQuery = async (query: string) => {
  const { data, error } = await useFetch(`/api/parse-query/${query}`);
  if (error.value !== null) {
    queryErrorMessage.value = error.value.message;
    diceResult.value = [];
    return [];
  } else {
    queryErrorMessage.value = "";
    const diceTypes = data.value?.result ?? [];
    diceResult.value = diceTypes.map((diceType) => ({
      rolling: true,
      n: 0,
      diceType,
    }));
    return diceTypes;
  }
};

const flowDoRoll = async (diceTypes: DiceType[]) => {
  const { data, error } = await useFetch("/api/roll", {
    method: "POST",
    body: { diceTypes },
  });
  if (error.value !== null) {
    queryErrorMessage.value = error.value.message;
    diceResult.value = [];
  } else {
    queryErrorMessage.value = "";
    const diceResults = data.value?.diceResults ?? [];
    diceResult.value = diceTypes.map((diceType, index) => ({
      rolling: false,
      n: diceResults[index],
      diceType,
    }));
    diceTotal.value = {
      total: data.value?.total ?? 0,
    };
  }
};

const inputQuery = ref("");
const onInputEntered = async (_event: Event) => {
  const query = inputQuery.value;
  inputQuery.value = "";
  if (diceResult.value.length > 0) {
    diceRollHistory.value.unshift(diceResult.value); // Insert to top.
    setTimeout(() => {
      const historyDivDom = historyDiv.value;
      if (historyDivDom !== null) {
        (historyDivDom as Element).scrollTo({ left: 0, top: 0 });
      }
    }, 100);
  }
  diceResult.value = [];
  diceTotal.value = { total: 0 };
  const result = await flowParseQuery(query);
  if (result.length > 0) {
    await flowDoRoll(result);
  }
};
</script>

<template>
  <h1 class="py-4 font-bold text-4xl">Dice Roller</h1>
  <input
    v-model="inputQuery"
    type="text"
    name="query"
    id="query"
    class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    placeholder="3d4"
    @change="onInputEntered"
  />
  <div
    v-if="queryErrorMessage.length > 0"
    class="my-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
    role="alert"
  >
    <strong class="font-bold">Parse Error!</strong>
    <span class="block sm:inline">{{ queryErrorMessage }}</span>
  </div>
  <h2 class="py-4 font-bold text-2xl">Result</h2>
  <div class="flex flex-row">
    <Dice
      v-for="(dice, index) in diceResult"
      :key="`dice-result-${index}`"
      :="dice"
    />
    <Total v-if="diceTotal.total > 0" :="diceTotal" />
  </div>
  <h2 class="py-4 font-bold text-2xl">History</h2>
  <div
    ref="historyDiv"
    class="flex flex-col overflow-y-scroll bg-gray-100 rounded-md"
    style="height: 60vh;"
  >
    <div
      v-for="(drh, index) in diceRollHistory"
      :key="`drh-${index}`"
      class="flex flex-row"
    >
      <Dice
        v-for="(dr, indexDr) in drh"
        :key="`drh-${index}-${indexDr}`"
        :="dr"
      />
      <Total :total="drh.reduce((prev, dr) => prev + dr.n, 0)" />
    </div>
  </div>
</template>
