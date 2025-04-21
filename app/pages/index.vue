<template>
  <div class="py-8 w-full h-full flex flex-col gap-16">
    <!-- About section -->
    <div class="w-full flex justify-center md:justify-center">
      <div class="w-full md:w-[60%]">
        <AnimatedAbout />
      </div>
    </div>
    
    <!-- Projects carousel section -->
    <section class="projects-section">
      <h2 class="text-3xl font-bold text-center mb-8">My Projects</h2>
      <ProjectCarousel />
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>
