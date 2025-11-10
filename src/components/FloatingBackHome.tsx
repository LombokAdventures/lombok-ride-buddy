import { Home, ArrowUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export const FloatingBackHome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Only show on non-home pages
  if (location.pathname === '/') return null;

  const handleBackToTop = () => {
    navigate('/');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      {/* Desktop Floating Button */}
      <TooltipProvider>
        <div className="hidden md:flex fixed bottom-6 left-6 z-50">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleBackToTop}
                className="bg-primary hover:bg-primary/90 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              >
                <Home className="h-6 w-6" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Back to Home</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>

      {/* Mobile: Show scroll to top button when scrolled down */}
      <div className="md:hidden fixed bottom-20 left-4 z-40">
        <button
          onClick={handleBackToTop}
          className="bg-primary hover:bg-primary/90 text-white p-3 rounded-full shadow-lg transition-all duration-300"
        >
          <Home className="h-5 w-5" />
        </button>
      </div>
    </>
  );
};
