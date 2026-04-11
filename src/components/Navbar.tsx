import { Menu, ShoppingCart, Moon } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  onMenuClick: () => void;
  onCartClick: () => void;
  onLogoClick: () => void;
}

export default function Navbar({ cartCount, onMenuClick, onCartClick, onLogoClick }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
      <button 
        onClick={onMenuClick}
        className="p-2 hover:bg-white/5 rounded-full transition-colors"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      <div 
        onClick={onLogoClick}
        className="flex items-center gap-1 cursor-pointer group"
      >
        <span className="text-xl font-bold tracking-tight">NightBite</span>
        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Moon className="w-5 h-5 text-orange-primary fill-orange-primary" />
        </motion.div>
      </div>

      <button 
        onClick={onCartClick}
        className="p-2 hover:bg-white/5 rounded-full transition-colors relative"
      >
        <ShoppingCart className="w-6 h-6 text-white" />
        {cartCount > 0 && (
          <span className="absolute top-0 right-0 bg-orange-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-dark-bg">
            {cartCount}
          </span>
        )}
      </button>
    </nav>
  );
}
