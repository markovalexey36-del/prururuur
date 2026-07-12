import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react';

const socials = [
  { name: 'ВКонтакте', url: 'https://vk.com/podkryshey_covorking' },
  { name: 'Telegram', url: 'https://t.me/podKrysha' },
];

export default function Contacts() {
  return (
    <div className="pt-24 pb-0">
      {/* Header */}
      <section className="px-4 md:px-6 py-16 md:py-20 max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-cyber-violet mb-4">Связаться</p>
          <h1 className="hero-headline text-white">
            Будь<br />
            <span className="text-cyber-violet">в контакте</span>
          </h1>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-cyber-violet to-transparent opacity-50 mb-12 md:mb-16" />

      {/* Info grid */}
      <section className="px-4 md:px-6 py-8 md:py-16 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-20">
          {[
            {
              icon: Mail,
              label: 'Email',
              value: 'podkryshey@yandex.ru',
              href: 'mailto:podkryshey@yandex.ru',
            },
            {
              icon: Phone,
              label: 'Телефон',
              value: '+7 (905) 427-58-99',
              href: 'tel:+79054275899',
            },
            {
              icon: MapPin,
              label: 'Адрес',
              value: 'Медиаковоркинг #подКрышей',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-white/10 p-5 md:p-6 rounded-2xl hover:border-cyber-violet/30 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-cyber-violet/10">
                <item.icon size={18} className="text-cyber-violet" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-2">
                {item.label}
              </p>
              {item.href ? (
                <a href={item.href} className="text-base font-bold text-pearl-grey hover:text-cyber-violet transition-colors leading-relaxed">
                  {item.value}
                </a>
              ) : (
                <p className="text-base font-bold text-pearl-grey leading-relaxed">
                  {item.value}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Social links */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-cyber-violet mb-6 md:mb-8">
            Мы в соцсетях
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {socials.map((s, i) => (
              <motion.a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group flex items-center justify-between border border-white/10 px-5 md:px-6 py-4 md:py-5 rounded-2xl hover:border-cyber-violet/30 transition-all duration-300 hover:bg-white/[0.02]"
              >
                <span className="text-xl md:text-3xl font-black uppercase text-white group-hover:text-white transition-colors">
                  {s.name}
                </span>
                <ArrowUpRight
                  size={20}
                  className="text-white/30 group-hover:text-cyber-violet transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="px-4 md:px-6 py-20 md:py-24 border-t border-white/10">
        <div className="max-w-screen-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-cyber-violet mb-4">
              Присоединяйся
            </p>
            <h2 className="section-headline text-white mb-6">
              Стань<br />
              <span className="text-cyber-violet">резидентом</span>
            </h2>
            <p className="text-pearl-grey/60 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Если тебе есть что сказать — мы дадим тебе микрофон, камеру и сцену. Открытый набор резидентов.
            </p>
            <a href="mailto:podkryshey@yandex.ru">
              <button className="btn-primary rounded-xl text-sm">
                <span>Написать нам</span>
              </button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}