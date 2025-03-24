<script setup lang="ts">
import SpinningWheel from '@/components/SpinningWheel.vue'
</script>

<template>
  <section class="spin">
    <div class="hero-text">
      <h1 class="h-title">Choose a spin</h1>
      <p class="p-text">Choose below how you would like to spin the wheel.</p>
    </div>
    <SpinningWheel />
    <div class="button-group">
      <button class="button button-secondary">Predetermined spin</button>
      <button class="button button-primary">Random spin</button>
    </div>
  </section>
</template>
