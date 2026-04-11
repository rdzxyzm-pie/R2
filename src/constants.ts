import { FoodItem } from './types';

export const CATEGORIES = ['All'];

export const MENU_ITEMS: FoodItem[] = [
  {
    id: 'm1',
    name: 'Nostalgic Maggi',
    price: 49,
    category: 'All',
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=800&auto=format&fit=crop',
    description: 'The ultimate midnight comfort bowl, just like home.'
  },
  {
    id: 'c1',
    name: 'Cold Coffee',
    price: 79,
    category: 'All',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop',
    description: 'Ice-cold, bold fuel for your late-night grind.'
  },
  {
    id: 's1',
    name: 'Snacks',
    price: 79,
    category: 'All',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop',
    description: 'Crispy, addictive bites to crush your cravings.'
  }
];
