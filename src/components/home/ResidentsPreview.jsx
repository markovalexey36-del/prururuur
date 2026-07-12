import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';

export default function ResidentsPreview() {
  const [residents, setResidents] = useState([]);
  const [scrollPos, setScrollPos] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    api.public.listResidents().then((items) => setResidents(items.slice(0, 6)));
  }, []);

  if (residents.length === 0) return null;

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
          <p className="text-xs font-bold uppercase tracking-widest text-cyber-violet mb-3">Резиденты</p>
          <h2 className="section-headline text-white">
            Наши<br /><span className="text-white">резиденты</span>
          </h2>
        </div>
        <div className="flex items-center gap-3">
          {/* Mobile scroll arrows */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={() => handleScroll('left')}
              className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full text-white/50 hover:text-white hover:border-white/40 transition-colors">
              
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full text-white/50 hover:text-white hover:border-white/40 transition-colors">
              
              <ChevronRight size={16} />
            </button>
          </div>
          <Link to="/residents" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-cyber-violet transition-colors group">
            Все резиденты
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Mobile: horizontal scroll carousel */}
      <div
        ref={scrollRef}
        onScroll={(e) => setScrollPos(e.target.scrollLeft)}
        className="flex md:hidden gap-3 overflow-x-auto scrollbar-none pb-4 -mr-4 pr-4">
        
        {residents.map((r, i) =>
        <motion.div
          key={r.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, duration: 0.5 }}
          className="shrink-0 w-[260px]">
          
            <Link to={`/residents/${r.id}`} className="block group relative overflow-hidden h-80 border border-white/5 hover:border-cyber-violet/40 transition-all duration-300 rounded-2xl">
              {r.photo_url ?
            <img src={r.photo_url} alt={r.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" /> :

            <div className="w-full h-full bg-white/5 flex items-center justify-center rounded-2xl">
                  <span className="text-white/10 text-6xl font-black">{r.name[0]}</span>
                </div>
            }
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent rounded-2xl" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-cyber-violet/20 rounded-2xl" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                {r.tag &&
              <span className="tag-chip text-xs mb-3 inline-block border-cyber-violet text-cyber-violet rounded-full">{r.tag}</span>
              }
                <h3 className="text-2xl font-black uppercase text-white leading-tight">{r.name}</h3>
                <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyber-violet">Подробнее</span>
                  <ArrowRight size={12} className="text-cyber-violet" />
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {residents.map((r, i) =>
        <motion.div
          key={r.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, duration: 0.5 }}>
          
            <Link to={`/residents/${r.id}`} className="block group relative overflow-hidden h-80 border border-white/5 hover:border-cyber-violet/40 transition-all duration-300 rounded-2xl">
              {r.photo_url ?
            <img src={r.photo_url} alt={r.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" /> :

            <div className="w-full h-full bg-white/5 flex items-center justify-center rounded-2xl">
                  <span className="text-white/10 text-6xl font-black">{r.name[0]}</span>
                </div>
            }
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent rounded-2xl" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-cyber-violet/20 rounded-xl" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                {r.tag &&
              <span className="tag-chip text-xs mb-3 inline-block border-cyber-violet text-cyber-violet rounded-full">{r.tag}</span>
              }
                <h3 className="text-2xl font-black uppercase text-white leading-tight">{r.name}</h3>
                <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyber-violet">Подробнее</span>
                  <ArrowRight size={12} className="text-cyber-violet" />
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </div>
    </section>);

}