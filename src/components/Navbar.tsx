import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-black/90 backdrop-blur-md border-b border-white/5 py-2 md:py-3' : 'bg-transparent py-3 md:py-5'}`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Mobile Menu */}
        <div className="flex md:hidden items-center gap-2">
          <Sheet>
            <SheetTrigger 
              render={
                <Button variant="ghost" size="icon" className="text-brand-silver h-9 w-9" />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-brand-black border-white/10 text-brand-silver">
              <div className="flex flex-col gap-6 mt-10">
                <Link to="/" className="text-2xl font-serif text-brand-gold font-bold italic">আতর ও আউদ</Link>
                <Link to="/" className="text-lg font-medium hover:text-brand-gold transition-colors">হোম</Link>
                <Link to="/perfumes" className="text-lg font-medium hover:text-brand-gold transition-colors">কালেকশন</Link>
                <Link to="/perfumes?category=আউদ" className="text-lg font-medium hover:text-brand-gold transition-colors">আউদ কালেকশন</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Logo */}
        <Link to="/" className="text-2xl md:text-3xl font-serif text-brand-gold font-bold italic tracking-tighter hidden md:block uppercase">
          লুমিনা
        </Link>
        <Link to="/" className="text-xl font-serif text-brand-gold font-bold italic tracking-tighter md:hidden uppercase">
           লুমিনা
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <Link to="/" className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/60 hover:text-brand-gold transition-all">হোম</Link>
          <Link to="/perfumes" className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/60 hover:text-brand-gold transition-all">কালেকশন</Link>
          <Link to="/perfumes?category=আউদ" className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/60 hover:text-brand-gold transition-all">আউদ নোটস</Link>
          <Link to="/perfumes?category=মাস্ক" className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/60 hover:text-brand-gold transition-all">ঐতিহ্য</Link>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-2 md:gap-6">
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search className="h-5 w-5 text-white/60" />
          </Button>
          <Link to="/profile">
            <div className="flex h-8 w-8 rounded-full bg-white/5 border border-white/10 items-center justify-center hover:bg-white/10 transition-colors">
              <User className="h-4 w-4 text-white/60" />
            </div>
          </Link>
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative group">
              <ShoppingBag className="h-5 w-5 text-white/60 group-hover:text-brand-gold transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-black text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>

      {/* Global Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-brand-dark border-t border-white/5 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-12">
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="আপনার সিগনেচার সুগন্ধি খুঁজুন..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-8 text-lg font-serif text-white focus:outline-none focus:border-brand-gold/50 transition-colors"
                  autoFocus
                />
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
                    onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
