import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight, Calendar, Gauge, Wrench, Bell } from "lucide-react";
import { WaitlistModal } from "./WaitlistModal";
import { useLanguage } from "@/contexts/LanguageContext";

interface BikeImage {
  id: string;
  image_url: string;
  is_primary: boolean;
  display_order: number;
}

interface BikeDetailDialogProps {
  bike: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BikeDetailDialog = ({ bike, open, onOpenChange }: BikeDetailDialogProps) => {
  const [images, setImages] = useState<BikeImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (bike && open) {
      fetchBikeImages();
    }
  }, [bike, open]);

  const fetchBikeImages = async () => {
    const { data, error } = await supabase
      .from("bike_images")
      .select("*")
      .eq("bike_id", bike.id)
      .order("display_order");

    if (!error && data && data.length > 0) {
      setImages(data);
    } else {
      // Use primary image if no gallery images
      setImages([{
        id: "primary",
        image_url: bike.image,
        is_primary: true,
        display_order: 0,
      }]);
    }
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const isAvailable = bike.status === "available";

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center justify-between">
              <span>{bike.name}</span>
              <Badge variant={isAvailable ? "default" : "secondary"}>
                {isAvailable ? "Available" : "Unavailable"}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          {/* Image Gallery */}
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden group">
            <img
              src={images[currentImageIndex]?.image_url}
              alt={`${bike.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
                
                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-white w-6"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-4 py-2">
            <div>
              <span className="text-3xl font-bold text-primary">${bike.daily_price}</span>
              <span className="text-muted-foreground"> / day</span>
            </div>
            {bike.weekly_price && (
              <div>
                <span className="text-xl font-semibold">${bike.weekly_price}</span>
                <span className="text-muted-foreground text-sm"> / week</span>
              </div>
            )}
          </div>

          {/* Action Button */}
          {isAvailable ? (
            <Button size="lg" className="w-full">
              Book Now
            </Button>
          ) : (
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              onClick={() => setWaitlistOpen(true)}
            >
              <Bell className="mr-2 h-5 w-5" />
              Notify Me When Available
            </Button>
          )}

          {/* Tabbed Content */}
          <Tabs defaultValue="overview" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {bike.description ? (
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{bike.description}</p>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  {bike.name} is ready for your adventure. Perfect for exploring the beautiful roads of Lombok.
                </p>
              )}
              
              {bike.features && bike.features.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {bike.features.map((feature: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="specs" className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Model</p>
                  <p className="font-medium">{bike.model}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Engine</p>
                  <p className="font-medium">{bike.engine}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Transmission</p>
                  <p className="font-medium">{bike.transmission}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Fuel Capacity</p>
                  <p className="font-medium">{bike.fuel_capacity}</p>
                </div>
                {bike.kilometers_driven && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Gauge className="h-4 w-4" /> Kilometers Driven
                    </p>
                    <p className="font-medium">{bike.kilometers_driven.toLocaleString()} km</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="maintenance" className="space-y-3">
              <div className="space-y-4">
                {bike.purchase_date && (
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Purchase Date</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(bike.purchase_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
                
                {bike.last_maintenance_date && (
                  <div className="flex items-start gap-3">
                    <Wrench className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Last Maintenance</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(bike.last_maintenance_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
                
                {bike.next_maintenance_due && (
                  <div className="flex items-start gap-3">
                    <Wrench className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Next Maintenance Due</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(bike.next_maintenance_due).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}

                {!bike.purchase_date && !bike.last_maintenance_date && !bike.next_maintenance_due && (
                  <p className="text-muted-foreground text-center py-8">
                    Maintenance information not available
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

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
