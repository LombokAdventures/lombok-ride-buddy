import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle, XCircle, Gauge, Fuel, Settings, Calendar, Bike as BikeIcon, MessageCircle, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { contactConfig } from '@/data/bikes';
import { translateFeature } from '@/utils/featureTranslator';

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
  year?: number;
  kilometers?: number;
}

interface BikeDetailModalProps {
  bike: Bike | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BikeDetailModal = ({ bike, isOpen, onClose }: BikeDetailModalProps) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [showTermsContent, setShowTermsContent] = useState(false);

  // Reset terms when modal closes
  const handleClose = (open: boolean) => {
    if (!open) {
      setTermsAgreed(false);
      setShowTermsError(false);
      setShowTermsContent(false);
      onClose();
    }
  };

  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Store the bike ID before navigating
    sessionStorage.setItem('returnToBike', bike?.id || '');
    // Navigate to terms page
    navigate('/terms');
    // Close the modal
    onClose();
  };

  if (!bike) return null;

  const isAvailable = bike.status === 'available';
  const whatsappMessage = `Hi! I'm interested in renting the ${bike.name} (${bike.model}) from Lombok Local. Is it available?`;
  const whatsappUrl = `https://wa.me/${contactConfig.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  const telegramUrl = `https://t.me/${contactConfig.telegramUsername}`;

  const handleContactClick = (e: React.MouseEvent) => {
    if (!termsAgreed) {
      e.preventDefault();
      setShowTermsError(true);
      setTimeout(() => setShowTermsError(false), 3000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="space-y-2">
            <DialogTitle className="text-2xl font-bold pr-8">{bike.name}</DialogTitle>
            <div className="flex items-center gap-3">
              <p className="text-muted-foreground">{bike.model}</p>
              <Badge
                variant={isAvailable ? 'default' : 'destructive'}
                className={isAvailable ? 'bg-success' : 'bg-warning'}
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
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Bike Image */}
          {bike.image ? (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
              <img
                src={bike.image}
                alt={bike.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-full aspect-video rounded-lg bg-muted flex items-center justify-center">
              <BikeIcon className="h-24 w-24 text-muted-foreground/30" />
            </div>
          )}

          {/* Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-1">Daily</p>
              <p className="text-2xl font-bold text-primary">${bike.daily_price}</p>
              <p className="text-xs text-muted-foreground">per day</p>
            </div>
            {bike.weekly_price && (
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Weekly</p>
                <p className="text-2xl font-bold text-primary">${bike.weekly_price}</p>
                <p className="text-xs text-muted-foreground">per week</p>
              </div>
            )}
            {bike.monthly_price && (
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Monthly</p>
                <p className="text-2xl font-bold text-primary">${bike.monthly_price}</p>
                <p className="text-xs text-muted-foreground">per month</p>
              </div>
            )}
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-lg font-semibold mb-3">{t.fleet.specifications}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Gauge className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Engine</p>
                  <p className="font-semibold">{bike.engine}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Settings className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Transmission</p>
                  <p className="font-semibold">{bike.transmission}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Fuel className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Fuel Capacity</p>
                  <p className="font-semibold">{bike.fuel_capacity}</p>
                </div>
              </div>
              {bike.year && (
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Year</p>
                    <p className="font-semibold">{bike.year}</p>
                  </div>
                </div>
              )}
              {bike.kilometers !== undefined && (
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <BikeIcon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Mileage</p>
                    <p className="font-semibold">{bike.kilometers.toLocaleString()} km</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Features</h3>
            <div className="flex flex-wrap gap-2">
              {bike.features.map((feature, idx) => (
                <Badge key={idx} variant="outline" className="text-sm">
                  {translateFeature(feature, language)}
                </Badge>
              ))}
            </div>
          </div>

          {/* Terms & Conditions Agreement */}
          <div className="sticky bottom-0 bg-background pt-4 border-t space-y-4">
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Checkbox
                id="terms"
                checked={termsAgreed}
                onCheckedChange={(checked) => {
                  setTermsAgreed(checked as boolean);
                  if (checked) setShowTermsError(false);
                }}
                className="mt-1"
              />
              <label
                htmlFor="terms"
                className="text-sm leading-relaxed cursor-pointer"
              >
                {t.bikeModal.termsAgreement}{' '}
                <button
                  type="button"
                  className="text-primary hover:underline font-semibold"
                  onClick={handleTermsClick}
                >
                  {t.bikeModal.termsLink}
                </button>
              </label>
            </div>

            {showTermsError && (
              <p className="text-sm text-destructive text-center animate-in fade-in">
                {t.bikeModal.termsRequired}
              </p>
            )}

            {/* Contact Buttons */}
            <div className="flex gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
                onClick={handleContactClick}
              >
                <Button
                  className="w-full gap-2 bg-[#25D366] hover:bg-[#20BA5A]"
                  size="lg"
                  disabled={!isAvailable || !termsAgreed}
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </Button>
              </a>
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
                onClick={handleContactClick}
              >
                <Button
                  className="w-full gap-2 bg-[#0088cc] hover:bg-[#006699]"
                  size="lg"
                  disabled={!isAvailable || !termsAgreed}
                >
                  <Send className="h-5 w-5" />
                  Telegram
                </Button>
              </a>
            </div>
            {!isAvailable && (
              <p className="text-center text-sm text-muted-foreground">
                Currently Unavailable
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
