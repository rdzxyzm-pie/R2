import { CheckCircle2, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { Order } from '../types';

interface ConfirmationProps {
  order: Order;
  onBackHome: () => void;
}

export default function Confirmation({ order, onBackHome }: ConfirmationProps) {
  return (
    <section className="py-24 px-6 max-w-2xl mx-auto text-center space-y-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
        className="inline-flex items-center justify-center w-24 h-24 bg-green-500/20 rounded-full"
      >
        <CheckCircle2 className="w-12 h-12 text-green-500" />
      </motion.div>

      <div className="space-y-4 max-w-lg mx-auto">
        <h2 className="text-4xl font-bold">🚀 You're Early!</h2>
        <div className="space-y-3 text-white/60 leading-relaxed">
          <p>We’re currently in our testing phase, exploring late-night cravings in Nathdwara.</p>
          <p>Your order has been noted and is helping us build something exciting just for you.</p>
          <p>If we go live, you’ll be one of our first customers 🔥</p>
          <p className="font-bold text-orange-primary pt-2">Coming soon...</p>
        </div>
      </div>

      <div className="bg-card-bg p-8 rounded-[32px] border border-white/5 text-left space-y-6">
        <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <span className="text-white/40 text-sm uppercase tracking-widest">Order ID</span>
          <span className="font-mono font-bold text-orange-primary">{order.id}</span>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Customer</p>
              <p className="font-medium">{order.customer.name}</p>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Phone</p>
              <p className="font-medium">{order.customer.phone}</p>
            </div>
          </div>

          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Items Ordered</p>
            <div className="space-y-1">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm pt-2 border-t border-white/5 text-white/60">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-white/60">
                <span>Delivery Fee</span>
                <span>₹{order.deliveryFee}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 flex justify-between items-center">
            <span className="font-bold">Total Paid</span>
            <span className="text-2xl font-black text-orange-primary">₹{order.total}</span>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBackHome}
        className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold transition-all"
      >
        <Home className="w-5 h-5" /> Back to Home
      </motion.button>
    </section>
  );
}
