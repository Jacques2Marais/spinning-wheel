<script setup lang="ts">
import router from '@/router'
import confetti from 'canvas-confetti'
import BaseLayout from '@/components/BaseLayout.vue'
import { useWheelResultStore } from '@/stores/wheelResult'

const wheelResultStore = useWheelResultStore()

// if the user visits the result page without spinning the wheel,
// redirect to the welcome page
if (!wheelResultStore.result) {
  router.push('/')
} else {
  // show some confetti when the results page has loaded (uses canvas-confetti library)
  confetti()
}
</script>

<template>
  <BaseLayout
    :title="`Your spin landed on ${wheelResultStore.result}!`"
    desc="Congratulations! Click the button below to start again"
  >
    <router-link to="/" class="button button-primary">Start again</router-link>
  </BaseLayout>
</template>
