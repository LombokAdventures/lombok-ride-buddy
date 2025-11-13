import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { contactConfig } from '@/data/bikes';

export type CompanyInfo = Tables<'company_info'>;

interface CompanyInfoContextType {
  companyInfo: CompanyInfo | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const CompanyInfoContext = createContext<CompanyInfoContextType | undefined>(undefined);

// Default fallback values from the hardcoded config
const defaultCompanyInfo: CompanyInfo = {
  id: 'default',
  business_name: contactConfig.businessName,
  address: contactConfig.address,
  email: contactConfig.email,
  phone: `+${contactConfig.whatsappNumber}`,
  whatsapp_number: contactConfig.whatsappNumber,
  telegram_username: contactConfig.telegramUsername,
  instagram_url: null,
  facebook_url: null,
  youtube_url: null,
  google_maps_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252230.02624600978!2d116.13059955!3d-8.6528536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dcdb04aba0c71a1%3A0x2a5f6fc2e63b6ab6!2sLombok%2C%20Indonesia!5e0!3m2!1sen!2s!4v1234567890',
  created_at: null,
  updated_at: null,
};

export const CompanyInfoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(defaultCompanyInfo);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanyInfo = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('company_info')
        .select('*')
        .limit(1)
        .single();

      if (fetchError) {
        console.error('Error fetching company info:', fetchError);
        // If there's an error (like table doesn't exist), use default
        setCompanyInfo(defaultCompanyInfo);
        setError(null); // Don't show error to user, just use fallback
      } else if (data) {
        setCompanyInfo(data);
      } else {
        // No data in database, use default
        setCompanyInfo(defaultCompanyInfo);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setCompanyInfo(defaultCompanyInfo);
      setError(null); // Don't show error to user, just use fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  // Subscribe to real-time updates
  useEffect(() => {
    const channel = supabase
      .channel('company_info_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'company_info',
        },
        () => {
          fetchCompanyInfo();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <CompanyInfoContext.Provider value={{ companyInfo, loading, error, refetch: fetchCompanyInfo }}>
      {children}
    </CompanyInfoContext.Provider>
  );
};

export const useCompanyInfo = () => {
  const context = useContext(CompanyInfoContext);
  if (context === undefined) {
    throw new Error('useCompanyInfo must be used within a CompanyInfoProvider');
  }
  return context;
};
