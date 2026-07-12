import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone, ExternalLink, Play } from 'lucide-react';
import { api } from '@/lib/api';
import MediaGallery from '@/components/MediaGallery';
import { formatDate } from '@/lib/formatDate';

export default function ResidentDetail() {
  const { id } = useParams();
  const [resident, setResident] = useState(null);
  const [projects, setProjects] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.public.getResident(id)
      .then((data) => {
        setResident(data.resident || null);
        setProjects(data.projects || []);
        setNews(data.news || []);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-obsidian">
      <div className="w-8 h-8 border-2 border-cyber-violet/30 border-t-cyber-violet rounded-full animate-spin" />
    </div>
  );

  if (!resident) return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center gap-4">
      <p className="text-white/50">Резидент не найден</p>
      <Link to="/residents" className="text-cyber-violet text-sm font-bold uppercase tracking-wider">← Назад</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-obsidian pt-24 pb-24">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        <Link to="/residents" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/40 hover:text-cyber-violet mb-8 transition-colors">
          <ArrowLeft size={14} /> Все резиденты
        </Link>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Main */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {resident.photo_url && (
              <img src={resident.photo_url} alt={resident.name} className="w-28 h-28 md:w-32 md:h-32 object-cover shrink-0 border border-white/10 rounded-2xl" />
            )}
            <div>
              {resident.tag && <span className="tag-chip text-xs mb-3 inline-block border-cyber-violet text-cyber-violet rounded-full">{resident.tag}</span>}
              <h1 className="text-4xl md:text-5xl font-black uppercase text-white leading-tight">{resident.name}</h1>
            </div>
          </div>
          {resident.bio && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-cyber-violet mb-4">О резиденте</h2>
              <p className="text-white/70 leading-relaxed">{resident.bio}</p>
            </div>
          )}

          {resident.media_gallery && resident.media_gallery.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-cyber-violet mb-4">Галерея</h2>
              <MediaGallery items={resident.media_gallery} />
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-cyber-violet mb-4">Медиапроекты</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map(p => (
                  <Link key={p.id} to={`/media/${p.id}`}
                  className="border border-white/10 hover:border-cyber-violet/40 transition-all duration-300 p-4 block group rounded-2xl">
                    {p.cover_url && <img src={p.cover_url} alt={p.title} className="w-full h-32 object-cover mb-3 grayscale group-hover:grayscale-0 transition-all duration-500 rounded-xl" />}
                    <span className="tag-chip text-xs border-cyber-violet text-cyber-violet mb-2 inline-block">{p.tag}</span>
                    <h3 className="text-sm font-bold text-white">{p.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {news.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-cyber-violet mb-4">Публикации</h2>
              <div className="space-y-3">
                {news.map(n => (
                  <div key={n.id} className="flex items-center gap-4 border border-white/10 hover:border-cyber-violet/40 transition-all p-4 rounded-2xl group">
                    {n.cover_url && <img src={n.cover_url} alt={n.title} className="w-16 h-16 object-cover shrink-0 rounded-xl" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white/30 font-bold uppercase tracking-wider mb-1">{formatDate(n.date)}</p>
                      <Link to={`/news/${n.id}`}><h3 className="text-sm font-bold text-white hover:text-cyber-violet transition-colors truncate">{n.title}</h3></Link>
                    </div>
                    {n.video_url && (
                      <a href={n.video_url} target="_blank" rel="noopener noreferrer"
                        className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-cyber-violet/10 text-cyber-violet text-xs font-bold rounded-full hover:bg-cyber-violet/20 transition-colors">
                        <Play size={11} /> Видео
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Sidebar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
          {resident.social_links && resident.social_links.length > 0 && (
            <div className="border border-white/10 p-5 md:p-6 rounded-2xl">
              <h2 className="text-xs font-bold uppercase tracking-widest text-cyber-violet mb-4">Соцсети</h2>
              <div className="space-y-2">
                {resident.social_links.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-white/50 hover:text-cyber-violet transition-colors">
                    <ExternalLink size={14} /> {link.platform}
                  </a>
                ))}
              </div>
            </div>
          )}

          {(resident.contact_name || resident.contact_email || resident.contact_phone) && (
            <div className="border border-white/10 p-5 md:p-6 rounded-2xl">
              <h2 className="text-xs font-bold uppercase tracking-widest text-cyber-violet mb-4">Контакт</h2>
              {resident.contact_name && <p className="text-white font-bold mb-2">{resident.contact_name}</p>}
              {resident.contact_email && (
                <a href={`mailto:${resident.contact_email}`} className="flex items-center gap-2 text-sm text-white/50 hover:text-cyber-violet transition-colors mb-2">
                  <Mail size={14} /> {resident.contact_email}
                </a>
              )}
              {resident.contact_phone && (
                <a href={`tel:${resident.contact_phone}`} className="flex items-center gap-2 text-sm text-white/50 hover:text-cyber-violet transition-colors">
                  <Phone size={14} /> {resident.contact_phone}
                </a>
              )}
            </div>
          )}

          {resident.google_form_url && (
            <a href={resident.google_form_url} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full text-xs font-bold uppercase tracking-widest py-3 bg-[#FF6B2B] text-white hover:bg-[#FF8C4D] transition-colors rounded-xl">
              <span className="flex items-center gap-2">Написать <ExternalLink size={14} /></span>
            </a>
          )}
        </motion.div>
      </div>
    </div>
  );
}