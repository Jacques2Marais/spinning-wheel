<script setup lang="ts">
const props = defineProps<{
  title: string
  desc: string
}>()
</script>

<template>
  <div class="base-layout">
    <header>
      <h1 class="h-title">{{ props.title }}</h1>
      <p class="p-desc">{{ props.desc }}</p>
    </header>
    <hr class="hr-short" />
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<style scoped>
.base-layout {
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  text-align: center;
}

header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  max-width: 20rem;
}

main {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}
</style>
