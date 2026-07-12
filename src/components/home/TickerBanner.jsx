export default function TickerBanner() {
  const items = [
    '🎙 Подкасты',
    '📹 Видеоролики',
    '🎤 Медиавыступления',
    '🎬 Видеоподкасты',
    '📸 Фотопроекты',
    '🔴 Прямые эфиры',
    '#подКрышей',
  ];

  const repeated = [...items, ...items];

  return (
    <div className="border-y border-cyber-violet/30 bg-cyber-violet/5 py-3 overflow-hidden">
      <div className="flex gap-8 animate-ticker whitespace-nowrap w-max">
        {repeated.map((item, i) => (
          <span key={i} className="text-xs font-bold uppercase tracking-widest text-pearl-grey/60 shrink-0">
            {item}
            <span className="mx-8 text-cyber-violet">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}