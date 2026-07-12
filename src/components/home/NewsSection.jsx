import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/formatDate';

function NewsCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="card-hover-neon group cursor-pointer border border-white/10 hover:border-cyber-violet/40 transition-all duration-300 rounded-2xl overflow-hidden shrink-0 w-[280px] sm:w-auto"
    >
      <Link to={`/news/${item.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          {item.cover_url ? (
            <img
              src={item.cover_url}
              alt={item.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-white/5 flex items-center justify-center">
              <span className="text-white/10 text-4xl font-black">#</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent" />
          {item.tag && (
            <span className="absolute top-3 left-3 tag-chip border-cyber-violet text-cyber-violet bg-cyber-violet/10 rounded-full">
              {item.tag}
            </span>
          )}
        </div>
        <div className="p-5">
          <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-3">{formatDate(item.date)}</p>
          <h3 className="text-base font-bold text-pearl-grey leading-snug mb-3 group-hover:text-white transition-colors line-clamp-2">
            {item.title}
          </h3>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyber-violet opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Читать <ArrowRight size={12} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function NewsSection() {
  const [news, setNews] = useState([]);
  const [scrollPos, setScrollPos] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    api.public.listNews().then((items) => setNews(items.slice(0, 6)));
  }, []);

  if (news.length === 0) return null;

  const handleScroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = 300;
    const newPos = dir === 'left' ? scrollPos - amount : scrollPos + amount;
    scrollRef.current.scrollTo({ left: newPos, behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-cyber-violet mb-3">Последнее</p>
          <h2 className="section-headline text-white">
            Новости<br /><span className="text-white">проекта</span>
          </h2>
        </div>
        <div className="flex items-center gap-3">
          {/* Mobile scroll arrows */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={() => handleScroll('left')}
              className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full text-white/50 hover:text-white hover:border-white/40 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full text-white/50 hover:text-white hover:border-white/40 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <Link to="/news" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-cyber-violet transition-colors group">
            Все материалы
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Mobile: horizontal scroll carousel */}
      <div
        ref={scrollRef}
        onScroll={(e) => setScrollPos(e.target.scrollLeft)}
        className="flex md:hidden gap-3 overflow-x-auto scrollbar-none pb-4 -mr-4 pr-4"
      >
        {news.map((item, index) => (
          <div key={item.id} className="shrink-0 w-[280px]">
            <NewsCard item={item} index={index} />
          </div>
        ))}
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
        {news.map((item, index) => (
          <NewsCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}