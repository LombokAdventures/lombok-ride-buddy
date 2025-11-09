import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const ComingSoon = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [tourEmail, setTourEmail] = useState('');
  const [villaEmail, setVillaEmail] = useState('');
  const [isSubmittingTour, setIsSubmittingTour] = useState(false);
  const [isSubmittingVilla, setIsSubmittingVilla] = useState(false);

  const handleTourSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tourEmail.trim()) return;

    setIsSubmittingTour(true);
    try {
      const { error } = await supabase
        .from('tour_emails')
        .insert([{ email: tourEmail.trim() }]);

      if (error) throw error;

      toast({
        title: t.comingSoon.tours.thankYou,
      });
      setTourEmail('');
    } catch (error) {
      console.error('Error submitting tour email:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit email. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmittingTour(false);
    }
  };

  const handleVillaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!villaEmail.trim()) return;

    setIsSubmittingVilla(true);
    try {
      const { error } = await supabase
        .from('villa_emails')
        .insert([{ email: villaEmail.trim() }]);

      if (error) throw error;

      toast({
        title: t.comingSoon.villas.thankYou,
      });
      setVillaEmail('');
    } catch (error) {
      console.error('Error submitting villa email:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit email. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmittingVilla(false);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tours Card */}
          <div className="relative overflow-hidden rounded-lg shadow-card bg-card border border-border p-8">
            <div className="absolute inset-0 bg-gradient-tropical opacity-10"></div>
            <div className="relative">
              <h3 className="text-3xl font-bold text-foreground mb-3">
                {t.comingSoon.tours.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 text-lg">
                {t.comingSoon.tours.description}
              </p>

              <form onSubmit={handleTourSubmit} className="flex gap-2">
                <Input 
                  type="email"
                  placeholder={t.comingSoon.tours.emailPlaceholder}
                  value={tourEmail}
                  onChange={(e) => setTourEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" disabled={isSubmittingTour} className="bg-secondary hover:bg-secondary/90">
                  {t.comingSoon.tours.cta}
                </Button>
              </form>
            </div>
          </div>

          {/* Villas Card */}
          <div className="relative overflow-hidden rounded-lg shadow-card bg-card border border-border p-8">
            <div className="absolute inset-0 bg-gradient-sunset opacity-10"></div>
            <div className="relative">
              <h3 className="text-3xl font-bold text-foreground mb-3">
                {t.comingSoon.villas.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 text-lg">
                {t.comingSoon.villas.description}
              </p>

              <form onSubmit={handleVillaSubmit} className="flex gap-2">
                <Input 
                  type="email"
                  placeholder={t.comingSoon.villas.emailPlaceholder}
                  value={villaEmail}
                  onChange={(e) => setVillaEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" disabled={isSubmittingVilla} className="bg-accent hover:bg-accent/90">
                  {t.comingSoon.villas.cta}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
