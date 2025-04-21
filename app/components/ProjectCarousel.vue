<template>
  <div class="project-carousel-container w-full py-12">
    <!-- Project title heading -->
    <h2 class="text-2xl md:text-3xl font-bold text-center mb-8">
      {{ activeProject.title }}
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
            :project="activeProject" 
            :isActive="true"
            :currentImageIndex="currentImageIndices[activeProjectIndex] || 0"
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
        <p>{{ activeProject.description }}</p>
      </div>
      <div class="technologies">
        <h3 class="text-xl font-semibold mb-2">Technologies:</h3>
        <p>{{ activeProject.technologies.join(', ') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import ProjectCard from './ProjectCard.vue'

// Define project type
interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  images: string[]
}

// Sample project data - in a real app this would likely come from an API or CMS
const projects = ref<Project[]>([
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A fully responsive e-commerce platform with product filtering, cart functionality, and payment integration.',
    technologies: ['Vue.js', 'Nuxt', 'Tailwind CSS', 'Stripe API'],
    images: ['/images/projects/ecom-1.webp', '/images/projects/ecom-2.webp', '/images/projects/ecom-3.webp']
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, task assignment, and progress tracking.',
    technologies: ['Nuxt.js', 'TypeScript', 'Pinia', 'Firebase'],
    images: ['/images/projects/ecom-1.webp', '/images/projects/ecom-2.webp', '/images/projects/ecom-3.webp']
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description: 'A minimalist portfolio website showcasing projects and skills with smooth animations and responsive design.',
    technologies: ['Nuxt.js', 'GSAP', 'Tailwind CSS'],
    images: ['/images/projects/ecom-1.webp', '/images/projects/ecom-2.webp', '/images/projects/ecom-3.webp']
  }
])

// State tracking
const activeProjectIndex = ref(1) // Start with the middle project selected
const currentImageIndices = reactive<number[]>(projects.value.map(() => 0)) // Track current image for each project
const autoRotationInterval = ref<ReturnType<typeof setInterval> | null>(null) // For auto-rotation of images
const isAnimating = ref(false) // Track if the carousel is currently animating

// Track rotation direction for animation
const rotationDirection = ref<'next' | 'prev' | null>(null);

// Active project computed property to avoid undefined errors
const activeProject = computed(() => {
  return projects.value[activeProjectIndex.value] || {
    id: 0,
    title: '',
    description: '',
    technologies: [],
    images: []
  }
})

// Rotate to next or previous project with animation
const rotateToProject = (direction: 'next' | 'prev') => {
  if (isAnimating.value) return; // Prevent multiple clicks during animation
  
  isAnimating.value = true;
  rotationDirection.value = direction;
  
  // Set a timeout to update the active project after animation completes
  setTimeout(() => {
    // Update active project index based on direction
    if (direction === 'next') {
      activeProjectIndex.value = (activeProjectIndex.value + 1) % projects.value.length;
    } else {
      activeProjectIndex.value = activeProjectIndex.value === 0 ? 
        projects.value.length - 1 : activeProjectIndex.value - 1;
    }
    
    // Reset animation flag and direction
    isAnimating.value = false;
    rotationDirection.value = null;
    
    // Reset auto-rotation of images
    startAutoImageRotation();
  }, 500); // Time should match transition duration in CSS (500ms)
}

// Navigate to previous project - wrapper for rotateToProject
const previousProject = () => {
  rotateToProject('prev');
}

// Navigate to next project - wrapper for rotateToProject
const nextProject = () => {
  rotateToProject('next');
}

// Get previous project to display on the left
const getPreviousProject = (): Project => {
  if (projects.value.length <= 1) return activeProject.value;
  
  const prevIndex = activeProjectIndex.value === 0 ? 
    projects.value.length - 1 : activeProjectIndex.value - 1;
  return projects.value[prevIndex] || activeProject.value;
}

// Get next project to display on the right
const getNextProject = (): Project => {
  if (projects.value.length <= 1) return activeProject.value;
  
  const nextIndex = (activeProjectIndex.value + 1) % projects.value.length;
  return projects.value[nextIndex] || activeProject.value;
}

// Image carousel navigation for active project
const nextImage = () => {
  const index = activeProjectIndex.value
  if (index >= 0 && index < projects.value.length) {
    const project = projects.value[index]
    if (project && project.images && project.images.length > 0) {
      // Ensure the index exists in our current image indices array
      if (currentImageIndices[index] === undefined) {
        currentImageIndices[index] = 0
      }
      
      // Update to next image
      currentImageIndices[index] = 
        (currentImageIndices[index] + 1) % project.images.length
    }
  }
}

const prevImage = () => {
  const index = activeProjectIndex.value
  if (index >= 0 && index < projects.value.length) {
    const project = projects.value[index]
    if (project && project.images && project.images.length > 0) {
      // Ensure the index exists in our current image indices array
      if (currentImageIndices[index] === undefined) {
        currentImageIndices[index] = 0
      }
      
      // Update to previous image
      currentImageIndices[index] = 
        (currentImageIndices[index] - 1 + project.images.length) % project.images.length
    }
  }
}

// Auto-rotation of images for active project
const startAutoImageRotation = () => {
  // Clear any existing interval
  if (autoRotationInterval.value) {
    clearInterval(autoRotationInterval.value)
  }
  
  // Set up new interval
  autoRotationInterval.value = setInterval(() => {
    nextImage()
  }, 5000) // 5 seconds interval
}

// Lifecycle hooks
onMounted(() => {
  startAutoImageRotation()
})

onBeforeUnmount(() => {
  // Clean up interval when component is destroyed
  if (autoRotationInterval.value) {
    clearInterval(autoRotationInterval.value)
  }
})
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
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  backface-visibility: hidden;
}

/* Active project styling */
.project-item.active {
  transform: scale(1.05) translateZ(50px);
  z-index: 10;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
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
