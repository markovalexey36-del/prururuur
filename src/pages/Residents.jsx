import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';

export default function Residents() {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.public.listResidents()
      .then(setResidents)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-obsidian px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-screen-xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-xs font-bold uppercase tracking-widest text-cyber-violet mb-3">Резиденты</p>
          <h1 className="section-headline text-white mb-8 md:mb-12">Наши<br /><span className="text-white">резиденты</span></h1>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-2 border-cyber-violet/30 border-t-cyber-violet rounded-full animate-spin" />
          </div>
        ) : residents.length === 0 ? (
          <p className="text-white/40 text-center py-24">Резиденты пока не добавлены</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {residents.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link to={`/residents/${r.id}`} className="block group relative overflow-hidden h-72 sm:h-80 border border-white/5 hover:border-cyber-violet/40 transition-all duration-300 rounded-2xl">
                  {r.photo_url ? (
                    <img src={r.photo_url} alt={r.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center rounded-2xl">
                      <span className="text-white/20 text-6xl font-black">{r.name[0]}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent rounded-2xl" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    {r.tag && (
                      <span className="tag-chip text-xs mb-3 inline-block border-cyber-violet text-cyber-violet rounded-full">
                        {r.tag}
                      </span>
                    )}
                    <h3 className="text-xl md:text-2xl font-black uppercase text-white leading-tight">{r.name}</h3>
                    <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs font-bold uppercase tracking-wider text-cyber-violet">Подробнее</span>
                      <ArrowRight size={12} className="text-cyber-violet" />
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