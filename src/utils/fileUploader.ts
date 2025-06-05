
/**
 * Enhanced image upload utility with improved persistence.
 * 
 * IMPORTANT: This is still a temporary solution for local preview only. 
 * In a real application, you would need a server-side upload mechanism 
 * to permanently store the image and get a persistent URL.
 * 
 * @param file The image file to "upload".
 * @returns A Promise that resolves with an object URL for the image.
 */
export const uploadImageLocally = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const uniqueFilename = Date.now() + '-' + file.name;
      // This path is where the file would ideally be stored on a server.
      const targetPath = `/lovable-uploads/${uniqueFilename}`; 
      
      console.log(`Simulating upload for: ${file.name}`);
      console.log(`Generated target path (for reference): ${targetPath}`);

      // Create an object URL for local preview.
      // This URL is temporary and valid only for the current browser session.
      const objectUrl = URL.createObjectURL(file);
      
      // Store file data in localStorage for better persistence across page reloads
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result as string;
        const fileData = {
          name: file.name,
          type: file.type,
          size: file.size,
          data: base64Data,
          objectUrl: objectUrl,
          timestamp: Date.now()
        };
        
        // Store in localStorage with a unique key
        const storageKey = `uploaded_image_${uniqueFilename}`;
        try {
          localStorage.setItem(storageKey, JSON.stringify(fileData));
          console.log(`File data stored in localStorage with key: ${storageKey}`);
        } catch (error) {
          console.warn('Failed to store file data in localStorage:', error);
        }
        
        resolve(objectUrl);
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Cleanup function to revoke object URLs and remove stored data
 * Call this when removing images from the gallery
 */
export const cleanupUploadedImage = (imageUrl: string): void => {
  if (imageUrl.startsWith('blob:')) {
    URL.revokeObjectURL(imageUrl);
  }
  
  // Clean up localStorage entries for this image
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('uploaded_image_')) {
      try {
        const data = JSON.parse(localStorage.getItem(key) || '');
        if (data.objectUrl === imageUrl) {
          localStorage.removeItem(key);
          console.log(`Cleaned up stored data for key: ${key}`);
        }
      } catch (error) {
        // Ignore parsing errors
      }
    }
  });
};
