import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CartItem, Order } from '../types';

interface CheckoutProps {
  items: CartItem[];
  onPlaceOrder: (order: Order) => void;
}

export default function Checkout({ items, onPlaceOrder }: CheckoutProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 15;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const order: Order = {
      id: 'NB-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      items: [...items],
      subtotal,
      deliveryFee,
      total,
      customer: formData,
      timestamp: Date.now()
    };

    console.log('Order Placed:', order);
    onPlaceOrder(order);
  };

  return (
    <section className="py-24 px-6 max-w-2xl mx-auto space-y-12">
      <h2 className="text-4xl font-bold text-center">Checkout</h2>

      <div className="space-y-8">
        {/* Order Summary Card */}
        <div className="bg-card-bg p-6 rounded-[24px] border border-white/5 space-y-4">
          <h3 className="text-lg font-bold border-b border-white/10 pb-4">Order Summary</h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-white/60">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between text-white/60 pt-2 border-t border-white/5">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
          </div>
          <div className="border-t border-white/10 pt-4 flex justify-between text-xl font-bold">
            <span>Total Amount</span>
            <span className="text-orange-primary">₹{total}</span>
          </div>
        </div>

        {/* Delivery Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/40 uppercase tracking-widest">Full Name</label>
            <input 
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-orange-primary outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/40 uppercase tracking-widest">Phone Number</label>
            <input 
              required
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter your phone number"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-orange-primary outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/40 uppercase tracking-widest">Delivery Address</label>
            <textarea 
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Enter your full address"
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-orange-primary outline-none transition-all resize-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-orange-primary hover:bg-orange-primary/90 text-white font-bold py-5 rounded-2xl transition-all orange-glow text-lg"
          >
            Place Order - ₹{total}
          </motion.button>
        </form>
      </div>
    </section>
  );
}
