import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { ArrowLeft, Plus, Pencil, Trash2, FileText } from 'lucide-react';
import ResidentFormModal from '@/components/admin/ResidentFormModal';

export default function AdminResidents() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    setLoading(true);
    const data = await api.admin.listResidents();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Удалить резидента?')) return;
    await api.admin.deleteResident(id);
    load();
  };

  const handleSave = () => {
    setModalOpen(false);
    setEditing(null);
    load();
  };

  return (
    <div className="pt-24 min-h-screen px-6 py-12 max-w-screen-xl mx-auto">
      <Link to="/admin" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors mb-8 group">
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        Назад
      </Link>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black uppercase text-white">Резиденты</h1>
        <button
          onClick={() => { setEditing(null); setModalOpen(true); }}
          className="flex items-center gap-2 bg-[#4B7CF3] text-white text-xs font-bold uppercase tracking-widest px-5 py-3 hover:bg-[#6B94F5] transition-colors"
        >
          <Plus size={14} /> Добавить
        </button>
      </div>

      {loading ? (
        <p className="text-white/40">Загрузка...</p>
      ) : items.length === 0 ? (
        <p className="text-white/40">Нет резидентов. Добавьте первого!</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="border border-white/10 p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                {item.photo_url && (
                  <img src={item.photo_url} alt="" className="w-14 h-14 object-cover rounded-full shrink-0" />
                )}
                <div className="min-w-0">
                  <p className="text-xs text-[#4B7CF3] uppercase tracking-wider mb-1">{item.tag}</p>
                  <h3 className="font-bold text-white truncate">{item.name}</h3>
                  <p className="text-xs text-white/30 truncate">{item.contact_name} · {item.contact_email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link to={`/admin/residents/${item.id}/posts`} className="p-2 text-white/40 hover:text-cyber-violet transition-colors" title="Публикации">
                  <FileText size={16} />
                </Link>
                <button onClick={() => { setEditing(item); setModalOpen(true); }} className="p-2 text-white/40 hover:text-white transition-colors">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-2 text-white/40 hover:text-red-400 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <ResidentFormModal
          item={editing}
          onClose={() => { setModalOpen(false); setEditing(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
