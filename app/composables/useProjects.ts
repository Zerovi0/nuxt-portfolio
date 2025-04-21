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
      title: 'Hippotherapy App',
      description: "A fully responsive flutter app for therapists in the hippotherapy field to track session data and patients.\n\n"+
      "Initially it was a struggle using and modifying components on the marketplace to speed up development,"+
      "but it was valuable in learning to work with other people's code",
      technologies: ['Flutter', 'Dart', 'ASP.NET Core', 'Firebase'],
      images: ['/images/projects/hippo-1.png', '/images/projects/hippo-2.png', '/images/projects/hippo-3.png', '/images/projects/hippo-4.png']
    },
    {
      id: 2,
      title: 'Flyer Identification System',
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
