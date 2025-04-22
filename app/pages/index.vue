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
      <div class="max-w-3xl mx-auto flex justify-center">
        <Button 
          size="lg" 
          class="w-[280px] bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-8 text-lg shadow-md transition-all"
          as="a"
          href="mailto:noahw778@hotmail.com"
        >
          <Icon name="heroicons:envelope" class="mr-2" />
          Contact Me!
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
