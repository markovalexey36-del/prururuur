import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/formatDate';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.public.listNews()
      .then(setNews)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-obsidian px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-screen-xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-xs font-bold uppercase tracking-widest text-cyber-violet mb-3">Все материалы</p>
          <h1 className="section-headline text-white mb-8 md:mb-12">Новости<br /><span className="text-white">проекта</span></h1>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-2 border-cyber-violet/30 border-t-cyber-violet rounded-full animate-spin" />
          </div>
        ) : news.length === 0 ? (
          <p className="text-white/40 text-center py-24">Новостей пока нет</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {news.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.5 }}
                className="card-hover-neon group border border-white/10 hover:border-cyber-violet/40 transition-all duration-300 rounded-2xl overflow-hidden"
              >
                <Link to={`/news/${item.id}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    {item.cover_url ? (
                      <img src={item.cover_url} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <span className="text-white/10 text-4xl font-black">#</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent" />
                    {item.tag && (
                      <span className="absolute top-3 left-3 tag-chip border-cyber-violet text-cyber-violet bg-cyber-violet/10">{item.tag}</span>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-2">{formatDate(item.date)}</p>
                    <h3 className="text-base font-bold text-pearl-grey leading-snug mb-3 group-hover:text-white transition-colors">{item.title}</h3>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyber-violet opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Читать <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}