import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { ArrowLeft, ExternalLink, Play } from 'lucide-react';
import HtmlContent from '@/components/HtmlContent';
import MediaGallery from '@/components/MediaGallery';
import { formatDate } from '@/lib/formatDate';

export default function MediaProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.public.getMediaProject(id).then((data) => {
      setProject(data.project || null);
      setPosts(data.news || []);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="pt-32 px-6 text-white/40 text-center">Загрузка...</div>;
  if (!project) return (
    <div className="pt-32 px-6 text-center">
      <p className="text-white/50">Проект не найден</p>
      <Link to="/media" className="text-cyber-violet mt-4 block">← К медиапроектам</Link>
    </div>
  );

  return (
    <div className="pt-24 pb-24">
      <div className="px-4 md:px-12 pt-8 max-w-screen-2xl mx-auto">
        <Link to="/media" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors mb-10 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Все проекты
        </Link>
      </div>

      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-4 md:px-12 max-w-3xl mx-auto"
      >
        {project.tag && (
          <span className="tag-chip text-xs mb-4 inline-block border-cyber-violet text-cyber-violet rounded-full">{project.tag}</span>
        )}
        <h1 className="text-3xl md:text-5xl font-black uppercase text-white leading-tight mb-6">
          {project.title}
        </h1>

        {project.social_url && (
          <a
            href={project.social_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-cyber-violet/30 text-cyber-violet text-xs font-bold uppercase tracking-widest hover:bg-cyber-violet/10 transition-colors rounded-full mb-8"
          >
            Смотреть в соцсетях <ExternalLink size={14} />
          </a>
        )}

        {project.cover_url && (
          <img
            src={project.cover_url}
            alt={project.title}
            className="w-full max-h-96 object-cover border border-white/10 rounded-2xl mb-10"
          />
        )}

        {project.media_gallery && project.media_gallery.length > 0 && (
          <div className="mb-8">
            <MediaGallery items={project.media_gallery} />
          </div>
        )}

        {project.body && <HtmlContent html={project.body} />}

        {posts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyber-violet mb-6">Публикации</h2>
            <div className="space-y-3">
              {posts.map(n => (
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
      </motion.article>
    </div>
  );
}