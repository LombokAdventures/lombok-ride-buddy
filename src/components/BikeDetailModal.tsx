import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle, XCircle, Gauge, Fuel, Settings, Calendar, Bike as BikeIcon, MessageCircle, Send, Wrench, AlertCircle, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCompanyInfo } from '@/hooks/useCompanyInfo';
import { contactConfig } from '@/data/bikes';
import { translateFeature } from '@/utils/featureTranslator';
import { translateTransmission } from '@/utils/transmissionTranslator';
import { getTranslatedDescription, getTranslatedFeatures } from '@/utils/translationHelpers';

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
}

interface BikeDetailModalProps {
  bike: Bike | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BikeDetailModal = ({ bike, isOpen, onClose }: BikeDetailModalProps) => {
  const { t, language } = useLanguage();
  const { getByKey } = useCompanyInfo();
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

  const whatsappNumber = getByKey('whatsapp') || contactConfig.whatsappNumber;
  const telegramUsername = getByKey('telegram') || contactConfig.telegramUsername;
  const isAvailable = bike.status === 'available';
  const whatsappMessage = `Hi! I'm interested in renting the ${bike.name} (${bike.model}) from Lombok Local. Is it available?`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  const telegramUrl = `https://t.me/${telegramUsername}`;

  const handleContactClick = (e: React.MouseEvent) => {
    if (!termsAgreed) {
      e.preventDefault();
      setShowTermsError(true);
      setTimeout(() => setShowTermsError(false), 3000);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toLocaleDateString(language === 'en' ? 'en-US' : language === 'ru' ? 'ru-RU' : 'id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto dialog-scrollbar">
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
              <p className="text-sm text-muted-foreground mb-1">{t.bikeModal.daily}</p>
              <p className="text-2xl font-bold text-primary">${bike.daily_price}</p>
              <p className="text-xs text-muted-foreground">{t.bikeModal.perDay}</p>
            </div>
            {bike.weekly_price && (
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">{t.bikeModal.weekly}</p>
                <p className="text-2xl font-bold text-primary">${bike.weekly_price}</p>
                <p className="text-xs text-muted-foreground">{t.bikeModal.perWeek}</p>
              </div>
            )}
            {bike.monthly_price && (
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">{t.bikeModal.monthly}</p>
                <p className="text-2xl font-bold text-primary">${bike.monthly_price}</p>
                <p className="text-xs text-muted-foreground">{t.bikeModal.perMonth}</p>
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
                  <p className="text-xs text-muted-foreground">{t.bikeModal.engine}</p>
                  <p className="font-semibold">{bike.engine}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Settings className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{t.bikeModal.transmission}</p>
                  <p className="font-semibold">{translateTransmission(bike.transmission, language)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Fuel className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{t.bikeModal.fuelCapacity}</p>
                  <p className="font-semibold">{bike.fuel_capacity}</p>
                </div>
              </div>
              {bike.year && (
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t.bikeModal.year}</p>
                    <p className="font-semibold">{bike.year}</p>
                  </div>
                </div>
              )}
              {bike.kilometers !== undefined && (
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <BikeIcon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t.bikeModal.mileage}</p>
                    <p className="font-semibold">{bike.kilometers.toLocaleString()} km</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          {getTranslatedFeatures(bike, language).length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">{t.bikeModal.features}</h3>
              <div className="flex flex-wrap gap-2">
                {getTranslatedFeatures(bike, language).map((feature, idx) => (
                  <Badge key={idx} variant="outline" className="text-sm">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {getTranslatedDescription(bike, language) && (
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-lg border border-primary/10">
              <h3 className="text-lg font-semibold mb-2">{t.bikeModal.descriptionLabel}</h3>
              <p className="text-muted-foreground leading-relaxed">{getTranslatedDescription(bike, language)}</p>
            </div>
          )}

          {/* Condition & Mileage */}
          {(bike.kilometers_driven != null || bike.purchase_date) && (
            <div>
              <h3 className="text-lg font-semibold mb-3">{t.bikeModal.bikeCondition}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {bike.kilometers_driven != null && (
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg border border-border">
                    <Zap className="h-5 w-5 text-amber-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">{t.bikeModal.totalKilometers}</p>
                      <p className="text-xl font-bold text-foreground">{bike.kilometers_driven.toLocaleString()} km</p>
                    </div>
                  </div>
                )}
                {bike.purchase_date && (
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg border border-border">
                    <Calendar className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">{t.bikeModal.purchaseDate}</p>
                      <p className="text-lg font-bold text-foreground">{formatDate(bike.purchase_date)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Maintenance Information */}
          {(bike.last_maintenance_date != null || bike.next_maintenance_due != null) && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-green-600" />
                {t.bikeModal.maintenanceSchedule}
              </h3>
              <div className="space-y-3">
                {bike.last_maintenance_date != null && (
                  <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-green-900 dark:text-green-200">{t.bikeModal.lastMaintenance}</p>
                      <p className="text-sm text-green-700 dark:text-green-300 mt-1">{formatDate(bike.last_maintenance_date)}</p>
                    </div>
                  </div>
                )}
                {bike.next_maintenance_due != null && (
                  <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
                    <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-orange-900 dark:text-orange-200">{t.bikeModal.nextMaintenanceDue}</p>
                      <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">{formatDate(bike.next_maintenance_due)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

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
                {t.bikeModal.currentlyUnavailable}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
