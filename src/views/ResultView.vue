<script setup lang="ts">
import router from '@/router'
import BaseLayout from '@/components/BaseLayout.vue'
import { useWheelResultStore } from '@/stores/wheelResult'

const wheelResultStore = useWheelResultStore()

// if the user visits the result page without spinning the wheel,
// redirect to the welcome page
if (!wheelResultStore.result) {
  router.push('/')
}
</script>

<template>
  <BaseLayout
    :title="`Your spin landed on ${wheelResultStore.result}!`"
    desc="Congratulations! Click the button below to start again"
  >
    <a href="/" class="button button-primary">Start again</a>
  </BaseLayout>
</template>
