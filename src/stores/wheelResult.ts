import { defineStore } from 'pinia'

// setup a Pinia store to save the result of the spinning wheel
export const useWheelResultStore = defineStore('wheel-result', {
  state: () => {
    return { result: 0 }
  },
})
