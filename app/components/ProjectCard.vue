<template>
  <div 
    class="project-card rounded-lg overflow-hidden shadow-lg transition-all duration-500"
    :class="{ 
      'bg-background border border-border': true,
      'scale-100': isActive, 
      'scale-95 opacity-70': !isActive 
    }"
  >
    <!-- Image carousel section -->
    <div class="relative overflow-hidden aspect-video">
      <!-- Project images -->
      <div class="relative w-full h-full">
        <NuxtImg
          v-for="(image, idx) in project.images"
          :key="idx"
          :src="image"
          :alt="`${project.title} - Image ${idx + 1}`"
          class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          :class="{ 'opacity-100': idx === currentImageIndex, 'opacity-0': idx !== currentImageIndex }"
          placeholder
          format="webp"
        />
      </div>

      <!-- Navigation arrows - only shown for active projects with showNavigation enabled -->
      <template v-if="isActive && showNavigation">
        <button 
          class="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 text-foreground p-2 rounded-full hover:bg-background/90 transition-colors z-10"
          @click.stop="prevImage"
          aria-label="Previous image"
        >
          <Icon name="heroicons:chevron-left" class="w-6 h-6" />
        </button>
        
        <button 
          class="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 text-foreground p-2 rounded-full hover:bg-background/90 transition-colors z-10"
          @click.stop="nextImage"
          aria-label="Next image"
        >
          <Icon name="heroicons:chevron-right" class="w-6 h-6" />
        </button>
      </template>

      <!-- Image indicators -->
      <div v-if="isActive && project.images.length > 1" class="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
        <button
          v-for="(_, idx) in project.images" 
          :key="idx"
          class="w-2 h-2 rounded-full transition-all"
          :class="idx === currentImageIndex ? 'bg-primary' : 'bg-gray-400/70'"
          @click.stop="setImage(idx)"
          :aria-label="`Go to image ${idx + 1}`"
        ></button>
      </div>
    </div>

    <!-- Project title -->
    <div class="px-4 py-3 text-center">
      <h3 class="text-lg font-medium truncate">{{ project.title }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">

// Define project type to ensure type safety
interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  images: string[]
}

// Define props
const props = defineProps({
  project: {
    type: Object as () => Project,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  currentImageIndex: {
    type: Number,
    default: 0
  },
  showNavigation: {
    type: Boolean,
    default: true
  }
})

// Define emits for parent component navigation
const emit = defineEmits(['prev-image', 'next-image'])

// Image navigation methods
const nextImage = (event?: Event) => {
  if (event) event.stopPropagation()
  
  if (props.isActive) {
    // Only notify parent - parent will handle the actual index change
    emit('next-image')
  }
}

const prevImage = (event?: Event) => {
  if (event) event.stopPropagation()
  
  if (props.isActive) {
    // Only notify parent - parent will handle the actual index change
    emit('prev-image')
  }
}

const setImage = (index: number, event?: Event) => {
  if (event) event.stopPropagation()
  
  if (props.isActive && index >= 0 && props.project.images && index < props.project.images.length) {
    // In a real implementation, we would emit an event to let the parent know which image to show
    // For now, we'll just use the next/prev navigation
    if (index > props.currentImageIndex) {
      emit('next-image')
    } else if (index < props.currentImageIndex) {
      emit('prev-image')
    }
  }
}
</script>

<style scoped>
.project-card {
  /* Custom styling if needed beyond Tailwind */
  transition-property: transform, opacity, box-shadow;
}
</style>
