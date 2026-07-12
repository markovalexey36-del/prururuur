import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/formatDate';
import { ArrowLeft, Plus, Pencil, Trash2, X } from 'lucide-react';
import ImageUploadField from '@/components/admin/ImageUploadField';
import GalleryEditor from '@/components/admin/GalleryEditor';
import ReactQuill from 'react-quill';

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote'],
    [{ color: [] }],
    ['link', 'image'],
    ['clean'],
  ],
};

function PostModal({ item, residentId, onClose, onSave }) {
  const [form, setForm] = useState({
    title: item?.title || '',
    date: item?.date ? item.date.split('T')[0] : new Date().toISOString().split('T')[0],
    tag: item?.tag || '',
    cover_url: item?.cover_url || '',
    body: item?.body || '',
    video_url: item?.video_url || '',
    media_gallery: item?.media_gallery || [],
    resident_id: residentId,
    is_published: item?.is_published ?? true,
  });
  const [saving, setSaving] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.title) return;
    setSaving(true);
    try {
      if (item?.id) {
        await api.admin.updateNewsPost(item.id, { ...form, media_project_id: null });
      } else {
        await api.admin.createNewsPost({ ...form, media_project_id: null });
      }
      onSave();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-[#0C0F1A] border border-white/15 w-full max-w-3xl max-h-[95vh] overflow-y-auto rounded-2xl">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-lg font-black uppercase text-white">{item ? 'Редактировать публикацию' : 'Новая публикация'}</h2>
          <button onClick={onClose}><X size={20} className="text-white/40 hover:text-white" /></button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Заголовок *</label>
            <input
              type="text"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none focus:border-cyber-violet rounded-lg"
              placeholder="Заголовок публикации"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Дата *</label>
              <input
                type="date"
                value={form.date}
                onChange={e => set('date', e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none focus:border-cyber-violet rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Тег</label>
              <input
                type="text"
                value={form.tag}
                onChange={e => set('tag', e.target.value)}
                placeholder="Новость, Подкаст..."
                className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none focus:border-cyber-violet rounded-lg"
              />
            </div>
          </div>

          <ImageUploadField label="Обложка" value={form.cover_url} onChange={v => set('cover_url', v)} />

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Ссылка на видео</label>
            <input
              type="text"
              value={form.video_url}
              onChange={e => set('video_url', e.target.value)}
              placeholder="https://youtube.com/... или https://vk.com/video..."
              className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none focus:border-cyber-violet rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Текст публикации</label>
            <div className="rich-editor-wrapper">
              <ReactQuill
                value={form.body}
                onChange={v => set('body', v)}
                modules={quillModules}
                theme="snow"
                placeholder="Напишите текст публикации..."
              />
            </div>
          </div>

          <GalleryEditor items={form.media_gallery} onChange={v => set('media_gallery', v)} />

          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.is_published} onChange={e => set('is_published', e.target.checked)} className="w-4 h-4" />
            <span className="text-sm text-white/60">Опубликовать</span>
          </label>
        </div>

        <div className="p-6 border-t border-white/10 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2 text-xs font-bold uppercase tracking-widest border border-white/20 text-white/50 hover:text-white transition-colors rounded-xl">
            Отмена
          </button>
          <button onClick={handleSave} disabled={saving || !form.title}
            className="px-6 py-2 text-xs font-bold uppercase tracking-widest bg-[#FF6B2B] text-white hover:bg-[#FF8C4D] transition-colors disabled:opacity-50 rounded-xl">
            {saving ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminResidentPosts() {
  const { id } = useParams();
  const [resident, setResident] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    setLoading(true);
    const [residents, postsData] = await Promise.all([
      api.admin.listResidents(),
      api.admin.listNews(),
    ]);
    setResident(residents.find((item) => item.id === id) || null);
    setPosts(postsData.filter((item) => item.resident_id === id));
    setLoading(false);
  };

  useEffect(() => { load(); }, [id]);

  const handleDelete = async (postId) => {
    if (!confirm('Удалить публикацию?')) return;
    await api.admin.deleteNewsPost(postId);
    load();
  };

  const handleSave = () => {
    setModalOpen(false);
    setEditing(null);
    load();
  };

  return (
    <div className="pt-24 min-h-screen px-6 py-12 max-w-screen-xl mx-auto">
      <Link to="/admin/residents" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors mb-8 group">
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        Назад к резидентам
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-cyber-violet mb-1">Публикации резидента</p>
          <h1 className="text-3xl font-black uppercase text-white">{resident?.name || '...'}</h1>
        </div>
        <button
          onClick={() => { setEditing(null); setModalOpen(true); }}
          className="flex items-center gap-2 bg-[#FF6B2B] text-white text-xs font-bold uppercase tracking-widest px-5 py-3 hover:bg-[#FF8C4D] transition-colors rounded-xl"
        >
          <Plus size={14} /> Добавить
        </button>
      </div>

      {loading ? (
        <p className="text-white/40">Загрузка...</p>
      ) : posts.length === 0 ? (
        <p className="text-white/40">Нет публикаций. Добавьте первую!</p>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="border border-white/10 p-5 flex items-center justify-between gap-4 rounded-2xl hover:border-white/20 transition-colors">
              <div className="flex items-center gap-4 min-w-0">
                {post.cover_url && (
                  <img src={post.cover_url} alt="" className="w-14 h-14 object-cover rounded-xl shrink-0" />
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {post.tag && <span className="text-xs text-cyber-violet uppercase tracking-wider font-bold">{post.tag}</span>}
                    <span className="text-xs text-white/30">{formatDate(post.date)}</span>
                    {!post.is_published && <span className="text-xs text-yellow-500 font-bold">Скрыто</span>}
                  </div>
                  <h3 className="font-bold text-white truncate">{post.title}</h3>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => { setEditing(post); setModalOpen(true); }} className="p-2 text-white/40 hover:text-white transition-colors">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(post.id)} className="p-2 text-white/40 hover:text-red-400 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <PostModal
          item={editing}
          residentId={id}
          onClose={() => { setModalOpen(false); setEditing(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}