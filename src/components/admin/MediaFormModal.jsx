import { useState } from 'react';
import { api } from '@/lib/api';
import { X } from 'lucide-react';
import ImageUploadField from './ImageUploadField';
import GalleryEditor from './GalleryEditor';
import ReactQuill from 'react-quill';
import { toast } from 'sonner';

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote', 'code-block'],
    [{ color: [] }, { background: [] }],
    ['link', 'image'],
    ['clean'],
  ],
};

export default function MediaFormModal({ item, onClose, onSave }) {
  const [form, setForm] = useState({
    title: item?.title || '',
    tag: item?.tag || '',
    cover_url: item?.cover_url || '',
    description: item?.description || '',
    social_url: item?.social_url || '',
    body: item?.body || '',
    media_gallery: item?.media_gallery || [],
    is_published: item?.is_published ?? true,
  });
  const [saving, setSaving] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    try {
      if (item?.id) {
        await api.admin.updateMediaProject(item.id, form);
      } else {
        await api.admin.createMediaProject(form);
      }
      toast.success(item?.id ? 'Проект обновлён' : 'Проект создан');
      onSave();
    } catch (err) {
      toast.error(err.message || 'Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-[#0C0F1A] border border-white/15 w-full max-w-3xl max-h-[95vh] overflow-y-auto rounded-2xl">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-lg font-black uppercase text-white">{item ? 'Редактировать' : 'Новый проект'}</h2>
          <button onClick={onClose}><X size={20} className="text-white/40 hover:text-white" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Название *" value={form.title} onChange={v => set('title', v)} />
            <Field label="Тег" value={form.tag} onChange={v => set('tag', v)} placeholder="Подкаст, Видео..." />
          </div>
          <ImageUploadField label="Обложка" value={form.cover_url} onChange={v => set('cover_url', v)} />
          <GalleryEditor items={form.media_gallery} onChange={v => set('media_gallery', v)} />
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Краткое описание</label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              rows={3}
              className="w-full bg-white/5 border border-white/10 text-white text-sm p-3 resize-y focus:outline-none focus:border-cyber-violet rounded-lg"
            />
          </div>

          <Field
            label="Ссылка на соцсеть (необязательно — будет кнопка на странице проекта)"
            value={form.social_url}
            onChange={v => set('social_url', v)}
            placeholder="https://vk.com/... или https://t.me/..."
          />

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
              Полный текст
            </label>
            <div className="rich-editor-wrapper">
              <ReactQuill
                value={form.body}
                onChange={v => set('body', v)}
                modules={quillModules}
                theme="snow"
                placeholder="Подробное описание проекта..."
                className="rounded-lg overflow-hidden"
              />
            </div>
          </div>

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

function Field({ label, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none focus:border-cyber-violet rounded-lg"
      />
    </div>
  );
}