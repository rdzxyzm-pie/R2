import { Utensils, ShoppingBag, Truck } from 'lucide-react';
import { motion } from 'motion/react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Utensils,
      title: 'Browse the menu',
      description: 'Explore our late-night specials',
      step: '01'
    },
    {
      icon: ShoppingBag,
      title: 'Add items to cart',
      description: 'Pick your midnight favorites',
      step: '02'
    },
    {
      icon: Truck,
      title: 'Place your order',
      description: "We'll get it to you fast",
      step: '03'
    }
  ];

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">How It Works</h2>
        <p className="text-white/40">Simple steps to satisfy your hunger</p>
      </div>

      <div className="space-y-4">
        {steps.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-card-bg p-6 rounded-[24px] border border-white/5 flex items-center gap-6 group hover:border-orange-primary/30 transition-all"
          >
            <div className="w-14 h-14 bg-orange-primary rounded-full flex items-center justify-center shrink-0 orange-glow">
              <item.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-white/40 text-sm">{item.description}</p>
            </div>
            <span className="text-3xl font-black text-white/5 group-hover:text-orange-primary/20 transition-colors">
              {item.step}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
