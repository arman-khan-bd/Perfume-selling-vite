import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Plus, Trash2, Home, Briefcase, ArrowLeft, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  label: string;
  address: string;
  city: string;
  isDefault: boolean;
}

const AddressBook = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([
    { id: '1', type: 'home', label: 'বাসার ঠিকানা', address: 'হাউজ নং ১২, রোড নং ৫, ধানমন্ডি', city: 'ঢাকা', isDefault: true },
    { id: '2', type: 'work', label: 'অফিসের ঠিকানা', address: 'লেভেল ৪, যমুনা ফিউচার পার্ক', city: 'ঢাকা', isDefault: false },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ type: 'home' as const, label: '', address: '', city: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const address: Address = {
      ...newAddress,
      id: Math.random().toString(36).substr(2, 9),
      isDefault: addresses.length === 0
    };
    setAddresses([...addresses, address]);
    setShowAddForm(false);
    setNewAddress({ type: 'home', label: '', address: '', city: '' });
    toast.success('নতুন ঠিকানা যোগ করা হয়েছে');
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter(a => a.id !== id));
    toast.info('ঠিকানা মুছে ফেলা হয়েছে');
  };

  const setAsDefault = (id: string) => {
    setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
    toast.success('ডিফল্ট ঠিকানা সেট করা হয়েছে');
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-brand-black px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <Link to="/profile" className="inline-flex items-center text-brand-gold text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
              <ArrowLeft className="mr-2 h-3 w-3" /> প্রোফাইলে ফিরে যান
            </Link>
            <div className="space-y-2">
              <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px]">অর্ডারের জন্য</span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold italic text-white">ঠিকানা বুক</h1>
            </div>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-brand-gold text-brand-black hover:bg-white hover:text-brand-black font-bold h-12 px-6 rounded-xl text-xs uppercase tracking-widest transition-all"
          >
            <Plus className="mr-2 h-4 w-4" /> নতুন ঠিকানা
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence mode="popLayout">
            {addresses.map((addr) => (
              <motion.div 
                layout
                key={addr.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`relative bg-white/5 border rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all ${addr.isDefault ? 'border-brand-gold/50 bg-brand-gold/5' : 'border-white/10'}`}
              >
                <div className="flex items-start gap-6">
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${addr.type === 'home' ? 'bg-blue-500/10 text-blue-400' : addr.type === 'work' ? 'bg-orange-500/10 text-orange-400' : 'bg-purple-500/10 text-purple-400'}`}>
                    {addr.type === 'home' ? <Home className="h-6 w-6" /> : addr.type === 'work' ? <Briefcase className="h-6 w-6" /> : <MapPin className="h-6 w-6" />}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-serif font-bold text-white">{addr.label}</h3>
                      {addr.isDefault && (
                        <span className="text-[8px] bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded-full uppercase font-bold tracking-widest border border-brand-gold/20">ডিফল্ট</span>
                      )}
                    </div>
                    <p className="text-white/60 text-sm font-light leading-relaxed">{addr.address}</p>
                    <p className="text-white/40 text-xs">{addr.city}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:border-l md:border-white/5 md:pl-8">
                  {!addr.isDefault && (
                    <Button 
                      variant="ghost" 
                      onClick={() => setAsDefault(addr.id)}
                      className="h-10 w-10 p-0 text-white/40 hover:text-brand-gold hover:bg-brand-gold/10 rounded-xl"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    onClick={() => handleDelete(addr.id)}
                    className="h-10 w-10 p-0 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded-xl"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {addresses.length === 0 && !showAddForm && (
            <div className="py-24 text-center border-2 border-white/5 border-dashed rounded-3xl">
              <p className="text-white/20 text-sm italic">কোনো ঠিকানা পাওয়া যায়নি</p>
            </div>
          )}
        </div>

        {/* Add Address Modal Overlay */}
        <AnimatePresence>
          {showAddForm && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-brand-black/80 backdrop-blur-sm"
                onClick={() => setShowAddForm(false)}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative z-10 w-full max-w-md bg-brand-dark border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl"
              >
                <h3 className="text-2xl font-serif font-bold text-white mb-6">নতুন ঠিকানা</h3>
                <form onSubmit={handleAdd} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-1">ঠিকানার নাম (উদা: বাসা / অফিস)</label>
                    <Input 
                      required
                      value={newAddress.label}
                      onChange={(e) => setNewAddress({...newAddress, label: e.target.value})}
                      className="bg-white/5 border-white/10 text-white h-12 focus:border-brand-gold/50 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-1">ধরন</label>
                    <div className="flex gap-2">
                      {['home', 'work', 'other'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setNewAddress({...newAddress, type: t as any})}
                          className={`flex-1 h-10 rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all ${newAddress.type === t ? 'bg-brand-gold text-brand-black' : 'bg-white/5 text-white/40 border border-white/5 hover:bg-white/10'}`}
                        >
                          {t === 'home' ? 'বাসা' : t === 'work' ? 'অফিস' : 'অন্যান্য'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-1">পূর্ণ ঠিকানা</label>
                    <Input 
                      required
                      value={newAddress.address}
                      onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                      className="bg-white/5 border-white/10 text-white h-12 focus:border-brand-gold/50 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-1">শহর</label>
                    <Input 
                      required
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                      className="bg-white/5 border-white/10 text-white h-12 focus:border-brand-gold/50 rounded-xl"
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button type="submit" className="flex-1 bg-brand-gold text-brand-black hover:bg-white hover:text-brand-black font-bold h-12 rounded-xl text-sm uppercase tracking-widest transition-all">
                      যোগ করুন
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 border-white/10 text-white hover:bg-white/5 rounded-xl h-12 text-sm uppercase tracking-widest font-bold"
                    >
                      বাতিল
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AddressBook;
