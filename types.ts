
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  year: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // Percentage 0-100
  icon?: React.ReactNode;
}

export interface TimelineEvent {
  id: string;
  title: string;
  institution: string; // Or company
  period: string; // e.g., "Jan 2020 - Present" or "2016 - 2018"
  description: string | string[];
  logoUrl?: string;
}

export interface NavItem {
  name: string;
  href: string;
}
    