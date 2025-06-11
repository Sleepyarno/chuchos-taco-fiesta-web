
/**
 * Enhanced image upload utility that converts images to base64 for better persistence.
 * 
 * IMPORTANT: This stores images as base64 in localStorage for persistence.
 * In a production application, you would upload to a proper file storage service.
 */

/**
 * Compress an image to reduce file size while maintaining quality
 */
const compressImage = (file: File, maxWidth: number = 1200, quality: number = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      const newWidth = img.width * ratio;
      const newHeight = img.height * ratio;
      
      canvas.width = newWidth;
      canvas.height = newHeight;
      
      // Draw and compress
      ctx?.drawImage(img, 0, 0, newWidth, newHeight);
      
      // Convert to base64 with compression
      const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedBase64);
    };
    
    img.onerror = () => reject(new Error('Failed to load image for compression'));
    img.src = URL.createObjectURL(file);
  });
};

export const uploadImageLocally = (file: File): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Increased file size limit to 10MB
      const maxFileSize = 10 * 1024 * 1024; // 10MB
      
      if (file.size > maxFileSize) {
        reject(new Error(`File size exceeds ${maxFileSize / (1024 * 1024)}MB limit`));
        return;
      }
      
      let base64Data: string;
      
      // For files larger than 2MB, compress them
      if (file.size > 2 * 1024 * 1024) {
        console.log('Compressing large image for better storage...');
        base64Data = await compressImage(file);
      } else {
        // For smaller files, use original quality
        const reader = new FileReader();
        base64Data = await new Promise<string>((resolveReader, rejectReader) => {
          reader.onload = (event) => {
            const result = event.target?.result;
            if (typeof result === 'string') {
              resolveReader(result);
            } else {
              rejectReader(new Error('Failed to read file as base64'));
            }
          };
          reader.onerror = () => rejectReader(new Error('Failed to read file'));
          reader.readAsDataURL(file);
        });
      }
      
      // Store the base64 data directly
      const uniqueKey = `image_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      try {
        // Store the base64 data in localStorage for persistence
        localStorage.setItem(uniqueKey, base64Data);
        console.log(`Image stored with key: ${uniqueKey}, size: ${(base64Data.length / 1024).toFixed(2)}KB`);
        
        // Return the base64 data directly as the src
        resolve(base64Data);
      } catch (error) {
        console.warn('Failed to store image in localStorage:', error);
        // Still return the base64 data even if storage fails
        resolve(base64Data);
      }
      
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
