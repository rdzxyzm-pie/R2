import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface CartStickyBarProps {
  isVisible: boolean;
  itemCount: number;
  totalPrice: number;
  onOpenCart: () => void;
}

export default function CartStickyBar({ isVisible, itemCount, totalPrice, onOpenCart }: CartStickyBarProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[55] px-4 pb-6 pt-4"
        >
          <div className="max-w-2xl mx-auto bg-card-bg border border-white/10 rounded-t-[24px] rounded-b-[24px] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-primary/10 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-orange-primary" />
              </div>
              <div>
                <p className="font-bold text-sm md:text-base">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} in cart
                </p>
                <p className="text-orange-primary font-black text-lg">₹{totalPrice}</p>
              </div>
            </div>

            <button
              onClick={onOpenCart}
              className="bg-orange-primary hover:bg-orange-primary/90 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 orange-glow transition-all active:scale-95"
            >
              Go to Cart <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
