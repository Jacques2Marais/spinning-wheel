<script setup lang="ts">
import BaseLayout from '@/components/BaseLayout.vue'
</script>

<template>
  <BaseLayout title="Spin the wheel" desc="Click on the button below to get started">
    <router-link to="/spin" class="button button-primary">Get started</router-link>
  </BaseLayout>
</template>
