import { useState, useEffect } from 'react';
import { BikeCard } from './BikeCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

interface Bike {
  id: string;
  name: string;
  model: string;
  daily_price: number;
  weekly_price: number | null;
  monthly_price: number | null;
  features: string[];
  engine: string;
  transmission: string;
  fuel_capacity: string;
  status: string;
  image: string;
}

export const Fleet = () => {
  const { t } = useLanguage();
  const [bikes, setBikes] = useState<Bike[]>([]);

  useEffect(() => {
    fetchBikes();
    
    // Subscribe to realtime changes
    const channel = supabase
      .channel('bikes-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bikes' }, () => {
        fetchBikes();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchBikes = async () => {
    const { data, error } = await supabase
      .from('bikes')
      .select('*')
      .order('daily_price', { ascending: true });

    if (error) {
      console.error('Error fetching bikes:', error);
      return;
    }

    if (data) {
      setBikes(data);
    }
  };

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
