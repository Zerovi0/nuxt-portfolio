<template>
  <footer class="border-t bg-background py-6 w-full text-center">
    <p class="text-sm text-muted-foreground mx-auto">
      Noah Stewart-Worobec&copy; {{ currentYear }} Portfolio - Built with Nuxt.js
    </p>
  </footer>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/ui'

// Use the formatDate utility to get the current year
const currentYear = formatDate(new Date(), { year: 'numeric' })
</script>
