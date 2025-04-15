import { ref, computed, onMounted, onUnmounted } from 'vue'

/**
 * A composable for creating a typing animation effect with a blinking cursor.
 *
 * @param textToType The full string that should be typed out.
 * @param typeSpeed The delay in milliseconds between typing each character.
 * @param initialDelay The delay in milliseconds before typing starts.
 * @param cursorBlinkSpeed The speed in milliseconds for the cursor blink.
 * @returns An object with displayedText and typingComplete status.
 */
export function useTypingAnimation(
  textToType: string,
  typeSpeed: number = 500,
  initialDelay: number = 1000,
  cursorBlinkSpeed: number = 500
) {
  const typedText = ref('')
  const showCursor = ref(false)
  const typingComplete = ref(false)
  
  let currentIndex = 0
  let timers = {
    typing: null as ReturnType<typeof setInterval> | null,
    cursor: null as ReturnType<typeof setInterval> | null,
    initial: null as ReturnType<typeof setTimeout> | null
  }

  // Process text elements efficiently (HTML tags and entities)
  const processTextElement = () => {
    if (currentIndex >= textToType.length) {
      finishTyping()
      return
    }
    
    // Handle special HTML elements
    if (textToType[currentIndex] === '<' || textToType[currentIndex] === '&') {
      const isTag = textToType[currentIndex] === '<'
      const endChar = isTag ? '>' : ';'
      const endIndex = textToType.indexOf(endChar, currentIndex)
      const maxLength = isTag ? 50 : 10 // Reasonable limits for tags and entities
      
      if (endIndex !== -1 && endIndex - currentIndex < maxLength) {
        // Append entire tag or entity at once
        typedText.value += textToType.substring(currentIndex, endIndex + 1)
        currentIndex = endIndex + 1
      } else {
        // Malformed tag/entity - type character literally
        typedText.value += textToType[currentIndex]
        currentIndex++
      }
    } else {
      // Regular character
      typedText.value += textToType[currentIndex]
      currentIndex++
    }
  }

  const finishTyping = () => {
    clearAllTimers()
    typingComplete.value = true
    showCursor.value = false
  }

  const clearAllTimers = () => {
    Object.values(timers).forEach(timer => {
      if (timer) {
        typeof timer === 'number' ? clearTimeout(timer) : clearInterval(timer)
      }
    })
  }

  const startTyping = () => {
    typedText.value = ''
    currentIndex = 0
    typingComplete.value = false
    
    // Log the typeSpeed being used for debugging
    console.log(`Starting typing animation with typeSpeed: ${typeSpeed}ms`);
    
    timers.typing = setInterval(processTextElement, typeSpeed)
  }

  onMounted(() => {
    // Start cursor blinking
    timers.cursor = setInterval(() => {
      showCursor.value = !showCursor.value
    }, cursorBlinkSpeed)
    
    // Delay before typing starts
    timers.initial = setTimeout(startTyping, initialDelay)
  })

  onUnmounted(clearAllTimers)

  // Computed property to display text with cursor
  const displayedText = computed(() => 
    typingComplete.value 
      ? typedText.value 
      : `${typedText.value}${showCursor.value ? '_' : ''}`
  )

  return { displayedText, typingComplete }
}
