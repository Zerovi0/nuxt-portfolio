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
      "Initially it was a struggle using and modifying components on the marketplace to speed up development, "+
      "but it was valuable in learning to work with other people's code",
      technologies: ['Flutter', 'Dart', 'ASP.NET Core', 'Firebase'],
      images: ['/images/projects/hippo-1.png', '/images/projects/hippo-2.png', '/images/projects/hippo-3.png', '/images/projects/hippo-4.png']
    },
    {
      id: 2,
      title: 'Flyer Identification System',
      description: 'An AI powered app to identify and track prices of products from flyers.\n\n'+
      "This app was built for a client, Prestiege Lock and Door. The team and I struggled with properly utilizing one anothers code and navigating a large project for the first time. "+
      "Overall it was a poositive learning experience, teaching the importance of writing maintainable code and communication on a team. I also learned a new tech stack along the way.",
      technologies: ['Next.js', 'Javascript', 'OpenAI',"Google Gemini", "RabbitMQ", "PostgreSQL", "Vector Embeddings", "PowerShell"],
      images: ['/images/projects/flyers-1.png', '/images/projects/flyers-2.png', '/images/projects/flyers-3.png', '/images/projects/flyers-4.png', '/images/projects/flyers-5.png', '/images/projects/flyers-6.png', '/images/projects/flyers-7.png', '/images/projects/flyers-8.png', '/images/projects/flyers-9.png']
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'A minimalist portfolio website showcasing projects and skills with smooth animations and responsive design.\n\n'+
      "This app was my first endeavour with Nuxt.js and it was a great experience! I will definitely be using this technology again.",
      technologies: ['Nuxt.js', 'TypeScript', 'Tailwind CSS', "Shadcn UI"],
      images: ['/images/projects/portfolio-1.png', '/images/projects/portfolio-2.png']
    }
  ])

  return {
    projects
  }
}
