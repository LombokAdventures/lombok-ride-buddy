import { useState, useEffect } from 'react';
import { BikeCard } from './BikeCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { getBikes } from '@/utils/bikeStorage';
import { Bike } from '@/data/bikes';

export const Fleet = () => {
  const { t } = useLanguage();
  const [bikes, setBikes] = useState<Bike[]>(getBikes());

  // Listen for storage changes (when admin updates bikes)
  useEffect(() => {
    const handleStorageChange = () => {
      setBikes(getBikes());
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also poll for changes every 2 seconds (for same-tab updates)
    const interval = setInterval(() => {
      setBikes(getBikes());
    }, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <section id="fleet" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.fleet.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.fleet.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      </div>
    </section>
  );
};
