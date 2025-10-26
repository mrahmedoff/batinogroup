import { Service, Project, TeamMember } from '@/types';

export const services: Service[] = [
  {
    id: '1',
    title: 'Avtomatlaşdırma Sistemləri',
    description: 'Sənaye avtomatlaşdırması və idarəetmə sistemləri',
    icon: 'Settings'
  },
  {
    id: '2',
    title: 'Elektrik Təchizatı',
    description: 'Elektrik avadanlıqları və təchizat həlləri',
    icon: 'Zap'
  },
  {
    id: '3',
    title: 'Mühəndislik Xidmətləri',
    description: 'Layihələndirmə və texniki məsləhət',
    icon: 'Wrench'
  },
  {
    id: '4',
    title: 'Texniki Dəstək',
    description: '24/7 texniki xidmət və təmir',
    icon: 'Headphones'
  }
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'Neft-Qaz Sənayesi',
    description: 'Avtomatlaşdırma sistemlərinin quraşdırılması',
    image: '/projects/project1.jpg',
    category: 'Sənaye'
  },
  {
    id: '2',
    title: 'Enerji Kompleksi',
    description: 'Elektrik təchizatı infrastrukturu',
    image: '/projects/project2.jpg',
    category: 'Enerji'
  },
  {
    id: '3',
    title: 'İstehsal Müəssisəsi',
    description: 'Tam avtomatlaşdırılmış istehsal xətti',
    image: '/projects/project3.jpg',
    category: 'İstehsal'
  }
];

export const team: TeamMember[] = [
  {
    id: '1',
    name: 'Əli Məmmədov',
    position: 'Baş Mühəndis',
    image: '/team/member1.jpg'
  },
  {
    id: '2',
    name: 'Leyla Həsənova',
    position: 'Layihə Meneceri',
    image: '/team/member2.jpg'
  },
  {
    id: '3',
    name: 'Rəşad İbrahimov',
    position: 'Texniki Direktor',
    image: '/team/member3.jpg'
  }
];
