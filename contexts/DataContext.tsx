'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Service, Project, TeamMember, Message } from '@/types';
import { services as initialServices, projects as initialProjects, team as initialTeam } from '@/lib/mockData';

interface SiteSettings {
  siteName: string;
  email: string;
  phone: string;
  address: string;
  facebook: string;
  linkedin: string;
  instagram: string;
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

interface Partner {
  id: string;
  name: string;
  logo: string;
  website: string;
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
  type: 'Tam ştat' | 'Part-time' | 'Müqavilə';
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  published: boolean;
  postedDate: string;
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
  settings: SiteSettings;
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
  updateSettings: (settings: SiteSettings) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [messages, setMessages] = useState<Message[]>([]);
  const [media, setMedia] = useState<Media[]>([
    { id: '1', title: 'Yeni Layihə Açılışı', description: 'Bakıda yeni layihəmizin açılışı', type: 'Xəbər', date: '2025-01-15' },
    { id: '2', title: 'Komanda Görüşü', description: 'İllik komanda görüşümüz', type: 'Şəkil', date: '2025-01-10' },
    { id: '3', title: 'Layihə Təqdimatı', description: 'Yeni layihənin təqdimatı', type: 'Video', date: '2025-01-05' },
  ]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'BatinoGroup',
    email: 'info@batinogroup.az',
    phone: '+994 12 XXX XX XX',
    address: 'Bakı, Azərbaycan',
    facebook: '',
    linkedin: '',
    instagram: ''
  });

  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage after hydration
  useEffect(() => {
    const savedServices = localStorage.getItem('services');
    const savedProjects = localStorage.getItem('projects');
    const savedTeam = localStorage.getItem('team');
    const savedMessages = localStorage.getItem('messages');
    const savedNews = localStorage.getItem('news');
    const savedPartners = localStorage.getItem('partners');
    const savedCertificates = localStorage.getItem('certificates');
    const savedJobs = localStorage.getItem('jobs');
    const savedSettings = localStorage.getItem('settings');

    if (savedServices) setServices(JSON.parse(savedServices));
    if (savedProjects) setProjects(JSON.parse(savedProjects));
    if (savedTeam) setTeam(JSON.parse(savedTeam));
    if (savedMessages) setMessages(JSON.parse(savedMessages));
    if (savedNews) setNews(JSON.parse(savedNews));
    if (savedPartners) setPartners(JSON.parse(savedPartners));
    if (savedCertificates) setCertificates(JSON.parse(savedCertificates));
    if (savedJobs) setJobs(JSON.parse(savedJobs));
    if (savedSettings) setSettings(JSON.parse(savedSettings));

    setIsHydrated(true);
  }, []);

  // Save to localStorage only after hydration
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('services', JSON.stringify(services));
    }
  }, [services, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  }, [projects, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('team', JSON.stringify(team));
    }
  }, [team, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('messages', JSON.stringify(messages));
    }
  }, [messages, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('settings', JSON.stringify(settings));
    }
  }, [settings, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('news', JSON.stringify(news));
    }
  }, [news, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('partners', JSON.stringify(partners));
    }
  }, [partners, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('certificates', JSON.stringify(certificates));
    }
  }, [certificates, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('jobs', JSON.stringify(jobs));
    }
  }, [jobs, isHydrated]);

  const addService = (service: Service) => {
    setServices([...services, { ...service, id: Date.now().toString() }]);
  };

  const updateService = (service: Service) => {
    setServices(services.map(s => s.id === service.id ? service : s));
  };

  const deleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  const addProject = (project: Project) => {
    setProjects([...projects, { ...project, id: Date.now().toString() }]);
  };

  const updateProject = (project: Project) => {
    setProjects(projects.map(p => p.id === project.id ? project : p));
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const addTeamMember = (member: TeamMember) => {
    setTeam([...team, { ...member, id: Date.now().toString() }]);
  };

  const updateTeamMember = (member: TeamMember) => {
    setTeam(team.map(m => m.id === member.id ? member : m));
  };

  const deleteTeamMember = (id: string) => {
    setTeam(team.filter(m => m.id !== id));
  };

  const addMessage = (messageData: Omit<Message, 'id' | 'date' | 'read'>) => {
    const newMessage: Message = {
      ...messageData,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      read: false
    };
    setMessages([newMessage, ...messages]);
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  const markMessageAsRead = (id: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
  };

  // News functions
  const addNews = (newsItem: NewsItem) => {
    setNews([...news, { ...newsItem, id: Date.now().toString() }]);
  };

  const updateNews = (newsItem: NewsItem) => {
    setNews(news.map(n => n.id === newsItem.id ? newsItem : n));
  };

  const deleteNews = (id: string) => {
    setNews(news.filter(n => n.id !== id));
  };

  // Partner functions
  const addPartner = (partner: Partner) => {
    setPartners([...partners, { ...partner, id: Date.now().toString() }]);
  };

  const updatePartner = (partner: Partner) => {
    setPartners(partners.map(p => p.id === partner.id ? partner : p));
  };

  const deletePartner = (id: string) => {
    setPartners(partners.filter(p => p.id !== id));
  };

  // Certificate functions
  const addCertificate = (certificate: Certificate) => {
    setCertificates([...certificates, { ...certificate, id: Date.now().toString() }]);
  };

  const updateCertificate = (certificate: Certificate) => {
    setCertificates(certificates.map(c => c.id === certificate.id ? certificate : c));
  };

  const deleteCertificate = (id: string) => {
    setCertificates(certificates.filter(c => c.id !== id));
  };

  // Job functions
  const addJob = (job: Job) => {
    setJobs([...jobs, { ...job, id: Date.now().toString() }]);
  };

  const updateJob = (job: Job) => {
    setJobs(jobs.map(j => j.id === job.id ? job : j));
  };

  const deleteJob = (id: string) => {
    setJobs(jobs.filter(j => j.id !== id));
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
        settings,
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
