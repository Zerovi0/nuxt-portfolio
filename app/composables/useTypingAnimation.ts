import { ref, computed, onMounted, onUnmounted } from 'vue'

/**
 * A composable for creating a typing animation effect with a blinking cursor.
 *
 * @param textToType The full string that should be typed out.
 * @param typeSpeed The delay in milliseconds between typing each character.
 * @param initialDelay The delay in milliseconds before typing starts.
 * @param cursorBlinkSpeed The speed in milliseconds for the cursor blink.
 * @returns A computed ref containing the currently displayed text with cursor effect.
 */
export function useTypingAnimation(
  textToType: string,
  typeSpeed: number = 50,
  initialDelay: number = 1000, // Delay before typing starts
  cursorBlinkSpeed: number = 500
) {
  const typedText = ref('')
  const showCursor = ref(false)
  const isTyping = ref(false)
  const typingComplete = ref(false)

  let currentIndex = 0
  let typingIntervalId: ReturnType<typeof setInterval> | null = null
  let cursorIntervalId: ReturnType<typeof setInterval> | null = null
  let initialTimeoutId: ReturnType<typeof setTimeout> | null = null

  const startTyping = () => {
    isTyping.value = true
    typingComplete.value = false
    typedText.value = '' // Reset text
    currentIndex = 0

    // Clear initial cursor blink if it's still running
    if (cursorIntervalId) clearInterval(cursorIntervalId)

    // Start cursor blinking
    cursorIntervalId = setInterval(() => {
      showCursor.value = !showCursor.value
    }, cursorBlinkSpeed)

    // Start typing characters
    typingIntervalId = setInterval(() => {
      if (currentIndex < textToType.length) {
        // Check if the current character is the start of an HTML tag
        if (textToType[currentIndex] === '<') {
          // Find the closing '>' of the tag
          const tagEndIndex = textToType.indexOf('>', currentIndex);
          if (tagEndIndex !== -1) {
            // Append the entire tag at once
            const tag = textToType.substring(currentIndex, tagEndIndex + 1);
            typedText.value += tag;
            currentIndex = tagEndIndex + 1; // Move index past the tag
          } else {
            // Malformed tag? Or just '<' character? Type it literally.
            typedText.value += textToType[currentIndex];
            currentIndex++;
          }
        } else {
          // It's a regular character, append it
          typedText.value += textToType[currentIndex];
          currentIndex++;
        }
      } else {
        // Typing finished
        if (typingIntervalId) clearInterval(typingIntervalId)
        if (cursorIntervalId) clearInterval(cursorIntervalId)
        isTyping.value = false
        typingComplete.value = true
        showCursor.value = false // Hide cursor when done
      }
    }, typeSpeed)
  }

  onMounted(() => {
    // Initial cursor blink before typing starts
    typingComplete.value = false
    isTyping.value = false
    showCursor.value = true // Start with cursor visible
    cursorIntervalId = setInterval(() => {
        showCursor.value = !showCursor.value
    }, cursorBlinkSpeed)

    // Delay starting the actual typing
    initialTimeoutId = setTimeout(() => {
        startTyping();
    }, initialDelay);

  })

  onUnmounted(() => {
    // Cleanup timers
    if (typingIntervalId) clearInterval(typingIntervalId)
    if (cursorIntervalId) clearInterval(cursorIntervalId)
    if (initialTimeoutId) clearTimeout(initialTimeoutId)
  })

  // Computed property to display text + cursor
  const displayedText = computed(() => {
    if (typingComplete.value) {
      return typedText.value // Just the text when done
    }
    // Text + cursor (blinking) or just cursor (initially)
    return `${typedText.value}${showCursor.value ? '_' : ''}`
  })

  return { displayedText } // Return the computed ref
}
