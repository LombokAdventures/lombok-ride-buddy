import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Star, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

interface HeroImage {
  id: string;
  image_url: string;
  created_at: string;
}

export const Hero = () => {
  const { t } = useLanguage();
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    fetchHeroImages();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('hero-images-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'hero_images' }, () => {
        fetchHeroImages();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    if (heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        setIsTransitioning(false);
      }, 500); // Transition duration
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const fetchHeroImages = async () => {
    const { data, error } = await supabase
      .from('hero_images')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching hero images:', error);
      return;
    }

    if (data && data.length > 0) {
      setHeroImages(data);
    }
  };

  const scrollToFleet = () => {
    document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentImage = heroImages[currentImageIndex];
  const fallbackImage = new URL('@/assets/hero-background.jpg', import.meta.url).href;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Hero Background Images with Carousel */}
      {heroImages.length > 0 ? (
        heroImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentImageIndex && !isTransitioning ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image.image_url})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
          </div>
        ))
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${fallbackImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">Lombok, Indonesia</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {t.hero.title}
          </h1>

          <p className="text-2xl md:text-3xl text-white/90 mb-8 font-semibold drop-shadow-md">
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
            <span className="text-foreground font-semibold">{t.hero.trustBadge}</span>
          </div>

          {/* Image indicators */}
          {heroImages.length > 1 && (
            <div className="mt-8 flex gap-2 justify-center">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};
