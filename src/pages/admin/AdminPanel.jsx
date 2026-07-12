import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Users, Film, Lock, LogOut, Eye, EyeOff } from 'lucide-react';
import { useAdminAuth } from '@/lib/AdminAuthContext';

const sections = [
  { id: 'news', label: 'Новости', icon: Newspaper, path: '/admin/news' },
  { id: 'residents', label: 'Резиденты', icon: Users, path: '/admin/residents' },
  { id: 'media', label: 'Медиапроекты', icon: Film, path: '/admin/media' },
];

export default function AdminPanel() {
  const { isAuthenticated, loading, login: signIn, logout: signOut } = useAdminAuth();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await signIn({ login, password });
    } catch (err) {
      setError(err.message || 'Неверный логин или пароль');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    setLogin('');
    setPassword('');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-obsidian">
      <div className="w-8 h-8 border-2 border-cyber-violet/30 border-t-cyber-violet rounded-full animate-spin" />
    </div>
  );

  if (!isAuthenticated) return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-obsidian">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Lock size={36} className="text-cyber-violet mx-auto mb-4" />
          <h1 className="text-2xl font-black uppercase text-white">Панель управления</h1>
          <p className="text-white/30 text-sm mt-2">#подКрышей</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4 bg-white/[0.03] border border-white/10 rounded-2xl p-8">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Логин</label>
            <input
              type="text"
              value={login}
              onChange={e => setLogin(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-cyber-violet rounded-xl"
              placeholder="admin"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Пароль</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white text-sm px-4 py-3 pr-10 focus:outline-none focus:border-cyber-violet rounded-xl"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button type="button" onClick={() => setShowPass(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {error && <p className="text-red-400 text-xs font-bold">{error}</p>}
          <button type="submit" disabled={submitting}
            className="w-full btn-primary rounded-xl mt-2 disabled:opacity-50"><span>{submitting ? 'Вход...' : 'Войти'}</span>
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="pt-24 min-h-screen px-6 py-12 max-w-screen-xl mx-auto">
      <div className="mb-10 flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#4B7CF3] mb-3">Управление</p>
          <h1 className="text-4xl font-black uppercase text-white">Админ панель</h1>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30 hover:text-cyber-violet transition-colors mt-2">
          <LogOut size={14} /> Выйти
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.id}
              to={s.path}
              className="group border border-white/10 hover:border-[#4B7CF3]/60 p-8 transition-all duration-300 hover:-translate-y-1"
            >
              <Icon size={36} className="text-[#4B7CF3] mb-6" />
              <h2 className="text-2xl font-black uppercase text-white group-hover:text-[#4B7CF3] transition-colors">
                {s.label}
              </h2>
              <p className="text-xs text-white/40 mt-2 uppercase tracking-wider">Управлять →</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}