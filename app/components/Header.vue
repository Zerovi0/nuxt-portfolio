<template>
  <header :class="headerClasses">
    <div :class="containerClasses">
      <div :class="logoContainerClasses">
        <h1 :class="logoClasses">Noah Stewart-Worobec</h1>
      </div>
      <div :class="themeToggleContainerClasses">
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { cn } from '~/utils/ui'
import ThemeToggle from './ThemeToggle.vue'

// Use the cn utility to combine classes
const headerClasses = cn('border-b', 'bg-background')
const containerClasses = cn('w-full', 'flex', 'items-center', 'h-16', 'px-4')
const logoContainerClasses = cn('flex', 'items-center', 'space-x-4')
const logoClasses = cn('text-xl', 'font-bold', 'text-foreground')
const themeToggleContainerClasses = cn('flex', 'items-center', 'ml-auto') // ml-auto pushes to far right
</script>
