import { ref, reactive, onMounted, onBeforeUnmount, computed } from 'vue'

export interface CarouselOptions {
  autoRotationInterval?: number
  animationDuration?: number
}

export function useCarousel<T extends object>(items: T[], options: CarouselOptions = {}) {
  // Default options
  const {
    autoRotationInterval = 5000, // 5 seconds
    animationDuration = 500 // 500ms
  } = options

  // State tracking
  const activeIndex = ref(0)
  const currentItemIndices = reactive<number[]>([])
  const autoRotationTimer = ref<ReturnType<typeof setInterval> | null>(null)
  const isAnimating = ref(false)
  const rotationDirection = ref<'next' | 'prev' | null>(null)

  // Initialize current item indices
  const initializeItemIndices = () => {
    for (let i = 0; i < items.length; i++) {
      currentItemIndices[i] = 0
    }
  }

  // Get active item
  const activeItem = computed(() => items[activeIndex.value] || null)

  // Get previous item
  const previousItem = computed(() => {
    if (items.length <= 1) return activeItem.value
    const prevIndex = activeIndex.value === 0 ? items.length - 1 : activeIndex.value - 1
    return items[prevIndex] || activeItem.value
  })

  // Get next item
  const nextItem = computed(() => {
    if (items.length <= 1) return activeItem.value
    const nextIndex = (activeIndex.value + 1) % items.length
    return items[nextIndex] || activeItem.value
  })

  // Rotate to next or previous item with animation
  const rotateTo = (direction: 'next' | 'prev') => {
    if (isAnimating.value) return // Prevent multiple clicks during animation
    
    isAnimating.value = true
    rotationDirection.value = direction
    
    // Set a timeout to update the active item after animation completes
    setTimeout(() => {
      // Update active item index based on direction
      if (direction === 'next') {
        activeIndex.value = (activeIndex.value + 1) % items.length
      } else {
        activeIndex.value = activeIndex.value === 0 ? 
          items.length - 1 : activeIndex.value - 1
      }
      
      // Reset animation flag and direction
      isAnimating.value = false
      rotationDirection.value = null
      
      // Reset auto-rotation
      startAutoRotation()
    }, animationDuration)
  }

  // Navigate to previous item - wrapper for rotateTo
  const previous = () => rotateTo('prev')

  // Navigate to next item - wrapper for rotateTo
  const next = () => rotateTo('next')

  // Item sub-item navigation (e.g., images within a project)
  const nextSubItem = (itemIndex: number, subItemsLength: number) => {
    if (itemIndex >= 0 && itemIndex < items.length && subItemsLength > 0) {
      // Ensure the index exists in our current item indices array
      if (currentItemIndices[itemIndex] === undefined) {
        currentItemIndices[itemIndex] = 0
      }
      
      // Update to next sub-item
      currentItemIndices[itemIndex] = 
        (currentItemIndices[itemIndex] + 1) % subItemsLength
    }
  }

  const prevSubItem = (itemIndex: number, subItemsLength: number) => {
    if (itemIndex >= 0 && itemIndex < items.length && subItemsLength > 0) {
      // Ensure the index exists in our current item indices array
      if (currentItemIndices[itemIndex] === undefined) {
        currentItemIndices[itemIndex] = 0
      }
      
      // Update to previous sub-item
      currentItemIndices[itemIndex] = 
        (currentItemIndices[itemIndex] - 1 + subItemsLength) % subItemsLength
    }
  }

  // Auto-rotation
  const startAutoRotation = () => {
    // Clear any existing interval
    if (autoRotationTimer.value) {
      clearInterval(autoRotationTimer.value)
    }
    
    // Set up new interval
    autoRotationTimer.value = setInterval(() => {
      // Auto-rotate the sub-item (e.g., image) of the active item
      const activeItemIndex = activeIndex.value
      const activeItem = items[activeItemIndex]
      
      // Type guard to check if the item has an images property that is an array
      if (activeItem && 
          typeof activeItem === 'object' && 
          'images' in activeItem && 
          Array.isArray((activeItem as any).images)) {
        nextSubItem(activeItemIndex, (activeItem as any).images.length)
      }
    }, autoRotationInterval)
  }

  // Lifecycle hooks
  onMounted(() => {
    initializeItemIndices()
    startAutoRotation()
  })

  onBeforeUnmount(() => {
    // Clean up interval when component is destroyed
    if (autoRotationTimer.value) {
      clearInterval(autoRotationTimer.value)
    }
  })

  return {
    activeIndex,
    activeItem,
    previousItem,
    nextItem,
    currentItemIndices,
    isAnimating,
    rotationDirection,
    previous,
    next,
    nextSubItem,
    prevSubItem
  }
}
