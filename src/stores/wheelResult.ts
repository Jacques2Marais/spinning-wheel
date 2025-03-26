import { defineStore } from 'pinia'

export const useWheelResultStore = defineStore('wheel-result', {
  state: () => {
    return { result: 0 }
  },
})
