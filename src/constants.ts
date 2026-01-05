import { Project, Category } from './types';

// Helper to generate placeholder images
const getImg = (id: number) => `/assets/images/project-${id}.png`;

export const ARTIST_PROJECTS: Project[] = [
  {
    id: 'a1',
    title: 'Six Bodies, Awaiting the Flame',
    category: 'artist',
    description: 'AI generated topographic maps.',
    imageUrl: getImg(1),
    tags: ['AI', 'Generative'],
    year: '2023',
    positions: {
      neutral: { top: 14, left: 40, scale: 1.15 },
      artist_focus: { top: 14, left: 40, scale: 1.7 },
      designer_focus: { top: 14, left: 40, scale: 0.8 },
      
    },
  },
  {
    id: 'a2',
    title: 'Pixelated Scroll for the Afterlife',
    category: 'artist',
    description: 'Interactive sound installation.',
    imageUrl: getImg(2),
    tags: ['Sound', 'Installation'],
    year: '2022',
    positions: {
      neutral: { top: 20, left: 20, scale: 1 },
      artist_focus: { top: 20, left: 20, scale: 1.6 },
      designer_focus: { top: 20, left: 20, scale: 0.8 },
      
    },
  },
  {
    id: 'a3',
    title: 'The Starlight Syntax',
    category: 'artist',
    description: 'Procedural plant generation.',
    imageUrl: getImg(3),
    tags: ['3D', 'Nature'],
    year: '2024',
    positions: {
      neutral: { top: 50, left: 15, scale: 1.2 },
      artist_focus: { top: 50, left: 15, scale: 1.6 },
      designer_focus: { top: 50, left: 15, scale: 0.8 },
      
    },
  },
  {
    id: 'a4',
    title: 'Glitch in the Shell',
    category: 'artist',
    description: 'VR storytelling experience.',
    imageUrl: getImg(4),
    tags: ['VR', 'Narrative'],
    year: '2023',
    positions: {
      
      neutral: { top: 75, left: 30, scale: 1.1 },
      artist_focus: { top: 75, left: 30, scale: 1.6 },
      designer_focus: { top: 75, left: 30, scale: 0.8 },
    },
  },
];

export const DESIGNER_PROJECTS: Project[] = [
  {
    id: 'd1',
    title: 'Mind Made Manifest',
    category: 'designer',
    description: 'Fintech mobile application interface.',
    imageUrl: getImg(5),
    tags: ['UI/UX', 'Mobile'],
    year: '2024',
    positions: {
      neutral: { top: 15, left: 60, scale: 1.1 },
      artist_focus: { top: 15, left: 60, scale: 0.8 },
      designer_focus: { top: 15, left: 60, scale: 1.7 },
      
    },
  },
  {
    id: 'd2',
    title: 'Boundless Food. Plc',
    category: 'designer',
    description: 'IoT dashboard design system.',
    imageUrl: getImg(6),
    tags: ['Dashboard', 'System'],
    year: '2023',
    positions: {
      
      neutral: { top: 25, left: 75, scale: 1 },
      artist_focus: { top: 25, left: 75, scale: 0.8 },
      designer_focus: { top: 25, left: 75, scale: 1.7 },

     
    },
  },
  {
    id: 'd3',
    title: 'Glitch in the Shell',
    category: 'designer',
    description: 'Sustainability tracking platform.',
    imageUrl: getImg(7),
    tags: ['Web', 'Data'],
    year: '2022',
    positions: {
       neutral: { top: 50, left: 75, scale: 1.1 },
      artist_focus: { top: 50, left: 75, scale: 0.8 },
      designer_focus: { top: 50, left: 75, scale: 1.7 },
      
    },
  },
  {
    id: 'd4',
    title: 'Glitch in the Shell',
    category: 'designer',
    description: 'Medical patient portal.',
    imageUrl: getImg(8),
    tags: ['Healthcare', 'Service'],
    year: '2023',
    positions: {
      neutral: { top: 75, left: 63, scale: 1.1 },
      artist_focus: { top: 75, left: 63, scale: 0.8 },
      designer_focus: { top: 75, left: 63, scale: 1.7 },
    },
  },
];

export const PROJECTS: Project[] = [...ARTIST_PROJECTS, ...DESIGNER_PROJECTS];
