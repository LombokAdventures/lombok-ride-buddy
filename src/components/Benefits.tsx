import { Shield, Truck, Headphones, CreditCard, Award, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const iconMap = {
  0: Shield,
  1: Truck,
  2: Headphones,
  3: CreditCard,
  4: Award,
  5: DollarSign
};

export const Benefits = () => {
  const { t } = useLanguage();

  return (
    <section id="benefits" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.benefits.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.benefits.items.map((benefit, idx) => {
            const Icon = iconMap[idx as keyof typeof iconMap];
            return (
              <Card key={idx} className="border-none shadow-card hover:shadow-elegant transition-all">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-tropical text-white">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
