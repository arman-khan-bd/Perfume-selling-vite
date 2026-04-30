import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  TrendingUp, 
  Users, 
  Package, 
  ShoppingCart, 
  ArrowUpRight, 
  ArrowDownRight,
  DollarSign,
  Activity
} from "lucide-react"
import { motion } from "motion/react"

const stats = [
  {
    title: "মোট বিক্রয়",
    value: "৳৪,৫২,০০০",
    description: "গত মাস থেকে +২০.১%",
    icon: DollarSign,
    trend: "up",
    color: "text-green-500"
  },
  {
    title: "নতুন অর্ডার",
    value: "+৫৭৩",
    description: "গত মাস থেকে +১৮০.১%",
    icon: ShoppingCart,
    trend: "up",
    color: "text-blue-500"
  },
  {
    title: "সক্রিয় গ্রাহক",
    value: "+২,৩৫৪",
    description: "গত মাস থেকে +১৯%",
    icon: Users,
    trend: "up",
    color: "text-purple-500"
  },
  {
    title: "স্টক আপডেট",
    value: "১২",
    description: "৪টি সুগন্ধি স্টকের বাইরে",
    icon: Package,
    trend: "down",
    color: "text-red-500"
  }
];

const Overview = () => {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl md:text-4xl font-serif font-bold italic text-white">ওভারভিউ</h2>
          <p className="text-white/40 text-sm font-light">আপনার ব্যবসার বর্তমান পরিস্থিতি এক নজরে দেখে নিন।</p>
        </div>
        <div className="flex gap-3">
           <button className="bg-brand-gold text-brand-black px-4 py-2 rounded-xl text-[10px] uppercase font-bold tracking-widest hover:bg-white transition-all">রিপোর্ট ডাউনলোড</button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-white/5 border-white/10 hover:border-brand-gold/30 transition-all backdrop-blur-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-serif font-bold text-white mb-1">{stat.value}</div>
                <p className="text-[10px] font-medium text-white/30 flex items-center gap-1">
                  {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3 text-green-500" /> : <ArrowDownRight className="h-3 w-3 text-red-500" />}
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white font-serif italic text-xl">সাম্প্রতিক বিক্রয় চার্ট</CardTitle>
            <CardDescription className="text-white/40">গত ৭ দিনের বিক্রয় তথ্য।</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-t border-white/5">
             <div className="text-white/20 flex flex-col items-center gap-4">
                <Activity className="h-12 w-12 opacity-20" />
                <p className="text-xs uppercase tracking-widest font-bold">চার্ট ডেটা লোড হচ্ছে...</p>
             </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3 bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white font-serif italic text-xl">সাম্প্রতিক অর্ডার</CardTitle>
            <CardDescription className="text-white/40">সর্বশেষ ৫টি সফল ট্রানজ্যাকশন।</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "আরমান খান", email: "arman@example.com", amount: "+৳৪,৫০০", status: "সফল", avatar: "AR" },
                { name: "নিলয় রহমান", email: "niloy@example.com", amount: "+৳১,২০০", status: "পেন্ডিং", avatar: "NR" },
                { name: "সাদিয়া আক্তার", email: "sadia@example.com", amount: "+৳৫,৬০০", status: "সফল", avatar: "SA" },
                { name: "জাহিদ হাসান", email: "zahid@example.com", amount: "+৳২,৮০০", status: "সফল", avatar: "ZH" },
                { name: "ফারহানা মিতু", email: "farhana@example.com", amount: "+৳৯০০", status: "ব্যর্থ", avatar: "FM" },
              ].map((order, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-9 w-9 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold text-xs font-bold">
                    {order.avatar}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-white">{order.name}</p>
                    <p className="text-xs text-white/30 font-light">{order.email}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-bold text-brand-gold">{order.amount}</p>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${order.status === 'সফল' ? 'text-green-500' : order.status === 'পেন্ডিং' ? 'text-yellow-500' : 'text-red-500'}`}>
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
