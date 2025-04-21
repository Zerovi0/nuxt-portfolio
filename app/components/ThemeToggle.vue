<template>
  <ClientOnly>
    <Button
      variant="ghost"
      size="icon"
      @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
      :class="buttonClasses"
      style="width: 54px !important; height: 54px !important; min-width: 54px !important; min-height: 54px !important;"
    >
      <Icon
        :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'" 
        :class="iconClasses"
        style="width: 100% !important; height: 100% !important; min-width: 30px !important; min-height: 30px !important;"
        aria-hidden="true"
      />
      <span class="sr-only">{{ colorMode.value === 'dark' ? 'Switch to light theme' : 'Switch to dark theme' }}</span>
    </Button>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/utils/ui'

const colorMode = useColorMode()

// Use the cn utility to combine classes
const buttonClasses = cn(
  'theme-toggle',
  'p-1.5 flex items-center justify-center' // Add padding to make clickable area larger than the icon
)

const iconClasses = cn(
  'transition-all' // Remove size class since we're using inline styles
)
</script>
