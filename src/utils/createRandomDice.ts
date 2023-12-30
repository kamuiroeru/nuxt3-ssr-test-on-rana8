const shuffleArray = (array: number[]): number[] => {
  return array.slice().sort(() => Math.random() - Math.random())
}

const DEFAULT_RANDOM_N = 1

export default function (maxN: number) {
  const _randomN = ref<number>(DEFAULT_RANDOM_N)
  let rolling: NodeJS.Timeout | null = null

  const roll = (): void => {
    const arr = shuffleArray([...Array(maxN).keys()])
    let i = 0
    rolling = setInterval(() => {
      _randomN.value = arr[i++ % maxN] + 1
    }, 50)
  }

  const stop = () => {
    if (rolling !== null) clearTimeout(rolling)
    _randomN.value = DEFAULT_RANDOM_N
  }

  const randomN = computed(() => _randomN)

  return {
    randomN, roll, stop
  }
}
