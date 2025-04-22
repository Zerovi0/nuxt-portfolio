<template>
  <div class="py-8 w-full h-full flex flex-col gap-16">
    <!-- About section -->
    <div class="w-full flex justify-center md:justify-center bg-[oklch(0.68_0.1378_213.14)] min-h-[550px] sm:min-h-[500px] lg:min-h-[500px] xl:min-h-[500px]">
      <div class="w-full md:w-[70%]">
        <AnimatedAbout />
      </div>
    </div>
    
    <!-- Skills section -->
    <section class="skills-section w-full py-12">
      <h1 class="text-3xl font-bold text-center mb-8 text-[oklch(0.68_0.1378_213.14)]">My Skills</h1>
      <SkillsHexagon :skills="skills" />
    </section>
    
    <!-- Projects carousel section -->
    <section class="projects-section">
      <h1 class="text-3xl font-bold text-center mb-0 text-[oklch(0.68_0.1378_213.14)]">My Projects</h1>
      <ProjectCarousel />
    </section>

    <!-- Contact button section -->
    <section class="w-full max-w-5xl mx-auto mt-8 mb-12 px-4">
      <div class="max-w-3xl mx-auto flex justify-center items-center gap-4">
        <Button 
          size="lg" 
          class="w-[280px] bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-8 text-lg shadow-md transition-all"
          as="a"
          href="mailto:noahw778@hotmail.com"
        >
          <Icon name="heroicons:envelope" class="mr-2" />
          Contact Me!
        </Button>
        
        <Button 
          size="icon" 
          class="w-16 h-16 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-md transition-all p-0"
          as="a"
          href="https://github.com/Zerovi0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 16 16" class="w-10 h-10" fill="currentColor">
            <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
        </Button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
import SkillsHexagon from '~/components/SkillsHexagon.vue'

definePageMeta({
  layout: 'default'
})

// Skills data with percentages
const skills = {
  'Java': 90,
  'C#': 75,
  'Nuxt.js': 60,
  'Next.js': 75,
  'Typescript': 90,
  'Javascript': 90,
  'Flutter': 65,
  'Xamarin': 60,
  'ASP.NET Core': 75,
  'Vue.js': 90,
  'React.js': 55,
  'Godot': 10
}
</script>
