
import menuData from '../data/menuData.json';
import contactData from '../data/contactData.json';
import hoursData from '../data/hoursData.json';
import heroData from '../data/heroData.json';
import aboutData from '../data/aboutData.json';
import galleryData from '../data/galleryData.json';

// These would normally save to a database or write to JSON files via an API
// For this simple implementation, we'll store updates in localStorage
// In a real app, you'd make API calls to update the actual files

export const updateMenu = (newData: typeof menuData): void => {
  localStorage.setItem('menuData', JSON.stringify(newData));
};

export const updateContact = (newData: typeof contactData): void => {
  localStorage.setItem('contactData', JSON.stringify(newData));
};

export const updateHours = (newData: typeof hoursData): void => {
  localStorage.setItem('hoursData', JSON.stringify(newData));
};

export const updateHero = (newData: typeof heroData): void => {
  localStorage.setItem('heroData', JSON.stringify(newData));
};

export const updateAbout = (newData: typeof aboutData): void => {
  localStorage.setItem('aboutData', JSON.stringify(newData));
};

export const updateGallery = (newData: typeof galleryData): void => {
  localStorage.setItem('galleryData', JSON.stringify(newData));
};

// Getter functions that check localStorage first, then fall back to the JSON files
export const getMenuData = (): typeof menuData => {
  const storedData = localStorage.getItem('menuData');
  return storedData ? JSON.parse(storedData) : menuData;
};

export const getContactData = (): typeof contactData => {
  const storedData = localStorage.getItem('contactData');
  return storedData ? JSON.parse(storedData) : contactData;
};

export const getHoursData = (): typeof hoursData => {
  const storedData = localStorage.getItem('hoursData');
  return storedData ? JSON.parse(storedData) : hoursData;
};

export const getHeroData = (): typeof heroData => {
  const storedData = localStorage.getItem('heroData');
  return storedData ? JSON.parse(storedData) : heroData;
};

export const getAboutData = (): typeof aboutData => {
  const storedData = localStorage.getItem('aboutData');
  return storedData ? JSON.parse(storedData) : aboutData;
};

export const getGalleryData = (): typeof galleryData => {
  const storedData = localStorage.getItem('galleryData');
  return storedData ? JSON.parse(storedData) : galleryData;
};

export const resetAllData = (): void => {
  localStorage.removeItem('menuData');
  localStorage.removeItem('contactData');
  localStorage.removeItem('hoursData');
  localStorage.removeItem('heroData');
  localStorage.removeItem('aboutData');
  localStorage.removeItem('galleryData');
};
