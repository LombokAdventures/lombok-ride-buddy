import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, CheckCircle, XCircle, Gauge, Fuel, Settings, Bell } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { BikeDetailModal } from './BikeDetailModal';
import { WaitlistModal } from './WaitlistModal';
import { translateFeature } from '@/utils/featureTranslator';
import { translateTransmission } from '@/utils/transmissionTranslator';
import { getTranslatedFeatures } from '@/utils/translationHelpers';

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
    description?: string;
    description_en?: string;
    description_ru?: string;
    description_id?: string;
    description_de?: string;
    description_uz?: string;
    description_ar?: string;
    purchase_date?: string;
    kilometers_driven?: number;
    last_maintenance_date?: string;
    next_maintenance_due?: string;
    features_en?: string[];
    features_ru?: string[];
    features_id?: string[];
    features_de?: string[];
    features_uz?: string[];
    features_ar?: string[];
  };
}

export const BikeCard = ({ bike }: BikeCardProps) => {
  const { t, language } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
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

  const getDiscountPercentage = () => {
    switch (selectedPeriod) {
      case 'weekly':
        return 5;
      case 'monthly':
        return 20;
      default:
        return 0;
    }
  };

  // Get translated features using JSON data first, then database
  const translatedFeatures = getTranslatedFeatures(bike, language);

  return (
    <>
      <Card
        className={`overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer flex flex-col h-full ${!isAvailable ? 'opacity-70' : ''}`}
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
      
      <CardContent className="p-6 flex flex-col">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-foreground mb-1">{bike.name}</h3>
          <p className="text-sm text-muted-foreground">{bike.model}</p>
        </div>

        <div className="relative mb-4">
          <Tabs
            value={selectedPeriod}
            onValueChange={(value) => setSelectedPeriod(value as 'daily' | 'weekly' | 'monthly')}
            className=""
            onClick={(e) => e.stopPropagation()}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily">{t.bikeModal.dayTab}</TabsTrigger>
              <TabsTrigger value="weekly">{t.bikeModal.weekTab}</TabsTrigger>
              <TabsTrigger value="monthly">{t.bikeModal.monthTab}</TabsTrigger>
            </TabsList>
          </Tabs>
          {selectedPeriod !== 'daily' && (
            <div className="absolute top-0 right-0">
              <Badge className="bg-success text-white text-xs font-bold px-2 py-0.5 rounded-md">
                {selectedPeriod === 'weekly' ? '5%' : '20%'} OFF
              </Badge>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className="text-3xl font-bold text-primary mb-1">${getPrice()}</div>
          <p className="text-sm text-muted-foreground font-normal">{getPeriodText()}</p>
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

        <div className="h-12 overflow-hidden mb-4">
          <div className="flex flex-wrap gap-2">
            {translatedFeatures.map((feature, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        {isAvailable ? (
          <Button
            className="w-full gap-2"
            variant="default"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            <MessageCircle className="h-4 w-4" />
            {t.fleet.reserve}
          </Button>
        ) : (
          <Button
            className="w-full gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground"
            onClick={(e) => {
              e.stopPropagation();
              setWaitlistOpen(true);
            }}
          >
            <Bell className="h-4 w-4" />
            {t.bikeModal.notifyWhenAvailable}
          </Button>
        )}
      </CardFooter>
    </Card>

    <BikeDetailModal
      bike={bike}
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    />

    <WaitlistModal
      open={waitlistOpen}
      onOpenChange={setWaitlistOpen}
      itemType="bike"
      itemId={bike.id}
      itemName={bike.name}
    />
    </>
  );
};
