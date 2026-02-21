
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CMSData, CompanyInfo, GalleryItem, SectionContent, SectionNames } from './types';
import { INITIAL_DATA } from './constants';
import { saveConfigToS3, loadConfigFromS3 } from './services/s3Service';

interface CMSContextType {
  data: CMSData;
  isLoading: boolean;
  updateCompany: (info: CompanyInfo) => void;
  updateContent: (content: SectionContent) => void;
  updateSectionNames: (names: SectionNames) => void;
  updateCategories: (categories: string[]) => void;
  addGalleryItem: (item: GalleryItem) => void;
  removeGalleryItem: (id: string) => void;
  syncData: (newData: CMSData) => Promise<void>;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CMSData>(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados do S3 ao montar o componente
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const remoteData = await loadConfigFromS3();
        if (remoteData) {
          setData(remoteData);
        } else {
          // Se não houver no S3, tenta o localStorage como backup
          const saved = localStorage.getItem('carpintaria_martins_cms_v3');
          if (saved) setData(JSON.parse(saved));
        }
      } catch (e) {
        console.error("Erro ao carregar dados remotos", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const syncData = async (newData: CMSData) => {
    setData(newData);
    localStorage.setItem('carpintaria_martins_cms_v3', JSON.stringify(newData));
    try {
      await saveConfigToS3(newData);
    } catch (e) {
      console.error("Erro ao sincronizar com S3", e);
    }
  };

  const updateCompany = (info: CompanyInfo) => {
    syncData({ ...data, company: info });
  };

  const updateContent = (content: SectionContent) => {
    syncData({ ...data, content });
  };

  const updateSectionNames = (sectionNames: SectionNames) => {
    syncData({ ...data, sectionNames });
  };

  const updateCategories = (categories: string[]) => {
    syncData({ ...data, categories });
  };

  const addGalleryItem = (item: GalleryItem) => {
    syncData({ ...data, gallery: [item, ...data.gallery] });
  };

  const removeGalleryItem = (id: string) => {
    syncData({ ...data, gallery: data.gallery.filter(item => item.id !== id) });
  };

  return (
    <CMSContext.Provider value={{ 
      data, 
      isLoading,
      updateCompany, 
      updateContent, 
      updateSectionNames, 
      updateCategories, 
      addGalleryItem, 
      removeGalleryItem,
      syncData
    }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) throw new Error('useCMS must be used within a CMSProvider');
  return context;
};
