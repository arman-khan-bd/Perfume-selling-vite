import { Link } from 'react-router-dom';
import { ArrowRight, Star, Quote, ChevronRight, Search } from 'lucide-react';
import { PERFUMES } from '../data/perfumes';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Home = () => {
  const featured = PERFUMES.slice(0, 4);
  const newArrivals = PERFUMES.filter(p => p.isNew).slice(0, 4);

  const categories = [
    { name: 'আউদ', img: 'https://images.unsplash.com/photo-1616984748474-23707840134e?q=80&w=800', desc: 'তরল সোনা' },
    { name: 'মাস্ক', img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800', desc: 'বিশুদ্ধ পরিশীলন' },
    { name: 'ফ্লোরাল', img: 'https://images.unsplash.com/photo-1512568433530-57c70177b223?q=80&w=800', desc: 'মার্জিত আভিজাত্য' },
    { name: 'ফ্রেশ', img: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800', desc: 'প্রাণবন্ত শক্তি' }
  ];

  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1510] to-[#0a0a0a] mix-blend-overlay"></div>
          <img 
            src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Perfume" 
            className="w-full h-full object-cover grayscale brightness-[0.4] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl space-y-6 md:space-y-10"
          >
            <div className="space-y-2 md:space-y-4">
              <span className="inline-block text-brand-gold font-bold uppercase tracking-[0.4em] text-[8px] md:text-[10px]">сигнечар সুগন্ধি</span>
              <h1 className="text-4xl md:text-8xl font-serif font-bold italic leading-[1.1] md:leading-[0.9] tracking-tighter text-white">
                সুন্দরবনের<br />
                <span className="text-white/40 text-3xl md:text-7xl font-light">বুনো আগর</span>
              </h1>
            </div>
            <p className="text-xs md:text-base text-white/50 font-light leading-relaxed max-w-sm">
              বাংলাদেশের প্রাচীন ম্যানগ্রোভের প্রতি এক গভীর শ্রদ্ধা নিবেদন। 
              বুনো মধু, লবণাক্ত অম্বর এবং খাঁটি কম্বোডিয়ান আউদের এক অপূর্ব সংমিশ্রণ।
            </p>
            <div className="flex flex-wrap items-center gap-4 md:gap-6 pt-2 md:pt-6">
              <Link to="/perfumes">
                <Button className="bg-brand-gold hover:bg-[#D4B475] text-black font-bold px-6 md:px-10 py-5 md:py-7 h-auto rounded-full text-[9px] md:text-[10px] uppercase tracking-[0.2em] transition-all">
                  সংগ্রহটি দেখুন
                </Button>
              </Link>
              <Link to="/perfumes?category=আউদ" className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/40 border-b border-white/10 pb-1 hover:text-white transition-all">
                ঐতিহ্য
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Est. 1994 vertical text */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-12 items-center opacity-20 transform -rotate-90 origin-left">
           <span className="text-[10px] uppercase tracking-[0.6em] text-brand-gold font-bold">স্থাপিত ১৯৯৪</span>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 md:py-32 bg-brand-black border-y border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-20 gap-4 md:gap-6">
            <div className="space-y-2 md:space-y-4">
              <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[8px] md:text-[10px]">পরিবারসমূহ</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold italic text-white text-white">পূর্বপুরুষের শিকড়</h2>
            </div>
            <Link to="/perfumes" className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-brand-gold transition-colors border-b border-white/5 pb-1">
              সবগুলো নির্যাস দেখুন
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-[250px] md:h-[400px] overflow-hidden rounded-xl md:rounded-2xl border border-white/5 cursor-pointer bg-brand-dark"
              >
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent"></div>
                <div className="absolute bottom-4 md:bottom-10 left-4 md:left-10 space-y-1 md:space-y-2">
                  <span className="text-brand-gold text-[7px] md:text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">{cat.desc}</span>
                  <h3 className="text-xl md:text-3xl text-white font-serif font-bold italic">{cat.name}</h3>
                </div>
                <Link to={`/perfumes?category=${cat.name}`} className="absolute inset-0 z-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 md:py-32 bg-brand-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-20 space-y-2 md:space-y-4">
            <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[8px] md:text-[10px]">নিপুণ পছন্দ</span>
            <h2 className="text-2xl md:text-5xl font-serif font-bold italic underline decoration-brand-gold/20 decoration-1 underline-offset-12 text-white">মাস্টার কালেকশন</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {featured.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote / Philosophy */}
      <section className="py-16 md:py-32 bg-brand-black text-white relative overflow-hidden border-y border-white/5">
        <div className="absolute top-0 right-0 p-10 md:p-20 opacity-5 pointer-events-none">
            <Quote size={window.innerWidth > 768 ? 300 : 150} />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <Quote className="h-8 w-8 md:h-12 md:w-12 text-brand-gold mx-auto mb-6 md:mb-10 opacity-50" />
          <h2 className="text-xl md:text-5xl font-serif italic leading-tight mb-6 md:mb-8 font-sans">
            "সুগন্ধি একটি পোষাকের মতো, একটি বার্তা, নিজেকে উপস্থাপন করার একটি উপায়, একটি পোশাক যা পরিধানকারী ব্যক্তির ব্যক্তিত্ব অনুযায়ী ফুটে ওঠে।"
          </h2>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-[1px] bg-brand-gold mb-2"></div>
            <span className="text-brand-gold font-serif italic text-base md:text-xl">সুগন্ধি দার্শনিক</span>
          </div>
        </div>
      </section>

      {/* Scent Notes / Education Section */}
      <section className="py-16 md:py-24 bg-brand-black overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6 md:space-y-8"
            >
              <h2 className="text-3xl md:text-5xl font-serif font-bold italic leading-tight text-white">সুগন্ধির স্থাপত্য বোঝা</h2>
              <p className="text-base md:text-lg text-white/50 leading-relaxed">
                প্রতিটি পারফিউম তিন স্তরের নোট দিয়ে গঠিত, যা আপনার ত্বকে সময়ের সাথে সাথে বিকশিত হয়ে একটি অনন্য সিম্ফনি তৈরি করে।
              </p>
              
              <div className="space-y-4 md:space-y-6">
                {[
                  { title: "টপ নোটস", desc: "প্রাথমিক প্রভাব, ১৫-৩০ মিনিট স্থায়ী হয়। সাধারণত লেবু বা হালকা ভেষজ জাতীয় হয়ে থাকে।", color: "bg-brand-gold" },
                  { title: "হার্ট নোটস", desc: "সুগন্ধির মূল বৈশিষ্ট্য, ২-৪ ঘণ্টা স্থায়ী হয়। প্রায়ই ফ্লোরাল, মশলা বা ফলের ঘ্রাণ থাকে।", color: "bg-brand-gold/60" },
                  { title: "বেজ নোটস", desc: "স্থায়ী ভিত্তি, ৮+ ঘন্টা থাকে। গভীর কাঠ, মাস্ক বা রেজিনের ঘ্রাণ পাওয়া যায়।", color: "bg-brand-gold/30" }
                ].map((note, i) => (
                  <div key={note.title} className="flex gap-4 md:gap-6 items-start">
                    <div className={`${note.color} h-10 w-10 md:h-12 md:w-12 shrink-0 rounded-full flex items-center justify-center text-brand-black font-bold text-sm md:text-base`}>{i+1}</div>
                    <div>
                      <h4 className="text-lg md:text-xl font-serif font-bold mb-1 text-white">{note.title}</h4>
                      <p className="text-xs md:text-base text-white/40">{note.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="relative">
                <motion.div
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   className="rounded-2xl md:rounded-3xl overflow-hidden aspect-square h-[300px] md:h-[500px] border border-white/5"
                >
                    <img 
                        src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800" 
                        alt="Perfume Architecture" 
                        className="w-full h-full object-cover grayscale"
                    />
                </motion.div>
                <div className="absolute -bottom-4 md:-bottom-8 -left-4 md:-left-8 bg-[#111111] p-6 md:p-10 rounded-xl md:rounded-2xl shadow-2xl space-y-2 md:space-y-4 max-w-[200px] md:max-w-xs hidden sm:block border border-brand-gold/10">
                    <div className="flex gap-1">
                        <Star className="h-3 w-3 md:h-4 md:w-4 fill-brand-gold text-brand-gold" />
                        <Star className="h-3 w-3 md:h-4 md:w-4 fill-brand-gold text-brand-gold" />
                        <Star className="h-3 w-3 md:h-4 md:w-4 fill-brand-gold text-brand-gold" />
                        <Star className="h-3 w-3 md:h-4 md:w-4 fill-brand-gold text-brand-gold" />
                        <Star className="h-3 w-3 md:h-4 md:w-4 fill-brand-gold text-brand-gold" />
                    </div>
                    <p className="text-[10px] md:text-sm italic font-serif text-white/80">"তাদের আউদ সংগ্রহ অতুলনীয়। সত্যিই রাজকীয় অভিজ্ঞতা।"</p>
                    <span className="text-[8px] md:text-xs font-semibold uppercase tracking-widest text-brand-gold">— আরিফুল ইসলাম</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 md:py-24 bg-brand-black border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16 space-y-2 md:space-y-4">
            <span className="text-brand-gold font-semibold uppercase tracking-widest text-[10px] md:text-sm">প্রশংসাপত্র</span>
            <h2 className="text-2xl md:text-5xl font-serif font-bold italic text-white text-white">আমাদের সুগন্ধি প্রেমীরা যা বলেন</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { name: "মেহেদী হাসান", rating: 5, comment: "আসল কম্বোডিয়ান আউদ! স্থায়িত্ব অবিশ্বাস্য। আমার জুমার নামাজের জন্য নিখুঁত।", date: "ফেব্রুয়ারি ১২, ২০২৪" },
              { name: "শারমিন আক্তার", rating: 5, comment: "সুন্দর প্যাকেজিং এবং হোয়াইট মাস্কটি খুব পরিষ্কার এবং মার্জিত। অত্যন্ত পজেটিভ রিভিউ!", date: "জানুয়ারি ২৮, ২০২৪" },
              { name: "তানভীর আহমেদ", rating: 4, comment: "দুর্দান্ত কাস্টমার সার্ভিস। অফিসের ব্যবহারের জন্য ওশানিক ব্রিজ আমার প্রতিদিনের পছন্দ। খুব রিফ্রেশিং।", date: "মার্চ ০৫, ২০২৪" }
            ].map((review, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#111111] p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 shadow-sm space-y-4 md:space-y-6"
              >
                <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} className="h-3 w-3 md:h-4 md:w-4 fill-brand-gold text-brand-gold" />)}
                </div>
                <p className="text-xs md:text-base text-white/60 leading-relaxed italic">"{review.comment}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-sm md:text-base font-serif font-bold italic text-white">{review.name}</span>
                  <span className="text-[10px] md:text-xs text-white/30">{review.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-brand-black border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="text-center mb-10 md:mb-16 space-y-2 md:space-y-4">
            <span className="text-brand-gold font-semibold uppercase tracking-widest text-[10px] md:text-sm">তথ্য</span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold italic text-white">সাধারণ জিজ্ঞাসা</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-white/5">
              <AccordionTrigger className="text-left font-serif text-base md:text-lg font-bold text-white hover:text-brand-gold transition-colors py-4">আপনারা কি আসল কম্বোডিয়ান আউদ সরবরাহ করেন?</AccordionTrigger>
              <AccordionContent className="text-xs md:text-sm text-white/40 font-sans">
                হ্যাঁ, আমাদের আউদ সংগ্রহে কম্বোডিয়া, থাইল্যান্ড এবং আসাম থেকে সংগৃহীত আসল আগরউড রয়েছে। আমরা বিশুদ্ধতা এবং ঐতিহ্যের বিষয়ে আপসহীন।
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-white/5">
              <AccordionTrigger className="text-left font-serif text-base md:text-lg font-bold text-white hover:text-brand-gold transition-colors py-4">ঢাকার মধ্যে ডেলিভারি সময় কত?</AccordionTrigger>
              <AccordionContent className="text-xs md:text-sm text-white/40 font-sans">
                ঢাকা শহরের জন্য আমরা ২৪-৪৮ ঘন্টার মধ্যে ডেলিভারি করি। ঢাকার বাইরে সাধারণত স্টিডফাস্ট বা পাঠাও কুরিয়ারের মাধ্যমে ২-৪ কার্যদিবস সময় লাগে।
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-white/5">
              <AccordionTrigger className="text-left font-serif text-base md:text-lg font-bold text-white hover:text-brand-gold transition-colors py-4">এই আতরগুলো ত্বকে কতক্ষণ থাকে?</AccordionTrigger>
              <AccordionContent className="text-xs md:text-sm text-white/40 font-sans">
                ঘ্রাণের গভীরতার ওপর স্থায়িত্ব নির্ভর করে, তবে আমাদের প্রিমিয়াম আউদ এবং মাস্কগুলো সাধারণত ত্বকে ৮-১২ ঘন্টা এবং কাপড়ে ৪৮ ঘন্টা পর্যন্ত থাকে।
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-white/5">
              <AccordionTrigger className="text-left font-serif text-base md:text-lg font-bold text-white hover:text-brand-gold transition-colors py-4">সুগন্ধ পছন্দ না হলে কি আমি পণ্য ফেরত দিতে পারি?</AccordionTrigger>
              <AccordionContent className="text-xs md:text-sm text-white/40 font-sans">
                আমরা স্যাম্পল টেস্ট করার সুযোগ দিই। সিল খোলা না থাকলে আপনি ৭ দিনের মধ্যে ফেরত বা এক্সচেঞ্জ করতে পারেন। স্বাস্থ্যবিধিগত কারণে খোলা বোতল ফেরত নেওয়া হয় না।
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-16 md:py-24 bg-brand-black overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-brand-dark rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-24 text-center space-y-6 md:space-y-8 relative overflow-hidden border border-white/5">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-30"></div>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 max-w-2xl mx-auto space-y-4 md:space-y-6"
            >
              <h2 className="text-2xl md:text-6xl text-white font-serif font-bold italic underline decoration-brand-gold decoration-1 underline-offset-8">ইনার সার্কেলে যোগ দিন</h2>
              <p className="text-xs md:text-lg text-white/60">
                সীমিত সংস্করণের রিলিজ, কিউরেটেড সুগন্ধি গাইড এবং আমাদের ঢাকা সদস্যদের জন্য একচেটিয়া অফার পেতে সাবস্ক্রাইব করুন।
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 md:mt-8">
                <input 
                  type="email" 
                  placeholder="আপনার ইমেইল ঠিকানা" 
                  className="w-full bg-white/5 border border-white/20 text-white px-6 md:px-8 py-4 md:py-5 rounded-full focus:outline-none focus:border-brand-gold transition-colors text-sm md:text-lg"
                />
                <Button className="w-full sm:w-auto bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-bold px-8 md:px-10 py-4 md:py-7 h-auto rounded-full text-sm md:text-lg whitespace-nowrap">
                  সাবস্ক্রাইব করুন
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
