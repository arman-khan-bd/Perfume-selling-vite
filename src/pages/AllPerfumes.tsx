import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PERFUMES } from '../data/perfumes';
import ProductCard from '../components/ProductCard';
import { Input } from '../components/ui/input';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Checkbox } from '../components/ui/checkbox';
import { Slider } from '../components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { motion, AnimatePresence } from 'motion/react';

const AllPerfumes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categoryOptions = ['আউদ', 'মাস্ক', 'ফ্লোরাল', 'ফ্রেশ', 'ওরিয়েন্টাল'];

  // Sync with URL params
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && !selectedCategories.includes(cat)) {
      setSelectedCategories([cat]);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return PERFUMES.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                            p.brand.toLowerCase().includes(search.toLowerCase());
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      return matchesSearch && matchesPrice && matchesCategory;
    });
  }, [search, priceRange, selectedCategories]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setPriceRange([0, 10000]);
    setSelectedCategories([]);
    setSearchParams({});
  };

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-brand-black min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between py-8 md:py-12 border-b border-white/5 mb-8 md:mb-16 gap-6">
          <div className="space-y-2 md:space-y-4">
            <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[8px] md:text-[10px]">কিউরেশন</span>
            <h1 className="text-3xl md:text-6xl font-serif font-bold italic tracking-tight text-white text-white">আর্কাইভ</h1>
          </div>
          <p className="text-white/40 max-w-xs text-xs md:text-sm font-light leading-relaxed">
            বিরল উপাদান থেকে পাতন করা আমাদের সুগন্ধি সংগ্রহের সম্পূর্ণ আর্কাইভ।
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Desktop Filters (Sidebar) */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-12">
            <div className="space-y-6">
              <h3 className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.4em]">আর্কাইভ খুঁজুন</h3>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <Input 
                  placeholder="কীওয়ার্ড লিখুন..." 
                  className="bg-white/5 border-white/10 text-white pl-12 h-12 focus:border-brand-gold/50 rounded-full"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.4em]">সুগন্ধি পরিবার</h3>
              <div className="space-y-4">
                {categoryOptions.map(cat => (
                  <div key={cat} className="flex items-center space-x-3 cursor-pointer group">
                    <Checkbox 
                        id={cat} 
                        checked={selectedCategories.includes(cat)} 
                        onCheckedChange={() => toggleCategory(cat)}
                        className="bg-transparent border-white/20 data-[state=checked]:bg-brand-gold data-[state=checked]:border-brand-gold"
                    />
                    <label 
                      htmlFor={cat} 
                      className="text-sm font-light text-white/40 group-hover:text-brand-gold transition-colors cursor-pointer"
                    >
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.4em]">মূল্যায়ন</h3>
                    <span className="text-[10px] font-mono text-white/40">৳{priceRange[0]} - ৳{priceRange[1]}</span>
                </div>
                <div className="px-2">
                    <Slider 
                        defaultValue={[0, 10000]} 
                        max={10000} 
                        step={100} 
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="py-4"
                    />
                </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full border-white/10 text-white/40 hover:bg-white/5 hover:text-white rounded-full text-[10px] uppercase font-bold tracking-widest py-6"
              onClick={clearFilters}
            >
              আর্কাইভ রিসেট করুন
            </Button>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex items-center justify-between mb-12 bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3">
                 <div className="h-2 w-2 rounded-full bg-brand-gold animate-pulse"></div>
                 <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">
                   {filteredProducts.length} টি সুগন্ধি উপলব্ধ
                 </span>
              </div>
              <Sheet>
                <SheetTrigger 
                  render={
                    <Button variant="outline" className="border-white/10 text-white rounded-full h-10 px-4 text-[10px] uppercase tracking-widest font-bold" />
                  }
                >
                  <>
                    <SlidersHorizontal className="mr-2 h-3 w-3 text-brand-gold" /> ফিল্টার
                  </>
                </SheetTrigger>
                <SheetContent side="bottom" className="bg-brand-black border-t-white/10 h-[85vh] overflow-y-auto">
                    <div className="space-y-12 pt-10 px-4">
                        <div className="space-y-4">
                            <h3 className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.4em]">সুগন্ধি ফিল্টার</h3>
                            <p className="text-white/40 text-xs font-light">আপনার পছন্দের সুঘ্রাণটি বেছে নিন</p>
                        </div>
                        
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h4 className="text-[10px] uppercase text-white/30 tracking-widest font-bold">পরিবার</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {categoryOptions.map(cat => (
                                        <div key={cat} className="flex items-center space-x-3">
                                            <Checkbox 
                                                id={`mob-${cat}`} 
                                                checked={selectedCategories.includes(cat)} 
                                                onCheckedChange={() => toggleCategory(cat)}
                                                className="border-white/20"
                                            />
                                            <label htmlFor={`mob-${cat}`} className="text-sm font-light text-white/60">{cat}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-[10px] uppercase text-white/30 tracking-widest font-bold">মূল্য ফিল্টার</h4>
                                <Slider 
                                    defaultValue={[0, 10000]} 
                                    max={10000} 
                                    step={100} 
                                    value={priceRange}
                                    onValueChange={setPriceRange}
                                />
                                <div className="flex justify-between text-[11px] font-mono text-white/40">
                                    <span>৳{priceRange[0]}</span>
                                    <span>৳{priceRange[1]}</span>
                                </div>
                            </div>

                            <Button className="w-full bg-brand-gold text-brand-black font-bold rounded-full py-7 text-[10px] uppercase tracking-[0.2em]" onClick={() => {}}>
                                ফিল্টার প্রয়োগ করুন
                            </Button>
                        </div>
                    </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 md:gap-x-8 gap-y-6 md:gap-y-12">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((p, idx) => (
                    <motion.div
                      layout
                      key={p.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                    >
                      <ProductCard product={p} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="py-32 text-center space-y-8 flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-white/5 border border-white/5 flex items-center justify-center">
                    <Search className="h-8 w-8 text-white/20" />
                </div>
                <div className="space-y-3">
                    <h3 className="text-3xl font-serif italic text-white font-bold">সুগন্ধি পাওয়া যায়নি</h3>
                    <p className="text-white/40 max-w-sm font-light">আর্কাইভে এই সুঘ্রাণের কোনো রেকর্ড নেই। আপনার ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।</p>
                </div>
                <Button 
                    variant="link" 
                    className="text-brand-gold font-bold uppercase tracking-[0.2em] text-[10px] hover:text-white transition-colors" 
                    onClick={clearFilters}
                >
                    সম্পূর্ণ আর্কাইভ দেখুন
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AllPerfumes;
