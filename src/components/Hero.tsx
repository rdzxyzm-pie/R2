import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onViewMenu: () => void;
}

export default function Hero({ onViewMenu }: HeroProps) {
  return (
    <section className="relative h-[80vh] flex items-center px-6 overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=1920&auto=format&fit=crop" 
          alt="Late night food"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-xl space-y-6">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-orange-primary font-bold tracking-[0.2em] text-sm"
        >
          NATHDWARA, RAJASTHAN
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold leading-[1.1]"
        >
          Late Night Food in <span className="text-orange-primary">Nathdwara</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/60 text-lg md:text-xl max-w-md"
        >
          Craving something after 10 PM? Get your favorite snacks delivered.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onViewMenu}
          className="bg-orange-primary hover:bg-orange-primary/90 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 orange-glow transition-all"
        >
          View Menu <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </section>
  );
}
