<template>
  <footer class="border-t bg-background py-6">
    <div class="container flex flex-col items-center">
      <p class="text-sm text-muted-foreground">
        Noah Stewart-Worobec&copy; {{ currentYear }} Portfolio - Built with Nuxt.js
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/ui'

// Use the formatDate utility to get the current year
const currentYear = formatDate(new Date(), { year: 'numeric' })
</script>
