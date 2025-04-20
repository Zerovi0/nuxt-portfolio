<template>
  <div class="project-carousel-container w-full py-12">
    <!-- Project title heading -->
    <h2 class="text-2xl md:text-3xl font-bold text-center mb-8">
      {{ activeProject.title }}
    </h2>

    <!-- Carousel container with 3D perspective -->
    <div class="relative perspective-container w-full overflow-hidden" style="perspective: 1000px;">
      <div 
        class="carousel-track flex items-center justify-center transition-transform duration-700"
        :style="{ transform: `translateZ(-200px) rotateY(${rotationDegree}deg)` }"
      >
        <!-- Project cards -->
        <div 
          v-for="(project, index) in projects" 
          :key="project.id"
          class="project-item absolute transition-all duration-700 w-full md:w-3/4 lg:w-2/3 max-w-3xl"
          :class="{ 'active': index === activeProjectIndex }"
          :style="getProjectStyle(index)"
          @click="handleProjectClick(index)"
        >
          <!-- ProjectCard component -->
          <ProjectCard 
            :project="project" 
            :isActive="index === activeProjectIndex"
            :currentImageIndex="currentImageIndices[index] || 0"
            @next-image="index === activeProjectIndex && nextImage()"
            @prev-image="index === activeProjectIndex && prevImage()"
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
const rotationDegree = ref(0) // Current rotation of carousel
const autoRotationInterval = ref<ReturnType<typeof setInterval> | null>(null) // For auto-rotation of images

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

// Calculated positions for 3D effect
const getProjectStyle = (index: number) => {
  // Calculate the position relative to the active project
  const relativePosition = index - activeProjectIndex.value
  
  // Different transformations based on position
  if (relativePosition === 0) {
    // Active project
    return {
      transform: `rotateY(0deg) translateZ(200px)`,
      zIndex: '10',
      opacity: '1',
    }
  } else if (relativePosition === -1 || (relativePosition === projects.value.length - 1 && activeProjectIndex.value === 0)) {
    // Left project
    return {
      transform: `rotateY(40deg) translateZ(100px) translateX(-300px)`,
      zIndex: '5',
      opacity: '0.7',
    }
  } else if (relativePosition === 1 || (relativePosition === -(projects.value.length - 1) && activeProjectIndex.value === projects.value.length - 1)) {
    // Right project
    return {
      transform: `rotateY(-40deg) translateZ(100px) translateX(300px)`,
      zIndex: '5',
      opacity: '0.7',
    }
  } else {
    // Hidden projects
    return {
      transform: `rotateY(${relativePosition < 0 ? 90 : -90}deg) translateZ(-300px)`,
      zIndex: '0',
      opacity: '0',
    }
  }
}

// Handle project selection
const handleProjectClick = (index: number) => {
  // Only process click if not on active project
  if (index !== activeProjectIndex.value) {
    // Calculate rotation based on position difference
    const positionDifference = index - activeProjectIndex.value
    const newRotation = rotationDegree.value - (positionDifference * 120) // 120 degrees per position
    
    // Update state
    rotationDegree.value = newRotation
    activeProjectIndex.value = index
    
    // Reset the auto-rotation for the newly selected project
    startAutoImageRotation()
  }
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
.perspective-container {
  perspective-origin: center;
  height: 400px; /* Adjust as needed */
}

.carousel-track {
  transform-style: preserve-3d;
  height: 100%;
}

.project-item {
  transform-style: preserve-3d;
  transition: transform 0.7s ease-out, opacity 0.7s ease-out;
}

/* Ensure proper stacking */
.project-item.active {
  pointer-events: all;
}

.project-item:not(.active) {
  pointer-events: all; /* Allow clicks to select inactive projects */
  cursor: pointer;
}
</style>
