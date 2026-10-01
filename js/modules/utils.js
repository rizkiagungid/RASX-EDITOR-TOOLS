// Image Processing & Helper Utilities for Rasx Tools

export function formatBytes(bytes, decimals = 2) {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function canvasToBlob(canvas, mimeType = 'image/jpeg', quality = 0.85) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), mimeType, quality);
  });
}

export function canvasToBmpBlob(canvas) {
  const w = canvas.width;
  const h = canvas.height;
  const ctx = canvas.getContext('2d');
  const imgData = ctx.getImageData(0, 0, w, h);
  const data = imgData.data;

  const rowSize = Math.floor((24 * w + 31) / 32) * 4;
  const pixelArraySize = rowSize * h;
  const fileSize = 54 + pixelArraySize;

  const buffer = new ArrayBuffer(fileSize);
  const view = new DataView(buffer);

  // Bitmap File Header (14 bytes)
  view.setUint16(0, 0x4D42, true); // "BM"
  view.setUint32(2, fileSize, true); // File size
  view.setUint32(6, 0, true); // Reserved
  view.setUint32(10, 54, true); // Pixel array offset

  // DIB Header (BITMAPINFOHEADER - 40 bytes)
  view.setUint32(14, 40, true); // Header size
  view.setInt32(18, w, true); // Width
  view.setInt32(22, h, true); // Height (bottom-up)
  view.setUint16(26, 1, true); // Planes
  view.setUint16(28, 24, true); // 24-bit RGB
  view.setUint32(30, 0, true); // Compression (BI_RGB)
  view.setUint32(34, pixelArraySize, true); // Image size
  view.setInt32(38, 2835, true); // Horizontal resolution (72 DPI)
  view.setInt32(42, 2835, true); // Vertical resolution (72 DPI)
  view.setUint32(46, 0, true); // Colors in palette
  view.setUint32(50, 0, true); // Important colors

  // Write pixel data (BGR format, bottom to top)
  let offset = 54;
  for (let y = h - 1; y >= 0; y--) {
    let rowStart = offset;
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      view.setUint8(offset++, data[idx + 2]); // Blue
      view.setUint8(offset++, data[idx + 1]); // Green
      view.setUint8(offset++, data[idx]);     // Red
    }
    // Row padding to 4-byte boundary
    while ((offset - rowStart) < rowSize) {
      view.setUint8(offset++, 0);
    }
  }

  return new Blob([buffer], { type: 'image/bmp' });
}

export async function canvasToIcoBlob(canvas, size = 64) {
  const icoCanvas = document.createElement('canvas');
  icoCanvas.width = size;
  icoCanvas.height = size;
  const ctx = icoCanvas.getContext('2d');
  ctx.drawImage(canvas, 0, 0, size, size);

  const pngBlob = await canvasToBlob(icoCanvas, 'image/png');
  const pngArrayBuffer = await pngBlob.arrayBuffer();
  const pngBytes = new Uint8Array(pngArrayBuffer);

  const icoSize = 6 + 16 + pngBytes.length;
  const buffer = new ArrayBuffer(icoSize);
  const view = new DataView(buffer);

  view.setUint16(0, 0, true); // Reserved
  view.setUint16(2, 1, true); // Type (1 = ICO)
  view.setUint16(4, 1, true); // Count (1 image)

  view.setUint8(6, size >= 256 ? 0 : size); // Width
  view.setUint8(7, size >= 256 ? 0 : size); // Height
  view.setUint8(8, 0); // Palette count
  view.setUint8(9, 0); // Reserved
  view.setUint16(10, 1, true); // Color planes
  view.setUint16(12, 32, true); // Bits per pixel
  view.setUint32(14, pngBytes.length, true); // PNG size
  view.setUint32(18, 22, true); // Offset

  const u8 = new Uint8Array(buffer);
  u8.set(pngBytes, 22);

  return new Blob([buffer], { type: 'image/x-icon' });
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function downloadZip(files, zipFilename = 'rasx-processed-images.zip') {
  try {
    if (!window.JSZip) {
      // If JSZip isn't loaded yet, dynamically load from CDN
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
        script.onload = resolve;
        script.onerror = () => reject(new Error('Failed to load JSZip library'));
        document.head.appendChild(script);
      });
    }

    if (!window.JSZip) {
      throw new Error('JSZip is not available.');
    }

    const zip = new window.JSZip();
    const usedNames = new Set();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let name = file.name || `image_${i + 1}.jpg`;
      
      // Ensure unique filename inside zip
      if (usedNames.has(name)) {
        const dotIdx = name.lastIndexOf('.');
        if (dotIdx !== -1) {
          name = `${name.substring(0, dotIdx)}_${i + 1}${name.substring(dotIdx)}`;
        } else {
          name = `${name}_${i + 1}`;
        }
      }
      usedNames.add(name);

      zip.file(name, file.blob);
    }

    const content = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    });

    downloadBlob(content, zipFilename);
    return true;
  } catch (err) {
    console.error('downloadZip error:', err);
    throw err;
  }
}

