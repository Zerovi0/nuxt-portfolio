<template>
  <div class="py-8">
    <h1 class="text-3xl font-bold mb-4 text-foreground">Welcome to My Portfolio</h1>

    <div class="bg-card text-card-foreground rounded-lg border p-6 shadow-sm max-w-2xl mb-8">
      <p class="mb-4">
        Thank you for visiting my portfolio website. This site is built with Nuxt.js and features a clean, accessible design that respects your theme preferences.
      </p>
      <p>
        Try the theme toggle in the menubar to switch between light and dark mode. The content on this page will automatically adjust to provide the best reading experience in either theme.
      </p>
    </div>

    <!-- Animated Text -->
    <div class="text-2xl font-mono text-left whitespace-pre-wrap text-foreground" v-html="displayedText"></div>

  </div>
</template>

<script setup lang="ts">
import { useTypingAnimation } from '~/composables/useTypingAnimation'

definePageMeta({
  layout: 'default'
})

const fullText = `
<span class="text-blue-500">&lt;Noah&gt;</span>
  <span class="text-purple-500">&lt;About me&gt;</span>
    Hey there, I'm Noah. Some almost blind dude with a caffeine addiction.
    Just looking for one of those job things to feed my quest for eternal caffination!
  <span class="text-purple-500">&lt;/About me&gt;</span>
<span class="text-blue-500">&lt;/Noah&gt;</span>
`;

const { displayedText } = useTypingAnimation(fullText, 50, 1000, 500);

</script>
