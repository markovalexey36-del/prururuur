import { useRef, useState } from 'react';
import { Plus, Trash2, Image, Film, Upload } from 'lucide-react';
import { api } from '@/lib/api';

export default function GalleryEditor({ items = [], onChange }) {
  const [items2, setItems2] = useState(items);
  const [uploading, setUploading] = useState({});
  const inputRefs = useRef({});

  const setItems = (newItems) => {
    setItems2(newItems);
    onChange(newItems);
  };

  const add = (e) => {
    e.preventDefault();
    setItems([...items2, { url: '', type: 'image', label: '' }]);
  };

  const remove = (e, i) => {
    e.preventDefault();
    setItems(items2.filter((_, idx) => idx !== i));
  };

  const update = (i, patches) => {
    const next = [...items2];
    next[i] = { ...next[i], ...patches };
    setItems(next);
  };

  const handleUpload = async (e, i) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(u => ({ ...u, [i]: true }));
    try {
      const { file_url } = await api.admin.upload(file);
      const isVideo = file.type.startsWith('video/');
      update(i, { url: file_url, type: isVideo ? 'video' : 'image' });
    } catch (err) {
      alert('Ошибка загрузки: ' + err.message);
    }
    setUploading(u => ({ ...u, [i]: false }));
    if (inputRefs.current[i]) inputRefs.current[i].value = '';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-widest text-white/40">Галерея</span>
        <button type="button" onClick={add}
          className="flex items-center gap-1 text-xs font-bold text-cyber-violet hover:text-white transition-colors">
          <Plus size={14} /> Добавить
        </button>
      </div>

      {items2.length === 0 && (
        <p className="text-xs text-white/20 italic">Нет медиафайлов. Нажмите «Добавить»</p>
      )}

      <div className="space-y-3">
        {items2.map((item, i) => (
          <div key={i} className="flex items-start gap-2 bg-white/[0.03] border border-white/10 p-3 rounded-xl">
            <div className="flex-1 space-y-2">
              {/* URL + upload */}
              <div className="flex gap-2">
                <input
                  value={item.url}
                  onChange={e => update(i, { url: e.target.value })}
                  placeholder="URL файла (или загрузите с компьютера →)"
                  className="flex-1 bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none focus:border-cyber-violet rounded-lg"
                />
                <label className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-colors shrink-0 ${
                  uploading[i] ? 'bg-white/5 text-white/30 pointer-events-none' : 'bg-white/5 text-white/40 hover:text-cyber-violet hover:bg-cyber-violet/10'
                }`}>
                  <Upload size={11} />
                  {uploading[i] ? 'Загрузка...' : 'С ПК'}
                  <input
                    ref={el => { inputRefs.current[i] = el; }}
                    type="file"
                    accept="image/*,video/*"
                    onChange={e => handleUpload(e, i)}
                    className="hidden"
                    disabled={!!uploading[i]}
                  />
                </label>
              </div>

              {/* Preview if uploaded */}
              {item.url && item.type === 'image' && (
                <img src={item.url} alt="" className="h-20 w-auto object-cover rounded-lg border border-white/10" />
              )}

              {/* Type + label */}
              <div className="flex gap-2">
                <div className="flex gap-1">
                  <button type="button" onClick={() => update(i, { type: 'image' })}
                    className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                      item.type === 'image' ? 'bg-cyber-violet/20 text-cyber-violet' : 'bg-white/5 text-white/40 hover:text-white/70'
                    }`}>
                    <Image size={12} /> Фото
                  </button>
                  <button type="button" onClick={() => update(i, { type: 'video' })}
                    className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                      item.type === 'video' ? 'bg-cyber-violet/20 text-cyber-violet' : 'bg-white/5 text-white/40 hover:text-white/70'
                    }`}>
                    <Film size={12} /> Видео
                  </button>
                </div>
                <input
                  value={item.label || ''}
                  onChange={e => update(i, { label: e.target.value })}
                  placeholder="Подпись"
                  className="flex-1 bg-white/5 border border-white/10 text-white text-sm px-2 py-1.5 focus:outline-none focus:border-cyber-violet rounded-lg"
                />
              </div>
            </div>
            <button type="button" onClick={e => remove(e, i)}
              className="p-1.5 text-white/30 hover:text-red-400 transition-colors shrink-0">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}