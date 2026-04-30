import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { 
    Trash2, 
    Minus, 
    Plus, 
    ShoppingBag, 
    ArrowRight, 
    Trash,
    ChevronLeft
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'motion/react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-24 text-center min-h-[70vh] flex flex-col items-center justify-center space-y-8 bg-brand-black">
        <div className="h-32 w-32 bg-white/5 rounded-full flex items-center justify-center animate-pulse border border-white/5">
            <ShoppingBag className="h-12 w-12 text-brand-gold opacity-30" />
        </div>
        <div className="space-y-4">
            <h1 className="text-4xl font-serif font-bold italic text-white">আপনার শপিং ব্যাগ খালি</h1>
            <p className="text-white/40 max-w-xs mx-auto">আমাদের সংগ্রহগুলো অন্বেষণ করুন এবং আজই আপনার সিগনেচার সুগন্ধি খুঁজে নিন।</p>
        </div>
        <Link to="/perfumes">
          <Button className="bg-brand-gold text-brand-black px-10 py-7 rounded-full text-lg font-bold shadow-2xl hover:scale-105 transition-transform">
            কেনাকাটা শুরু করুন
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-40 pb-16 md:pb-24 bg-brand-black min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between py-8 md:py-12 border-b border-white/5 mb-8 md:mb-16 gap-6">
            <div className="space-y-2 md:space-y-4">
              <span className="text-brand-gold text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em]">রিভিউ</span>
              <h1 className="text-3xl md:text-6xl font-serif font-bold italic tracking-tighter text-white text-white">আপনার ব্যাগ</h1>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2 md:gap-3 text-left md:text-right">
              <p className="text-white/40 text-[10px] md:text-sm font-light">
                {cart.length} টি সুগন্ধি সংগ্রহের জন্য নির্বাচিত।
              </p>
              <Button variant="ghost" onClick={clearCart} className="text-white/20 hover:text-red-500 font-bold uppercase tracking-widest text-[8px] md:text-[9px] p-0 h-auto">
                  <Trash2 className="h-3 w-3 mr-2" /> ব্যাগ খালি করুন
              </Button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-4 md:space-y-8">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-[#111111] p-4 md:p-8 rounded-2xl md:rounded-[2rem] border border-white/5 flex flex-col sm:flex-row items-center gap-4 md:gap-8 group hover:border-brand-gold/30 transition-all duration-500"
                >
                  <Link to={`/perfume/${item.id}`} className="aspect-[3/4] h-20 md:h-32 rounded-xl md:rounded-2xl overflow-hidden bg-brand-black border border-white/5 shrink-0 relative">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-transparent transition-colors"></div>
                  </Link>

                  <div className="flex-1 text-center sm:text-left space-y-0.5 md:space-y-1">
                    <Link to={`/perfume/${item.id}`}>
                        <span className="text-brand-gold text-[7px] md:text-[9px] font-bold uppercase tracking-[0.2em] opacity-60 mb-0.5 md:mb-1 block">{item.category}</span>
                        <h3 className="font-serif text-lg md:text-2xl font-bold italic text-white group-hover:text-brand-gold transition-colors">{item.name}</h3>
                    </Link>
                    <p className="text-[8px] md:text-[10px] text-white/20 font-bold uppercase tracking-[0.2em]">{item.size} এর সুগন্ধি</p>
                  </div>

                  <div className="flex items-center border border-white/10 rounded-full p-1 bg-brand-black">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-7 w-7 md:h-8 md:w-8 text-white/40"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 md:w-10 text-center font-serif font-bold text-white text-sm md:text-base">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-7 w-7 md:h-8 md:w-8 text-white/40"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="text-center sm:text-right min-w-[100px] md:min-w-[120px]">
                    <p className="text-lg md:text-2xl font-serif font-bold italic text-white tracking-tight">৳{(item.price * item.quantity).toLocaleString()}</p>
                    <p className="text-[8px] md:text-[9px] text-white/20 font-bold uppercase tracking-widest leading-none mt-1">৳{item.price.toLocaleString()} প্রতিটি</p>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white/10 hover:text-red-500 transition-colors absolute top-4 right-4 sm:relative sm:top-0 sm:right-0"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link to="/perfumes" className="inline-flex items-center gap-2 text-[8px] md:text-[10px] uppercase font-bold tracking-[0.2em] text-white/30 hover:text-brand-gold transition-all">
                <ChevronLeft className="h-3 w-3" /> আরও সুগন্ধি অন্বেষণ করুন
            </Link>
          </div>

          {/* Summary Area */}
          <div className="lg:col-span-4 h-fit sticky top-24 md:top-32">
            <div className="bg-[#111111] border border-white/5 p-6 md:p-12 rounded-3xl md:rounded-[2.5rem] space-y-6 md:space-y-12 shadow-2xl">
                <h2 className="text-brand-gold text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em]">অর্ডার সামারি</h2>
                
                <div className="space-y-4 md:space-y-6 relative z-10">
                    <div className="flex justify-between items-center text-white/40">
                        <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold">সাবটোটাল</span>
                        <span className="text-sm font-serif font-bold italic text-white">৳{cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-white/40">
                        <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold">শিপিং খরচ</span>
                        <span className="text-[8px] md:text-xs text-brand-gold font-bold uppercase tracking-[0.1em]">ফ্রি</span>
                    </div>
                    <Separator className="bg-white/5" />
                    <div className="flex justify-between items-end">
                        <div className="space-y-0.5 md:space-y-1">
                            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold">সর্বমোট মূল্য</span>
                            <p className="text-[7px] md:text-[9px] text-white/20 uppercase tracking-widest font-bold font-mono">VAT অন্তর্ভুক্ত</p>
                        </div>
                        <span className="text-2xl md:text-4xl font-serif font-bold italic tracking-tighter text-white">৳{(cartTotal).toLocaleString()}</span>
                    </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <Link to="/checkout" className="block relative z-10 group">
                      <Button className="w-full bg-white text-brand-black hover:bg-brand-gold hover:text-brand-black font-bold text-[8px] md:text-[10px] uppercase tracking-widest py-5 md:py-8 h-auto rounded-full shadow-2xl transition-all">
                          অর্ডার সম্পন্ন করুন <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                  </Link>
                  <p className="text-[7px] md:text-[9px] text-center text-white/20 uppercase tracking-[0.4em] font-bold">SSL এনক্রিপশন সক্রিয়</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
