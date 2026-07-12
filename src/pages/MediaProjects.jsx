import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';

export default function MediaProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.public.listMediaProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-obsidian px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-screen-xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-xs font-bold uppercase tracking-widest text-cyber-violet mb-3">Контент</p>
          <h1 className="section-headline text-white mb-8 md:mb-12">Медиа<br /><span className="text-white">проекты</span></h1>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-2 border-cyber-violet/30 border-t-cyber-violet rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <p className="text-white/40 text-center py-24">Проекты пока не добавлены</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link
                  to={`/media/${p.id}`}
                  className="block group relative overflow-hidden border border-white/10 hover:border-cyber-violet/40 transition-all duration-300 card-hover-neon rounded-2xl"
                >
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    {p.cover_url ? (
                      <img src={p.cover_url} alt={p.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <span className="text-white/10 text-5xl font-black">{p.title[0]}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent" />
                    {p.tag && (
                      <span className="absolute top-3 left-3 tag-chip border-cyber-violet text-cyber-violet bg-cyber-violet/10 rounded-full">
                        {p.tag}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-pearl-grey group-hover:text-white transition-colors mb-2 line-clamp-1">{p.title}</h3>
                    {p.description && <p className="text-sm text-white/40 leading-relaxed line-clamp-2">{p.description}</p>}
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