import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import heroLombok1 from "@/assets/hero-lombok-1.jpg";
import heroLombok2 from "@/assets/hero-lombok-2.jpg";
import heroLombok3 from "@/assets/hero-lombok-3.jpg";
import heroLombok4 from "@/assets/hero-lombok-4.jpg";
import heroLombok5 from "@/assets/hero-lombok-5.jpg";

interface HeroImage {
  id: string;
  image_url: string;
  title: string | null;
  subtitle: string | null;
  display_order: number;
}

export const HeroSlider = () => {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    fetchHeroImages();
  }, []);

  const fetchHeroImages = async () => {
    const { data, error } = await supabase
      .from("hero_images")
      .select("*")
      .eq("is_active", true)
      .order("display_order");

    if (!error && data) {
      setImages(data);
    }
  };

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      goToNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const getImageSrc = (imageUrl: string): string => {
    const imageMap: Record<string, string> = {
      'hero-lombok-1.jpg': heroLombok1,
      'hero-lombok-2.jpg': heroLombok2,
      'hero-lombok-3.jpg': heroLombok3,
      'hero-lombok-4.jpg': heroLombok4,
      'hero-lombok-5.jpg': heroLombok5,
    };
    return imageMap[imageUrl] || imageUrl;
  };

  if (images.length === 0) {
    return (
      <div className="relative h-[400px] md:h-[600px] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Lombok Ride Buddy</h1>
          <p className="text-lg md:text-xl text-muted-foreground">Your adventure starts here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[400px] md:h-[600px] overflow-hidden group">
      {/* Images */}
      <div className="relative h-full">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={getImageSrc(image.image_url)}
              alt={image.title || "Hero image"}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            
            {/* Text Overlay */}
            {(image.title || image.subtitle) && (
              <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                  {image.title && (
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg">
                      {image.title}
                    </h1>
                  )}
                  {image.subtitle && (
                    <p className="text-lg md:text-2xl text-white/90 drop-shadow-md">
                      {image.subtitle}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={goToPrev}
            disabled={isTransitioning}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={goToNext}
            disabled={isTransitioning}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Dots Navigation */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
