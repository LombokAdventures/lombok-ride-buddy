import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, CheckCircle, XCircle, Gauge, Fuel, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { BikeDetailModal } from './BikeDetailModal';
import { translateFeature } from '@/utils/featureTranslator';
import { translateTransmission } from '@/utils/transmissionTranslator';

interface BikeCardProps {
  bike: {
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
    year?: number;
    kilometers?: number;
  };
}

export const BikeCard = ({ bike }: BikeCardProps) => {
  const { t, language } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAvailable = bike.status === 'available';
  
  const getPrice = () => {
    switch (selectedPeriod) {
      case 'weekly':
        return bike.weekly_price || bike.daily_price * 7;
      case 'monthly':
        return bike.monthly_price || bike.daily_price * 30;
      default:
        return bike.daily_price;
    }
  };

  const getPeriodText = () => {
    switch (selectedPeriod) {
      case 'weekly':
        return '/week';
      case 'monthly':
        return '/month';
      default:
        return t.fleet.perDay;
    }
  };

  return (
    <>
      <Card
        className={`overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer flex flex-col ${!isAvailable ? 'opacity-70' : ''}`}
        onClick={() => setIsModalOpen(true)}
      >
      <div className="relative h-64 bg-muted overflow-hidden">
        {bike.image ? (
          <img
            src={bike.image}
            alt={bike.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`absolute inset-0 flex items-center justify-center text-muted-foreground ${bike.image ? 'hidden' : ''}`}>
          <Gauge className="h-24 w-24 opacity-20" />
        </div>
        <div className="absolute top-3 right-3 z-10">
          <Badge
            variant={isAvailable ? 'default' : 'destructive'}
            className={isAvailable ? 'bg-success hover:bg-success/90' : 'bg-warning hover:bg-warning/90'}
          >
            {isAvailable ? (
              <>
                <CheckCircle className="h-3 w-3 mr-1" />
                {t.fleet.available}
              </>
            ) : (
              <>
                <XCircle className="h-3 w-3 mr-1" />
                {t.fleet.rented}
              </>
            )}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6 flex-grow">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-foreground mb-1">{bike.name}</h3>
          <p className="text-sm text-muted-foreground">{bike.model}</p>
        </div>

        <Tabs
          value={selectedPeriod}
          onValueChange={(value) => setSelectedPeriod(value as 'daily' | 'weekly' | 'monthly')}
          className="mb-4"
          onClick={(e) => e.stopPropagation()}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily">{t.bikeModal.dayTab}</TabsTrigger>
            <TabsTrigger value="weekly">{t.bikeModal.weekTab}</TabsTrigger>
            <TabsTrigger value="monthly">{t.bikeModal.monthTab}</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mb-4">
          <div className="text-3xl font-bold text-primary mb-2">
            ${getPrice()}
            <span className="text-base text-muted-foreground font-normal">{getPeriodText()}</span>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Gauge className="h-4 w-4 text-secondary" />
            <span>{bike.engine}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Settings className="h-4 w-4 text-secondary" />
            <span>{translateTransmission(bike.transmission, language)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Fuel className="h-4 w-4 text-secondary" />
            <span>{bike.fuel_capacity}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 min-h-[60px]">
          {bike.features.map((feature, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {translateFeature(feature, language)}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          className="w-full gap-2"
          disabled={!isAvailable}
          variant={isAvailable ? "default" : "outline"}
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
        >
          <MessageCircle className="h-4 w-4" />
          {t.fleet.reserve}
        </Button>
      </CardFooter>
    </Card>

    <BikeDetailModal
      bike={bike}
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    />
    </>
  );
};
