export enum Category {
  ARTIST = 'artist',
  DESIGNER = 'designer'
}

export type ViewState = 'neutral' | 'artist_focus' | 'designer_focus';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'artist' | 'designer';
  imageUrl: string;
  tags: string[];
  link?: string;
  year?: string;
  // Relative positions (%) for different states
  positions: {
    neutral: { top: number; left: number; scale: number };
    artist_focus: { top: number; left: number; scale: number };
    designer_focus: { top: number; left: number; scale: number };
  };
}

export interface ResearchArea {
  title: string;
  description: string;
}

export interface CVEntry {
  year: string;
  title: string;
  organization: string;
  description?: string;
}

export interface ParticleProps {
  count?: number;
  color?: string;
}
