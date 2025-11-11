import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Phone, Send, Mail, MessageSquare } from "lucide-react";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemType: "bike" | "tour" | "house";
  itemId: string;
  itemName: string;
}

export const WaitlistModal = ({ open, onOpenChange, itemType, itemId, itemName }: WaitlistModalProps) => {
  const [formData, setFormData] = useState({
    customer_name: "",
    whatsapp: "",
    telegram: "",
    email: "",
    preferred_contact_method: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate at least one contact method
    if (!formData.whatsapp && !formData.telegram && !formData.email) {
      toast({
        title: "Contact Required",
        description: "Please provide at least one contact method (WhatsApp, Telegram, or Email)",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("waitlist_requests").insert({
        item_type: itemType,
        item_id: itemId,
        customer_name: formData.customer_name,
        whatsapp: formData.whatsapp || null,
        telegram: formData.telegram || null,
        email: formData.email || null,
        preferred_contact_method: formData.preferred_contact_method || null,
        message: formData.message || null,
      });

      if (error) throw error;

      toast({
        title: "Successfully Added to Waitlist!",
        description: "We'll contact you as soon as this becomes available.",
      });

      // Reset form and close modal
      setFormData({
        customer_name: "",
        whatsapp: "",
        telegram: "",
        email: "",
        preferred_contact_method: "",
        message: "",
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting waitlist request:", error);
      toast({
        title: "Error",
        description: "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Get Notified When Available
          </DialogTitle>
          <DialogDescription>
            We'll contact you as soon as <strong>{itemName}</strong> becomes available.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name *</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={formData.customer_name}
              onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              WhatsApp Number
            </Label>
            <Input
              id="whatsapp"
              type="tel"
              placeholder="+62 812 3456 7890"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telegram" className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Telegram Username
            </Label>
            <Input
              id="telegram"
              placeholder="@username"
              value={formData.telegram}
              onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferred">Preferred Contact Method</Label>
            <Select
              value={formData.preferred_contact_method}
              onValueChange={(value) => setFormData({ ...formData, preferred_contact_method: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select preferred method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="telegram">Telegram</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Any specific requirements or questions..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Submitting..." : "Join Waitlist"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
