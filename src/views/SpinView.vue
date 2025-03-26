<script setup lang="ts">
import BaseLayout from '@/components/BaseLayout.vue'
import SpinningWheel from '@/components/SpinningWheel.vue'
</script>

<template>
  <BaseLayout title="Choose how to spin" desc="Choose below how you would like to spin the wheel">
    <SpinningWheel />
    <div class="button-group">
      <button class="button button-secondary">Predetermined spin</button>
      <button class="button button-primary">Random spin</button>
    </div>
  </BaseLayout>
</template>
