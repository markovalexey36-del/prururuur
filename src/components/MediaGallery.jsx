import { useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

function isYouTube(url) {
  return /youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\//.test(url);
}

function isVimeo(url) {
  return /vimeo\.com\//.test(url);
}

function getYouTubeId(url) {
  const m = url.match(/(?:watch\?v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

function getEmbedUrl(url) {
  if (isYouTube(url)) {
    const id = getYouTubeId(url);
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : url;
  }
  if (isVimeo(url)) {
    const m = url.match(/vimeo\.com\/(\d+)/);
    return m ? `https://player.vimeo.com/video/${m[1]}?autoplay=1` : url;
  }
  return url;
}

export default function MediaGallery({ items = [] }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);

  if (!items || items.length === 0) return null;

  const item = items[current];
  const isVideo = item.type === 'video' || /\.(mp4|webm|mov)$/i.test(item.url) || isYouTube(item.url) || isVimeo(item.url);

  const prev = () => { setCurrent((current - 1 + items.length) % items.length); setPlaying(false); };
  const next = () => { setCurrent((current + 1) % items.length); setPlaying(false); };

  return (
    <div className="relative border border-white/10 rounded-2xl overflow-hidden bg-black/30">
      {/* Counter */}
      <div className="absolute top-3 right-3 z-20 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-bold text-white/80">
        {current + 1}/{items.length}
      </div>

      {/* Media display */}
      <div className="aspect-[16/10] md:aspect-[16/9] relative flex items-center justify-center">
        {playing && isVideo ? (
          <>
            {(isYouTube(item.url) || isVimeo(item.url)) ? (
              <iframe
                src={getEmbedUrl(item.url)}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            ) : (
              <video
                key={item.url}
                src={item.url}
                controls
                autoPlay
                className="absolute inset-0 w-full h-full object-contain bg-black"
                onEnded={() => setPlaying(false)}
              />
            )}
          </>
        ) : isVideo ? (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center z-10 group"
          >
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-cyber-violet/90 group-hover:bg-cyber-violet transition-colors">
                <Play size={24} className="text-white ml-1" />
              </div>
            </div>
          </button>
        ) : (
          <img
            src={item.url}
            alt={item.label || ''}
            className="max-w-full max-h-full object-contain"
          />
        )}
      </div>

      {/* Label */}
      {item.label && (
        <p className="px-4 py-2 text-xs text-white/50 font-medium truncate">{item.label}</p>
      )}

      {/* Arrows */}
      {items.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/80 transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/80 transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Dots */}
      {items.length > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setPlaying(false); }}
              className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-cyber-violet w-4' : 'bg-white/40 hover:bg-white/70'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}