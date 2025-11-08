import { Search, MessageCircle, Bike } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const iconMap = {
  0: Search,
  1: MessageCircle,
  2: Bike
};

export const HowItWorks = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.howItWorks.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {t.howItWorks.steps.map((step, idx) => {
            const Icon = iconMap[idx as keyof typeof iconMap];
            return (
              <div key={idx} className="relative text-center">
                <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-hero text-white text-2xl font-bold shadow-elegant">
                  <Icon className="h-10 w-10" />
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
