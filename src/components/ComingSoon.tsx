import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { MessageCircle, Send, Mail } from 'lucide-react';
import { contactConfig } from '@/data/bikes';

type ContactMethod = 'email' | 'whatsapp' | 'telegram';

export const ComingSoon = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [tourEmail, setTourEmail] = useState('');
  const [villaEmail, setVillaEmail] = useState('');
  const [tourWhatsapp, setTourWhatsapp] = useState('');
  const [villaWhatsapp, setVillaWhatsapp] = useState('');
  const [tourTelegram, setTourTelegram] = useState('');
  const [villaTelegram, setVillaTelegram] = useState('');
  const [isSubmittingTour, setIsSubmittingTour] = useState(false);
  const [isSubmittingVilla, setIsSubmittingVilla] = useState(false);
  const [tourContactMethod, setTourContactMethod] = useState<ContactMethod>('email');
  const [villaContactMethod, setVillaContactMethod] = useState<ContactMethod>('email');

  const handleTourSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (tourContactMethod === 'whatsapp') {
      if (!tourWhatsapp.trim()) return;
      setIsSubmittingTour(true);
      try {
        const { error } = await supabase
          .from('tour_whatsapp')
          .insert([{ whatsapp_number: tourWhatsapp.trim() }]);

        if (error) throw error;

        toast({
          title: t.comingSoon.tours.thankYou,
        });
        setTourWhatsapp('');
      } catch (error) {
        console.error('Error submitting WhatsApp:', error);
        toast({
          title: 'Error',
          description: 'Failed to submit. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsSubmittingTour(false);
      }
      return;
    }

    if (tourContactMethod === 'telegram') {
      if (!tourTelegram.trim()) return;
      setIsSubmittingTour(true);
      try {
        const { error } = await supabase
          .from('tour_telegram')
          .insert([{ telegram_username: tourTelegram.trim() }]);

        if (error) throw error;

        toast({
          title: t.comingSoon.tours.thankYou,
        });
        setTourTelegram('');
      } catch (error) {
        console.error('Error submitting Telegram:', error);
        toast({
          title: 'Error',
          description: 'Failed to submit. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsSubmittingTour(false);
      }
      return;
    }

    // Email submission
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

    if (villaContactMethod === 'whatsapp') {
      if (!villaWhatsapp.trim()) return;
      setIsSubmittingVilla(true);
      try {
        const { error } = await supabase
          .from('villa_whatsapp')
          .insert([{ whatsapp_number: villaWhatsapp.trim() }]);

        if (error) throw error;

        toast({
          title: t.comingSoon.villas.thankYou,
        });
        setVillaWhatsapp('');
      } catch (error) {
        console.error('Error submitting WhatsApp:', error);
        toast({
          title: 'Error',
          description: 'Failed to submit. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsSubmittingVilla(false);
      }
      return;
    }

    if (villaContactMethod === 'telegram') {
      if (!villaTelegram.trim()) return;
      setIsSubmittingVilla(true);
      try {
        const { error } = await supabase
          .from('villa_telegram')
          .insert([{ telegram_username: villaTelegram.trim() }]);

        if (error) throw error;

        toast({
          title: t.comingSoon.villas.thankYou,
        });
        setVillaTelegram('');
      } catch (error) {
        console.error('Error submitting Telegram:', error);
        toast({
          title: 'Error',
          description: 'Failed to submit. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsSubmittingVilla(false);
      }
      return;
    }

    // Email submission
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

              {/* Contact Method Selection */}
              <div className="flex gap-2 mb-4">
                <Button
                  type="button"
                  variant={tourContactMethod === 'whatsapp' ? 'default' : 'outline'}
                  className={tourContactMethod === 'whatsapp' ? 'bg-[#25D366] hover:bg-[#20BA5A]' : ''}
                  onClick={() => setTourContactMethod('whatsapp')}
                  size="sm"
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  WhatsApp
                </Button>
                <Button
                  type="button"
                  variant={tourContactMethod === 'telegram' ? 'default' : 'outline'}
                  className={tourContactMethod === 'telegram' ? 'bg-[#0088cc] hover:bg-[#006699]' : ''}
                  onClick={() => setTourContactMethod('telegram')}
                  size="sm"
                >
                  <Send className="h-4 w-4 mr-1" />
                  Telegram
                </Button>
                <Button
                  type="button"
                  variant={tourContactMethod === 'email' ? 'default' : 'outline'}
                  onClick={() => setTourContactMethod('email')}
                  size="sm"
                >
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </Button>
              </div>

              <form onSubmit={handleTourSubmit}>
                {tourContactMethod === 'email' ? (
                  <div className="flex gap-2">
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
                  </div>
                ) : tourContactMethod === 'whatsapp' ? (
                  <div className="flex gap-2">
                    <Input
                      type="tel"
                      placeholder={t.comingSoon.tours.whatsappPlaceholder}
                      value={tourWhatsapp}
                      onChange={(e) => setTourWhatsapp(e.target.value)}
                      required
                      className="flex-1"
                    />
                    <Button type="submit" disabled={isSubmittingTour} className="bg-[#25D366] hover:bg-[#20BA5A]">
                      {t.comingSoon.tours.cta}
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder={t.comingSoon.tours.telegramPlaceholder}
                      value={tourTelegram}
                      onChange={(e) => setTourTelegram(e.target.value)}
                      required
                      className="flex-1"
                    />
                    <Button type="submit" disabled={isSubmittingTour} className="bg-[#0088cc] hover:bg-[#006699]">
                      {t.comingSoon.tours.cta}
                    </Button>
                  </div>
                )}
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

              {/* Contact Method Selection */}
              <div className="flex gap-2 mb-4">
                <Button
                  type="button"
                  variant={villaContactMethod === 'whatsapp' ? 'default' : 'outline'}
                  className={villaContactMethod === 'whatsapp' ? 'bg-[#25D366] hover:bg-[#20BA5A]' : ''}
                  onClick={() => setVillaContactMethod('whatsapp')}
                  size="sm"
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  WhatsApp
                </Button>
                <Button
                  type="button"
                  variant={villaContactMethod === 'telegram' ? 'default' : 'outline'}
                  className={villaContactMethod === 'telegram' ? 'bg-[#0088cc] hover:bg-[#006699]' : ''}
                  onClick={() => setVillaContactMethod('telegram')}
                  size="sm"
                >
                  <Send className="h-4 w-4 mr-1" />
                  Telegram
                </Button>
                <Button
                  type="button"
                  variant={villaContactMethod === 'email' ? 'default' : 'outline'}
                  onClick={() => setVillaContactMethod('email')}
                  size="sm"
                >
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </Button>
              </div>

              <form onSubmit={handleVillaSubmit}>
                {villaContactMethod === 'email' ? (
                  <div className="flex gap-2">
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
                  </div>
                ) : villaContactMethod === 'whatsapp' ? (
                  <div className="flex gap-2">
                    <Input
                      type="tel"
                      placeholder={t.comingSoon.villas.whatsappPlaceholder}
                      value={villaWhatsapp}
                      onChange={(e) => setVillaWhatsapp(e.target.value)}
                      required
                      className="flex-1"
                    />
                    <Button type="submit" disabled={isSubmittingVilla} className="bg-[#25D366] hover:bg-[#20BA5A]">
                      {t.comingSoon.villas.cta}
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder={t.comingSoon.villas.telegramPlaceholder}
                      value={villaTelegram}
                      onChange={(e) => setVillaTelegram(e.target.value)}
                      required
                      className="flex-1"
                    />
                    <Button type="submit" disabled={isSubmittingVilla} className="bg-[#0088cc] hover:bg-[#006699]">
                      {t.comingSoon.villas.cta}
                    </Button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
