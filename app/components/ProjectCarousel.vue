<template>
  <div class="project-carousel-container w-full py-12">
    <!-- Project title heading -->
    <h2 class="text-2xl md:text-3xl font-bold text-center mb-8">
      {{ activeProject?.title || 'Project' }}
    </h2>

    <!-- Carousel container with perspective for 3D effect -->
    <div class="carousel-container relative w-full max-w-5xl mx-auto overflow-hidden perspective">
      <!-- Project cards row with 3D transition effect -->
      <div 
        class="carousel-track flex justify-center items-center gap-4 duration-500 ease-in-out transition-all transform-style-3d"
        :class="{ 
          'rotate-carousel-prev': rotationDirection === 'prev' && isAnimating,
          'rotate-carousel-next': rotationDirection === 'next' && isAnimating
        }"
      >
        <!-- Previous project (left) -->
        <div 
          class="project-item flex-shrink-0 w-1/4 opacity-70 cursor-pointer duration-500 ease-in-out transition-all transform-style-3d"
          :class="{
            'rotate-item-to-center': rotationDirection === 'prev' && isAnimating,
            'rotate-item-to-right': rotationDirection === 'next' && isAnimating
          }"
          @click="rotateToProject('prev')"
        >
          <ProjectCard 
            :project="getPreviousProject()" 
            :isActive="false"
            :currentImageIndex="0"
            :showNavigation="false"
          />
        </div>
        
        <!-- Active project (center) -->
        <div 
          class="project-item active flex-shrink-0 w-1/2 z-10 duration-500 ease-in-out transition-all transform-style-3d"
          :class="{
            'rotate-item-to-right': rotationDirection === 'prev' && isAnimating,
            'rotate-item-to-left': rotationDirection === 'next' && isAnimating
          }"
        >
          <ProjectCard 
            :project="getActiveProject()" 
            :isActive="true"
            :currentImageIndex="getCurrentImageIndex()"
            :showNavigation="true"
            @next-image="nextImage()"
            @prev-image="prevImage()"
          />
        </div>
        
        <!-- Next project (right) -->
        <div 
          class="project-item flex-shrink-0 w-1/4 opacity-70 cursor-pointer duration-500 ease-in-out transition-all transform-style-3d"
          :class="{
            'rotate-item-to-left': rotationDirection === 'prev' && isAnimating,
            'rotate-item-to-center': rotationDirection === 'next' && isAnimating
          }"
          @click="rotateToProject('next')"
        >
          <ProjectCard 
            :project="getNextProject()" 
            :isActive="false"
            :currentImageIndex="0"
            :showNavigation="false"
          />
        </div>
      </div>
    </div>

    <!-- Project description section -->
    <div class="project-details mt-10 max-w-3xl mx-auto px-4">
      <div class="description mb-4">
        <h3 class="text-xl font-semibold mb-2">Description:</h3>
        <p>{{ activeProject?.description || 'No description available' }}</p>
      </div>
      <div class="technologies">
        <h3 class="text-xl font-semibold mb-2">Technologies:</h3>
        <p>{{ activeProject?.technologies?.join(', ') || 'None' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectCard from './ProjectCard.vue'
import { useProjects, type Project } from '~/composables/useProjects'
import { useCarousel, type CarouselOptions } from '~/composables/useCarousel'

// Get projects data from the composable
const { projects } = useProjects()

// Configure carousel options
const carouselOptions: CarouselOptions = {
  autoRotationInterval: 5000, // 5 seconds
  animationDuration: 500 // 500ms
}

// Use the carousel composable with our projects
const {
  activeIndex: activeProjectIndex,
  activeItem: activeProject,
  previousItem,
  nextItem,
  currentItemIndices,
  isAnimating,
  rotationDirection,
  previous,
  next,
  nextSubItem,
  prevSubItem
} = useCarousel<Project>(projects.value, carouselOptions)

// Default empty project to avoid null issues
const emptyProject: Project = {
  id: 0,
  title: '',
  description: '',
  technologies: [],
  images: []
}

// Get previous project to display on the left
const getPreviousProject = (): Project => {
  return previousItem.value as Project || emptyProject
}

// Get next project to display on the right
const getNextProject = (): Project => {
  return nextItem.value as Project || emptyProject
}

// Wrapper for carousel rotation
const rotateToProject = (direction: 'next' | 'prev') => {
  if (direction === 'next') {
    next()
  } else {
    previous()
  }
}

// Get active project with null safety
const getActiveProject = (): Project => {
  return activeProject.value as Project || emptyProject
}

// Get current image index with null safety
const getCurrentImageIndex = (): number => {
  return currentItemIndices[activeProjectIndex.value] || 0
}

// Image carousel navigation for active project
const nextImage = () => {
  if (activeProject.value && activeProject.value.images) {
    nextSubItem(activeProjectIndex.value, activeProject.value.images.length)
  }
}

const prevImage = () => {
  if (activeProject.value && activeProject.value.images) {
    prevSubItem(activeProjectIndex.value, activeProject.value.images.length)
  }
}
</script>

<style scoped>
/* Base carousel styles */
.carousel-container {
  position: relative;
}

.perspective {
  perspective: 1500px;
}

.transform-style-3d {
  transform-style: preserve-3d;
}

.carousel-track {
  position: relative;
}

/* Project item styling */
.project-item {
  border-radius: 0.5rem;
  backface-visibility: hidden;
}

/* Active project styling */
.project-item.active {
  transform: scale(1.02) translateZ(50px);
  z-index: 10;
}

/* Inactive projects styling */
.project-item:not(.active) {
  filter: grayscale(40%);
  cursor: pointer;
  transform: translateZ(-50px);
}

/* Rotation animations */
.rotate-carousel-next {
  transform: rotateY(-15deg);
}

.rotate-carousel-prev {
  transform: rotateY(15deg);
}

/* Item animations */
.rotate-item-to-center {
  transform: rotateY(0deg) translateZ(50px) scale(1.05);
  z-index: 10;
  filter: grayscale(0%);
}

.rotate-item-to-left {
  transform: rotateY(45deg) translateZ(-50px) translateX(-30%) scale(0.9);
  z-index: 1;
  filter: grayscale(40%);
}

.rotate-item-to-right {
  transform: rotateY(-45deg) translateZ(-50px) translateX(30%) scale(0.9);
  z-index: 1;
  filter: grayscale(40%);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .carousel-track {
    flex-direction: column;
    gap: 2rem;
  }
  
  .project-item {
    width: 90% !important;
  }
  
  /* Disable 3D effects on mobile */
  .perspective {
    perspective: none;
  }
  
  .transform-style-3d {
    transform-style: flat;
  }
  
  .rotate-carousel-next,
  .rotate-carousel-prev,
  .rotate-item-to-center,
  .rotate-item-to-left,
  .rotate-item-to-right {
    transform: none;
  }
}
</style>
