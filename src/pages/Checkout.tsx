import * as React from 'react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { 
    CheckCircle2, 
    Truck, 
    CreditCard, 
    ShieldCheck, 
    ChevronRight,
    ArrowLeft,
    Wallet
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isOrdered, setIsOrdered] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'card'>('cod');

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    toast.success("Order placed successfully! Check your email.");
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="pt-40 pb-24 text-center min-h-[80vh] flex flex-col items-center justify-center container mx-auto px-4 bg-brand-black">
        <motion.div
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           transition={{ type: "spring", damping: 10, stiffness: 100 }}
           className="h-32 w-32 bg-green-900/20 rounded-full flex items-center justify-center mb-8 border border-green-500/20"
        >
            <CheckCircle2 className="h-16 w-16 text-green-500" />
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold italic mb-6 text-white">অভিনন্দন!</h1>
        <p className="text-xl text-white/40 mb-10 max-w-lg mx-auto">
            আপনার অর্ডার <b>#AO-8821</b> গ্রহণ করা হয়েছে। আমরা আপনার সুগন্ধি রত্নগুলো ঢাকার ঠিকানায় পাঠানোর জন্য প্রস্তুত করছি।
        </p>
        <Link to="/">
          <Button className="bg-brand-gold text-brand-black px-12 py-8 rounded-full text-lg font-bold">হোম পেজে ফিরে যান</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-24 bg-brand-black min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center text-center space-y-6 mb-20 py-12 border-b border-white/5">
              <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.4em]">চূড়ান্ত পর্যায়</span>
              <h1 className="text-5xl md:text-6xl font-serif font-bold italic text-white tracking-tighter">অর্ডার পোর্টাল</h1>
              <p className="text-white/20 text-xs font-mono uppercase tracking-widest">সুরক্ষিত পেমেন্ট প্রোটোকল সক্রিয়</p>
              
              {/* Stepper */}
              <div className="flex items-center gap-4 pt-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div className={`h-8 w-8 rounded-full border flex items-center justify-center font-serif font-bold transition-all ${step >= s ? 'bg-brand-gold border-brand-gold text-brand-black shadow-lg shadow-brand-gold/20' : 'border-white/10 text-white/20'}`}>
                      {s}
                    </div>
                    {s < 3 && <div className={`w-12 h-[1px] mx-2 ${step > s ? 'bg-brand-gold' : 'bg-white/10'}`} />}
                  </div>
                ))}
              </div>
          </div>

          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-7 space-y-12">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-10"
                  >
                        <h3 className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.4em]">ডেলিভারি ঠিকানা</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                             <Label className="text-[10px] uppercase tracking-widest text-white/40 ml-4 font-bold">পুরো নাম</Label>
                             <Input required placeholder="আপনার নাম লিখুন" className="bg-white/5 border-white/10 rounded-full px-8 py-7 text-white focus:border-brand-gold/50 transition-all font-serif italic" />
                          </div>
                          <div className="space-y-3">
                             <Label className="text-[10px] uppercase tracking-widest text-white/40 ml-4 font-bold">যোগাযোগের নম্বর</Label>
                             <Input required type="tel" placeholder="+880 1XXX XXXXXX" className="bg-white/5 border-white/10 rounded-full px-8 py-7 text-white focus:border-brand-gold/50 transition-all font-mono" />
                          </div>
                          <div className="md:col-span-2 space-y-3">
                             <Label className="text-[10px] uppercase tracking-widest text-white/40 ml-4 font-bold">বিস্তারিত ঠিকানা</Label>
                             <Input required placeholder="বাসা, রোড, এলাকা, শহর" className="bg-white/5 border-white/10 rounded-full px-8 py-7 text-white focus:border-brand-gold/50 transition-all font-serif italic" />
                          </div>
                        </div>

                        <Button 
                            type="button" 
                            className="w-full bg-white text-brand-black hover:bg-brand-gold hover:text-brand-black py-8 rounded-full font-bold uppercase tracking-widest text-[10px] shadow-2xl transition-all"
                            onClick={() => setStep(2)}
                        >
                            পরবর্তী ধাপ
                        </Button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-10"
                  >
                        <button type="button" onClick={() => setStep(1)} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-brand-gold transition-all mb-4">
                            <ArrowLeft className="h-3 w-3" /> আগের ধাপ
                        </button>
                        <h3 className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.4em]">পেমেন্ট পদ্ধতি</h3>

                        <div className="grid gap-6">
                            {[
                                { id: 'cod', title: 'ক্যাশ অন ডেলিভারি', desc: 'পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন।', icon: <Truck className="h-4 w-4" /> },
                                { id: 'bkash', title: 'বিকাশ পেমেন্ট', desc: 'নিরাপদ এবং তাৎক্ষণিক ডিজিটাল পেমেন্ট।', icon: <Wallet className="h-4 w-4" /> },
                                { id: 'card', title: 'ক্রেডিট/ডেবিট কার্ড', desc: 'সকল ধরণের কার্ড গ্রহণ করা হয়।', icon: <CreditCard className="h-4 w-4" /> }
                            ].map((method) => (
                                <div 
                                    key={method.id}
                                    onClick={() => setPaymentMethod(method.id as any)}
                                    className={`p-8 border rounded-3xl cursor-pointer transition-all flex items-center justify-between group ${paymentMethod === method.id ? 'bg-brand-gold/10 border-brand-gold' : 'bg-white/5 border-white/5 hover:border-white/10'}`}
                                >
                                    <div className="flex items-center gap-6">
                                       <div className={`p-4 rounded-2xl border ${paymentMethod === method.id ? 'bg-brand-gold text-brand-black border-brand-gold' : 'bg-white/5 text-white/40 border-white/5'}`}>
                                          {method.icon}
                                       </div>
                                       <div>
                                          <p className={`font-serif font-bold italic tracking-tight text-xl ${paymentMethod === method.id ? 'text-brand-gold' : 'text-white'}`}>{method.title}</p>
                                          <p className="text-[9px] text-white/20 uppercase font-bold tracking-widest mt-1">{method.desc}</p>
                                       </div>
                                    </div>
                                    <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-brand-gold' : 'border-white/10'}`}>
                                        {paymentMethod === method.id && <div className="h-3 w-3 rounded-full bg-brand-gold animate-in zoom-in" />}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button 
                            className="w-full bg-white text-brand-black hover:bg-brand-gold hover:text-brand-black py-8 rounded-full font-bold uppercase tracking-widest text-[10px] shadow-2xl transition-all"
                            type="submit"
                        >
                            অর্ডার কনফার্ম করুন — ৳{(cartTotal).toLocaleString()}
                        </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Side Summary */}
            <div className="lg:col-span-5">
              <div className="bg-[#111111] border border-white/5 rounded-3xl p-12 space-y-12 sticky top-32">
                <h2 className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.4em]">অর্ডার সামারি</h2>
                <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide mb-8">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-6 items-center">
                      <div className="h-16 w-12 rounded-xl bg-brand-black overflow-hidden shrink-0 border border-white/5">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover grayscale" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold italic text-white text-sm truncate">{item.name}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-[9px] text-white/20 uppercase tracking-widest font-bold font-mono">{item.quantity} টি সুগন্ধি</p>
                          <p className="text-sm font-bold text-white/60">৳{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 pt-8 border-t border-white/5">
                  <div className="flex justify-between text-white/40 text-[10px] uppercase tracking-widest font-bold">
                    <span>পণ্যের মূল্য</span>
                    <span>৳{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white/40 text-[10px] uppercase tracking-widest font-bold">
                    <span>শিপিং খরচ</span>
                    <span className="text-brand-gold">ফ্রি</span>
                  </div>
                  <div className="pt-6 flex justify-between items-end border-t border-white/5">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold">সর্বমোট মূল্য</span>
                        <p className="text-[8px] text-white/20 uppercase tracking-widest font-bold font-mono underline decoration-white/10 underline-offset-4">পরিশোধযোগ্য মূল্য</p>
                      </div>
                      <span className="text-4xl font-serif font-bold italic tracking-tighter text-white">৳{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-10 p-8 bg-brand-black rounded-3xl border border-white/5 flex items-start gap-4">
                    <ShieldCheck className="h-6 w-6 text-brand-gold shrink-0 mt-1" />
                    <div>
                        <h5 className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold mb-2">বিশুদ্ধতার অঙ্গীকার</h5>
                        <p className="text-[10px] text-white/30 leading-relaxed font-light italic">
                            প্রতিটি সুগন্ধি পাঠানোর আগে এর বিশুদ্ধতা কঠোরভাবে পরীক্ষা করা হয়।
                        </p>
                    </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
