import { useState } from 'react';
import { Upload, X, File } from 'lucide-react';
import { api } from '@/lib/api';

export default function ImageUploadField({ label, value, onChange, accept = 'image/*' }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await api.admin.upload(file);
      onChange(file_url);
    } finally {
      setUploading(false);
    }
  };

  const isImage = value && /\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i.test(value);

  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">{label}</label>
      {value ? (
        <div className="flex items-center gap-3">
          {isImage ? (
            <div className="relative inline-block">
              <img src={value} alt="" className="h-32 w-auto object-cover border border-white/10 rounded-lg" />
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute top-1 right-1 bg-black/70 hover:bg-black p-0.5 rounded transition-colors"
              >
                <X size={14} className="text-white" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-3 border border-white/10 rounded-lg bg-white/5">
              <File size={16} className="text-white/40" />
              <span className="text-sm text-white/50 truncate max-w-[200px]">{value.split('/').pop()}</span>
              <button onClick={() => onChange('')} className="ml-2 text-white/40 hover:text-white">
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <label className="flex items-center gap-3 px-4 py-3 border border-dashed border-white/20 hover:border-cyber-violet/50 cursor-pointer transition-colors group rounded-lg">
          <Upload size={16} className="text-white/30 group-hover:text-cyber-violet transition-colors" />
          <span className="text-sm text-white/30 group-hover:text-white/60 transition-colors">
            {uploading ? 'Загрузка...' : 'Выбрать файл с компьютера'}
          </span>
          <input type="file" accept={accept} onChange={handleFile} className="hidden" disabled={uploading} />
        </label>
      )}
    </div>
  );
}