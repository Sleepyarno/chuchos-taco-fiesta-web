
/**
 * Enhanced image upload utility that converts images to base64 for better persistence.
 * 
 * IMPORTANT: This stores images as base64 in localStorage for persistence.
 * In a production application, you would upload to a proper file storage service.
 */
export const uploadImageLocally = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          // Store the base64 data directly
          const uniqueKey = `image_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          
          try {
            // Store the base64 data in localStorage for persistence
            localStorage.setItem(uniqueKey, result);
            console.log(`Image stored with key: ${uniqueKey}`);
            
            // Return the base64 data directly as the src
            resolve(result);
          } catch (error) {
            console.warn('Failed to store image in localStorage:', error);
            // Still return the base64 data even if storage fails
            resolve(result);
          }
        } else {
          reject(new Error('Failed to read file as base64'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      // Read the file as base64
      reader.readAsDataURL(file);
      
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Cleanup function for removing stored images
 */
export const cleanupUploadedImage = (imageUrl: string): void => {
  // Clean up localStorage entries for this image
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('image_')) {
      try {
        const storedData = localStorage.getItem(key);
        if (storedData === imageUrl) {
          localStorage.removeItem(key);
          console.log(`Cleaned up stored data for key: ${key}`);
        }
      } catch (error) {
        // Ignore parsing errors
      }
    }
  });
  
  // If it's a blob URL, revoke it as well
  if (imageUrl.startsWith('blob:')) {
    URL.revokeObjectURL(imageUrl);
  }
};
