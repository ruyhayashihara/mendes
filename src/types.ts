export interface Testimonial {
  id: string;
  name: string;
  location: string;
  previousJob: string;
  currentJob: string;
  text: string;
  rating: number;
  avatarUrl?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  description: string;
  lessons: string[];
  skillsLearned: string[];
  tag: 'Básico' | 'Intermediário' | 'Avançado' | 'Profissional';
}

export interface InstructorProfile {
  name: string;
  role: string;
  bio: string;
  experienceYears: number;
  certifications: string[];
  trajectory: {
    year: string;
    title: string;
    description: string;
  }[];
  photoUrl: string;
}

export interface LeadFormData {
  name: string;
  whatsapp: string;
  province: string;
  currentJob: string;
  timeInJapan: string;
  hasExperience: boolean;
  notes?: string;
}
