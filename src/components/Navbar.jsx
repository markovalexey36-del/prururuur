import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

const navLinks = [
{ label: 'Главная', path: '/' },
{ label: 'О нас', path: '/about' },
{ label: 'Резиденты', path: '/residents' },
{ label: 'Медиапроекты', path: '/media' },
{ label: 'Контакты', path: '/contacts' }];


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ?
      'bg-[#0C0F1A]/95 backdrop-blur-md border-b border-white/10' :
      'bg-[#0C0F1A]/80 border-b border-white/5'}`
      }>
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <span className="text-xl font-black uppercase tracking-tighter text-white">
                #подКрышей
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 relative group ${
              location.pathname === link.path ?
              'text-cyber-violet' :
              'text-white/70 hover:text-white'}`
              }>
              
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-cyber-violet transition-all duration-300 ${
              location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`
              } />
              </Link>
            )}
          </div>

          {/* Live status + mobile menu */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
              
              
            </div>
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-white p-1">
              
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen &&
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[100] bg-[#0C0F1A] flex flex-col">
          
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
              <span className="text-xl font-black text-white">#подКрышей</span>
              <button onClick={() => setMenuOpen(false)} className="text-white p-1">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 gap-2">
              {navLinks.map((link, i) =>
            <motion.div
              key={link.path}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}>
              
                  <Link
                to={link.path}
                className="block text-4xl font-black uppercase tracking-tight text-white hover:text-cyber-violet transition-colors duration-200 py-3 border-b border-white/10">
                
                    {link.label}
                  </Link>
                </motion.div>
            )}
            </div>
            <div className="px-8 py-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyber-violet" />
              <span className="text-cyber-violet text-xs font-bold uppercase tracking-widest">Открыто сейчас</span>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}