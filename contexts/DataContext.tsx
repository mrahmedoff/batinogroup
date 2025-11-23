'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Service, Project, TeamMember, Message } from '@/types';
import { addDocument, updateDocument, deleteDocument, getDocuments } from '@/lib/firebaseHelpers';

interface SiteSettings {
  siteName: string;
  email: string;
  phone: string;
  address: string;
  facebook: string;
  linkedin: string;
  instagram: string;
  logo: string;
  voen: string;
}

interface Media {
  id: string;
  title: string;
  description: string;
  type: 'Şəkil' | 'Video' | 'Xəbər';
  date: string;
}

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  published: boolean;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
  type: 'Müştəri' | 'Tərəfdaş';
  description: string;
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  certificateNumber: string;
  type: string;
  file: string;
}

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  published: boolean;
  postedDate: string;
}

interface HeroSlide {
  id: string;
  title: string;
  description: string;
  image: string;
  order: number;
  active: boolean;
  buttonText?: string;
  buttonLink?: string;
}

interface DataContextType {
  services: Service[];
  projects: Project[];
  team: TeamMember[];
  messages: Message[];
  media: Media[];
  news: NewsItem[];
  partners: Partner[];
  certificates: Certificate[];
  jobs: Job[];
  heroSlides: HeroSlide[];
  settings: SiteSettings;
  isLoading: boolean;
  refreshData: () => Promise<void>;
  refreshHeroSlides: () => Promise<void>;
  addService: (service: Service) => void;
  updateService: (service: Service) => void;
  deleteService: (id: string) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (member: TeamMember) => void;
  deleteTeamMember: (id: string) => void;
  addMessage: (message: Omit<Message, 'id' | 'date' | 'read'>) => void;
  deleteMessage: (id: string) => void;
  markMessageAsRead: (id: string) => void;
  addNews: (news: NewsItem) => void;
  updateNews: (news: NewsItem) => void;
  deleteNews: (id: string) => void;
  addPartner: (partner: Partner) => void;
  updatePartner: (partner: Partner) => void;
  deletePartner: (id: string) => void;
  addCertificate: (certificate: Certificate) => void;
  updateCertificate: (certificate: Certificate) => void;
  deleteCertificate: (id: string) => void;
  addJob: (job: Job) => void;
  updateJob: (job: Job) => void;
  deleteJob: (id: string) => void;
  addHeroSlide: (slide: HeroSlide) => void;
  updateHeroSlide: (slide: HeroSlide) => void;
  deleteHeroSlide: (id: string) => void;
  updateSettings: (settings: SiteSettings) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      title: 'Industrial Automation',
      description: 'Complete automation solutions for industrial processes with cutting-edge technology and reliable systems.',
      icon: 'Settings'
    },
    {
      id: '2',
      title: 'Electrical Engineering',
      description: 'Professional electrical engineering services including design, installation, and maintenance of electrical systems.',
      icon: 'Zap'
    },
    {
      id: '3',
      title: 'Technical Consulting',
      description: 'Expert technical consulting services to optimize your operations and implement best practices.',
      icon: 'Wrench'
    },
    {
      id: '4',
      title: '24/7 Support',
      description: 'Round-the-clock technical support and maintenance services to ensure continuous operation.',
      icon: 'Headphones'
    }
  ]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'BatinoGroup',
    email: 'info@batinogroup.az',
    phone: '+994 12 XXX XX XX',
    address: 'Baku, Azerbaijan',
    facebook: '',
    linkedin: '',
    instagram: '',
    logo: '/batinologo.png',
    voen: '1234567890'
  });

  const [isLoading, setIsLoading] = useState(true);

  // Load data function
  const loadData = async () => {
    try {
      // Check if running in browser
      if (typeof window === 'undefined') {
        setIsLoading(false);
        return;
      }

      const [
        servicesData,
        projectsData,
        teamData,
        messagesData,
        newsData,
        partnersData,
        certificatesData,
        jobsData,
        heroSlidesData,
        settingsData,
      ] = await Promise.all([
        getDocuments('services'),
        getDocuments('projects'),
        getDocuments('team'),
        getDocuments('messages'),
        getDocuments('news'),
        getDocuments('partners'),
        getDocuments('certificates'),
        getDocuments('jobs'),
        getDocuments('hero-slides'),
        getDocuments('settings'),
      ]);

      // Only update services if Firebase has data, otherwise keep default
      if (servicesData && servicesData.length > 0) {
        setServices(servicesData as any);
      }
      setProjects(projectsData as any);
      setTeam(teamData as any);
      setMessages(messagesData as any);
      setNews(newsData as any);
      setPartners(partnersData as any);
      setCertificates(certificatesData as any);

      // Filter out invalid jobs
      console.log('Raw jobs loaded:', jobsData.length, 'jobs found');

      const validJobs = jobsData.filter((job: any) => {
        if (!job || !job.id || Object.keys(job).length <= 1) {
          console.warn('Filtering out invalid job:', job);
          return false;
        }
        return true;
      });

      console.log('Valid jobs after filtering:', validJobs.length);

      if (validJobs.length !== jobsData.length) {
        console.warn(`Filtered out ${jobsData.length - validJobs.length} invalid jobs`);
      }

      setJobs(validJobs as any);
      setHeroSlides((heroSlidesData as HeroSlide[]).sort((a, b) => a.order - b.order));
      if (settingsData.length > 0) setSettings(settingsData[0] as any);
    } catch (error) {
      console.error('Error loading data from Firebase:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh all data
  const refreshData = async () => {
    setIsLoading(true);
    await loadData();
  };

  // Refresh only hero slides
  const refreshHeroSlides = async () => {
    try {
      const heroSlidesData = await getDocuments('hero-slides');
      setHeroSlides((heroSlidesData as HeroSlide[]).sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error('Error refreshing hero slides:', error);
    }
  };

  // Load from Firebase on mount
  useEffect(() => {
    loadData();
  }, []);

  const addService = async (service: Service) => {
    try {
      const newService = await addDocument('services', service);
      setServices([...services, newService as Service]);
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const updateService = async (service: Service) => {
    try {
      await updateDocument('services', service.id, service);
      setServices(services.map(s => s.id === service.id ? service : s));
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const deleteService = async (id: string) => {
    try {
      await deleteDocument('services', id);
      setServices(services.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const addProject = async (project: Project) => {
    try {
      const newProject = await addDocument('projects', project);
      setProjects([...projects, newProject as Project]);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const updateProject = async (project: Project) => {
    try {
      await updateDocument('projects', project.id, project);
      setProjects(projects.map(p => p.id === project.id ? project : p));
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await deleteDocument('projects', id);
      setProjects(projects.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const addTeamMember = async (member: TeamMember) => {
    try {
      const newMember = await addDocument('team', member);
      setTeam([...team, newMember as TeamMember]);
    } catch (error) {
      console.error('Error adding team member:', error);
    }
  };

  const updateTeamMember = async (member: TeamMember) => {
    try {
      await updateDocument('team', member.id, member);
      setTeam(team.map(m => m.id === member.id ? member : m));
    } catch (error) {
      console.error('Error updating team member:', error);
    }
  };

  const deleteTeamMember = async (id: string) => {
    try {
      await deleteDocument('team', id);
      setTeam(team.filter(m => m.id !== id));
    } catch (error) {
      console.error('Error deleting team member:', error);
    }
  };

  const addMessage = async (messageData: Omit<Message, 'id' | 'date' | 'read'>) => {
    try {
      const newMessage: Omit<Message, 'id'> = {
        ...messageData,
        date: new Date().toISOString().split('T')[0],
        read: false
      };
      const addedMessage = await addDocument('messages', newMessage);
      setMessages([addedMessage as Message, ...messages]);
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      await deleteDocument('messages', id);
      setMessages(messages.filter(m => m.id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const markMessageAsRead = async (id: string) => {
    try {
      const message = messages.find(m => m.id === id);
      if (message) {
        await updateDocument('messages', id, { ...message, read: true });
        setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const updateSettings = async (newSettings: SiteSettings) => {
    try {
      // Settings-də yalnız 1 document olmalıdır
      const settingsDocs = await getDocuments('settings');
      if (settingsDocs.length > 0) {
        await updateDocument('settings', settingsDocs[0].id, newSettings);
      } else {
        await addDocument('settings', newSettings);
      }
      setSettings(newSettings);
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  // News functions
  const addNews = async (newsItem: NewsItem) => {
    try {
      const newNews = await addDocument('news', newsItem);
      setNews([...news, newNews as NewsItem]);
    } catch (error) {
      console.error('Error adding news:', error);
    }
  };

  const updateNews = async (newsItem: NewsItem) => {
    try {
      await updateDocument('news', newsItem.id, newsItem);
      setNews(news.map(n => n.id === newsItem.id ? newsItem : n));
    } catch (error) {
      console.error('Error updating news:', error);
    }
  };

  const deleteNews = async (id: string) => {
    try {
      await deleteDocument('news', id);
      setNews(news.filter(n => n.id !== id));
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  // Partner functions
  const addPartner = async (partner: Partner) => {
    try {
      const newPartner = await addDocument('partners', partner);
      setPartners([...partners, newPartner as Partner]);
    } catch (error) {
      console.error('Error adding partner:', error);
    }
  };

  const updatePartner = async (partner: Partner) => {
    try {
      await updateDocument('partners', partner.id, partner);
      setPartners(partners.map(p => p.id === partner.id ? partner : p));
    } catch (error) {
      console.error('Error updating partner:', error);
    }
  };

  const deletePartner = async (id: string) => {
    try {
      await deleteDocument('partners', id);
      setPartners(partners.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting partner:', error);
    }
  };

  // Certificate functions
  const addCertificate = async (certificate: Certificate) => {
    try {
      const newCertificate = await addDocument('certificates', certificate);
      setCertificates([...certificates, newCertificate as Certificate]);
    } catch (error) {
      console.error('Error adding certificate:', error);
    }
  };

  const updateCertificate = async (certificate: Certificate) => {
    try {
      await updateDocument('certificates', certificate.id, certificate);
      setCertificates(certificates.map(c => c.id === certificate.id ? certificate : c));
    } catch (error) {
      console.error('Error updating certificate:', error);
    }
  };

  const deleteCertificate = async (id: string) => {
    try {
      await deleteDocument('certificates', id);
      setCertificates(certificates.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting certificate:', error);
    }
  };

  // Job functions
  const addJob = async (job: Job) => {
    try {
      const newJob = await addDocument('jobs', job);
      console.log('New job added:', newJob.id);
      setJobs([...jobs, newJob as Job]);
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const updateJob = async (job: Job) => {
    try {
      await updateDocument('jobs', job.id, job);
      setJobs(jobs.map(j => j.id === job.id ? job : j));
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const deleteJob = async (id: string) => {
    try {
      // Validate ID
      if (!id || id.trim() === '' || id === 'undefined' || id === 'null') {
        throw new Error('Job ID is required and must be valid');
      }

      console.log('Deleting job:', id);
      await deleteDocument('jobs', id);
      setJobs(jobs.filter(j => j.id !== id));
      console.log('Job deleted successfully');

    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  };

  // Hero Slide functions
  const addHeroSlide = async (slide: HeroSlide) => {
    try {
      const newSlide = await addDocument('hero-slides', slide);
      setHeroSlides([...heroSlides, newSlide as HeroSlide].sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error('Error adding hero slide:', error);
    }
  };

  const updateHeroSlide = async (slide: HeroSlide) => {
    try {
      await updateDocument('hero-slides', slide.id, slide);
      setHeroSlides(heroSlides.map(s => s.id === slide.id ? slide : s).sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error('Error updating hero slide:', error);
    }
  };

  const deleteHeroSlide = async (id: string) => {
    try {
      await deleteDocument('hero-slides', id);
      setHeroSlides(heroSlides.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting hero slide:', error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        services,
        projects,
        team,
        messages,
        media,
        news,
        partners,
        certificates,
        jobs,
        heroSlides,
        settings,
        isLoading,
        refreshData,
        refreshHeroSlides,
        addService,
        updateService,
        deleteService,
        addProject,
        updateProject,
        deleteProject,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addMessage,
        deleteMessage,
        markMessageAsRead,
        addNews,
        updateNews,
        deleteNews,
        addPartner,
        updatePartner,
        deletePartner,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        addJob,
        updateJob,
        deleteJob,
        addHeroSlide,
        updateHeroSlide,
        deleteHeroSlide,
        updateSettings,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
