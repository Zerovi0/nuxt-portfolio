<template>
  <div class="relative w-full h-full">
    <div class="w-full h-full flex items-start justify-center md:justify-end pt-8 overflow-hidden">
      <!-- Typing Animation Container -->
      <Transition
        leave-active-class="duration-700 ease-in-out transition-all" 
        leave-from-class="opacity-100 scale-100 transform"
        leave-to-class="opacity-0 scale-50 transform"
      >
        <div v-if="textVisible" class="w-full flex items-start justify-center md:justify-end overflow-hidden px-2">
          <div class="text-[length:max(24px,min(2vw,64px))] font-mono text-foreground w-full whitespace-pre-wrap" v-html="formattedDisplayedText"></div>
        </div>
      </Transition>

      <!-- Card Container -->
      <Transition
        enter-active-class="duration-700 ease-in-out transition-all"
        enter-from-class="opacity-0 scale-50 transform"
        enter-to-class="opacity-100 scale-100 transform"
      >
        <div v-if="readyForTransform" class="w-full flex items-start justify-center md:justify-end px-2">
          <div class="w-full">
            <h2 class="text-[length:max(24px,min(2vw,64px))] font-bold mb-4 py-2 px-4 bg-label-bg text-label-fg inline-block rounded-lg">About me</h2>
            <p class="text-[length:max(24px,min(2vw,64px))] mb-3 text-foreground font-mono">
              Some temu-blind-dude with a caffeine addiction.
            </p>
            <p class="text-[length:max(24px,min(2vw,64px))] text-foreground font-mono">
              Building my best software one caffeine pill at a time.
            </p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatIndentedText } from '@/utils/textFormatting'

// Content to be typed
const fullText = `<span class="text-blue-500">&lt;Noah&gt;</span>
  <span class="text-purple-500">&lt;About me&gt;</span>
    Some temu-blind-dude with a caffeine addiction.
    Building my best software one caffeine pill at a time.
  <span class="text-purple-500">&lt;/About me&gt;</span>
<span class="text-blue-500">&lt;/Noah&gt;</span>
`;

// Animation state variables
const textVisible = ref(true)
const readyForTransform = ref(false)

// Initialize typing animation
const { displayedText, typingComplete } = useTypingAnimation(fullText, 25, 1000, 500)

// Use the utility function to format the displayed text
const formattedDisplayedText = computed(() => 
  formatIndentedText(displayedText.value, typingComplete.value)
)

// Handle animation sequence when typing completes
watch(typingComplete, (isComplete) => {
  if (isComplete) {
    // Sequence the transitions with appropriate timing
    setTimeout(() => {
      textVisible.value = false  // Hide text
      setTimeout(() => readyForTransform.value = true, 700)  // Show card after text fades
    }, 300)
  }
})
</script>
