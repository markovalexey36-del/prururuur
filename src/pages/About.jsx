import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const timeline = [
{
  year: '2023',
  month: 'октябрь',
  title: 'Появление идеи',
  text: 'Молодые энтузиасты собрались «под крышей», чтобы создать медиаплатформу, которая позволит подросткам говорить о важных для них вещах. Так родилась концепция медиаковоркинга.'
},
{
  year: '2023',
  month: 'ноябрь',
  title: 'Первый подпроект',
  text: 'Запускается первый подпроект — «Говорят Подростки» на базе Центра Молодёжных Инициатив.'
},
{
  year: '2024',
  title: 'Расширение',
  text: 'Проект получил поддержку различных организаций, выигрывает районные и областные педагогические конкурсы. Запускается производство медиа-баннеров с цитатами подростков — итоговым продуктом проекта.'
},
{
  year: '2025',
  title: 'Развитие сообщества',
  text: 'Проект выигрывает конкурс Росмолодёжь.Гранты на реализацию молодёжного медиаковоркинга. #подКрышей превратился в живое сообщество молодых журналистов, видеографов и ораторов, которое продолжает искать новых участников и развивается вместе с ними.'
}];


const values = [
{
  title: 'Голос молодёжи',
  text: 'Мы даём площадку тем, кому есть что сказать, поддерживаем свободу самовыражения и создаём условия для открытых дискуссий.'
},
{
  title: 'Медиаграмотность',
  text: 'Учим подростков создавать качественный контент: от идеи до публикации. Развиваем критическое мышление и навыки работы с информацией.'
},
{
  title: 'Открытость',
  text: 'Каждый может стать резидентом — независимо от опыта и подготовки. Мы верим, что талант есть в каждом, и помогаем его раскрыть.'
},
{
  title: 'Сообщество',
  text: 'Под крышей рождаются дружба, идеи и совместные проекты. Мы строим пространство, где подростки чувствуют себя частью чего-то большого.'
}];


export default function About() {
  return (
    <div className="pt-24 pb-0">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 md:px-6 py-16 md:py-24 max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}>
          
          <p className="text-xs font-bold uppercase tracking-widest text-cyber-violet mb-4">О проекте</p>
          <h1 className="hero-headline text-white mb-6">
            Под одной<br />
            <span className="text-cyber-violet">крышей</span>
          </h1>
          <div className="w-full h-px bg-gradient-to-r from-cyber-violet to-transparent my-8" />
          <div className="w-full space-y-5">
            <p className="text-base md:text-lg text-pearl-grey/80 leading-relaxed">
              «#подКрышей» — это современный медиаковоркинг, созданный специально для подростков и молодёжи в возрасте от 14 до 21 года. Пространство объединяет начинающих журналистов, блогеров, видеографов, ведущих подкастов и других творческих молодых людей, которые хотят попробовать себя в медиасфере. Каждому участнику здесь предоставляется возможность создать и реализовать свой собственный медиапроект: записать аудио‑ или видеоподкаст, провести интервью, организовать ток‑шоу, снять короткий фильм или репортаж. Резиденты используют современное оборудование и получают поддержку кураторов, чтобы развивать свои творческие, профессиональные и личные навыки. Проект не требует профессионального опыта, и вступить в сообщество можно по письму или заявке на сайте, поэтому начинающие авторы могут попробовать себя в разных ролях и стать частью дружной команды.
            </p>
            <p className="text-base md:text-lg text-pearl-grey/80 leading-relaxed">
              Медиаплатформа появилась как ответ на потребность подростков в безопасном пространстве для свободного выражения мыслей и обмена идеями. Сегодня цифровая среда формирует целые субкультуры, но она также ведёт к переизбытку информации, потере ценностных ориентиров и отсутствию живого общения. Медиаковоркинг призван соединить онлайн и офлайн‑реальности: он позволяет участникам создавать контент с реальным социальным эффектом, развивать медиаграмотность и учиться работать в команде. Благодаря наставничеству и совместным проектам у резидентов формируются навыки критического мышления, публичных выступлений и планирования, что помогает определиться с будущей профессией и раскрыть потенциал.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Photo collage */}
      <section className="px-4 md:px-6 mb-16 md:mb-24">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {[
          'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&q=80',
          'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&q=80',
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80'].
          map((src, i) =>
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative overflow-hidden rounded-2xl hidden ${i === 1 ? 'row-span-1 h-64' : 'h-48'}`}>
            
              
              
            </motion.div>
          )}
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 md:px-6 py-16 md:py-24 border-t border-white/10">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-cyber-violet mb-4">История</p>
          <h2 className="section-headline text-white mb-12 md:mb-16">
            Как это<br /><span className="text-cyber-violet">началось</span>
          </h2>
          <div className="relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyber-violet to-transparent" />
            <div className="space-y-8 md:space-y-12">
              {timeline.map((item, i) =>
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? 'md:pr-[52%]' : 'md:pl-[52%] md:flex-row-reverse'}`}>
                
                  <div className="relative border border-white/10 hover:border-cyber-violet/30 p-5 md:p-6 rounded-2xl transition-all duration-300 hover:bg-white/[0.02]">
                    <span className="text-3xl md:text-4xl font-black tabular-nums mb-1 block text-cyber-violet">
                      {item.year}
                    </span>
                    {item.month &&
                  <span className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2 block">{item.month}</span>
                  }
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-pearl-grey/60 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 md:px-6 py-16 md:py-24 border-t border-white/10">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-cyber-violet mb-4">Ценности</p>
          <h2 className="section-headline text-white mb-12 md:mb-16">
            Мы<br /><span className="text-cyber-violet">верим</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v, i) =>
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-white/10 p-5 md:p-6 rounded-2xl hover:border-cyber-violet/40 transition-all duration-300 group">
              
                <div className="w-8 h-px bg-cyber-violet mb-4 group-hover:w-16 transition-all duration-300" />
                <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                <p className="text-sm text-pearl-grey/50 leading-relaxed">{v.text}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Socials */}
      <section className="px-4 md:px-6 py-12 md:py-16 border-t border-white/10">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-cyber-violet mb-2">Следите за нами</p>
            <h3 className="text-xl md:text-2xl font-black text-white">В социальных сетях</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
            { name: 'ВКонтакте', url: 'https://vk.com/podkryshey_covorking' },
            { name: 'Telegram', url: 'https://t.me/podKrysha' }].
            map((s) =>
            <a
              key={s.name}
              href={s.url}
              className="flex items-center gap-2 border border-white/20 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white/60 hover:text-cyber-violet hover:border-cyber-violet transition-all duration-300 group rounded-xl">
              
                {s.name}
                <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}
          </div>
        </div>
      </section>
    </div>);

}