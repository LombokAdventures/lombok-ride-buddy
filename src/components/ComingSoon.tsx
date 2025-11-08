import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mountain, Home } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const ComingSoon = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleNotify = (type: string) => {
    if (email) {
      toast({
        title: 'Success!',
        description: `We'll notify you when ${type} launches!`,
      });
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tours Card */}
          <Card className="relative overflow-hidden shadow-card hover:shadow-elegant transition-all">
            <div className="absolute inset-0 bg-gradient-tropical opacity-10"></div>
            <CardContent className="relative p-8">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-tropical text-white">
                <Mountain className="h-8 w-8" />
              </div>
              
              <h3 className="text-3xl font-bold text-foreground mb-3">
                {t.comingSoon.tours.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 text-lg">
                {t.comingSoon.tours.description}
              </p>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Coming 2025</span>
                  <span className="text-sm font-medium text-primary">40%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-tropical w-[40%] rounded-full"></div>
                </div>
              </div>

              <div className="flex gap-2">
                <Input 
                  placeholder="Your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={() => handleNotify('Tours')} className="bg-secondary hover:bg-secondary/90">
                  {t.comingSoon.tours.cta}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Villas Card */}
          <Card className="relative overflow-hidden shadow-card hover:shadow-elegant transition-all">
            <div className="absolute inset-0 bg-gradient-sunset opacity-10"></div>
            <CardContent className="relative p-8">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-sunset text-white">
                <Home className="h-8 w-8" />
              </div>
              
              <h3 className="text-3xl font-bold text-foreground mb-3">
                {t.comingSoon.villas.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 text-lg">
                {t.comingSoon.villas.description}
              </p>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Coming Soon</span>
                  <span className="text-sm font-medium text-accent">25%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-sunset w-[25%] rounded-full"></div>
                </div>
              </div>

              <div className="flex gap-2">
                <Input 
                  placeholder="Your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={() => handleNotify('Villas')} className="bg-accent hover:bg-accent/90">
                  {t.comingSoon.villas.cta}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
