import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CartDrawer from './components/CartDrawer';
import CartStickyBar from './components/CartStickyBar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Menu from './components/Menu';
import Checkout from './components/Checkout';
import Confirmation from './components/Confirmation';
import { CartItem, FoodItem, Order, Page } from './types';
import { sendOrderEmail } from './services/emailService';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Load cart from session storage
  useEffect(() => {
    const savedCart = sessionStorage.getItem('nightbite_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to load cart', e);
      }
    }
  }, []);

  // Save cart to session storage
  useEffect(() => {
    sessionStorage.setItem('nightbite_cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (item: FoodItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    // Optional: open cart drawer on add
    // setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handlePlaceOrder = (order: Order) => {
    setLastOrder(order);
    setCart([]);
    setCurrentPage('confirmation');
    window.scrollTo(0, 0);
    
    // Trigger email notification
    sendOrderEmail(order).catch(err => {
      console.error('Email notification failed:', err);
    });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero onViewMenu={() => setCurrentPage('menu')} />
            <HowItWorks />
          </motion.div>
        );
      case 'menu':
        return (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Menu onAddToCart={handleAddToCart} />
          </motion.div>
        );
      case 'checkout':
        return (
          <motion.div
            key="checkout"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Checkout items={cart} onPlaceOrder={handlePlaceOrder} />
          </motion.div>
        );
      case 'confirmation':
        return lastOrder ? (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Confirmation 
              order={lastOrder} 
              onBackHome={() => setCurrentPage('home')} 
            />
          </motion.div>
        ) : (
          <div className="py-40 text-center">No order found</div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-orange-primary/30">
      <Navbar 
        cartCount={cartCount}
        onMenuClick={() => setIsSidebarOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
        onLogoClick={() => setCurrentPage('home')}
      />

      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setCurrentPage('checkout');
          window.scrollTo(0, 0);
        }}
      />

      <CartStickyBar 
        isVisible={cart.length > 0 && (currentPage === 'home' || currentPage === 'menu')}
        itemCount={cartCount}
        totalPrice={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="pt-16">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-xl font-bold">
          NightBite
        </div>
        <p className="text-white/40 text-sm">
          © {new Date().getFullYear()} NightBite. Late Night Food Delivery.
        </p>
        <p className="text-white/20 text-[10px] uppercase tracking-[0.3em]">
          Nathdwara • Rajasthan
        </p>
      </footer>
    </div>
  );
}
