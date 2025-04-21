<template>
  <div class="relative w-full h-full">
    <div 
      class="w-full h-full flex items-center justify-center overflow-hidden"
      :class="{'cursor-pointer': animationComplete}"
      @click="handleCardClick">
      <!-- Initial typing animation with fade-out transition -->
      <Transition
        v-if="!initialTransitionComplete"
        leave-active-class="duration-700 ease-in-out transition-all" 
        leave-from-class="opacity-100 scale-100 transform"
        leave-to-class="opacity-0 scale-50 transform"
      >
        <div v-if="showCodeView" class="w-full h-full flex justify-center items-center">
          <Card class="w-[95%] max-h-[95%] h-auto card-shadow">
            <CardContent class="pt-6 h-full flex items-center overflow-auto">
              <div class="text-[length:max(18px,min(1.5vw,28px))] font-mono text-white whitespace-pre-wrap overflow-auto" v-html="formattedDisplayedText"></div>
            </CardContent>
          </Card>
        </div>
      </Transition>

      <!-- 3D Flip Card container (only shown after initial animation) -->
      <div v-if="initialTransitionComplete" class="flip-card-3d-container w-full h-full flex justify-center">
        <div class="flip-card" :class="[`flip-${currentFlipDirection}`, { 'flipped': showCardView }]">
          <!-- Front side (Code View) -->
          <div class="flip-card-front w-full h-full flex justify-center items-center">
            <Card class="w-[95%] max-h-[95%] h-auto card-shadow">
              <CardContent class="pt-6 h-full flex items-center overflow-auto">
                <div class="text-[length:max(18px,min(1.5vw,28px))] font-mono text-white whitespace-pre-wrap overflow-auto" v-html="formattedDisplayedText"></div>
              </CardContent>
            </Card>
          </div>
          
          <!-- Back side (About Me Card) -->
          <div class="flip-card-back w-full h-full flex justify-center items-center">
            <Card class="w-[95%] max-h-[95%] h-auto card-shadow">
              <CardHeader class="text-center">
                <CardTitle class="text-[length:max(24px,min(2vw,28px))] font-bold text-white">About me</CardTitle>
              </CardHeader>
              <CardContent class="text-center h-full flex flex-col justify-center overflow-auto px-4">
                <p class="text-[length:max(20px,min(1vw,24px))] mb-3 text-white font-mono">
                  Currently a student at Saskatchewan Polytechnic in the Computer Systems Technology program.
                  I enjoy learning new technologies and working with unique ideas. I have a passion for software development and I'm looking to branch into game development aswell.
                </p>
                <p class="text-[length:max(20px,min(1vw,24px))] text-white font-mono">
                  Whether it be your website, platform expansion, or a new idea you want brought to life, I'm here to make it happen!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatIndentedText } from '@/utils/textFormatting'
import { Card, CardContent, CardHeader, CardTitle } from '#components'

// Content to be typed
const fullText = `<span class="text-orange-500">&lt;Noah&gt;</span>
  <span class="text-blue-500">&lt;About me&gt;</span>
    Some temu-blind-dude with a caffeine addiction.
    Building my best software one caffeine pill at a time.
  <span class="text-blue-500">&lt;/About me&gt;</span>
<span class="text-orange-500">&lt;/Noah&gt;</span>
`;

// Animation and view state variables
const showCodeView = ref(true)
const showCardView = ref(false)
const animationComplete = ref(false)
const initialTransitionComplete = ref(false)

// Flip animation direction
const flipDirections = ['left', 'right', 'up', 'down']
const currentFlipDirection = ref(flipDirections[0])

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
      showCodeView.value = false  // Hide text
      setTimeout(() => {
        initialTransitionComplete.value = true  // Enable flip card container
        showCardView.value = true  // Show card (back side)
        animationComplete.value = true  // Mark animation as complete for toggling
      }, 700)
    }, 300)
  }
})

// Handle clicking to toggle between views after animation is complete
const handleCardClick = () => {
  if (animationComplete.value) {
    // Randomly select a flip direction
    const randomIndex = Math.floor(Math.random() * flipDirections.length)
    currentFlipDirection.value = flipDirections[randomIndex]
    
    // Toggle the showCardView to trigger the flip animation
    showCardView.value = !showCardView.value
  }
}
</script>

<style scoped>
/* 3D flip card container */
.flip-card-3d-container {
  perspective: 1200px;
}

/* Main card wrapper */
.flip-card {
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
  position: relative;
  width: 100%;
  height: 100%;
  will-change: transform;
}

/* Different flip directions */
.flip-left.flipped {
  transform: rotateY(180deg);
}

.flip-right.flipped {
  transform: rotateY(-180deg);
}

.flip-up.flipped {
  transform: rotateX(-180deg);
}

.flip-down.flipped {
  transform: rotateX(180deg);
}

/* Front and back sides */
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

/* Back side rotation for different directions */
.flip-left .flip-card-back {
  transform: rotateY(180deg);
}

.flip-right .flip-card-back {
  transform: rotateY(-180deg);
}

.flip-up .flip-card-back {
  transform: rotateX(-180deg);
}

.flip-down .flip-card-back {
  transform: rotateX(180deg);
}
/* Custom shadow with hardware acceleration */
.card-shadow {
  box-shadow: 8px 10px 25px -5px rgba(0, 0, 0, 0.35), 12px 8px 16px -6px rgba(0, 0, 0, 0.25);
  transform: translateZ(0); /* Force GPU acceleration */
}
</style>
