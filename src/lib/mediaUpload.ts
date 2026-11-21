import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from './firebase';

async function compressImageToDataUrl(file: File, maxDimension = 1400, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width >= height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not initialize canvas context.'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const outputMime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        let result = canvas.toDataURL(outputMime, quality);
        if (result.length > 850000) {
          result = canvas.toDataURL('image/jpeg', 0.7);
        }
        if (result.length > 880000) {
          reject(new Error('Image exceeds maximum compressed size (880KB). Please choose a smaller image.'));
          return;
        }
        resolve(result);
      };
      img.onerror = () => reject(new Error('Invalid image file.'));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsDataURL(file);
  });
}

async function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsDataURL(file);
  });
}

export async function uploadCmsMedia(file: File, category: string): Promise<string> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('You must be signed in as admin to upload media.');
  }

  let dataUrl = '';
  if (file.type.startsWith('image/')) {
    dataUrl = await compressImageToDataUrl(file);
  } else {
    if (file.size > 600 * 1024) {
      throw new Error('Document files (such as PDF CVs) must be under 600KB.');
    }
    dataUrl = await readFileAsDataUrl(file);
    if (dataUrl.length > 880000) {
      throw new Error('Encoded file size exceeds limit (880KB).');
    }
  }

  const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 140);
  const mediaId = `asset_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  try {
    await setDoc(doc(db, 'media', mediaId), {
      fileName: cleanName,
      mimeType: file.type || 'application/octet-stream',
      dataUrl,
      category,
      uploadedBy: user.uid,
      createdAt: serverTimestamp(),
    });
    return `media://${mediaId}`;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `media/${mediaId}`);
  }
}
