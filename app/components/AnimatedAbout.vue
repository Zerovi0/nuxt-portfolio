<template>
  <div class="relative w-full h-full">
    <div class="w-full h-full flex items-center justify-center overflow-hidden">
      <!-- Typing Animation Container -->
      <Transition
        leave-active-class="duration-700 ease-in-out transition-all" 
        leave-from-class="opacity-100 scale-100 transform"
        leave-to-class="opacity-0 scale-50 transform"
      >
        <div v-if="textVisible" class="w-full h-full flex justify-center items-center">
          <Card class="w-full h-[90%]" style="box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2);">
            <CardContent class="pt-6 h-full flex items-center">
              <div class="text-[length:max(20px,min(1.5vw,28px))] font-mono text-white whitespace-pre-wrap" v-html="formattedDisplayedText"></div>
            </CardContent>
          </Card>
        </div>
      </Transition>

      <!-- Card Container -->
      <Transition
        enter-active-class="duration-700 ease-in-out transition-all"
        enter-from-class="opacity-0 scale-50 transform"
        enter-to-class="opacity-100 scale-100 transform"
      >
        <div v-if="readyForTransform" class="w-full h-full flex justify-center items-center">
          <Card class="w-full h-[90%]" style="box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2);">
            <CardHeader class="text-center">
              <CardTitle class="text-[length:max(24px,min(2vw,42px))] font-bold text-white">About me</CardTitle>
            </CardHeader>
            <CardContent class="text-center h-full flex flex-col justify-center">
              <p class="text-[length:max(20px,min(1.5vw,28px))] mb-3 text-white font-mono">
                Some temu-blind-dude with a caffeine addiction.
              </p>
              <p class="text-[length:max(20px,min(1.5vw,28px))] text-white font-mono">
                Building my best software one caffeine pill at a time.
              </p>
            </CardContent>
          </Card>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatIndentedText } from '@/utils/textFormatting'
import { Card, CardContent, CardHeader, CardTitle } from '#components'

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
