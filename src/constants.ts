import { FoodItem } from './types';

export const CATEGORIES = ['All'];

export const MENU_ITEMS: FoodItem[] = [
  {
    id: 'm1',
    name: 'Nostalgic Maggi',
    price: 49,
    category: 'All',
    image: '/maggi.jpg',
    description: 'The ultimate midnight comfort bowl, just like home.'
  },
  {
    id: 'c1',
    name: 'Cold Coffee',
    price: 79,
    category: 'All',
    image: '/coffee.jpg',
    description: 'Ice-cold, bold fuel for your late-night grind.'
  },
  {
    id: 's1',
    name: 'Snacks',
    price: 79,
    category: 'All',
    image: '/snacks.jpg',
    description: 'Crispy, addictive bites to crush your cravings.'
  }
];
