<template>
  <div class="py-8 w-full h-full flex flex-col gap-16">
    <!-- About section -->
    <div class="w-full flex justify-center md:justify-center bg-[oklch(0.68_0.1378_213.14)] min-h-[550px] sm:min-h-[500px] lg:min-h-[500px] xl:min-h-[500px]">
      <div class="w-full md:w-[70%]">
        <AnimatedAbout />
      </div>
    </div>
    
    <!-- Projects carousel section -->
    <section class="projects-section">
      <h1 class="text-3xl font-bold text-center mb-0 text-[oklch(0.68_0.1378_213.14)]">My Projects</h1>
      <ProjectCarousel />
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>
