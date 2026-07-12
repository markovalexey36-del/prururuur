import { useState } from 'react';
import { api } from '@/lib/api';
import { X, Plus, Trash2 } from 'lucide-react';
import ImageUploadField from './ImageUploadField';
import GalleryEditor from './GalleryEditor';
import { toast } from 'sonner';

export default function ResidentFormModal({ item, onClose, onSave }) {
  const [form, setForm] = useState({
    name: item?.name || '',
    tag: item?.tag || '',
    photo_url: item?.photo_url || '',
    bio: item?.bio || '',
    contact_name: item?.contact_name || '',
    contact_email: item?.contact_email || '',
    contact_phone: item?.contact_phone || '',
    google_form_url: item?.google_form_url || '',
    social_links: item?.social_links || [],
    media_gallery: item?.media_gallery || [],
    is_active: item?.is_active ?? true,
  });
  const [saving, setSaving] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const addSocialLink = () => {
    setForm(f => ({ ...f, social_links: [...(f.social_links || []), { platform: '', url: '' }] }));
  };
  const removeSocialLink = (i) => {
    setForm(f => ({ ...f, social_links: f.social_links.filter((_, idx) => idx !== i) }));
  };
  const updateSocialLink = (i, field, value) => {
    const next = [...form.social_links];
    next[i] = { ...next[i], [field]: value };
    set('social_links', next);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (item?.id) {
        await api.admin.updateResident(item.id, form);
      } else {
        await api.admin.createResident(form);
      }
      toast.success(item?.id ? 'Резидент обновлён' : 'Резидент создан');
      onSave();
    } catch (err) {
      toast.error(err.message || 'Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-[#0C0F1A] border border-white/15 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-lg font-black uppercase text-white">{item ? 'Редактировать' : 'Новый резидент'}</h2>
          <button onClick={onClose}><X size={20} className="text-white/40 hover:text-white" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Имя/Название *" value={form.name} onChange={v => set('name', v)} />
            <Field label="Тег" value={form.tag} onChange={v => set('tag', v)} placeholder="Подкаст, Видео..." />
          </div>
          <ImageUploadField label="Фото/Лого" value={form.photo_url} onChange={v => set('photo_url', v)} />
          <GalleryEditor items={form.media_gallery} onChange={v => set('media_gallery', v)} />
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Описание</label>
            <textarea
              value={form.bio}
              onChange={e => set('bio', e.target.value)}
              rows={4}
              className="w-full bg-white/5 border border-white/10 text-white text-sm p-3 resize-y focus:outline-none focus:border-cyber-violet rounded-lg"
            />
          </div>

          {/* Social links */}
          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold uppercase tracking-widest text-white/30">Соцсети</p>
              <button onClick={addSocialLink}
                className="flex items-center gap-1 text-xs font-bold text-cyber-violet hover:text-white transition-colors">
                <Plus size={14} /> Добавить
              </button>
            </div>
            {form.social_links && form.social_links.length > 0 ? (
              <div className="space-y-2">
                {form.social_links.map((link, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      value={link.platform}
                      onChange={e => updateSocialLink(i, 'platform', e.target.value)}
                      placeholder="Платформа (VK, Telegram, YouTube...)"
                      className="flex-[2] bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none focus:border-cyber-violet rounded-lg"
                    />
                    <input
                      value={link.url}
                      onChange={e => updateSocialLink(i, 'url', e.target.value)}
                      placeholder="URL"
                      className="flex-[3] bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none focus:border-cyber-violet rounded-lg"
                    />
                    <button onClick={() => removeSocialLink(i)}
                      className="p-2 text-white/30 hover:text-red-400 transition-colors shrink-0">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-white/20 italic">Нет соцсетей. Нажмите «Добавить»</p>
            )}
          </div>

          <div className="border-t border-white/10 pt-4">
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Ответственное лицо</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Имя" value={form.contact_name} onChange={v => set('contact_name', v)} />
              <Field label="Email" value={form.contact_email} onChange={v => set('contact_email', v)} />
              <Field label="Телефон" value={form.contact_phone} onChange={v => set('contact_phone', v)} />
            </div>
          </div>
          <Field label="Ссылка на Google-форму" value={form.google_form_url} onChange={v => set('google_form_url', v)} placeholder="https://forms.google.com/..." />
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.is_active} onChange={e => set('is_active', e.target.checked)} className="w-4 h-4" />
            <span className="text-sm text-white/60">Активный резидент</span>
          </label>
        </div>
        <div className="p-6 border-t border-white/10 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2 text-xs font-bold uppercase tracking-widest border border-white/20 text-white/50 hover:text-white transition-colors rounded-xl">
            Отмена
          </button>
          <button onClick={handleSave} disabled={saving || !form.name}
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