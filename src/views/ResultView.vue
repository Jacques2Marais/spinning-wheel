<script setup lang="ts">
import BaseLayout from '@/components/BaseLayout.vue'
import { useWheelResultStore } from '@/stores/wheelResult'

const wheelResultStore = useWheelResultStore()
</script>

<template>
  <BaseLayout
    :title="`Your spin landed on ${wheelResultStore.result}!`"
    desc="Congratulations! Click the button below to start again"
  >
    <a href="/" class="button button-primary">Start again</a>
  </BaseLayout>
</template>
