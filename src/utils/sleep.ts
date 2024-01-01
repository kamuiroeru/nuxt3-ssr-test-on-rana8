export const sleepMs = (ms: number) => new Promise(res => {
  setTimeout(res, ms)
})
