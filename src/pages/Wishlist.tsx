import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="min-h-screen pt-32 pb-24 bg-brand-black px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="space-y-4">
            <Link to="/profile" className="inline-flex items-center text-brand-gold text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
              <ArrowLeft className="mr-2 h-3 w-3" /> প্রোফাইলে ফিরে যান
            </Link>
            <div className="space-y-2">
              <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px]">আপনার কিউরেশন</span>
              <h1 className="text-4xl md:text-6xl font-serif font-bold italic text-white">পছন্দের তালিকা</h1>
            </div>
          </div>
          <p className="text-white/40 max-w-xs text-sm font-light leading-relaxed">
            আপনার পছন্দের সুগন্ধিগুলো এখানে সংরক্ষিত আছে। যেকোনো সময় সংগ্রহে যোগ করতে পারেন।
          </p>
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            <AnimatePresence mode="popLayout">
              {wishlist.map((product, idx) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-32 text-center space-y-8 flex flex-col items-center bg-white/5 rounded-3xl border border-white/5 border-dashed"
          >
            <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center">
              <Heart className="h-8 w-8 text-white/20" />
            </div>
            <div className="space-y-3 px-4">
              <h3 className="text-2xl font-serif italic text-white font-bold">তালিকাটি বর্তমানে খালি</h3>
              <p className="text-white/40 max-w-sm font-light mx-auto">আপনি এখনো কোনো সুগন্ধি পছন্দ করেননি। আমাদের সংগ্রহ থেকে আপনার পছন্দের ঘ্রাণটি খুঁজে নিন।</p>
            </div>
            <Link to="/perfumes">
              <Button className="bg-brand-gold text-brand-black hover:bg-white hover:text-brand-black font-bold h-12 px-8 rounded-full text-xs uppercase tracking-widest transition-all">
                কালেকশন দেখুন <ShoppingBag className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
