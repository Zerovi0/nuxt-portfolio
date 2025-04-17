<template>
  <div class="relative w-full h-full">
    <div class="w-full h-full flex items-start justify-end pt-8 overflow-hidden">
      <!-- Typing Animation Container -->
      <Transition
        leave-active-class="duration-700 ease-in-out transition-all" 
        leave-from-class="opacity-100 scale-100 transform"
        leave-to-class="opacity-0 scale-50 transform"
      >
        <div v-if="textVisible" class="w-full flex items-start justify-end overflow-hidden px-2">
          <div class="text-[length:max(24px,min(2vw,64px))] font-mono text-foreground w-full whitespace-pre-wrap" v-html="formattedDisplayedText"></div>
        </div>
      </Transition>

      <!-- Card Container -->
      <Transition
        enter-active-class="duration-700 ease-in-out transition-all"
        enter-from-class="opacity-0 scale-50 transform"
        enter-to-class="opacity-100 scale-100 transform"
      >
        <div v-if="readyForTransform" class="w-full mt-12">
          <div class="w-full">
            <h2 class="text-2xl font-bold mb-4 text-primary">About me</h2>
            <p class="mb-3 text-foreground">
              Some temu-blind-dude with a caffeine addiction.
            </p>
            <p class="text-foreground">
              Building my best software one caffeine pill at a time.
            </p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
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

// --- Indentation Logic specific to this component ---

// Utility to check tag type and content region in one pass
const getLineMeta = (index: number, lines: string[]) => {
  const line = lines[index] || '';
  const isTag = line.includes('&lt;About me&gt;') || line.includes('&lt;/About me&gt;');
  let betweenTags = false;
  if (!isTag) {
    let open = false;
    for (let i = index - 1; i >= 0; i--) {
      if (lines[i]?.includes('&lt;About me&gt;')) { open = true; break; }
      if (lines[i]?.includes('&lt;/About me&gt;')) break;
    }
    if (open) {
      for (let i = index + 1; i < lines.length; i++) {
        if (lines[i]?.includes('&lt;/About me&gt;')) { betweenTags = true; break; }
      }
    }
  }
  return { isTag, betweenTags };
};

// Tailwind indent class for a given space count (explicit mapping)
const getIndentClass = (spaces: number) => {
  const indentLevel = Math.floor(spaces / 2);
  switch (indentLevel) {
    case 0: return 'pl-0';
    case 1: return 'pl-4';
    case 2: return 'pl-8';
    case 3: return 'pl-12';
    case 4: return 'pl-16';
    default: return 'pl-20';
  }
};

// Count leading spaces
const countLeadingSpaces = (line: string) => line.match(/^ */)?.[0].length || 0;

// Computed property to format displayedText with indented divs
const formattedDisplayedText = computed(() => {
  const lines = String(displayedText.value || '').split('\n');
  let htmlOutput = '';
  lines.forEach((line, idx) => {
    const meta = getLineMeta(idx, lines);
    const baseIndent = countLeadingSpaces(line || '');
    const totalIndent = baseIndent + (meta.betweenTags && !meta.isTag ? 2 : 0);
    const indentClass = getIndentClass(totalIndent);
    const blockClass = meta.betweenTags && !meta.isTag ? 'text-wrap break-words' : '';
    const content = (line || '').substring(baseIndent);
    htmlOutput += `<div class=\"${indentClass} ${blockClass} min-h-[1.2em] block\">${content}</div>`;
  });
  if (lines.length === 1 && lines[0] === '' && !typingComplete.value) {
    htmlOutput = `<div class=\"min-h-[1.2em]\">${displayedText.value}</div>`;
  }
  return htmlOutput;
});

// --- End Indentation Logic ---

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
