<template>
  <ClientOnly>
    <Button
      variant="ghost"
      @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
      class="theme-toggle p-1 sm:p-1.5 md:p-2 lg:p-3"
    >
      <Icon
        :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'" 
        class="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 transition-all"
        aria-hidden="true"
      />
      <span class="sr-only">{{ colorMode.value === 'dark' ? 'Switch to light theme' : 'Switch to dark theme' }}</span>
    </Button>
  </ClientOnly>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
</script>