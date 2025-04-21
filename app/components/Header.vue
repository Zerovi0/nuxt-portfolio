<template>
  <header :class="headerClasses">
    <div :class="containerClasses">
      <div :class="logoContainerClasses">
        <h1 :class="logoClasses">Portfolio</h1>
      </div>
      <div class="flex items-center">
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
const containerClasses = cn('container', 'flex', 'items-center', 'justify-between', 'h-16', 'px-4')
const logoContainerClasses = cn('flex', 'items-center', 'space-x-4')
const logoClasses = cn('text-xl', 'font-bold', 'text-foreground')
</script>
