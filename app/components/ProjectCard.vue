<template>
  <Card :class="[cardClasses, 'p-0 overflow-hidden flex flex-col']">
    <!-- Image carousel section -->
    <div class="relative overflow-hidden aspect-video flex-shrink-0">
      <!-- Project images -->
      <div class="relative w-full h-full">
        <NuxtImg
          v-for="(image, idx) in project.images"
          :key="idx"
          :src="image"
          :alt="`${project.title} - Image ${idx + 1}`"
          :class="getImageClasses(idx)"
          placeholder
          format="webp"
        />
      </div>

      <!-- Navigation arrows - only shown for active projects with showNavigation enabled -->
      <template v-if="isActive && showNavigation">
        <button 
          :class="navButtonClasses('left')"
          @click.stop="prevImage"
          aria-label="Previous image"
        >
          <Icon name="heroicons:chevron-left" class="w-6 h-6" />
        </button>
        
        <button 
          :class="navButtonClasses('right')"
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
          :class="getIndicatorClasses(idx)"
          @click.stop="setImage(idx)"
          :aria-label="`Go to image ${idx + 1}`"
        ></button>
      </div>
    </div>
    <!-- Project title -->
    <CardFooter class="px-4 pt-0 pb-3 text-center mt-0 flex-shrink-0 border-t-0">
      <CardTitle class="text-sm font-medium truncate">{{ truncatedTitle }}</CardTitle>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn, truncateText } from '~/utils/ui'
import { type Project } from '~/composables/useProjects'
import { Card, CardTitle, CardFooter } from '#components'

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

// Use cn utility to combine classes for card
const cardClasses = computed(() => {
  return cn(
    'project-card overflow-hidden transition-all duration-500',
    {
      'scale-100': props.isActive,
      'scale-95 opacity-70': !props.isActive
    }
  )
})

// Get classes for each image based on whether it's the current one
const getImageClasses = (index: number) => {
  return cn(
    'absolute inset-0 w-full h-full object-cover transition-opacity duration-300',
    {
      'opacity-100': index === props.currentImageIndex,
      'opacity-0': index !== props.currentImageIndex
    }
  )
}

// Get classes for navigation buttons
const navButtonClasses = (position: 'left' | 'right') => {
  return cn(
    'absolute top-1/2 -translate-y-1/2 bg-background/80 text-foreground p-2 rounded-full',
    'hover:bg-background/90 transition-colors z-10',
    {
      'left-2': position === 'left',
      'right-2': position === 'right'
    }
  )
}

// Get classes for indicator dots
const getIndicatorClasses = (index: number) => {
  return cn(
    'w-2 h-2 rounded-full transition-all',
    {
      'bg-primary': index === props.currentImageIndex,
      'bg-gray-400/70': index !== props.currentImageIndex
    }
  )
}

// Truncate title if it's too long
const truncatedTitle = computed(() => {
  return truncateText(props.project.title, 30)
})

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
