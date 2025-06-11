
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
      try {
        // Calculate new dimensions
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        const newWidth = Math.floor(img.width * ratio);
        const newHeight = Math.floor(img.height * ratio);
        
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        // Draw and compress
        if (ctx) {
          ctx.drawImage(img, 0, 0, newWidth, newHeight);
          
          // Convert to base64 with compression
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedBase64);
        } else {
          reject(new Error('Failed to get canvas context'));
        }
      } catch (error) {
        reject(new Error('Failed to compress image: ' + (error as Error).message));
      }
    };
    
    img.onerror = () => reject(new Error('Failed to load image for compression'));
    
    try {
      img.src = URL.createObjectURL(file);
    } catch (error) {
      reject(new Error('Failed to create object URL: ' + (error as Error).message));
    }
  });
};

export const uploadImageLocally = (file: File): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('Starting image upload process for:', file.name, 'Size:', file.size);
      
      // Increased file size limit to 10MB
      const maxFileSize = 10 * 1024 * 1024; // 10MB
      
      if (file.size > maxFileSize) {
        reject(new Error(`File size exceeds ${maxFileSize / (1024 * 1024)}MB limit`));
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        reject(new Error('File must be an image'));
        return;
      }
      
      let base64Data: string;
      
      // For files larger than 2MB, compress them
      if (file.size > 2 * 1024 * 1024) {
        console.log('Compressing large image for better storage...');
        try {
          base64Data = await compressImage(file);
          console.log('Image compressed successfully');
        } catch (compressionError) {
          console.warn('Compression failed, using original file:', compressionError);
          // Fall back to original file if compression fails
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
      } else {
        // For smaller files, use original quality
        console.log('Processing small image without compression...');
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
        // Check localStorage space before storing
        const testKey = 'test_storage_space';
        localStorage.setItem(testKey, base64Data);
        localStorage.removeItem(testKey);
        
        // Store the base64 data in localStorage for persistence
        localStorage.setItem(uniqueKey, base64Data);
        console.log(`Image stored with key: ${uniqueKey}, size: ${(base64Data.length / 1024).toFixed(2)}KB`);
        
        // Return the base64 data directly as the src
        resolve(base64Data);
      } catch (storageError) {
        console.warn('Failed to store image in localStorage:', storageError);
        
        // If localStorage is full, try to clean up old images
        try {
          const keys = Object.keys(localStorage);
          const imageKeys = keys.filter(key => key.startsWith('image_')).sort();
          
          // Remove oldest 25% of stored images to make space
          const keysToRemove = imageKeys.slice(0, Math.floor(imageKeys.length * 0.25));
          keysToRemove.forEach(key => localStorage.removeItem(key));
          
          // Try storing again
          localStorage.setItem(uniqueKey, base64Data);
          console.log('Stored image after cleanup');
          resolve(base64Data);
        } catch (cleanupError) {
          console.warn('Cleanup and retry failed:', cleanupError);
          // Still return the base64 data even if storage fails
          resolve(base64Data);
        }
      }
      
    } catch (error) {
      console.error('Image upload error:', error);
      reject(error);
    }
  });
};

/**
 * Cleanup function for removing stored images
 */
export const cleanupUploadedImage = (imageUrl: string): void => {
  try {
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
          console.warn('Error during cleanup:', error);
        }
      }
    });
    
    // If it's a blob URL, revoke it as well
    if (imageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(imageUrl);
    }
  } catch (error) {
    console.warn('Error during image cleanup:', error);
  }
};