export function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = `ℹ️`;
  if (type === 'success') icon = `✅`;
  if (type === 'error') icon = `⚠️`;

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Bicubic Upscaling Algorithm with Edge Sharpening
export function upscaleCanvas(sourceCanvas, factor = 2, sharpness = 0.4) {
  const targetWidth = Math.round(sourceCanvas.width * factor);
  const targetHeight = Math.round(sourceCanvas.height * factor);

  const outCanvas = document.createElement('canvas');
  outCanvas.width = targetWidth;
  outCanvas.height = targetHeight;
  const ctx = outCanvas.getContext('2d');

  // Step 1: Smooth interpolation (bicubic emulation)
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(sourceCanvas, 0, 0, targetWidth, targetHeight);

  if (sharpness <= 0) return outCanvas;

  // Step 2: Unsharp Mask filter for crisp super-resolution effect
  const imgData = ctx.getImageData(0, 0, targetWidth, targetHeight);
  const data = imgData.data;
  const w = targetWidth;
  const h = targetHeight;
  const copy = new Uint8ClampedArray(data);

  const amount = sharpness * 1.5;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = (y * w + x) * 4;

      for (let c = 0; c < 3; c++) {
        // Simple Laplacian kernel sharpening
        const val = copy[idx + c];
        const up = copy[((y - 1) * w + x) * 4 + c];
        const down = copy[((y + 1) * w + x) * 4 + c];
        const left = copy[(y * w + (x - 1)) * 4 + c];
        const right = copy[(y * w + (x + 1)) * 4 + c];

        const laplacian = 4 * val - (up + down + left + right);
        data[idx + c] = Math.min(255, Math.max(0, val + laplacian * amount));
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return outCanvas;
}

// Smart Background Removal using Chroma / Edge Keying and Color Tolerance
export function removeBackgroundCanvas(sourceCanvas, tolerance = 28, customColor = null) {
  const outCanvas = document.createElement('canvas');
  outCanvas.width = sourceCanvas.width;
  outCanvas.height = sourceCanvas.height;
  const ctx = outCanvas.getContext('2d');
  ctx.drawImage(sourceCanvas, 0, 0);

  const imgData = ctx.getImageData(0, 0, outCanvas.width, outCanvas.height);
  const data = imgData.data;
  const w = outCanvas.width;
  const h = outCanvas.height;

  // Detect key background colors from 4 corners if customColor is not provided
  let keyColors = [];
  if (customColor) {
    keyColors.push(customColor);
  } else {
    const corners = [
      0, // top-left
      (w - 1) * 4, // top-right
      ((h - 1) * w) * 4, // bottom-left
      ((h - 1) * w + (w - 1)) * 4 // bottom-right
    ];
    corners.forEach(idx => {
      keyColors.push({ r: data[idx], g: data[idx + 1], b: data[idx + 2] });
    });
  }

  const tolSq = (tolerance * 2.55) ** 2;

  // Flood / color distance check
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    for (const kc of keyColors) {
      const distSq = (r - kc.r) ** 2 + (g - kc.g) ** 2 + (b - kc.b) ** 2;
      if (distSq < tolSq) {
        // Soft edge feathering
        const ratio = Math.sqrt(distSq) / (tolerance * 2.55);
        if (ratio < 0.6) {
          data[i + 3] = 0; // Fully transparent
        } else {
          data[i + 3] = Math.floor(255 * ((ratio - 0.6) / 0.4));
        }
        break;
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return outCanvas;
}
