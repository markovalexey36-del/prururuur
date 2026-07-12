import HeroSlider from '../components/home/HeroSlider';
import TickerBanner from '../components/home/TickerBanner';
import NewsSection from '../components/home/NewsSection.jsx';
import ResidentsPreview from '../components/home/ResidentsPreview.jsx';

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <TickerBanner />
      <ResidentsPreview />
      <NewsSection />
    </div>
  );
}