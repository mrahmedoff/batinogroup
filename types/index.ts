export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}
