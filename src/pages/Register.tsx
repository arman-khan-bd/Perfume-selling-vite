import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight, LogIn } from 'lucide-react';
import { toast } from 'sonner';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(name, email, password);
      toast.success('অ্যাকাউন্ট তৈরি সফল হয়েছে');
      navigate('/');
    } catch (error) {
      toast.error('অ্যাকাউন্ট তৈরি করা যায়নি');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-brand-black px-4">
      <div className="absolute inset-0 z-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-gold/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl"
      >
        <div className="text-center space-y-3 mb-10">
          <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px]">অংশ নিন</span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold italic text-white">নতুন অ্যাকাউন্ট</h1>
          <p className="text-white/40 text-sm font-light">আমাদের এক্সক্লুসিভ কালেকশনে স্বাগতম</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-1">আপনার নাম</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                <Input 
                  type="text" 
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/5 border-white/10 text-white pl-12 h-12 focus:border-brand-gold/50 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-1">ইমেইল এড্রেস</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                <Input 
                  type="email" 
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 text-white pl-12 h-12 focus:border-brand-gold/50 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-1">পাসওয়ার্ড</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                <Input 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/5 border-white/10 text-white pl-12 h-12 focus:border-brand-gold/50 rounded-xl"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-1">
            <input type="checkbox" id="terms" className="accent-brand-gold" required />
            <label htmlFor="terms" className="text-[10px] text-white/40 font-light">
              আমি <span className="text-white/60 underline">শর্তাবলী</span> এবং <span className="text-white/60 underline">গোপনীয়তা নীতি</span> মেনে নিচ্ছি
            </label>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-brand-gold text-brand-black hover:bg-white hover:text-brand-black font-bold h-12 rounded-xl text-sm uppercase tracking-widest transition-all mt-4"
          >
            {isLoading ? 'তৈরি করা হচ্ছে...' : (
              <span className="flex items-center gap-2">
                নিবন্ধন করুন <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-white/40 text-sm mb-4 font-light">ইতিমধ্যে অ্যাকাউন্ট আছে?</p>
          <Link to="/login">
            <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 rounded-xl h-12 text-[10px] uppercase tracking-widest font-bold">
              <LogIn className="mr-2 h-3 w-3" /> লগইন করুন
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
