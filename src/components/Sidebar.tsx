import { X, Home, Utensils, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Page } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

export default function Sidebar({ isOpen, onClose, onNavigate, currentPage }: SidebarProps) {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'menu', label: 'Menu', icon: Utensils },
    { id: 'checkout', label: 'Cart', icon: ShoppingBag },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[280px] bg-card-bg z-[70] p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-10">
              <span className="text-xl font-bold">NightBite</span>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id as Page);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                    currentPage === item.id 
                      ? 'bg-orange-primary text-white' 
                      : 'hover:bg-white/5 text-white/70'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="absolute bottom-8 left-6 right-6">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Location</p>
                <p className="text-sm font-medium">Nathdwara, Rajasthan</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
