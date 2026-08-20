export type Language = 'en' | 'vi';

export interface ContactInfo {
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  portfolio: string;
  location: {
    en: string;
    vi: string;
  };
}

export interface SummaryInfo {
  en: string[];
  vi: string[];
}

export interface StrengthCategory {
  id: string;
  label: {
    en: string;
    vi: string;
  };
  description?: {
    en: string;
    vi: string;
  };
  skills: {
    name: string;
    category: 'frontend' | 'state' | 'backend' | 'ai' | 'devops' | 'tools';
    highlight?: boolean;
    tag?: {
      en: string;
      vi: string;
    };
    description?: {
      en: string;
      vi: string;
    };
  }[];
}

export interface WorkExperience {
  id: string;
  company: string;
  location: {
    en: string;
    vi: string;
  };
  title: {
    en: string;
    vi: string;
  };
  duration: {
    en: string;
    vi: string;
  };
  period: string;
  current?: boolean;
  projectHighlights: {
    name: string;
    client?: {
      en: string;
      vi: string;
    } | string;
    description: {
      en: string;
      vi: string;
    };
    role: {
      en: string;
      vi: string;
    };
    responsibilities: {
      en: string[];
      vi: string[];
    };
    impacts: {
      en: string[];
      vi: string[];
    };
    technologies: string[];
  }[];
  awards?: {
    en: string;
    vi: string;
  };
}

export interface ProjectItem {
  id: string;
  name: {
    en: string;
    vi: string;
  };
  category: 'web' | 'ai' | 'academic';
  featured?: boolean;
  organization: {
    en: string;
    vi: string;
  };
  year: {
    en: string;
    vi: string;
  } | string;
  description: {
    en: string;
    vi: string;
  };
  challengesSolved: {
    en: string[];
    vi: string[];
  };
  highlights: {
    en: string[];
    vi: string[];
  };
  architecture?: {
    en: string;
    vi: string;
  };
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  badge?: {
    en: string;
    vi: string;
  };
}

export interface EducationItem {
  school: {
    en: string;
    vi: string;
  };
  degree: {
    en: string;
    vi: string;
  };
  major: {
    en: string;
    vi: string;
  };
  duration: {
    en: string;
    vi: string;
  } | string;
  gpa: {
    en: string;
    vi: string;
  };
  honors: {
    en: string;
    vi: string;
  };
  highlights: {
    en: string[];
    vi: string[];
  };
}

export interface AwardItem {
  id: string;
  title: {
    en: string;
    vi: string;
  };
  organization: {
    en: string;
    vi: string;
  };
  year: string;
  badgeText: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
  iconName: string;
}

export interface TelemetryEvent {
  id: string;
  type: 'page_view' | 'section_view' | 'click' | 'download_cv' | 'theme_change' | 'lang_change' | 'terminal_command';
  target?: string;
  timestamp: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface NavItem {
  id: string;
  href: string;
  label: {
    en: string;
    vi: string;
  };
  icon: string;
}
