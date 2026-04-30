import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, Package, LogOut, Edit2, ShieldCheck, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    toast.info('লগআউট করা হয়েছে');
    navigate('/');
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    toast.success('প্রোফাইল আপডেট সফল হয়েছে');
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-brand-black px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* Sidebar / Profile Card */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center space-y-6 backdrop-blur-xl"
            >
              <div className="relative inline-block">
                <div className="h-24 w-24 md:h-32 md:w-32 rounded-full border-2 border-brand-gold p-1 mx-auto">
                  <img 
                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=1a1510&color=d4af37`} 
                    alt={user.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div className="absolute bottom-2 right-2 h-6 w-6 md:h-8 md:w-8 bg-brand-gold rounded-full flex items-center justify-center border-4 border-brand-black">
                  <ShieldCheck className="h-3 w-3 md:h-4 md:w-4 text-brand-black" />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-bold italic text-white">{user.name}</h2>
                <p className="text-white/40 text-sm font-light">{user.email}</p>
              </div>

              <div className="flex justify-center gap-2">
                <div className="px-3 py-1 bg-brand-gold/10 rounded-full border border-brand-gold/20">
                  <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest">ভিআইপি মেম্বার</span>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <button 
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full text-white/40 hover:text-red-400 transition-colors text-sm font-medium"
                >
                  <LogOut className="h-4 w-4" /> লগআউট করুন
                </button>
              </div>
            </motion.div>

            {/* Menu Links */}
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
              {[
                { icon: Package, label: 'আমার অর্ডারগুলো', count: '০৩', path: '/orders' },
                { icon: Heart, label: 'পছন্দের তালিকা', count: wishlist.length.toString().padStart(2, '০'), path: '/wishlist' },
                { icon: MapPin, label: 'ঠিকানা বুক', count: '০২', path: '/addresses' },
              ].map((item, i) => (
                <button 
                  key={i}
                  onClick={() => item.path !== '#' && navigate(item.path)}
                  className="flex items-center justify-between w-full p-6 text-white/60 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 group text-left"
                >
                  <div className="flex items-center gap-4">
                    <item.icon className="h-5 w-5 text-brand-gold group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/20 bg-white/5 px-2 py-1 rounded">{item.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="space-y-1">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-white">প্রোফাইল তথ্য</h3>
                  <p className="text-white/40 text-xs md:text-sm font-light">আপনার ব্যক্তিগত তথ্য এবং ঠিকানা পরিচালনা করুন</p>
                </div>
                {!isEditing && (
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(true)}
                    className="border-white/10 text-white hover:bg-white/5 rounded-xl h-10 text-[10px] uppercase tracking-widest font-bold"
                  >
                    <Edit2 className="mr-2 h-3 w-3" /> এডিট করুন
                  </Button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-1">সম্পূর্ণ নাম</label>
                      <Input 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-white/5 border-white/10 text-white h-12 focus:border-brand-gold/50 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-1">মোবাইল নম্বর</label>
                      <Input 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="bg-white/5 border-white/10 text-white h-12 focus:border-brand-gold/50 rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-1">ঠিকানা</label>
                    <Input 
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="bg-white/5 border-white/10 text-white h-12 focus:border-brand-gold/50 rounded-xl"
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button type="submit" className="flex-1 bg-brand-gold text-brand-black hover:bg-white hover:text-brand-black font-bold h-12 rounded-xl text-sm uppercase tracking-widest transition-all">
                      সেভ করুন
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                      className="flex-1 border-white/10 text-white hover:bg-white/5 rounded-xl h-12 text-sm uppercase tracking-widest font-bold"
                    >
                      বাতিল
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                      <User className="h-5 w-5 text-brand-gold/60" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold mb-1">নাম</p>
                      <p className="text-white text-lg font-medium">{user.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-brand-gold/60" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold mb-1">ইমেইল</p>
                      <p className="text-white text-lg font-medium">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-brand-gold/60" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold mb-1">ফোন</p>
                      <p className="text-white text-lg font-medium">{user.phone || 'যুক্ত করা হয়নি'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-brand-gold/60" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold mb-1">ঠিকানা</p>
                      <p className="text-white text-lg font-medium">{user.address || 'যুক্ত করা হয়নি'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Order History Preview */}
              <div className="mt-16 pt-12 border-t border-white/5">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-serif font-bold text-white">সাম্প্রতিক অর্ডার</h3>
                  <Button variant="link" className="text-brand-gold text-xs font-bold uppercase tracking-widest">সবগুলো দেখুন</Button>
                </div>

                <div className="space-y-4">
                  {[
                    { id: '#OD-8924', date: '১২ অক্টোবর, ২০২৪', amount: '৳৪,৫০০', status: 'ডেলিভার করা হয়েছে' },
                    { id: '#OD-8921', date: '০৫ অক্টোবর, ২০২৪', amount: '৳১,২০০', status: 'প্রসেসিং' },
                  ].map((order, i) => (
                    <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-white">{order.id}</p>
                        <p className="text-xs text-white/30">{order.date}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-sm font-bold text-brand-gold">{order.amount}</p>
                        <p className={`text-[10px] uppercase font-bold tracking-widest ${order.status === 'প্রসেসিং' ? 'text-yellow-500' : 'text-green-500'}`}>
                          {order.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
