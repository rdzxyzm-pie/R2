import { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES, MENU_ITEMS } from '../constants';
import { FoodItem } from '../types';

interface MenuProps {
  onAddToCart: (item: FoodItem) => void;
}

export default function Menu({ onAddToCart }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold">Our Menu</h2>
        <p className="text-white/40">Pick your late-night favorites</p>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
              activeCategory === category 
                ? 'bg-orange-primary text-white orange-glow' 
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Grid - EXACTLY 2 columns on mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -8 }}
              className="bg-card-bg rounded-[24px] overflow-hidden border border-white/5 flex flex-col group"
            >
              <div className="aspect-square overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between relative">
                <div>
                  <h3 className="font-bold text-sm md:text-lg line-clamp-1">{item.name}</h3>
                  <p className="text-white/40 text-[10px] md:text-xs line-clamp-2 mt-0.5">{item.description}</p>
                  <p className="text-orange-primary font-black text-lg mt-1">₹{item.price}</p>
                </div>
                
                <button
                  onClick={() => onAddToCart(item)}
                  className="absolute bottom-4 right-4 w-10 h-10 bg-orange-primary rounded-full flex items-center justify-center text-white orange-glow hover:scale-110 active:scale-90 transition-all"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
