import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { Package, ArrowLeft, ChevronRight, Clock, CheckCircle2, Truck, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_ORDERS = [
  {
    id: '#OD-8924',
    date: '১২ অক্টোবর, ২০২৪',
    total: '৳৪,৫০০',
    status: 'delivered',
    items: [
      { name: 'রয়্যাল আউদ', brand: 'লুমিনা', price: '৳৪,৫০০', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=200' }
    ]
  },
  {
    id: '#OD-8921',
    date: '০৫ অক্টোবর, ২০২৪',
    total: '৳১,২০০',
    status: 'processing',
    items: [
      { name: 'মাস্ক আল মদিনা', brand: 'লুমিনা', price: '৳১,২০০', image: 'https://images.unsplash.com/photo-1512568433530-57c70177b223?q=80&w=200' }
    ]
  },
  {
    id: '#OD-8910',
    date: '২০ সেপ্টেম্বর, ২০২৪',
    total: '৳৭,৮০০',
    status: 'cancelled',
    items: [
      { name: 'সাফরান গোল্ড', brand: 'লুমিনা', price: '৳৫,৬০০', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=200' },
      { name: 'ফ্রেশ বার্গামট', brand: 'লুমিনা', price: '৳২,২০০', image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=200' }
    ]
  }
];

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'delivered':
      return (
        <span className="flex items-center gap-1.5 text-[10px] text-green-500 font-bold uppercase tracking-widest bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
          <CheckCircle2 className="h-3 w-3" /> ডেলিভার করা হয়েছে
        </span>
      );
    case 'processing':
      return (
        <span className="flex items-center gap-1.5 text-[10px] text-yellow-500 font-bold uppercase tracking-widest bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
          <Clock className="h-3 w-3" /> প্রসেসিং
        </span>
      );
    case 'shipped':
      return (
        <span className="flex items-center gap-1.5 text-[10px] text-blue-500 font-bold uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
          <Truck className="h-3 w-3" /> পাঠানো হয়েছে
        </span>
      );
    case 'cancelled':
      return (
        <span className="flex items-center gap-1.5 text-[10px] text-red-400 font-bold uppercase tracking-widest bg-red-400/10 px-3 py-1 rounded-full border border-red-400/20">
          <AlertCircle className="h-3 w-3" /> বাতিল করা হয়েছে
        </span>
      );
    default:
      return null;
  }
};

const Orders = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen pt-32 pb-24 bg-brand-black px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <Link to="/profile" className="inline-flex items-center text-brand-gold text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
              <ArrowLeft className="mr-2 h-3 w-3" /> প্রোফাইলে ফিরে যান
            </Link>
            <div className="space-y-2">
              <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px]">আপনার কেনাকাটা</span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold italic text-white">আমার অর্ডারগুলো</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
             <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">মোট অর্ডার:</span>
             <span className="text-brand-gold font-mono font-bold text-lg">{MOCK_ORDERS.length}</span>
          </div>
        </div>

        <div className="space-y-6">
          {MOCK_ORDERS.map((order, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={order.id}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl group hover:border-white/20 transition-all"
            >
              <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 bg-white/[0.02]">
                <div className="space-y-1">
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-serif font-bold text-white">{order.id}</h3>
                    <StatusBadge status={order.status} />
                  </div>
                  <p className="text-xs text-white/40 font-light">অর্ডার তারিখ: {order.date}</p>
                </div>
                <div className="flex flex-col items-start md:items-end">
                   <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold mb-1">মোট মূল্য</p>
                   <p className="text-xl font-serif font-bold text-brand-gold">{order.total}</p>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 md:gap-8">
                    <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl overflow-hidden border border-white/10 shrink-0 bg-brand-dark">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="text-sm md:text-lg font-bold text-white leading-tight">{item.name}</h4>
                      <p className="text-[10px] md:text-xs text-white/40">{item.brand} • ১ টি</p>
                    </div>
                    <p className="text-sm md:text-lg font-serif font-bold text-white">{item.price}</p>
                  </div>
                ))}
              </div>

              <div className="px-6 md:px-8 py-6 bg-white/[0.01] flex justify-end">
                 <Button variant="ghost" className="text-white/40 hover:text-brand-gold group/btn text-[10px] uppercase tracking-widest font-bold">
                    অর্ডার ডিটেইলস দেখুন <ChevronRight className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                 </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {MOCK_ORDERS.length === 0 && (
          <div className="py-32 text-center space-y-8 flex flex-col items-center bg-white/5 rounded-3xl border border-white/5 border-dashed">
            <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center">
              <Package className="h-8 w-8 text-white/20" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-serif italic text-white font-bold">আপনি এখনো কোনো অর্ডার করেননি</h3>
              <p className="text-white/40 max-w-sm font-light mx-auto">আমাদের আর্কাইভ থেকে আপনার পছন্দের সুগন্ধিটি খুঁজে নিন।</p>
            </div>
            <Link to="/perfumes">
              <Button className="bg-brand-gold text-brand-black hover:bg-white hover:text-brand-black font-bold h-12 px-8 rounded-full text-xs uppercase tracking-widest transition-all">
                কেনাকাটা শুরু করুন
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
