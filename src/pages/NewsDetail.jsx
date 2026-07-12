import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { ArrowLeft, Play } from 'lucide-react';
import HtmlContent from '@/components/HtmlContent';
import MediaGallery from '@/components/MediaGallery';
import { formatDate } from '@/lib/formatDate';

export default function NewsDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.public.getNewsPost(id).then(data => {
      setPost(data || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="pt-32 px-6 text-white/40">Загрузка...</div>;
  if (!post) return (
    <div className="pt-32 px-6 text-center">
      <p className="text-white/50">Новость не найдена</p>
      <Link to="/" className="text-cyber-violet mt-4 block">← На главную</Link>
    </div>
  );

  return (
    <div className="pt-24 pb-24">
      <div className="px-4 md:px-12 pt-8 max-w-screen-2xl mx-auto">
        <Link to="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors mb-10 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Назад
        </Link>
      </div>

      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-4 md:px-12 max-w-3xl mx-auto"
      >
        {post.tag && (
          <span className="tag-chip text-xs mb-4 inline-block border-cyber-violet text-cyber-violet rounded-full">{post.tag}</span>
        )}
        <h1 className="text-3xl md:text-5xl font-black uppercase text-white leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-sm text-white/30 font-bold uppercase tracking-widest mb-8 flex items-center gap-3">
          <span className="w-6 h-px bg-cyber-violet" />
          {formatDate(post.date)}
        </p>

        {post.video_url && (
          <a
            href={post.video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyber-violet text-white text-xs font-bold uppercase tracking-widest hover:bg-[#FF8C4D] transition-colors rounded-full mb-8"
          >
            <Play size={14} /> Смотреть видео
          </a>
        )}

        {post.cover_url && (
          <img src={post.cover_url} alt={post.title} className="w-full max-h-80 md:max-h-96 object-cover border border-white/10 rounded-2xl mb-10" />
        )}

        {post.body && <HtmlContent html={post.body} />}

        {post.media_gallery && post.media_gallery.length > 0 && (
          <div className="mt-10">
            <MediaGallery items={post.media_gallery} />
          </div>
        )}
      </motion.article>
    </div>
  );
}