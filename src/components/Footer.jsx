import { Link } from 'react-router-dom';

const socials = [
  { name: 'ВКонтакте', url: 'https://vk.com/podkryshey_covorking' },
  { name: 'Telegram', url: 'https://t.me/podKrysha' },
];

export default function Footer() {
  const footerBg = '#0A0D18';
  const footerText = '#E8EDF5';

  return (
    <footer
      style={{ backgroundColor: footerBg }}
      className="border-t border-white/10">
      
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {/* Left: Info */}
          <div>
            <div className="mb-6">
              <p className="text-sm opacity-60" style={{ color: footerText }}>
                Молодёжный медиаковоркинг работает<br />
                и готов принять новых резидентов
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest opacity-50 mb-1" style={{ color: footerText }}>
                Контакты
              </p>
              <p className="text-sm opacity-80" style={{ color: footerText }}>
                podkryshey@yandex.ru
              </p>
              <p className="text-sm opacity-80" style={{ color: footerText }}>
                +7 (905) 427-58-99
              </p>
            </div>
          </div>

          {/* Right: Socials */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-50 mb-6" style={{ color: footerText }}>
              Мы в сети
            </p>
            <div className="flex flex-col gap-1">
              {socials.map((social) =>
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight transition-all duration-300 hover:translate-x-3 hover:text-cyber-violet"
                style={{ color: footerText }}>
                
                  {social.name}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 md:mt-16 pt-6 border-t flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        style={{ borderColor: `${footerText}20` }}>
          <Link to="/" className="text-lg font-black uppercase tracking-tighter" style={{ color: footerText }}>
            #подКрышей
          </Link>
          <p className="text-xs opacity-40" style={{ color: footerText }}>
            © 2024 Молодёжный медиаковоркинг #подКрышей
          </p>
        </div>
      </div>
    </footer>);
}