import { Button } from '@/components/ui/button';
import { Star, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Hero = () => {
  const { t } = useLanguage();

  const scrollToFleet = () => {
    document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${new URL('@/assets/hero-background.jpg', import.meta.url).href})`,
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">Lombok, Indonesia</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {t.hero.title}
          </h1>
          
          <p className="text-2xl md:text-3xl text-white/90 mb-8 font-semibold">
            {t.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              onClick={scrollToFleet}
              className="text-lg px-8 py-6 bg-accent hover:bg-accent/90 shadow-elegant hover:shadow-float transition-all hover:scale-105"
            >
              {t.hero.cta}
            </Button>
          </div>

          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-card">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-gray-900 font-semibold">{t.hero.trustBadge}</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};
