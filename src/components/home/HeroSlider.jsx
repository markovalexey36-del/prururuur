import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSlider() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/banner.jpg"
          alt=""
          className="w-full h-full object-cover object-center" />
        
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/85 to-obsidian/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-4 md:px-12 py-20 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-cyber-violet/30 bg-cyber-violet/5 rounded-full mb-6">
              <span className="w-2 h-2 bg-cyber-violet rounded-full animate-pulse-neon" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-cyber-violet">Медиаковоркинг нового поколения</span>
            </div>

            <h1 className="text-[clamp(3rem,7vw,7rem)] leading-[0.88] font-black uppercase tracking-[-0.04em] text-white mb-4">
              #под<span className="text-cyber-violet">Крышей</span>
            </h1>

            <p className="text-lg md:text-xl text-white/50 font-light max-w-md mb-8 leading-relaxed">
              Пространство, где молодые таланты создают, говорят и меняют медиаландшафт вокруг себя.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link to="/residents">
                <button className="btn-primary rounded-xl text-sm">
                  <span className="flex items-center gap-2">
                    Резиденты <ChevronRight size={16} />
                  </span>
                </button>
              </Link>
              <Link to="/media">
                <button className="px-8 py-3 text-xs font-bold uppercase tracking-widest border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all rounded-xl">
                  Медиапроекты
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right: Stats / event card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="hidden lg:block">
            
            <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-8 rounded-3xl space-y-6 hidden">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyber-violet mb-2">Сейчас в эфире</p>
                <h3 className="text-2xl font-black uppercase text-white leading-tight">
                  Подкаст «Говорят подростки»
                </h3>
                <p className="text-sm text-white/40 mt-2">Новый сезон уже здесь — честные разговоры о том, что волнует молодёжь.</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <p className="text-3xl font-black text-white">12+</p>
                  <p className="text-xs text-white/30 font-bold uppercase tracking-wider mt-1">Резидентов</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-white">50+</p>
                  <p className="text-xs text-white/30 font-bold uppercase tracking-wider mt-1">Проектов</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-white">3</p>
                  <p className="text-xs text-white/30 font-bold uppercase tracking-wider mt-1">Года работы</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-white">200+</p>
                  <p className="text-xs text-white/30 font-bold uppercase tracking-wider mt-1">Участников</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian to-transparent z-10 pointer-events-none" />
    </section>);

}