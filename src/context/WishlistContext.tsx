import React, { createContext, useContext, useState, useEffect } from 'react';
import { Perfume } from '../types';
import { toast } from 'sonner';

interface WishlistContextType {
  wishlist: Perfume[];
  addToWishlist: (product: Perfume) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Perfume) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Perfume[]>([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('perfume_wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  const addToWishlist = (product: Perfume) => {
    if (!wishlist.find(p => p.id === product.id)) {
      const newWishlist = [...wishlist, product];
      setWishlist(newWishlist);
      localStorage.setItem('perfume_wishlist', JSON.stringify(newWishlist));
      toast.success(`${product.name} পছন্দের তালিকায় যুক্ত হয়েছে`);
    }
  };

  const removeFromWishlist = (productId: string) => {
    const newWishlist = wishlist.filter(p => p.id !== productId);
    setWishlist(newWishlist);
    localStorage.setItem('perfume_wishlist', JSON.stringify(newWishlist));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  const toggleWishlist = (product: Perfume) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.info('পছন্দের তালিকা থেকে সরানো হয়েছে');
    } else {
      addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlist, 
      addToWishlist, 
      removeFromWishlist, 
      isInWishlist,
      toggleWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
