import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CompanyInfo {
  id: string;
  key: string;
  value: string;
  category: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useCompanyInfo = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCompanyInfo();
    
    const channel = supabase
      .channel('company_info_public')
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

  const fetchCompanyInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('company_info' as any)
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) throw error;
      setCompanyInfo((data as any) || []);
    } catch (error) {
      console.error('Error fetching company info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getByKey = (key: string) => {
    return companyInfo.find(info => info.key === key)?.value || '';
  };

  const getByCategory = (category: string) => {
    return companyInfo.filter(info => info.category === category);
  };

  return {
    companyInfo,
    isLoading,
    getByKey,
    getByCategory,
  };
};
