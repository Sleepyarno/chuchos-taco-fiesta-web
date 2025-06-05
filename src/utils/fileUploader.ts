
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
      
      // Store minimal file data in localStorage to avoid quota issues
      const fileData = {
        name: file.name,
        type: file.type,
        size: file.size,
        objectUrl: objectUrl,
        timestamp: Date.now()
      };
      
      // Store in localStorage with a unique key (without the large base64 data)
      const storageKey = `uploaded_image_${uniqueFilename}`;
      try {
        localStorage.setItem(storageKey, JSON.stringify(fileData));
        console.log(`File metadata stored in localStorage with key: ${storageKey}`);
      } catch (error) {
        console.warn('Failed to store file metadata in localStorage, but upload will still work:', error);
      }
      
      resolve(objectUrl);
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
