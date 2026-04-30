import * as React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { Perfume } from '../types';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Perfume;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-[#111111] border border-white/5 overflow-hidden transition-all duration-500 hover:border-brand-gold/30 rounded-2xl"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover grayscale transition-all duration-700 md:group-hover:grayscale-0 md:group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-brand-black/20 md:group-hover:bg-transparent transition-colors"></div>
        
        {/* Badges */}
        <div className="absolute top-2 md:top-4 left-2 md:left-4 flex flex-col gap-2 z-10">
          {product.isNew && (
            <span className="bg-brand-gold text-brand-black text-[7px] md:text-[9px] font-bold uppercase tracking-widest px-2 md:px-3 py-0.5 md:py-1 rounded-full">
              নতুন
            </span>
          )}
        </div>

        {/* Quick Actions Overlay - Visible on mobile by default, hidden on hover for desktop */}
        <div className="absolute inset-x-0 bottom-0 p-2 md:p-6 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-brand-black via-brand-black/80 to-transparent">
          <Button 
            className="w-full bg-white text-brand-black hover:bg-brand-gold hover:text-brand-black font-bold text-[7px] md:text-[10px] uppercase tracking-widest py-3 md:py-6 h-auto rounded-full transition-all"
            onClick={() => addToCart(product)}
          >
            ব্যাগে যোগ করুন
          </Button>
        </div>
      </div>

      <div className="p-4 md:p-8 space-y-2 md:space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-4">
          <Link to={`/perfume/${product.id}`} className="block">
            <span className="text-brand-gold text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mb-0.5 md:mb-1 block">
              {product.category}
            </span>
            <h3 className="font-serif text-sm md:text-xl font-bold italic text-white md:group-hover:text-brand-gold transition-colors leading-tight truncate md:whitespace-normal">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1">
            <Star className="h-2 w-2 md:h-3 md:w-3 fill-brand-gold text-brand-gold" />
            <span className="text-[8px] md:text-[10px] text-white/40 font-bold">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-white/40 text-[9px] md:text-[11px] font-light truncate">
          {product.brand} • {product.size}
        </p>

        <div className="pt-2 md:pt-4 flex items-center justify-between border-t border-white/5">
          <div className="flex items-baseline gap-1 md:gap-2">
            <span className="text-sm md:text-lg font-serif font-bold text-white">৳{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-[10px] md:text-xs text-white/20 line-through">৳{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <Link to={`/perfume/${product.id}`} className="text-white/20 hover:text-brand-gold transition-colors">
            <Eye className="h-3 w-3 md:h-4 md:w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
