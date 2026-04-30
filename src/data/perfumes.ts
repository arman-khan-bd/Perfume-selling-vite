import { Perfume } from '../types';

export const PERFUMES: Perfume[] = [
  {
    id: '1',
    name: 'রয়্যাল হেরিটেজ আউদ',
    brand: 'আউদ এক্সক্লুসিভ',
    price: 4500,
    originalPrice: 5500,
    description: 'জাফরান এবং রাজকীয় চন্দন কাঠের ছোঁয়ায় একটি গভীর, রাজকীয় আউদ মিশ্রণ। আনুষ্ঠানিক সন্ধ্যা এবং সাংস্কৃতিক অনুষ্ঠানের জন্য উপযুক্ত।',
    category: 'আউদ',
    images: [
      'https://images.unsplash.com/photo-1616984748474-23707840134e?q=80&w=800',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800'
    ],
    notes: [
      { name: 'জাফরান', type: 'top' },
      { name: 'কম্বোডিয়ান আউদ', type: 'middle' },
      { name: 'চন্দন কাঠ', type: 'base' }
    ],
    stock: 15,
    isNew: true,
    rating: 4.8,
    size: '১২ মিলি (আতর)',
    reviews: [
      { id: 'r1', userName: 'রহিম আহমেদ', rating: 5, comment: 'আসল ঘ্রাণ, অনেকক্ষণ থাকে।', date: '২০২৪-০৩-১৫' }
    ]
  },
  {
    id: '2',
    name: 'মিডনাইট মাস্ক',
    brand: 'সিল্কি ফ্র্যাগন্যান্স',
    price: 2800,
    description: 'একটি মসৃণ, মখমল সাদা মাস্ক যা পরিষ্কার এবং পরিশীলিত। অফিসের ব্যবহারের জন্য আদর্শ।',
    category: 'মাস্ক',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800'
    ],
    notes: [
      { name: 'বার্গামট', type: 'top' },
      { name: 'সাদা মাস্ক', type: 'middle' },
      { name: 'অ্যাম্বার', type: 'base' }
    ],
    stock: 25,
    rating: 4.5,
    size: '১০০ মিলি',
    reviews: []
  },
  {
    id: '3',
    name: 'রোজ অফ সিলেট',
    brand: 'বেঙ্গল অ্যারোমাস',
    price: 3200,
    originalPrice: 3800,
    description: 'সিলেটের বাগানগুলোর প্রতি শ্রদ্ধা স্বরূপ, এতে রয়েছে হালকা লেবুর সাথে মিশ্রিত খাঁটি গোলাপের নির্যাস।',
    category: 'ফ্লোরাল',
    images: [
      'https://images.unsplash.com/photo-1512568433530-57c70177b223?q=80&w=800'
    ],
    notes: [
      { name: 'ম্যান্ডারিন', type: 'top' },
      { name: 'টি রোজ', type: 'middle' },
      { name: 'পাচৌলি', type: 'base' }
    ],
    stock: 10,
    isNew: true,
    rating: 4.9,
    size: '৫০ মিলি',
    reviews: []
  },
  {
    id: '4',
    name: 'ক্লাসিক ভেলভেট',
    brand: 'এলিট সেন্ট',
    price: 5900,
    description: 'উষ্ণ মশলা এবং মাধুর্যের ছোঁয়ায় একটি পরিশীলিত ওরিয়েন্টাল মিশ্রণ।',
    category: 'ওরিয়েন্টাল',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800'
    ],
    notes: [
      { name: 'এলাচ', type: 'top' },
      { name: 'ভ্যানিলা', type: 'middle' },
      { name: 'লোবান', type: 'base' }
    ],
    stock: 8,
    rating: 4.7,
    size: '১০০ মিলি',
    reviews: []
  },
  {
    id: '5',
    name: 'ওশানিক ব্রিজ',
    brand: 'ফ্রেশ কোং',
    price: 2200,
    description: 'সতেজ সমুদ্রের লবণ এবং গ্রেপফ্রুট নোট যা আপনাকে ঢাকার গরমের দিনেও সজীব রাখবে।',
    category: 'ফ্রেশ',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800'
    ],
    notes: [
      { name: 'গ্রেপফ্রুট', type: 'top' },
      { name: 'সি সল্ট', type: 'middle' },
      { name: 'ড্রিফটউড', type: 'base' }
    ],
    stock: 30,
    rating: 4.4,
    size: '১০০ মিলি',
    reviews: []
  },
  {
    id: '6',
    name: 'প্রাচীন আউদ',
    brand: 'আউদ এক্সক্লুসিভ',
    price: 8500,
    description: 'দুর্গম বন থেকে সংগ্রহ করা বিরল প্রাচীন আউদ। একটি গভীর, ধোঁয়াটে এবং আধ্যাত্মিক অভিজ্ঞতা।',
    category: 'আউদ',
    images: [
      'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=800'
    ],
    notes: [
      { name: 'স্মোকড লেদার', type: 'top' },
      { name: 'পুরানো আউদ', type: 'middle' },
      { name: 'তামাক', type: 'base' }
    ],
    stock: 5,
    isNew: true,
    rating: 5.0,
    size: '১২ মিলি (আতর)',
    reviews: []
  }
];
