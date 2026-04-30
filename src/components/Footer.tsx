import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] text-brand-silver py-12 md:py-24 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 md:space-y-12 mb-12 md:mb-20">
          <Link to="/" className="text-3xl md:text-5xl font-serif text-brand-gold font-bold italic tracking-tighter uppercase">
            লুমিনা
          </Link>
          <p className="max-w-md text-white/40 text-xs md:text-sm leading-relaxed font-light px-4 md:px-0">
            ১৯৯৪ সাল থেকে তরল স্মৃতি তৈরি করছি। আমাদের নির্যাসগুলো প্রাচ্য এবং সুন্দরবনের বিরল উপাদান থেকে পাতন করা হয়।
          </p>
          <div className="flex items-center gap-6 md:gap-8">
             <a href="#" className="h-9 w-9 md:h-10 md:w-10 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-brand-gold hover:border-brand-gold transition-all">
               <Instagram className="h-3.5 w-3.5 md:h-4 md:w-4" />
             </a>
             <a href="#" className="h-9 w-9 md:h-10 md:w-10 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-brand-gold hover:border-brand-gold transition-all">
               <Facebook className="h-3.5 w-3.5 md:h-4 md:w-4" />
             </a>
             <a href="#" className="h-9 w-9 md:h-10 md:w-10 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-brand-gold hover:border-brand-gold transition-all">
               <Twitter className="h-3.5 w-3.5 md:h-4 md:w-4" />
             </a>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 border-t border-white/5 pt-12 md:pt-20">
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-brand-gold text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em]">কালেকশন</h4>
            <ul className="space-y-3 md:space-y-4">
              <li><Link to="/perfumes?category=আউদ" className="text-xs md:text-sm text-white/40 hover:text-white transition-colors">আউদ ইম্পেরিয়াল</Link></li>
              <li><Link to="/perfumes?category=মাস্ক" className="text-xs md:text-sm text-white/40 hover:text-white transition-colors">হোয়াইট মাস্ক</Link></li>
              <li><Link to="/perfumes" className="text-xs md:text-sm text-white/40 hover:text-white transition-colors">ফ্লোরাল অ্যাবসোলুট</Link></li>
              <li><Link to="/perfumes" className="text-xs md:text-sm text-white/40 hover:text-white transition-colors">সিগনেচার আতর</Link></li>
            </ul>
          </div>
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-brand-gold text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em]">গ্রাহক সেবা</h4>
            <ul className="space-y-3 md:space-y-4">
              <li><Link to="#" className="text-xs md:text-sm text-white/40 hover:text-white transition-colors">শিপিং জিজ্ঞাসা</Link></li>
              <li><Link to="#" className="text-xs md:text-sm text-white/40 hover:text-white transition-colors">রিটার্ন পলিসি</Link></li>
              <li><Link to="#" className="text-xs md:text-sm text-white/40 hover:text-white transition-colors">অকৃত্রিমতা যাচাই</Link></li>
              <li><Link to="#" className="text-xs md:text-sm text-white/40 hover:text-white transition-colors">যোগাযোগ করুন</Link></li>
            </ul>
          </div>
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-brand-gold text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em]">প্রতিষ্ঠান</h4>
            <ul className="space-y-3 md:space-y-4">
              <li><Link to="/" className="text-xs md:text-sm text-white/40 hover:text-white transition-colors">আমাদের গল্প</Link></li>
              <li><Link to="/" className="text-xs md:text-sm text-white/40 hover:text-white transition-colors">অ্যালকেমিস্ট</Link></li>
              <li><Link to="/" className="text-xs md:text-sm text-white/40 hover:text-white transition-colors">সাসটেইনেবিলিটি</Link></li>
              <li><Link to="/" className="text-xs md:text-sm text-white/40 hover:text-white transition-colors">ক্যারিয়ার</Link></li>
            </ul>
          </div>
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-brand-gold text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em]">পাতন প্রক্রিয়া</h4>
            <div className="space-y-3 md:space-y-4">
              <p className="text-[10px] md:text-xs text-white/30 leading-relaxed">সীমিত সংগ্রহের আগাম অফার পেতে আমাদের তালিকায় যোগ দিন।</p>
              <div className="flex border-b border-white/20 pb-2">
                <input type="email" placeholder="আপনার ইমেইল" className="bg-transparent text-[10px] md:text-xs w-full focus:outline-none text-white border-none" />
                <button className="text-brand-gold text-[8px] md:text-[10px] font-bold uppercase tracking-widest">যোগ দিন</button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-32 pt-6 md:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <p className="text-[8px] md:text-[10px] text-white/20 uppercase tracking-[0.2em] font-medium text-center md:text-left">© {new Date().getFullYear()} লুমিনা বাংলাদেশ। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex gap-6 md:gap-8">
             <span className="text-[8px] md:text-[10px] text-white/20 uppercase tracking-[0.2em]">গোপনীয়তা</span>
             <span className="text-[8px] md:text-[10px] text-white/20 uppercase tracking-[0.2em]">শর্তাবলী</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
