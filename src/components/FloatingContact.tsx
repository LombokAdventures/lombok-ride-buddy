import { MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contactConfig } from '@/data/bikes';

export const FloatingContact = () => {
  const whatsappUrl = `https://wa.me/${contactConfig.whatsappNumber}?text=Hi! I'm interested in renting a scooter from Lombok Adventures`;
  const telegramUrl = `https://t.me/${contactConfig.telegramUsername}`;

  return (
    <>
      {/* Desktop floating buttons */}
      <div className="hidden md:flex fixed bottom-6 right-6 flex-col gap-3 z-50">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <Button
            size="lg"
            className="rounded-full w-14 h-14 shadow-float hover:scale-110 transition-transform bg-[#25D366] hover:bg-[#20BD5A]"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </a>
        <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
          <Button
            size="lg"
            className="rounded-full w-14 h-14 shadow-float hover:scale-110 transition-transform bg-[#0088cc] hover:bg-[#006699]"
          >
            <Send className="h-6 w-6" />
          </Button>
        </a>
      </div>

      {/* Mobile sticky contact bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-elegant z-50 p-3 flex gap-3">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button
            size="lg"
            className="w-full gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp
          </Button>
        </a>
        <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button
            size="lg"
            className="w-full gap-2 bg-[#0088cc] hover:bg-[#006699] text-white"
          >
            <Send className="h-5 w-5" />
            Telegram
          </Button>
        </a>
      </div>
    </>
  );
};
