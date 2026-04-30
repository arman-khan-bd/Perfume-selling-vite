import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { PERFUMES } from '../data/perfumes';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import { 
    Star, 
    Minus, 
    Plus, 
    ShoppingCart, 
    Heart, 
    Share2, 
    Truck, 
    RefreshCcw, 
    ShieldCheck,
    MessageCircle,
    ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Separator } from '@/components/ui/separator';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const product = useMemo(() => PERFUMES.find(p => p.id === id), [id]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return PERFUMES.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center space-y-6">
        <h1 className="text-3xl font-serif">সুগন্ধি পাওয়া যায়নি</h1>
        <Link to="/perfumes">
          <Button className="bg-brand-gold">সংগ্রহে ফিরে যান</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-brand-black min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] text-white/20 mb-6 md:mb-12 overflow-x-auto whitespace-nowrap pb-2">
            <Link to="/" className="hover:text-brand-gold transition-colors">অ্যাটেলিয়ার</Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <Link to="/perfumes" className="hover:text-brand-gold transition-colors">সুগন্ধি</Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span className="text-white/40">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 mb-16 md:mb-32">
          {/* Product Images */}
          <div className="space-y-4 md:space-y-6">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="aspect-[4/5] rounded-2xl md:rounded-[2rem] overflow-hidden bg-[#111111] border border-white/5 relative group"
            >
              <img 
                src={product.images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover grayscale transition-all duration-1000 md:group-hover:grayscale-0 md:group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-black/20 md:group-hover:bg-transparent transition-colors"></div>
            </motion.div>
            
            <div className="grid grid-cols-4 gap-2 md:gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-brand-gold bg-brand-gold/10' : 'border-white/5 grayscale opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center space-y-8 md:space-y-12">
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3 md:gap-4">
                   <span className="text-brand-gold text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em]">{product.category}</span>
                   <div className="h-[1px] w-8 md:w-12 bg-white/10"></div>
                   <div className="flex items-center gap-1.5 bg-white/5 px-2 md:px-3 py-0.5 md:py-1 rounded-full border border-white/5">
                      <Star className="h-2.5 w-2.5 md:h-3 md:w-3 fill-brand-gold text-brand-gold" />
                      <span className="text-[8px] md:text-[10px] text-white/60 font-bold">{product.rating}</span>
                   </div>
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold italic text-white tracking-tighter leading-tight md:leading-[0.9]">
                  {product.name}
                </h1>
                <p className="text-white/20 text-[10px] md:text-xs font-mono tracking-widest uppercase">{product.brand}</p>
              </div>

              <div className="space-y-2 md:space-y-4">
                <div className="flex items-baseline gap-3 md:gap-4">
                    <span className="text-3xl md:text-4xl font-serif font-bold text-white">৳{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                        <span className="text-base md:text-lg text-white/20 line-through">৳{product.originalPrice.toLocaleString()}</span>
                    )}
                </div>
                <span className="text-[8px] md:text-[10px] uppercase font-bold tracking-widest text-white/30">{product.size} এর সুগন্ধি</span>
              </div>

              <p className="text-white/40 font-light text-sm leading-relaxed max-w-md italic">
                "{product.description}"
              </p>
            </div>

            {/* Purchase Options */}
            <div className="space-y-6 md:space-y-8">
              <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                <div className="flex items-center border border-white/10 rounded-full p-1 bg-white/5 w-full sm:w-auto justify-between sm:justify-start">
                  <Button variant="ghost" size="icon" className="rounded-full text-white/40 h-10 w-10 md:h-12 md:w-12" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-serif font-bold text-white text-lg">{quantity}</span>
                  <Button variant="ghost" size="icon" className="rounded-full text-white/40 h-10 w-10 md:h-12 md:w-12" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button 
                    className="flex-1 w-full bg-white text-brand-black hover:bg-brand-gold hover:text-brand-black font-bold text-[9px] md:text-[10px] uppercase tracking-widest py-5 md:py-8 h-auto rounded-full shadow-2xl transition-all"
                    onClick={() => addToCart(product, quantity)}
                >
                  সুগন্ধি সংগ্রহ করুন
                </Button>
                <Button variant="outline" size="icon" className="h-14 w-14 md:h-16 md:w-16 border-white/10 text-white/40 hover:text-brand-gold hover:border-brand-gold rounded-full shrink-0 hidden sm:flex">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-8 pt-8 md:pt-12 border-t border-white/5">
                 <div className="space-y-1 md:space-y-3">
                    <h4 className="text-brand-gold text-[8px] md:text-[10px] font-bold uppercase tracking-widest">ঘ্রাণ ব্যাপ্তি (Sillage)</h4>
                    <p className="text-[10px] md:text-xs text-white/40 font-light font-mono underline decoration-white/10 underline-offset-4">২ মিটারের মধ্যে ছড়িয়ে পড়ে</p>
                 </div>
                 <div className="space-y-1 md:space-y-3">
                    <h4 className="text-brand-gold text-[8px] md:text-[10px] font-bold uppercase tracking-widest">স্থায়িত্ব</h4>
                    <p className="text-[10px] md:text-xs text-white/40 font-light font-mono underline decoration-white/10 underline-offset-4">১২+ ঘন্টা স্থায়ী থাকে</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes Section - The Alchemist's Palette */}
        <div className="mb-16 md:mb-32">
          <div className="text-center mb-10 md:mb-20 space-y-2 md:space-y-4">
              <span className="text-brand-gold text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em]">সংমিশ্রণ</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold italic text-white underline decoration-brand-gold/10 decoration-1 underline-offset-12 md:underline-offset-20">অ্যালকেমিস্টের প্যালেট</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 lg:gap-20">
            {[
                { type: 'top', label: 'টপ নোটস' },
                { type: 'middle', label: 'হার্ট নোটস' },
                { type: 'base', label: 'বেজ নোটস' }
            ].map((n, idx) => (
              <motion.div 
                key={n.type}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-[#111111] p-8 md:p-12 rounded-2xl md:rounded-[2rem] border border-white/5 relative overflow-hidden group hover:border-brand-gold/30 transition-all duration-500"
              >
                 <div className="absolute top-0 right-0 p-4 md:p-8 text-4xl md:text-6xl font-serif italic text-white/5 font-bold md:group-hover:text-brand-gold/10 transition-colors">
                    0{idx + 1}
                 </div>
                 <h3 className="text-brand-gold text-[8px] md:text-[10px] font-bold uppercase tracking-[0.6em] mb-6 md:mb-8">{n.label}</h3>
                 <div className="flex flex-wrap gap-2 md:gap-3">
                   {product.notes.filter(note => note.type === n.type).map(note => (
                      <div key={note.name} className="bg-white/5 border border-white/5 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[9px] md:text-[11px] text-white/60 font-light italic">
                         {note.name}
                      </div>
                   ))}
                 </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Separator className="bg-white/5 mb-16 md:mb-32" />

        {/* Related Section */}
        {relatedProducts.length > 0 && (
          <section className="space-y-10 md:space-y-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
              <div className="space-y-2 md:space-y-4">
                <span className="text-brand-gold text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em]">সঙ্গী</span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold italic text-white">অনুরূপ সুগন্ধি</h2>
              </div>
              <Link to="/perfumes" className="text-[8px] md:text-[10px] uppercase font-bold tracking-widest text-white/30 border-b border-white/5 pb-1 hover:text-brand-gold hover:border-brand-gold transition-all">
                 আর্কাইভ অন্বেষণ করুন
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
