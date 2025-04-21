import { ref } from 'vue'

export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  images: string[]
}

export function useProjects() {
  // Project data
  const projects = ref<Project[]>([
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A fully responsive e-commerce platform with product filtering, cart functionality, and payment integration.',
      technologies: ['Vue.js', 'Nuxt', 'Tailwind CSS', 'Stripe API'],
      images: ['/images/projects/hippo-1.png', '/images/projects/hippo-2.png', '/images/projects/hippo-3.png', '/images/projects/hippo-4.png']
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, task assignment, and progress tracking.',
      technologies: ['Nuxt.js', 'TypeScript', 'Pinia', 'Firebase'],
      images: ['/images/projects/hippo-1.png', '/images/projects/hippo-2.png', '/images/projects/hippo-3.png', '/images/projects/hippo-4.png']
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'A minimalist portfolio website showcasing projects and skills with smooth animations and responsive design.',
      technologies: ['Nuxt.js', 'GSAP', 'Tailwind CSS'],
      images: ['/images/projects/hippo-1.png', '/images/projects/hippo-2.png', '/images/projects/hippo-3.png', '/images/projects/hippo-4.png']
    }
  ])

  return {
    projects
  }
}
