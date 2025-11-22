import { MessageCircle, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useCompanyInfo } from '@/hooks/useCompanyInfo';
import { contactConfig } from '@/data/bikes';

export const FloatingContact = () => {
  const { t } = useLanguage();
  const { getByKey, isLoading } = useCompanyInfo();

  if (isLoading) return null;

  const whatsappNumber = getByKey('whatsapp') || contactConfig.whatsappNumber;
  const telegramUsername = getByKey('telegram') || contactConfig.telegramUsername;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t.floating.whatsappMessage)}`;
  const telegramUrl = `https://t.me/${telegramUsername}`;

  return (
    <>
      {/* Desktop Floating Buttons */}
      <TooltipProvider>
        <div className="hidden md:flex fixed bottom-6 right-6 flex-col gap-3 z-50">
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              >
                <MessageCircle className="h-6 w-6" />
              </a>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{t.floating.whatsappTooltip}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0088cc] hover:bg-[#006699] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              >
                <Send className="h-6 w-6" />
              </a>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{t.floating.telegramTooltip}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>

      {/* Mobile Sticky Contact Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-elegant z-50 p-3 flex gap-3">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
          <div className="w-full py-3 px-4 rounded-lg bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold flex items-center justify-center gap-2 transition-colors">
            <MessageCircle className="h-5 w-5" />
            WhatsApp
          </div>
        </a>
        <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
          <div className="w-full py-3 px-4 rounded-lg bg-[#0088cc] hover:bg-[#006699] text-white font-semibold flex items-center justify-center gap-2 transition-colors">
            <Send className="h-5 w-5" />
            Telegram
          </div>
        </a>
      </div>
    </>
  );
};
