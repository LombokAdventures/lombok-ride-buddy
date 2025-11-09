import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, CheckCircle, XCircle, Gauge, Fuel, Settings } from 'lucide-react';
import { contactConfig } from '@/data/bikes';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

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
  };
}

export const BikeCard = ({ bike }: BikeCardProps) => {
  const { t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
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
  
  const whatsappMessage = `Hi! I'm interested in renting the ${bike.name} (${bike.model}) for ${selectedPeriod} rental from Lombok Adventures. Is it available?`;
  const whatsappUrl = `https://wa.me/${contactConfig.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <Card className={`overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 ${!isAvailable ? 'opacity-70' : ''}`}>
      <div className="relative h-64 bg-muted overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
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
      
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-foreground mb-1">{bike.name}</h3>
          <p className="text-sm text-muted-foreground">{bike.model}</p>
        </div>

        <Tabs value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value as 'daily' | 'weekly' | 'monthly')} className="mb-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily">Day</TabsTrigger>
            <TabsTrigger value="weekly">Week</TabsTrigger>
            <TabsTrigger value="monthly">Month</TabsTrigger>
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
            <span>{bike.transmission}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Fuel className="h-4 w-4 text-secondary" />
            <span>{bike.fuel_capacity}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {bike.features.map((feature, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button 
            className="w-full gap-2" 
            disabled={!isAvailable}
            variant={isAvailable ? "default" : "outline"}
          >
            <MessageCircle className="h-4 w-4" />
            {t.fleet.reserve}
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};
