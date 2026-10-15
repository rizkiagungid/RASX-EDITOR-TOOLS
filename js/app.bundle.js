// Rasx Tools - Unified Application Bundle
(function(window, document) {
'use strict';

// --- TOOLS REGISTRY ---
// Registry of all 11 Tools with Metadata

const TOOLS = [
  {
    id: 'compress',
    title: 'Compress IMAGE',
    category: 'optimize',
    badge: 'Popular',
    badgeType: 'badge-popular',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/><path d="M12 2v14"/><path d="m7 11 5 5 5-5"/><path d="M8 6h8"/></svg>`,
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.12)',
    description: 'Compress JPG, PNG, WEBP, and GIF while saving space and maintaining high visual quality.',
    accept: 'image/jpeg,image/png,image/webp,image/gif',
    multiple: true
  },
  {
    id: 'resize',
    title: 'Resize IMAGE',
    category: 'edit',
    badge: 'Essential',
    badgeType: '',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>`,
    color: '#06b6d4',
    bgColor: 'rgba(6, 182, 212, 0.12)',
    description: 'Define your dimensions by percentage or pixels, and resize your JPG, PNG, WEBP, and GIF images.',
    accept: 'image/*',
    multiple: true
  },
  {
    id: 'crop',
    title: 'Crop IMAGE',
    category: 'edit',
    badge: '',
    badgeType: '',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/></svg>`,
    color: '#0ea5e9',
    bgColor: 'rgba(14, 165, 233, 0.12)',
    description: 'Crop JPG, PNG, or GIF with precision. Choose preset aspect ratios or use freeform drag rectangle.',
    accept: 'image/*',
    multiple: true
  },
  {
    id: 'convert-image',
    title: 'Convert IMAGE',
    category: 'convert',
    badge: 'Universal',
    badgeType: 'badge-popular',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>`,
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.12)',
    description: 'Convert between any formats: JPG, PNG, WEBP, GIF, BMP, SVG, and ICO in bulk with instant download.',
    accept: 'image/*',
    multiple: true
  },
  {
    id: 'convert-to-jpg',
    title: 'Convert to JPG',
    category: 'convert',
    badge: 'Popular',
    badgeType: 'badge-popular',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/><path d="m14 10 3 3"/></svg>`,
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.12)',
    description: 'Turn PNG, GIF, WEBP, SVG, or BMP to JPG in bulk with custom quality compression.',
    accept: 'image/png,image/webp,image/gif,image/svg+xml,image/bmp',
    multiple: true
  },
  {
    id: 'convert-from-jpg',
    title: 'Convert from JPG',
    category: 'convert',
    badge: '',
    badgeType: '',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/></svg>`,
    color: '#eab308',
    bgColor: 'rgba(234, 179, 8, 0.12)',
    description: 'Turn JPG images to PNG with transparency support, WEBP for super web speed, or animated GIFs.',
    accept: 'image/jpeg',
    multiple: true
  },
  {
    id: 'pdf-to-jpg',
    title: 'PDF to JPG',
    category: 'convert',
    badge: 'Popular',
    badgeType: 'badge-popular',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M10 12v5"/><path d="M10 12h2.5a1.5 1.5 0 0 1 0 3H10"/><path d="M14 17l2-5 2 5"/><line x1="14.8" y1="15.2" x2="17.2" y2="15.2"/></svg>`,
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.12)',
    description: 'Convert each PDF page into a JPG or extract all images contained in a PDF.',
    accept: 'application/pdf,.pdf',
    multiple: true
  },
  {
    id: 'upscale',
    title: 'Upscale Image',
    category: 'optimize',
    badge: 'AI Super-Res',
    badgeType: 'badge-ai',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/></svg>`,
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.12)',
    description: 'Enlarge your images 2x or 4x with sharp edge preservation, detail recovery, and high resolution.',
    accept: 'image/*',
    multiple: true
  },
  {
    id: 'remove-bg',
    title: 'Remove background',
    category: 'edit',
    badge: 'Smart AI',
    badgeType: 'badge-ai',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 14.14 14.14"/><path d="M12 2a10 10 0 0 1 10 10c0 2.05-.62 3.96-1.68 5.55L7.55 4.78C8.92 3.03 10.37 2 12 2z"/></svg>`,
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.12)',
    description: 'Quickly remove photo backgrounds. Automatic chroma/edge detection and transparent cut-outs with ease.',
    accept: 'image/*',
    multiple: true
  },
  {
    id: 'watermark',
    title: 'Watermark IMAGE',
    category: 'edit',
    badge: 'Security',
    badgeType: '',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.12)',
    description: 'Stamp custom text or logo over your images. Control opacity, 9-position grid, font size, and rotation.',
    accept: 'image/*',
    multiple: true
  },
  {
    id: 'meme-generator',
    title: 'Meme generator',
    category: 'create',
    badge: 'Fun',
    badgeType: 'badge-new',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>`,
    color: '#ec4899',
    bgColor: 'rgba(236, 72, 153, 0.12)',
    description: 'Create hilarious memes in seconds. Top & bottom captions, popular meme templates, or upload your own.',
    accept: 'image/*',
    multiple: false
  },
  {
    id: 'rotate',
    title: 'Rotate IMAGE',
    category: 'edit',
    badge: '',
    badgeType: '',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>`,
    color: '#0284c7',
    bgColor: 'rgba(2, 132, 199, 0.12)',
    description: 'Rotate multiple images 90, 180, or 270 degrees, flip vertically or horizontally, or set custom angle.',
    accept: 'image/*',
    multiple: true
  },
  {
    id: 'photo-editor',
    title: 'Photo editor',
    category: 'edit',
    badge: 'Pro Suite',
    badgeType: 'badge-popular',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
    color: '#d946ef',
    bgColor: 'rgba(217, 70, 239, 0.12)',
    description: 'Full creative suite: adjust brightness, contrast, saturation, vintage/sepia filters, blur, drawings & shapes.',
    accept: 'image/*',
    multiple: false
  }
];


// --- UTILS ---
// Image Processing & Helper Utilities for Rasx Tools

function formatBytes(bytes, decimals = 2) {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function canvasToBlob(canvas, mimeType = 'image/jpeg', quality = 0.85) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), mimeType, quality);
  });
}

function canvasToBmpBlob(canvas) {
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

async function canvasToIcoBlob(canvas, size = 64) {
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

function downloadCanvas(canvas, filename, mimeType = 'image/jpeg', quality = 0.92) {
  let safeFilename = (filename || 'image.jpg').trim();
  if (!/\.[a-zA-Z0-9]+$/.test(safeFilename)) {
    safeFilename += mimeType === 'image/png' ? '.png' : mimeType === 'image/webp' ? '.webp' : '.jpg';
  }

  const dataUrl = canvas.toDataURL(mimeType, quality);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = dataUrl;
  a.download = safeFilename;
  a.setAttribute('download', safeFilename);
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    if (a.parentNode) document.body.removeChild(a);
  }, 500);
}

async function downloadBlob(blob, filename) {
  if (!blob) return;

  let safeFilename = (filename || 'download.jpg').trim();
  if (!/\.[a-zA-Z0-9]+$/.test(safeFilename)) {
    const ext = blob.type === 'image/png' ? '.png' :
                blob.type === 'image/webp' ? '.webp' :
                blob.type === 'application/zip' ? '.zip' : '.jpg';
    safeFilename += ext;
  }

  // 1. Data URL for files < 60MB (Fixes Chrome UUID download bug where a.download is ignored on blob: URLs)
  if (blob.size < 60 * 1024 * 1024) {
    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = dataUrl;
      a.download = safeFilename;
      a.setAttribute('download', safeFilename);
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        if (a.parentNode) document.body.removeChild(a);
      }, 500);
      return;
    } catch (err) {
      console.warn('Data URL download fallback to Blob URL:', err);
    }
  }

  // 2. Blob URL approach for large files
  const file = new File([blob], safeFilename, { type: blob.type || 'application/octet-stream' });
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = safeFilename;
  a.setAttribute('download', safeFilename);
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    if (a.parentNode) document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 120000);
  }, 500);
}

async function downloadZip(files, zipFilename = 'rasx-processed-images.zip') {
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

function showToast(message, type = 'info', duration = 3000) {
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
function upscaleCanvas(sourceCanvas, factor = 2, sharpness = 0.4) {
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
function removeBackgroundCanvas(sourceCanvas, tolerance = 28, customColor = null) {
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


// --- TOOL HANDLERS ---
// Implementation of All 11 Image Tools with Interactive Settings & Processing



function getOriginalFileInfo(file, suffix = '-processed') {
  const fileName = file.name || 'image.jpg';
  const dotIndex = fileName.lastIndexOf('.');
  const baseName = dotIndex !== -1 ? fileName.substring(0, dotIndex) : fileName;
  let ext = dotIndex !== -1 ? fileName.substring(dotIndex) : '.jpg';
  
  let mime = file.type;
  if (!mime) {
    const extLower = ext.toLowerCase();
    if (extLower === '.png') mime = 'image/png';
    else if (extLower === '.webp') mime = 'image/webp';
    else if (extLower === '.gif') mime = 'image/gif';
    else mime = 'image/jpeg';
  }
  
  return {
    baseName,
    ext,
    mime,
    outputName: `${baseName}${suffix}${ext}`
  };
}

function quantizeCanvasForPng(sourceCanvas, quality = 0.75) {
  if (quality >= 0.98) return sourceCanvas;

  const outCanvas = document.createElement('canvas');
  outCanvas.width = sourceCanvas.width;
  outCanvas.height = sourceCanvas.height;
  const ctx = outCanvas.getContext('2d');
  ctx.drawImage(sourceCanvas, 0, 0);

  const imgData = ctx.getImageData(0, 0, outCanvas.width, outCanvas.height);
  const data = imgData.data;

  // Calculate quantization step based on quality (0.1 to 0.95)
  const factor = 1 - quality;
  const step = Math.max(1, Math.round(factor * factor * 48 + factor * 8));

  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, Math.floor((data[i] + step / 2) / step) * step);
    data[i + 1] = Math.min(255, Math.floor((data[i + 1] + step / 2) / step) * step);
    data[i + 2] = Math.min(255, Math.floor((data[i + 2] + step / 2) / step) * step);
    if (data[i + 3] > 0 && data[i + 3] < 255) {
      data[i + 3] = Math.min(255, Math.floor((data[i + 3] + step / 2) / step) * step);
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return outCanvas;
}

const ToolHandlers = {
  // 1. COMPRESS IMAGE
  'compress': {
    initControls(container, state, updatePreview) {
      container.innerHTML = `
        <div class="sidebar-section">
          <div class="sidebar-section-title">Compression Options</div>
          <div class="control-group">
            <div class="control-label">
              <span>Image Quality</span>
              <span class="control-badge-val" id="qualityVal">75%</span>
            </div>
            <input type="range" class="slider-input" id="compressQuality" min="10" max="95" value="75">
          </div>
          <div class="control-group">
            <div class="control-label">
              <span>Output Format</span>
            </div>
            <select class="form-input" id="compressOutputFmt">
              <option value="original">Keep Original Format (Auto)</option>
              <option value="image/jpeg">JPG (.jpg)</option>
              <option value="image/png">PNG (.png)</option>
              <option value="image/webp">WEBP (.webp - Super Light)</option>
            </select>
          </div>
          <div class="control-group">
            <div class="control-label">
              <span>Max Width (Optional)</span>
              <span class="control-badge-val" id="maxWidthVal">Original</span>
            </div>
            <select class="form-input" id="compressMaxWidth">
              <option value="0">Keep Original Size</option>
              <option value="1920">Full HD (1920px)</option>
              <option value="1280">HD (1280px)</option>
              <option value="800">Web Standard (800px)</option>
            </select>
          </div>
        </div>
        <div class="sidebar-section">
          <div class="sidebar-section-title">Compression Summary</div>
          <div class="stats-box" id="compressStats">
            <div class="stats-row"><span>Original Size:</span><b id="statOrigSize">--</b></div>
            <div class="stats-row"><span>Compressed Size:</span><b id="statNewSize">--</b></div>
            <div class="stats-row"><span>Saved:</span><span class="stats-saving" id="statSaved">--</span></div>
          </div>
        </div>
      `;

      const qualityInput = container.querySelector('#compressQuality');
      const qualityVal = container.querySelector('#qualityVal');
      const formatSelect = container.querySelector('#compressOutputFmt');
      const maxWidthInput = container.querySelector('#compressMaxWidth');

      qualityInput.addEventListener('input', (e) => {
        qualityVal.textContent = `${e.target.value}%`;
        state.quality = parseInt(e.target.value) / 100;
        updatePreview();
      });

      formatSelect.addEventListener('change', (e) => {
        state.outputFormat = e.target.value;
        updatePreview();
      });

      maxWidthInput.addEventListener('change', (e) => {
        state.maxWidth = parseInt(e.target.value);
        updatePreview();
      });

      state.quality = 0.75;
      state.outputFormat = 'original';
      state.maxWidth = 0;
    },

    async process(item, state) {
      const img = item.image;
      let targetWidth = img.naturalWidth;
      let targetHeight = img.naturalHeight;

      if (state.maxWidth && targetWidth > state.maxWidth) {
        const ratio = state.maxWidth / targetWidth;
        targetWidth = state.maxWidth;
        targetHeight = Math.round(targetHeight * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      const fileInfo = getOriginalFileInfo(item.file, '-compressed');
      
      let mimeType = fileInfo.mime;
      let ext = fileInfo.ext;

      if (state.outputFormat && state.outputFormat !== 'original') {
        mimeType = state.outputFormat;
        if (mimeType === 'image/jpeg') ext = '.jpg';
        else if (mimeType === 'image/png') ext = '.png';
        else if (mimeType === 'image/webp') ext = '.webp';
      }

      const quality = state.quality !== undefined ? state.quality : 0.75;
      let exportCanvas = canvas;

      if (mimeType === 'image/png') {
        exportCanvas = quantizeCanvasForPng(canvas, quality);
      }

      const blob = await canvasToBlob(exportCanvas, mimeType, quality);
      const name = `${fileInfo.baseName}-compressed${ext}`;

      return { canvas: exportCanvas, blob, name, originalSize: item.file.size, newSize: blob.size };
    }
  },

  // 2. RESIZE IMAGE
  'resize': {
    initControls(container, state, updatePreview) {
      container.innerHTML = `
        <div class="sidebar-section">
          <div class="sidebar-section-title">Resize Mode</div>
          <div class="segmented-control" id="resizeModeSwitch">
            <button class="segment-btn active" data-mode="percentage">By Percentage</button>
            <button class="segment-btn" data-mode="pixels">By Pixels</button>
          </div>
        </div>

        <div class="sidebar-section" id="percentageControls">
          <div class="sidebar-section-title">Percentage Scale</div>
          <div class="control-group">
            <div class="control-label">
              <span>Scale Factor</span>
              <span class="control-badge-val" id="scalePercentVal">50%</span>
            </div>
            <input type="range" class="slider-input" id="resizePercentage" min="10" max="200" value="50">
          </div>
          <div class="presets-grid" style="margin-top: 12px;">
            <div class="preset-pill" data-pct="25">25% <span>Small</span></div>
            <div class="preset-pill active" data-pct="50">50% <span>Medium</span></div>
            <div class="preset-pill" data-pct="75">75% <span>Large</span></div>
            <div class="preset-pill" data-pct="150">150% <span>Super</span></div>
          </div>
        </div>

        <div class="sidebar-section" id="pixelControls" style="display: none;">
          <div class="sidebar-section-title">Exact Dimensions</div>
          <div class="control-group">
            <div class="dimension-inputs">
              <input type="number" class="form-input" id="resizeWidth" placeholder="Width" value="1200">
              <span>×</span>
              <input type="number" class="form-input" id="resizeHeight" placeholder="Height" value="800">
              <button class="dimension-lock-btn locked" id="aspectLockBtn" title="Maintain Aspect Ratio">🔒</button>
            </div>
          </div>
          <div class="sidebar-section-title" style="margin-top: 16px;">Quick Presets</div>
          <div class="presets-grid">
            <div class="preset-pill" data-w="1080" data-h="1080">Instagram <span>1080 × 1080</span></div>
            <div class="preset-pill" data-w="1920" data-h="1080">Full HD <span>1920 × 1080</span></div>
            <div class="preset-pill" data-w="1200" data-h="630">Social Share <span>1200 × 630</span></div>
            <div class="preset-pill" data-w="512" data-h="512">Avatar <span>512 × 512</span></div>
          </div>
        </div>
      `;

      state.mode = 'percentage';
      state.percentage = 50;
      state.lockAspect = true;

      const modeBtns = container.querySelectorAll('#resizeModeSwitch button');
      const pctSection = container.querySelector('#percentageControls');
      const pxSection = container.querySelector('#pixelControls');
      const pctSlider = container.querySelector('#resizePercentage');
      const pctVal = container.querySelector('#scalePercentVal');
      const widthIn = container.querySelector('#resizeWidth');
      const heightIn = container.querySelector('#resizeHeight');
      const lockBtn = container.querySelector('#aspectLockBtn');

      modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          modeBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.mode = btn.dataset.mode;
          if (state.mode === 'percentage') {
            pctSection.style.display = 'block';
            pxSection.style.display = 'none';
          } else {
            pctSection.style.display = 'none';
            pxSection.style.display = 'block';
          }
          updatePreview();
        });
      });

      pctSlider.addEventListener('input', (e) => {
        state.percentage = parseInt(e.target.value);
        pctVal.textContent = `${state.percentage}%`;
        updatePreview();
      });

      container.querySelectorAll('#percentageControls .preset-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          container.querySelectorAll('#percentageControls .preset-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          state.percentage = parseInt(pill.dataset.pct);
          pctSlider.value = state.percentage;
          pctVal.textContent = `${state.percentage}%`;
          updatePreview();
        });
      });

      lockBtn.addEventListener('click', () => {
        state.lockAspect = !state.lockAspect;
        lockBtn.classList.toggle('locked', state.lockAspect);
        lockBtn.textContent = state.lockAspect ? '🔒' : '🔓';
      });

      widthIn.addEventListener('input', () => {
        state.customWidth = parseInt(widthIn.value) || 100;
        updatePreview();
      });

      heightIn.addEventListener('input', () => {
        state.customHeight = parseInt(heightIn.value) || 100;
        updatePreview();
      });

      container.querySelectorAll('#pixelControls .preset-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          widthIn.value = pill.dataset.w;
          heightIn.value = pill.dataset.h;
          state.customWidth = parseInt(pill.dataset.w);
          state.customHeight = parseInt(pill.dataset.h);
          updatePreview();
        });
      });
    },

    async process(item, state) {
      const img = item.image;
      let targetW, targetH;

      if (state.mode === 'percentage') {
        const factor = (state.percentage || 50) / 100;
        targetW = Math.max(1, Math.round(img.naturalWidth * factor));
        targetH = Math.max(1, Math.round(img.naturalHeight * factor));
      } else {
        targetW = state.customWidth || img.naturalWidth;
        if (state.lockAspect && img.naturalWidth) {
          targetH = Math.round(targetW * (img.naturalHeight / img.naturalWidth));
        } else {
          targetH = state.customHeight || img.naturalHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, targetW, targetH);

      const fileInfo = getOriginalFileInfo(item.file, `-${targetW}x${targetH}`);
      const blob = await canvasToBlob(canvas, fileInfo.mime, 0.92);
      const name = fileInfo.outputName;

      return { canvas, blob, name, originalSize: item.file.size, newSize: blob.size };
    }
  },

  // 3. CROP IMAGE
  'crop': {
    initControls(container, state, updatePreview) {
      container.innerHTML = `
        <div class="sidebar-section">
          <div class="sidebar-section-title">Aspect Ratio Presets</div>
          <div class="presets-grid">
            <div class="preset-pill active" data-ratio="free">Freeform <span>Custom</span></div>
            <div class="preset-pill" data-ratio="1:1">Square <span>1:1</span></div>
            <div class="preset-pill" data-ratio="16:9">Landscape <span>16:9</span></div>
            <div class="preset-pill" data-ratio="9:16">Story/Reel <span>9:16</span></div>
            <div class="preset-pill" data-ratio="4:3">Standard <span>4:3</span></div>
            <div class="preset-pill" data-ratio="3:2">Photo <span>3:2</span></div>
          </div>
        </div>
        <div class="sidebar-section">
          <div class="sidebar-section-title">Crop Position & Size (%)</div>
          <div class="control-group">
            <div class="control-label"><span>Width Crop</span><span class="control-badge-val" id="cropWVal">80%</span></div>
            <input type="range" class="slider-input" id="cropWSlider" min="20" max="100" value="80">
          </div>
          <div class="control-group">
            <div class="control-label"><span>Height Crop</span><span class="control-badge-val" id="cropHVal">80%</span></div>
            <input type="range" class="slider-input" id="cropHSlider" min="20" max="100" value="80">
          </div>
        </div>
      `;

      state.cropRatio = 'free';
      state.cropW = 0.8;
      state.cropH = 0.8;

      container.querySelectorAll('.preset-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          container.querySelectorAll('.preset-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          state.cropRatio = pill.dataset.ratio;
          updatePreview();
        });
      });

      const wSlider = container.querySelector('#cropWSlider');
      const hSlider = container.querySelector('#cropHSlider');
      const wVal = container.querySelector('#cropWVal');
      const hVal = container.querySelector('#cropHVal');

      wSlider.addEventListener('input', (e) => {
        state.cropW = parseInt(e.target.value) / 100;
        wVal.textContent = `${e.target.value}%`;
        updatePreview();
      });

      hSlider.addEventListener('input', (e) => {
        state.cropH = parseInt(e.target.value) / 100;
        hVal.textContent = `${e.target.value}%`;
        updatePreview();
      });
    },

    async process(item, state) {
      const img = item.image;
      const nw = img.naturalWidth;
      const nh = img.naturalHeight;

      let cropWidth = nw * (state.cropW || 0.8);
      let cropHeight = nh * (state.cropH || 0.8);

      if (state.cropRatio === '1:1') {
        const minDim = Math.min(cropWidth, cropHeight);
        cropWidth = minDim;
        cropHeight = minDim;
      } else if (state.cropRatio === '16:9') {
        cropHeight = cropWidth * (9 / 16);
      } else if (state.cropRatio === '9:16') {
        cropWidth = cropHeight * (9 / 16);
      } else if (state.cropRatio === '4:3') {
        cropHeight = cropWidth * (3 / 4);
      } else if (state.cropRatio === '3:2') {
        cropHeight = cropWidth * (2 / 3);
      }

      // Center crop box
      const startX = Math.max(0, Math.floor((nw - cropWidth) / 2));
      const startY = Math.max(0, Math.floor((nh - cropHeight) / 2));

      const canvas = document.createElement('canvas');
      canvas.width = Math.round(cropWidth);
      canvas.height = Math.round(cropHeight);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, startX, startY, cropWidth, cropHeight, 0, 0, canvas.width, canvas.height);

      const fileInfo = getOriginalFileInfo(item.file, '-cropped');
      const blob = await canvasToBlob(canvas, fileInfo.mime, 0.92);
      const name = fileInfo.outputName;

      return { canvas, blob, name, originalSize: item.file.size, newSize: blob.size };
    }
  },

  // UNIVERSAL CONVERT IMAGE (ANY TO ANY)
  'convert-image': {
    initControls(container, state, updatePreview) {
      container.innerHTML = `
        <div class="sidebar-section">
          <div class="sidebar-section-title">Convert Target Format</div>
          <div class="control-group">
            <select class="form-input" id="convertTargetFmt" style="font-weight: 700;">
              <option value="image/jpeg">JPG / JPEG (.jpg)</option>
              <option value="image/png">PNG (.png - With Transparency)</option>
              <option value="image/webp" selected>WEBP (.webp - Modern Web)</option>
              <option value="image/gif">GIF (.gif)</option>
              <option value="image/bmp">BMP (.bmp - Bitmap)</option>
              <option value="image/x-icon">ICO (.ico - Website Favicon)</option>
            </select>
          </div>
          <div class="sidebar-section-title" style="margin-top: 12px;">Quick Conversion</div>
          <div class="presets-grid">
            <div class="preset-pill" data-target="image/png">To PNG <span>Lossless</span></div>
            <div class="preset-pill" data-target="image/jpeg">To JPG <span>Standard</span></div>
            <div class="preset-pill active" data-target="image/webp">To WEBP <span>Light</span></div>
            <div class="preset-pill" data-target="image/x-icon">To ICO <span>Favicon</span></div>
            <div class="preset-pill" data-target="image/bmp">To BMP <span>Bitmap</span></div>
            <div class="preset-pill" data-target="image/gif">To GIF <span>Graphics</span></div>
          </div>
        </div>

        <div class="sidebar-section" id="convertQualitySection">
          <div class="sidebar-section-title">Quality & Compression</div>
          <div class="control-group">
            <div class="control-label"><span>Output Quality</span><span class="control-badge-val" id="convertQVal">90%</span></div>
            <input type="range" class="slider-input" id="convertQuality" min="20" max="100" value="90">
          </div>
        </div>

        <div class="sidebar-section" id="convertIcoSection" style="display: none;">
          <div class="sidebar-section-title">Favicon Icon Size</div>
          <div class="control-group">
            <select class="form-input" id="convertIcoSize">
              <option value="32" selected>32 × 32 px (Standard Favicon)</option>
              <option value="16">16 × 16 px (Small Tab)</option>
              <option value="48">48 × 48 px (Desktop Icon)</option>
              <option value="64">64 × 64 px (Retina Icon)</option>
              <option value="128">128 × 128 px (High-Res)</option>
              <option value="256">256 × 256 px (Full Size App)</option>
            </select>
          </div>
        </div>

        <div class="sidebar-section" id="convertBgColorSection">
          <div class="sidebar-section-title">Fill Background (for JPG / BMP)</div>
          <div class="control-group">
            <div class="form-row">
              <input type="color" id="convertBgColor" value="#ffffff" style="width: 50px; height: 38px; border-radius: 6px; cursor: pointer; border: 1px solid var(--border-color);">
              <span style="font-size: 0.85rem; color: var(--text-secondary);">Fill transparent areas</span>
            </div>
          </div>
        </div>
      `;

      state.targetFormat = 'image/webp';
      state.quality = 0.9;
      state.icoSize = 32;
      state.bgColor = '#ffffff';

      const fmtSelect = container.querySelector('#convertTargetFmt');
      const qInput = container.querySelector('#convertQuality');
      const qVal = container.querySelector('#convertQVal');
      const icoSelect = container.querySelector('#convertIcoSize');
      const bgInput = container.querySelector('#convertBgColor');
      const icoSection = container.querySelector('#convertIcoSection');
      const qualitySection = container.querySelector('#convertQualitySection');
      const bgSection = container.querySelector('#convertBgColorSection');
      const pills = container.querySelectorAll('.preset-pill');

      function updateFormVisibility(fmt) {
        state.targetFormat = fmt;
        fmtSelect.value = fmt;

        pills.forEach(p => p.classList.toggle('active', p.dataset.target === fmt));

        if (fmt === 'image/x-icon') {
          icoSection.style.display = 'block';
          qualitySection.style.display = 'none';
          bgSection.style.display = 'none';
        } else if (fmt === 'image/jpeg' || fmt === 'image/bmp') {
          icoSection.style.display = 'none';
          qualitySection.style.display = fmt === 'image/jpeg' ? 'block' : 'none';
          bgSection.style.display = 'block';
        } else {
          icoSection.style.display = 'none';
          qualitySection.style.display = 'block';
          bgSection.style.display = 'none';
        }
        updatePreview();
      }

      fmtSelect.addEventListener('change', (e) => updateFormVisibility(e.target.value));

      pills.forEach(pill => {
        pill.addEventListener('click', () => updateFormVisibility(pill.dataset.target));
      });

      qInput.addEventListener('input', (e) => {
        state.quality = parseInt(e.target.value) / 100;
        qVal.textContent = `${e.target.value}%`;
        updatePreview();
      });

      icoSelect.addEventListener('change', (e) => {
        state.icoSize = parseInt(e.target.value);
        updatePreview();
      });

      bgInput.addEventListener('input', (e) => {
        state.bgColor = e.target.value;
        updatePreview();
      });
    },

    async process(item, state) {
      const img = item.image;
      const targetFormat = state.targetFormat || 'image/webp';
      const fileInfo = getOriginalFileInfo(item.file);

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');

      // If format doesn't support transparency (JPG or BMP), fill background
      if (targetFormat === 'image/jpeg' || targetFormat === 'image/bmp') {
        ctx.fillStyle = state.bgColor || '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      let blob, ext;

      if (targetFormat === 'image/bmp') {
        blob = canvasToBmpBlob(canvas);
        ext = '.bmp';
      } else if (targetFormat === 'image/x-icon') {
        blob = await canvasToIcoBlob(canvas, state.icoSize || 32);
        ext = '.ico';
      } else if (targetFormat === 'image/png') {
        blob = await canvasToBlob(canvas, 'image/png');
        ext = '.png';
      } else if (targetFormat === 'image/gif') {
        blob = await canvasToBlob(canvas, 'image/gif');
        ext = '.gif';
      } else if (targetFormat === 'image/jpeg') {
        blob = await canvasToBlob(canvas, 'image/jpeg', state.quality || 0.9);
        ext = '.jpg';
      } else {
        blob = await canvasToBlob(canvas, 'image/webp', state.quality || 0.9);
        ext = '.webp';
      }

      const name = `${fileInfo.baseName}-converted${ext}`;
      return { canvas, blob, name, originalSize: item.file.size, newSize: blob.size };
    }
  },

  // 4. CONVERT TO JPG
  'convert-to-jpg': {
    initControls(container, state, updatePreview) {
      container.innerHTML = `
        <div class="sidebar-section">
          <div class="sidebar-section-title">JPG Output Settings</div>
          <div class="control-group">
            <div class="control-label"><span>JPG Quality</span><span class="control-badge-val" id="jpgQualityVal">90%</span></div>
            <input type="range" class="slider-input" id="jpgQuality" min="30" max="100" value="90">
          </div>
          <div class="control-group">
            <div class="control-label"><span>Background Color for Transparent Areas</span></div>
            <div class="form-row">
              <input type="color" id="jpgBgColor" value="#ffffff" style="width: 50px; height: 38px; border-radius: 6px; cursor: pointer; border: 1px solid var(--border-color);">
              <span style="font-size: 0.85rem; color: var(--text-secondary);">White (Standard)</span>
            </div>
          </div>
        </div>
      `;

      state.jpgQuality = 0.9;
      state.bgColor = '#ffffff';

      const qInput = container.querySelector('#jpgQuality');
      const qVal = container.querySelector('#jpgQualityVal');
      const bgIn = container.querySelector('#jpgBgColor');

      qInput.addEventListener('input', (e) => {
        state.jpgQuality = parseInt(e.target.value) / 100;
        qVal.textContent = `${e.target.value}%`;
        updatePreview();
      });

      bgIn.addEventListener('input', (e) => {
        state.bgColor = e.target.value;
        updatePreview();
      });
    },

    async process(item, state) {
      const img = item.image;
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');

      // Fill background for transparency replacement
      ctx.fillStyle = state.bgColor || '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      const blob = await canvasToBlob(canvas, 'image/jpeg', state.jpgQuality || 0.9);
      const name = item.file.name.replace(/\.[^/.]+$/, "") + '.jpg';

      return { canvas, blob, name, originalSize: item.file.size, newSize: blob.size };
    }
  },

  // 5. CONVERT FROM JPG
  'convert-from-jpg': {
    initControls(container, state, updatePreview) {
      container.innerHTML = `
        <div class="sidebar-section">
          <div class="sidebar-section-title">Target Format</div>
          <div class="segmented-control" id="formatSwitch">
            <button class="segment-btn active" data-fmt="image/png">PNG</button>
            <button class="segment-btn" data-fmt="image/webp">WEBP</button>
            <button class="segment-btn" data-fmt="image/gif">GIF</button>
          </div>
        </div>
        <div class="sidebar-section">
          <div class="sidebar-section-title">Output Quality</div>
          <div class="control-group">
            <div class="control-label"><span>Quality</span><span class="control-badge-val" id="fromJpgVal">92%</span></div>
            <input type="range" class="slider-input" id="fromJpgQuality" min="40" max="100" value="92">
          </div>
        </div>
      `;

      state.targetFormat = 'image/png';
      state.targetQuality = 0.92;

      const fmtBtns = container.querySelectorAll('#formatSwitch button');
      fmtBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          fmtBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.targetFormat = btn.dataset.fmt;
          updatePreview();
        });
      });

      const qIn = container.querySelector('#fromJpgQuality');
      const qVal = container.querySelector('#fromJpgVal');
      qIn.addEventListener('input', (e) => {
        state.targetQuality = parseInt(e.target.value) / 100;
        qVal.textContent = `${e.target.value}%`;
        updatePreview();
      });
    },

    async process(item, state) {
      const img = item.image;
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const mime = state.targetFormat || 'image/png';
      const ext = mime === 'image/png' ? '.png' : (mime === 'image/webp' ? '.webp' : '.gif');
      const blob = await canvasToBlob(canvas, mime, state.targetQuality || 0.92);
      const name = item.file.name.replace(/\.[^/.]+$/, "") + ext;

      return { canvas, blob, name, originalSize: item.file.size, newSize: blob.size };
    }
  },

  // 6. UPSCALE IMAGE (AI Super Resolution)
  'upscale': {
    initControls(container, state, updatePreview) {
      container.innerHTML = `
        <div class="sidebar-section">
          <div class="sidebar-section-title">Upscale Factor</div>
          <div class="segmented-control" id="upscaleFactorSwitch">
            <button class="segment-btn active" data-factor="2">2X Super-Res</button>
            <button class="segment-btn" data-factor="4">4X Ultra-Res</button>
          </div>
        </div>
        <div class="sidebar-section">
          <div class="sidebar-section-title">Detail & Sharpening</div>
          <div class="control-group">
            <div class="control-label"><span>Edge Sharpening</span><span class="control-badge-val" id="sharpVal">50%</span></div>
            <input type="range" class="slider-input" id="upscaleSharpness" min="0" max="100" value="50">
          </div>
        </div>
      `;

      state.factor = 2;
      state.sharpness = 0.5;

      const factorBtns = container.querySelectorAll('#upscaleFactorSwitch button');
      factorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          factorBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.factor = parseInt(btn.dataset.factor);
          updatePreview();
        });
      });

      const sharpIn = container.querySelector('#upscaleSharpness');
      const sharpVal = container.querySelector('#sharpVal');
      sharpIn.addEventListener('input', (e) => {
        state.sharpness = parseInt(e.target.value) / 100;
        sharpVal.textContent = `${e.target.value}%`;
        updatePreview();
      });
    },

    async process(item, state) {
      const img = item.image;
      const baseCanvas = document.createElement('canvas');
      baseCanvas.width = img.naturalWidth;
      baseCanvas.height = img.naturalHeight;
      const ctx = baseCanvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const upscaled = upscaleCanvas(baseCanvas, state.factor || 2, state.sharpness || 0.5);
      const blob = await canvasToBlob(upscaled, 'image/png', 0.95);
      const name = item.file.name.replace(/\.[^/.]+$/, "") + `-upscaled-${state.factor || 2}x.png`;

      return { canvas: upscaled, blob, name, originalSize: item.file.size, newSize: blob.size };
    }
  },

  // 7. REMOVE BACKGROUND
  'remove-bg': {
    initControls(container, state, updatePreview) {
      container.innerHTML = `
        <div class="sidebar-section">
          <div class="sidebar-section-title">Background Removal Settings</div>
          <div class="control-group">
            <div class="control-label"><span>Color Tolerance</span><span class="control-badge-val" id="bgTolVal">32</span></div>
            <input type="range" class="slider-input" id="bgTolerance" min="5" max="80" value="32">
          </div>
          <div class="control-group">
            <div class="control-label"><span>Key Color Sample</span></div>
            <div class="segmented-control" id="bgSampleSwitch">
              <button class="segment-btn active" data-mode="auto">Auto (Corners)</button>
              <button class="segment-btn" data-mode="custom">Custom Color</button>
            </div>
            <div id="customColorWrapper" style="display: none; margin-top: 10px;">
              <input type="color" id="bgCustomColor" value="#ffffff" style="width: 100%; height: 38px; border-radius: 6px; cursor: pointer; border: 1px solid var(--border-color);">
            </div>
          </div>
        </div>
      `;

      state.bgTolerance = 32;
      state.customColor = null;

      const tolIn = container.querySelector('#bgTolerance');
      const tolVal = container.querySelector('#bgTolVal');
      const sampleBtns = container.querySelectorAll('#bgSampleSwitch button');
      const colorWrapper = container.querySelector('#customColorWrapper');
      const colorIn = container.querySelector('#bgCustomColor');

      tolIn.addEventListener('input', (e) => {
        state.bgTolerance = parseInt(e.target.value);
        tolVal.textContent = state.bgTolerance;
        updatePreview();
      });

      sampleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          sampleBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          if (btn.dataset.mode === 'custom') {
            colorWrapper.style.display = 'block';
            state.customColor = hexToRgb(colorIn.value);
          } else {
            colorWrapper.style.display = 'none';
            state.customColor = null;
          }
          updatePreview();
        });
      });

      colorIn.addEventListener('input', (e) => {
        state.customColor = hexToRgb(e.target.value);
        updatePreview();
      });

      function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      }
    },

    async process(item, state) {
      const img = item.image;
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const processed = removeBackgroundCanvas(canvas, state.bgTolerance || 32, state.customColor);
      const blob = await canvasToBlob(processed, 'image/png', 1);
      const name = item.file.name.replace(/\.[^/.]+$/, "") + '-transparent.png';

      return { canvas: processed, blob, name, originalSize: item.file.size, newSize: blob.size };
    }
  },

  // 8. WATERMARK IMAGE
  'watermark': {
    initControls(container, state, updatePreview) {
      container.innerHTML = `
        <div class="sidebar-section">
          <div class="sidebar-section-title">Watermark Text</div>
          <div class="control-group">
            <input type="text" class="form-input" id="wmText" value="Rasx Tools ©" placeholder="Type watermark text...">
          </div>
          <div class="control-group">
            <div class="control-label"><span>Font Size</span><span class="control-badge-val" id="wmSizeVal">36px</span></div>
            <input type="range" class="slider-input" id="wmSize" min="14" max="100" value="36">
          </div>
          <div class="control-group">
            <div class="control-label"><span>Opacity</span><span class="control-badge-val" id="wmOpacityVal">60%</span></div>
            <input type="range" class="slider-input" id="wmOpacity" min="10" max="100" value="60">
          </div>
          <div class="control-group">
            <div class="control-label"><span>Rotation</span><span class="control-badge-val" id="wmRotVal">-20°</span></div>
            <input type="range" class="slider-input" id="wmRotation" min="-90" max="90" value="-20">
          </div>
          <div class="control-group">
            <div class="control-label"><span>Color</span></div>
            <div class="form-row">
              <input type="color" id="wmColor" value="#ffffff" style="width: 50px; height: 38px; border-radius: 6px; cursor: pointer;">
              <select class="form-input" id="wmPosition">
                <option value="center">Center</option>
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="top-right">Top Right</option>
                <option value="top-left">Top Left</option>
                <option value="tile">Tile Pattern (Repeated)</option>
              </select>
            </div>
          </div>
        </div>
      `;

      state.wmText = 'Rasx Tools ©';
      state.wmSize = 36;
      state.wmOpacity = 0.6;
      state.wmRotation = -20;
      state.wmColor = '#ffffff';
      state.wmPos = 'center';

      const textIn = container.querySelector('#wmText');
      const sizeIn = container.querySelector('#wmSize');
      const sizeVal = container.querySelector('#wmSizeVal');
      const opIn = container.querySelector('#wmOpacity');
      const opVal = container.querySelector('#wmOpacityVal');
      const rotIn = container.querySelector('#wmRotation');
      const rotVal = container.querySelector('#wmRotVal');
      const colIn = container.querySelector('#wmColor');
      const posIn = container.querySelector('#wmPosition');

      textIn.addEventListener('input', (e) => { state.wmText = e.target.value; updatePreview(); });
      sizeIn.addEventListener('input', (e) => { state.wmSize = parseInt(e.target.value); sizeVal.textContent = `${state.wmSize}px`; updatePreview(); });
      opIn.addEventListener('input', (e) => { state.wmOpacity = parseInt(e.target.value) / 100; opVal.textContent = `${e.target.value}%`; updatePreview(); });
      rotIn.addEventListener('input', (e) => { state.wmRotation = parseInt(e.target.value); rotVal.textContent = `${state.wmRotation}°`; updatePreview(); });
      colIn.addEventListener('input', (e) => { state.wmColor = e.target.value; updatePreview(); });
      posIn.addEventListener('change', (e) => { state.wmPos = e.target.value; updatePreview(); });
    },

    async process(item, state) {
      const img = item.image;
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const text = state.wmText || '';
      if (text) {
        ctx.save();
        ctx.font = `bold ${state.wmSize || 36}px sans-serif`;
        ctx.fillStyle = state.wmColor || '#ffffff';
        ctx.globalAlpha = state.wmOpacity || 0.6;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 4;

        if (state.wmPos === 'tile') {
          const stepX = 250;
          const stepY = 180;
          ctx.rotate((state.wmRotation * Math.PI) / 180);
          for (let x = -canvas.width; x < canvas.width * 2; x += stepX) {
            for (let y = -canvas.height; y < canvas.height * 2; y += stepY) {
              ctx.fillText(text, x, y);
            }
          }
        } else {
          let tx = canvas.width / 2;
          let ty = canvas.height / 2;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          if (state.wmPos === 'bottom-right') {
            tx = canvas.width - 40;
            ty = canvas.height - 40;
            ctx.textAlign = 'right';
          } else if (state.wmPos === 'bottom-left') {
            tx = 40;
            ty = canvas.height - 40;
            ctx.textAlign = 'left';
          } else if (state.wmPos === 'top-right') {
            tx = canvas.width - 40;
            ty = 40;
            ctx.textAlign = 'right';
          } else if (state.wmPos === 'top-left') {
            tx = 40;
            ty = 40;
            ctx.textAlign = 'left';
          }

          ctx.translate(tx, ty);
          ctx.rotate((state.wmRotation * Math.PI) / 180);
          ctx.fillText(text, 0, 0);
        }
        ctx.restore();
      }

      const fileInfo = getOriginalFileInfo(item.file, '-watermarked');
      const blob = await canvasToBlob(canvas, fileInfo.mime, 0.92);
      const name = fileInfo.outputName;
      return { canvas, blob, name, originalSize: item.file.size, newSize: blob.size };
    }
  },

  // 9. MEME GENERATOR
  'meme-generator': {
    initControls(container, state, updatePreview) {
      container.innerHTML = `
        <div class="sidebar-section">
          <div class="sidebar-section-title">Meme Captions</div>
          <div class="control-group">
            <div class="control-label"><span>Top Text</span></div>
            <input type="text" class="form-input" id="memeTopText" value="ONE DOES NOT SIMPLY" placeholder="TOP TEXT">
          </div>
          <div class="control-group">
            <div class="control-label"><span>Bottom Text</span></div>
            <input type="text" class="form-input" id="memeBottomText" value="MAKE A BORING WEBSITE" placeholder="BOTTOM TEXT">
          </div>
          <div class="control-group">
            <div class="control-label"><span>Font Size</span><span class="control-badge-val" id="memeFontVal">48px</span></div>
            <input type="range" class="slider-input" id="memeFontSize" min="20" max="100" value="48">
          </div>
          <div class="control-group">
            <div class="control-label"><span>Text Color</span></div>
            <div class="form-row">
              <input type="color" id="memeTextColor" value="#ffffff" style="width: 50px; height: 38px; border-radius: 6px; cursor: pointer;">
              <select class="form-input" id="memeFontFamily">
                <option value="Impact">Impact (Classic Meme)</option>
                <option value="Arial Black">Arial Black</option>
                <option value="Comic Sans MS">Comic Sans</option>
                <option value="Montserrat">Montserrat</option>
              </select>
            </div>
          </div>
        </div>
      `;

      state.topText = 'ONE DOES NOT SIMPLY';
      state.bottomText = 'MAKE A BORING WEBSITE';
      state.fontSize = 48;
      state.textColor = '#ffffff';
      state.fontFamily = 'Impact';

      const topIn = container.querySelector('#memeTopText');
      const btmIn = container.querySelector('#memeBottomText');
      const fontIn = container.querySelector('#memeFontSize');
      const fontVal = container.querySelector('#memeFontVal');
      const colorIn = container.querySelector('#memeTextColor');
      const familyIn = container.querySelector('#memeFontFamily');

      topIn.addEventListener('input', (e) => { state.topText = e.target.value; updatePreview(); });
      btmIn.addEventListener('input', (e) => { state.bottomText = e.target.value; updatePreview(); });
      fontIn.addEventListener('input', (e) => { state.fontSize = parseInt(e.target.value); fontVal.textContent = `${state.fontSize}px`; updatePreview(); });
      colorIn.addEventListener('input', (e) => { state.textColor = e.target.value; updatePreview(); });
      familyIn.addEventListener('change', (e) => { state.fontFamily = e.target.value; updatePreview(); });
    },

    async process(item, state) {
      const img = item.image;
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const fSize = Math.round((state.fontSize || 48) * (canvas.width / 800));
      ctx.font = `900 ${fSize}px "${state.fontFamily || 'Impact'}", Impact, Arial Black, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillStyle = state.textColor || '#ffffff';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = Math.max(3, Math.round(fSize / 8));
      ctx.lineJoin = 'miter';
      ctx.miterLimit = 2;

      // Draw Top Text
      if (state.topText) {
        const topY = fSize + 20;
        ctx.strokeText(state.topText.toUpperCase(), canvas.width / 2, topY);
        ctx.fillText(state.topText.toUpperCase(), canvas.width / 2, topY);
      }

      // Draw Bottom Text
      if (state.bottomText) {
        const btmY = canvas.height - 30;
        ctx.strokeText(state.bottomText.toUpperCase(), canvas.width / 2, btmY);
        ctx.fillText(state.bottomText.toUpperCase(), canvas.width / 2, btmY);
      }

      const blob = await canvasToBlob(canvas, 'image/jpeg', 0.95);
      const name = item.file.name.replace(/\.[^/.]+$/, "") + '-meme.jpg';
      return { canvas, blob, name, originalSize: item.file.size, newSize: blob.size };
    }
  },

  // 10. ROTATE IMAGE
  'rotate': {
    initControls(container, state, updatePreview) {
      container.innerHTML = `
        <div class="sidebar-section">
          <div class="sidebar-section-title">Quick Rotate</div>
          <div class="presets-grid">
            <button class="preset-pill" id="rot90Cw">↻ 90° Clockwise</button>
            <button class="preset-pill" id="rot90Ccw">↺ 90° Counter-CW</button>
            <button class="preset-pill" id="flipH">⇆ Flip Horizontal</button>
            <button class="preset-pill" id="flipV">⇅ Flip Vertical</button>
          </div>
        </div>
        <div class="sidebar-section">
          <div class="sidebar-section-title">Custom Angle</div>
          <div class="control-group">
            <div class="control-label"><span>Angle</span><span class="control-badge-val" id="angleVal">0°</span></div>
            <input type="range" class="slider-input" id="rotAngle" min="-180" max="180" value="0">
          </div>
        </div>
      `;

      state.rotation = 0;
      state.flipH = false;
      state.flipV = false;

      const angleIn = container.querySelector('#rotAngle');
      const angleVal = container.querySelector('#angleVal');

      angleIn.addEventListener('input', (e) => {
        state.rotation = parseInt(e.target.value);
        angleVal.textContent = `${state.rotation}°`;
        updatePreview();
      });

      container.querySelector('#rot90Cw').addEventListener('click', () => {
        state.rotation = (state.rotation + 90) % 360;
        angleIn.value = state.rotation;
        angleVal.textContent = `${state.rotation}°`;
        updatePreview();
      });

      container.querySelector('#rot90Ccw').addEventListener('click', () => {
        state.rotation = (state.rotation - 90) % 360;
        angleIn.value = state.rotation;
        angleVal.textContent = `${state.rotation}°`;
        updatePreview();
      });

      container.querySelector('#flipH').addEventListener('click', () => {
        state.flipH = !state.flipH;
        updatePreview();
      });

      container.querySelector('#flipV').addEventListener('click', () => {
        state.flipV = !state.flipV;
        updatePreview();
      });
    },

    async process(item, state) {
      const img = item.image;
      const angleRad = ((state.rotation || 0) * Math.PI) / 180;
      const absCos = Math.abs(Math.cos(angleRad));
      const absSin = Math.abs(Math.sin(angleRad));

      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const newWidth = Math.round(w * absCos + h * absSin);
      const newHeight = Math.round(w * absSin + h * absCos);

      const canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext('2d');

      ctx.translate(newWidth / 2, newHeight / 2);
      ctx.rotate(angleRad);
      ctx.scale(state.flipH ? -1 : 1, state.flipV ? -1 : 1);
      ctx.drawImage(img, -w / 2, -h / 2);

      const fileInfo = getOriginalFileInfo(item.file, '-rotated');
      const blob = await canvasToBlob(canvas, fileInfo.mime, 0.92);
      const name = fileInfo.outputName;
      return { canvas, blob, name, originalSize: item.file.size, newSize: blob.size };
    }
  },

  // 11. PHOTO EDITOR
  'photo-editor': {
    initControls(container, state, updatePreview) {
      container.innerHTML = `
        <div class="sidebar-section">
          <div class="sidebar-section-title">Color Adjustments</div>
          <div class="control-group">
            <div class="control-label"><span>Brightness</span><span class="control-badge-val" id="peBrightVal">0</span></div>
            <input type="range" class="slider-input" id="peBrightness" min="-100" max="100" value="0">
          </div>
          <div class="control-group">
            <div class="control-label"><span>Contrast</span><span class="control-badge-val" id="peContrastVal">0</span></div>
            <input type="range" class="slider-input" id="peContrast" min="-100" max="100" value="0">
          </div>
          <div class="control-group">
            <div class="control-label"><span>Saturation</span><span class="control-badge-val" id="peSatVal">0</span></div>
            <input type="range" class="slider-input" id="peSaturation" min="-100" max="100" value="0">
          </div>
          <div class="control-group">
            <div class="control-label"><span>Blur</span><span class="control-badge-val" id="peBlurVal">0px</span></div>
            <input type="range" class="slider-input" id="peBlur" min="0" max="20" value="0">
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-section-title">Filters & Tones</div>
          <div class="presets-grid">
            <div class="preset-pill active" data-filter="none">Normal <span>Default</span></div>
            <div class="preset-pill" data-filter="grayscale">Noir <span>Grayscale</span></div>
            <div class="preset-pill" data-filter="sepia">Vintage <span>Warm Sepia</span></div>
            <div class="preset-pill" data-filter="invert">Invert <span>Negative</span></div>
            <div class="preset-pill" data-filter="warm">Sunset <span>Golden Warm</span></div>
            <div class="preset-pill" data-filter="cool">Cyber <span>Cool Blue</span></div>
          </div>
        </div>
      `;

      state.peBrightness = 0;
      state.peContrast = 0;
      state.peSaturation = 0;
      state.peBlur = 0;
      state.peFilter = 'none';

      const bIn = container.querySelector('#peBrightness');
      const cIn = container.querySelector('#peContrast');
      const sIn = container.querySelector('#peSaturation');
      const blurIn = container.querySelector('#peBlur');

      bIn.addEventListener('input', (e) => {
        state.peBrightness = parseInt(e.target.value);
        container.querySelector('#peBrightVal').textContent = state.peBrightness;
        updatePreview();
      });

      cIn.addEventListener('input', (e) => {
        state.peContrast = parseInt(e.target.value);
        container.querySelector('#peContrastVal').textContent = state.peContrast;
        updatePreview();
      });

      sIn.addEventListener('input', (e) => {
        state.peSaturation = parseInt(e.target.value);
        container.querySelector('#peSatVal').textContent = state.peSaturation;
        updatePreview();
      });

      blurIn.addEventListener('input', (e) => {
        state.peBlur = parseInt(e.target.value);
        container.querySelector('#peBlurVal').textContent = `${state.peBlur}px`;
        updatePreview();
      });

      container.querySelectorAll('.preset-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          container.querySelectorAll('.preset-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          state.peFilter = pill.dataset.filter;
          updatePreview();
        });
      });
    },

    async process(item, state) {
      const img = item.image;
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');

      // Compose CSS filter string
      let filterStr = `brightness(${100 + (state.peBrightness || 0)}%) contrast(${100 + (state.peContrast || 0)}%) saturate(${100 + (state.peSaturation || 0)}%)`;
      if (state.peBlur > 0) filterStr += ` blur(${state.peBlur}px)`;
      if (state.peFilter === 'grayscale') filterStr += ` grayscale(100%)`;
      if (state.peFilter === 'sepia') filterStr += ` sepia(90%)`;
      if (state.peFilter === 'invert') filterStr += ` invert(100%)`;
      if (state.peFilter === 'warm') filterStr += ` sepia(40%) saturate(140%)`;
      if (state.peFilter === 'cool') filterStr += ` hue-rotate(180deg) saturate(120%)`;

      ctx.filter = filterStr;
      ctx.drawImage(img, 0, 0);

      const fileInfo = getOriginalFileInfo(item.file, '-edited');
      const blob = await canvasToBlob(canvas, fileInfo.mime, 0.95);
      const name = fileInfo.outputName;
      return { canvas, blob, name, originalSize: item.file.size, newSize: blob.size };
    }
  },

  // 13. PDF TO JPG
  'pdf-to-jpg': {
    initControls(container, state, updatePreview) {
      container.innerHTML = `
        <div class="sidebar-section">
          <div class="sidebar-section-title">PDF to JPG Options</div>
          
          <div class="control-group">
            <div class="control-label">
              <span>Conversion Mode</span>
            </div>
            <div class="segmented-control" id="pdfModeSwitch">
              <button class="segment-btn ${state.pdfMode !== 'extract' ? 'active' : ''}" data-mode="pages">Page to JPG</button>
              <button class="segment-btn ${state.pdfMode === 'extract' ? 'active' : ''}" data-mode="extract">Extract Images</button>
            </div>
            <p style="font-size: 0.76rem; color: var(--text-tertiary); margin-top: 6px;" id="pdfModeHelp">
              ${state.pdfMode === 'extract' ? 'Extract images or render content at maximum resolution.' : 'Converts every PDF page into a crisp JPG picture.'}
            </p>
          </div>

          <div class="control-group">
            <div class="control-label">
              <span>JPG Image Quality</span>
              <span class="control-badge-val" id="pdfQualityVal">${Math.round((state.quality || 0.92) * 100)}%</span>
            </div>
            <input type="range" class="slider-input" id="pdfQuality" min="30" max="100" value="${Math.round((state.quality || 0.92) * 100)}">
          </div>

          <div class="control-group">
            <div class="control-label">
              <span>Output Resolution (DPI)</span>
            </div>
            <select class="form-input" id="pdfDpi">
              <option value="1.0" ${state.scale === 1.0 ? 'selected' : ''}>Standard (72 DPI - Web Fast)</option>
              <option value="1.5" ${state.scale === 1.5 ? 'selected' : ''}>Medium (108 DPI - Crisp)</option>
              <option value="2.0" ${!state.scale || state.scale === 2.0 ? 'selected' : ''}>High Quality (144 DPI - Recommended)</option>
              <option value="3.0" ${state.scale === 3.0 ? 'selected' : ''}>Ultra HD (216 DPI - Print Sharp)</option>
            </select>
          </div>

          <div class="control-group">
            <div class="control-label">
              <span>Page Background</span>
            </div>
            <select class="form-input" id="pdfBgColor">
              <option value="#ffffff" ${!state.bgColor || state.bgColor === '#ffffff' ? 'selected' : ''}>White Background (Standard JPG)</option>
              <option value="#f8fafc" ${state.bgColor === '#f8fafc' ? 'selected' : ''}>Off-White / Soft Gray</option>
              <option value="#0f172a" ${state.bgColor === '#0f172a' ? 'selected' : ''}>Dark / Midnight</option>
            </select>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-section-title">PDF Document Info</div>
          <div class="stats-box" id="pdfDocStats">
            <div class="stats-row"><span>Document:</span><b id="pdfDocName">--</b></div>
            <div class="stats-row"><span>Total Pages:</span><b id="pdfDocPages">--</b></div>
            <div class="stats-row"><span>Current Page:</span><b id="pdfCurrentPage" style="color: var(--primary);">--</b></div>
            <div class="stats-row"><span>Output Format:</span><b style="color: #ef4444;">JPG (.jpg)</b></div>
          </div>
        </div>
      `;

      state.pdfMode = state.pdfMode || 'pages';
      state.quality = state.quality !== undefined ? state.quality : 0.92;
      state.scale = state.scale || 2.0;
      state.bgColor = state.bgColor || '#ffffff';

      const modeBtns = container.querySelectorAll('#pdfModeSwitch .segment-btn');
      const modeHelp = container.querySelector('#pdfModeHelp');
      const qualityInput = container.querySelector('#pdfQuality');
      const qualityVal = container.querySelector('#pdfQualityVal');
      const dpiSelect = container.querySelector('#pdfDpi');
      const bgSelect = container.querySelector('#pdfBgColor');

      modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          modeBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.pdfMode = btn.dataset.mode;
          if (modeHelp) {
            modeHelp.textContent = state.pdfMode === 'extract'
              ? 'Extract images or render content at maximum resolution.'
              : 'Converts every PDF page into a crisp JPG picture.';
          }
          updatePreview();
        });
      });

      qualityInput.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        qualityVal.textContent = `${val}%`;
        state.quality = val / 100;
        updatePreview();
      });

      dpiSelect.addEventListener('change', (e) => {
        state.scale = parseFloat(e.target.value);
        updatePreview();
      });

      bgSelect.addEventListener('change', (e) => {
        state.bgColor = e.target.value;
        updatePreview();
      });
    },

    async process(item, state) {
      let canvas;
      const scale = state.scale || 2.0;
      const quality = state.quality !== undefined ? state.quality : 0.92;
      const bgColor = state.bgColor || '#ffffff';

      // Update sidebar info
      const docNameEl = document.getElementById('pdfDocName');
      const docPagesEl = document.getElementById('pdfDocPages');
      const currPageEl = document.getElementById('pdfCurrentPage');

      if (docNameEl && item.pdfFile) {
        docNameEl.textContent = item.pdfFile.name.length > 22 
          ? item.pdfFile.name.substring(0, 19) + '...' 
          : item.pdfFile.name;
      }
      if (docPagesEl && item.totalPages) {
        docPagesEl.textContent = `${item.totalPages} Page(s)`;
      }
      if (currPageEl && item.pageNumber) {
        currPageEl.textContent = `Page ${item.pageNumber} of ${item.totalPages || '?'}`;
      }

      // If item has original PDF document reference, re-render at exact target resolution!
      if (item.pdfDoc && item.pageNumber) {
        const page = await item.pdfDoc.getPage(item.pageNumber);
        const actualScale = state.pdfMode === 'extract' ? Math.max(scale, 2.5) : scale;
        const viewport = page.getViewport({ scale: actualScale });

        canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');

        // Solid background for JPG
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({
          canvasContext: ctx,
          viewport: viewport
        }).promise;
      } else if (item.originalCanvas) {
        canvas = document.createElement('canvas');
        canvas.width = item.originalCanvas.width;
        canvas.height = item.originalCanvas.height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(item.originalCanvas, 0, 0);
      } else if (item.image) {
        canvas = document.createElement('canvas');
        canvas.width = item.image.naturalWidth;
        canvas.height = item.image.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(item.image, 0, 0);
      }

      const blob = await canvasToBlob(canvas, 'image/jpeg', quality);
      
      const baseName = item.baseName || 'document';
      const pageNumStr = item.pageNumber ? `-page-${item.pageNumber}` : '';
      const name = `${baseName}${pageNumStr}.jpg`;

      const origSize = (item.pdfFile ? item.pdfFile.size : item.file.size);

      return {
        canvas,
        blob,
        name,
        originalSize: origSize,
        newSize: blob.size
      };
    }
  }
};


// --- MAIN APP ---
// Main Application Logic for Rasx Tools





class RasxToolsApp {
  constructor() {
    this.currentTool = null;
    this.toolState = {};
    this.filesQueue = [];
    this.activeQueueIndex = 0;
    this.isProcessing = false;
    this.previewDebounceTimer = null;

    this.initElements();
    this.initTheme();
    this.renderToolCards();
    this.bindEvents();
  }

  initElements() {
    // DOM references
    this.toolsGrid = document.getElementById('toolsGrid');
    this.filterTabs = document.querySelectorAll('.filter-tab');
    this.searchInput = document.getElementById('searchInput');
    this.themeToggleBtn = document.getElementById('themeToggleBtn');
    
    // Workspace Modal
    this.modal = document.getElementById('workspaceModal');
    this.modalTitle = document.getElementById('modalTitle');
    this.modalSubtitle = document.getElementById('modalSubtitle');
    this.modalIcon = document.getElementById('modalIcon');
    this.modalCloseBtn = document.getElementById('modalCloseBtn');
    
    this.dropzone = document.getElementById('dropzone');
    this.dropzoneTitle = document.getElementById('dropzoneTitle');
    this.dropzoneSubtitle = document.getElementById('dropzoneSubtitle');
    this.dropzoneSelectBtn = document.getElementById('dropzoneSelectBtn');
    this.cloudButtons = document.getElementById('cloudButtons');
    this.btnGoogleDrive = document.getElementById('btnGoogleDrive');
    this.btnDropbox = document.getElementById('btnDropbox');
    this.dropzoneHint = document.getElementById('dropzoneHint');
    this.dropzoneFormats = document.getElementById('dropzoneFormats');
    this.fileInput = document.getElementById('fileInput');
    this.workspaceMain = document.getElementById('workspaceMain');
    this.canvasViewport = document.getElementById('canvasViewport');
    this.queueContainer = document.getElementById('queueContainer');
    this.sidebarControls = document.getElementById('sidebarControls');
    
    this.processBtn = document.getElementById('processBtn');
    this.downloadGroup = document.getElementById('downloadGroup');
    this.downloadSingleBtn = document.getElementById('downloadSingleBtn');
    this.downloadZipBtn = document.getElementById('downloadZipBtn');
    this.processingOverlay = document.getElementById('processingOverlay');
  }

  initTheme() {
    if (window.RasxTheme) {
      window.RasxTheme.updateUI(window.RasxTheme.get());
      return;
    }
    const savedTheme = localStorage.getItem('rasx_theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeIcon(savedTheme);
  }

  toggleTheme() {
    if (window.RasxTheme) {
      return window.RasxTheme.toggle();
    }
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    try {
      localStorage.setItem('rasx_theme', newTheme);
    } catch (e) {}
    this.updateThemeIcon(newTheme);
  }

  updateThemeIcon(theme) {
    if (window.RasxTheme) {
      window.RasxTheme.updateUI(theme);
      return;
    }
    if (this.themeToggleBtn) {
      this.themeToggleBtn.innerHTML = theme === 'dark' 
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon sun-icon"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon moon-icon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
    }
  }

  renderToolCards(filterCategory = 'all', searchQuery = '') {
    this.toolsGrid.innerHTML = '';

    const filtered = TOOLS.filter(tool => {
      const matchCat = filterCategory === 'all' || tool.category === filterCategory;
      const matchSearch = !searchQuery || 
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      this.toolsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-tertiary);">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">🔍</div>
          <h3>No tools found matching "${searchQuery}"</h3>
          <p>Try searching for compress, resize, crop, watermark, or background removal.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(tool => {
      const card = document.createElement('div');
      card.className = 'tool-card';
      card.style.setProperty('--card-color', tool.color);
      card.style.setProperty('--tool-bg', tool.bgColor);
      card.style.setProperty('--tool-color', tool.color);

      card.innerHTML = `
        <div class="tool-card-top">
          <div class="tool-icon">${tool.icon}</div>
          ${tool.badge ? `<span class="tool-badge ${tool.badgeType}">${tool.badge}</span>` : ''}
        </div>
        <div class="tool-title">${tool.title}</div>
        <div class="tool-description">${tool.description}</div>
        <div class="tool-card-footer">
          <span>Open Tool</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
      `;

      card.addEventListener('click', () => this.openTool(tool.id));
      this.toolsGrid.appendChild(card);
    });
  }

  bindEvents() {
    // Theme switch is exclusively managed by js/theme.js to prevent duplicate toggling
    if (window.RasxTheme) {
      window.RasxTheme.bindEvents();
    }

    // Category Filter tabs
    this.filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.renderToolCards(tab.dataset.category, this.searchInput.value);
      });
    });

    // Search input
    this.searchInput?.addEventListener('input', (e) => {
      const activeCat = document.querySelector('.filter-tab.active')?.dataset.category || 'all';
      this.renderToolCards(activeCat, e.target.value);
    });

    // Keyboard shortcut for search (Ctrl+K or /)
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && document.activeElement !== this.searchInput)) {
        e.preventDefault();
        this.searchInput?.focus();
      }
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.closeTool();
      }
    });

    // Modal Close
    this.modalCloseBtn?.addEventListener('click', () => this.closeTool());
    this.modal?.addEventListener('click', (e) => {
      if (e.target === this.modal) this.closeTool();
    });

    // Dropzone and file input trigger
    this.dropzone?.addEventListener('click', () => this.fileInput?.click());
    this.fileInput?.addEventListener('change', (e) => {
      if (e.target.files?.length) {
        this.handleFiles(Array.from(e.target.files));
      }
    });

    // Drag and drop for workspace dropzone
    ['dragenter', 'dragover'].forEach(name => {
      this.dropzone?.addEventListener(name, (e) => {
        e.preventDefault();
        this.dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(name => {
      this.dropzone?.addEventListener(name, (e) => {
        e.preventDefault();
        this.dropzone.classList.remove('dragover');
      });
    });

    this.dropzone?.addEventListener('drop', (e) => {
      if (e.dataTransfer.files?.length) {
        this.handleFiles(Array.from(e.dataTransfer.files));
      }
    });

    // Cloud buttons in dropzone
    this.btnGoogleDrive?.addEventListener('click', (e) => {
      e.stopPropagation();
      showToast('Select PDF file from Google Drive or local device', 'info', 2000);
      this.fileInput?.click();
    });
    this.btnDropbox?.addEventListener('click', (e) => {
      e.stopPropagation();
      showToast('Select PDF file from Dropbox or local device', 'info', 2000);
      this.fileInput?.click();
    });

    // Global dragover & drop: dropping a PDF anywhere opens PDF to JPG
    window.addEventListener('dragover', (e) => e.preventDefault());
    window.addEventListener('drop', (e) => {
      if (this.modal.classList.contains('active')) return;
      e.preventDefault();
      if (e.dataTransfer.files?.length) {
        const files = Array.from(e.dataTransfer.files);
        const hasPdf = files.some(f => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'));
        if (hasPdf) {
          this.openTool('pdf-to-jpg', files);
        }
      }
    });

    // Action buttons
    this.processBtn?.addEventListener('click', () => this.processAll());
    this.downloadSingleBtn?.addEventListener('click', () => this.downloadActiveItem());
    this.downloadZipBtn?.addEventListener('click', () => this.downloadAllZip());
  }

  openTool(toolId, initialFiles = []) {
    const tool = TOOLS.find(t => t.id === toolId);
    if (!tool) return;

    this.currentTool = tool;
    this.toolState = {};
    this.filesQueue = [];
    this.activeQueueIndex = 0;

    // Set modal headers
    this.modalTitle.textContent = tool.title;
    this.modalSubtitle.textContent = tool.description;
    this.modalIcon.innerHTML = tool.icon;
    this.modalIcon.style.color = tool.color;
    this.modalIcon.style.backgroundColor = tool.bgColor;

    this.fileInput.accept = tool.accept || 'image/*';
    this.fileInput.multiple = tool.multiple !== false;

    // Reset view
    this.dropzone.style.display = 'flex';
    this.workspaceMain.style.display = 'none';
    this.sidebarControls.innerHTML = '';
    this.updateDownloadButtons();
    this.processBtn.disabled = false;

    // Customize dropzone UI for PDF to JPG if active
    if (tool.id === 'pdf-to-jpg') {
      this.dropzone.classList.add('pdf-mode');
      if (this.dropzoneTitle) this.dropzoneTitle.textContent = 'PDF to JPG';
      if (this.dropzoneSubtitle) this.dropzoneSubtitle.textContent = 'Convert each PDF page into a JPG or extract all images contained in a PDF.';
      if (this.dropzoneSelectBtn) this.dropzoneSelectBtn.textContent = 'Select PDF file';
      if (this.cloudButtons) this.cloudButtons.style.display = 'flex';
      if (this.dropzoneHint) this.dropzoneHint.style.display = 'block';
      if (this.dropzoneFormats) {
        this.dropzoneFormats.innerHTML = `
          <span class="format-chip" style="background:#fee2e2;color:#dc2626;border-color:#fca5a5;">PDF</span>
          <span class="format-chip">MULTI-PAGE</span>
          <span class="format-chip">VECTOR QUALITY</span>
          <span class="format-chip">INSTANT JPG</span>
        `;
      }
      if (this.processBtn) {
        this.processBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>Convert to JPG & Download</span>
        `;
      }
    } else {
      this.dropzone.classList.remove('pdf-mode');
      if (this.dropzoneTitle) this.dropzoneTitle.textContent = 'Select or drag & drop images here';
      if (this.dropzoneSubtitle) this.dropzoneSubtitle.textContent = 'Click anywhere inside this box to choose files from your device, or paste directly.';
      if (this.dropzoneSelectBtn) this.dropzoneSelectBtn.textContent = 'Select Images';
      if (this.cloudButtons) this.cloudButtons.style.display = 'none';
      if (this.dropzoneHint) this.dropzoneHint.style.display = 'none';
      if (this.dropzoneFormats) {
        this.dropzoneFormats.innerHTML = `
          <span class="format-chip">JPG</span>
          <span class="format-chip">PNG</span>
          <span class="format-chip">WEBP</span>
          <span class="format-chip">GIF</span>
          <span class="format-chip">SVG</span>
        `;
      }
      if (this.processBtn) {
        this.processBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
          <span>Apply & Process</span>
        `;
      }
    }

    // Initialize tool-specific sidebar controls
    const handler = ToolHandlers[tool.id];
    if (handler && handler.initControls) {
      handler.initControls(this.sidebarControls, this.toolState, () => this.requestPreviewUpdate());
    }

    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (initialFiles.length) {
      this.handleFiles(initialFiles);
    }
  }

  closeTool() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    this.currentTool = null;
    this.filesQueue = [];
    this.canvasViewport.innerHTML = '';
  }

  async handleFiles(files) {
    if (!files.length) return;

    const isPdfTool = this.currentTool?.id === 'pdf-to-jpg';
    const pdfFiles = files.filter(f => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'));

    if (isPdfTool || pdfFiles.length > 0) {
      if (pdfFiles.length === 0) {
        showToast('Please upload valid PDF file (.pdf).', 'error');
        return;
      }
      await this.handlePdfFiles(pdfFiles);
      return;
    }

    const validFiles = files.filter(f => f.type.startsWith('image/'));
    if (!validFiles.length) {
      showToast('Please upload valid image files.', 'error');
      return;
    }

    showToast(`Loading ${validFiles.length} image(s)...`, 'info', 1500);

    for (const file of validFiles) {
      try {
        const dataUrl = await readFileAsDataURL(file);
        const image = await loadImage(dataUrl);
        this.filesQueue.push({
          file,
          image,
          dataUrl,
          processed: null
        });
      } catch (err) {
        console.error('Failed to load image:', err);
      }
    }

    if (this.filesQueue.length > 0) {
      this.dropzone.style.display = 'none';
      this.workspaceMain.style.display = 'flex';
      this.renderQueue();
      this.setActiveQueueItem(0);
      this.updateDownloadButtons();
    }
  }

  async handlePdfFiles(pdfFiles) {
    if (!window.pdfjsLib) {
      showToast('PDF rendering engine is loading, please try again.', 'error');
      return;
    }

    this.processingOverlay.classList.add('active');
    const overlayText = this.processingOverlay.querySelector('p');

    try {
      for (const file of pdfFiles) {
        if (overlayText) overlayText.textContent = `Opening ${file.name}...`;
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
        const pdfDoc = await loadingTask.promise;
        const numPages = pdfDoc.numPages;

        const baseName = file.name.replace(/\.pdf$/i, '');

        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          if (overlayText) {
            overlayText.textContent = `Rendering page ${pageNum} of ${numPages} (${file.name})...`;
          }
          const page = await pdfDoc.getPage(pageNum);
          // Render initial preview at crisp 1.5x scale
          const viewport = page.getViewport({ scale: 1.5 });

          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          await page.render({ canvasContext: ctx, viewport }).promise;

          const dataUrl = canvas.toDataURL('image/jpeg', 0.90);
          const image = await loadImage(dataUrl);

          this.filesQueue.push({
            file: {
              name: `${baseName}-page-${pageNum}.jpg`,
              size: Math.round(dataUrl.length * 0.75),
              type: 'image/jpeg'
            },
            pdfFile: file,
            pdfDoc: pdfDoc,
            pageNumber: pageNum,
            totalPages: numPages,
            baseName: baseName,
            image: image,
            dataUrl: dataUrl,
            originalCanvas: canvas,
            processed: null
          });
        }

        showToast(`Successfully extracted ${numPages} page(s) from "${file.name}"!`, 'success');
      }

      if (this.filesQueue.length > 0) {
        this.dropzone.style.display = 'none';
        this.workspaceMain.style.display = 'flex';
        this.renderQueue();
        this.setActiveQueueItem(0);
        this.updateDownloadButtons();
      }
    } catch (err) {
      console.error('Failed to load PDF:', err);
      showToast(`Failed to parse PDF: ${err.message || 'Error'}`, 'error');
    } finally {
      this.processingOverlay.classList.remove('active');
      if (overlayText) overlayText.textContent = 'Processing images, please wait...';
    }
  }

  renderQueue() {
    this.queueContainer.innerHTML = '';

    this.filesQueue.forEach((item, index) => {
      const qItem = document.createElement('div');
      qItem.className = `queue-item ${index === this.activeQueueIndex ? 'active' : ''}`;
      const badgeText = item.pageNumber ? `P.${item.pageNumber}` : `${index + 1}`;
      const titleText = item.pageNumber ? `Page ${item.pageNumber} of ${item.totalPages}` : `Image #${index + 1}`;
      qItem.innerHTML = `
        <img src="${item.dataUrl}" alt="Thumbnail">
        <div class="queue-item-index" title="${titleText}">${badgeText}</div>
        <div class="queue-item-download" title="Download this specific image">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        </div>
        <div class="queue-item-remove" title="Remove image">×</div>
      `;

      qItem.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.queue-item-remove');
        const downloadBtn = e.target.closest('.queue-item-download');

        if (removeBtn) {
          e.stopPropagation();
          this.removeQueueItem(index);
        } else if (downloadBtn) {
          e.stopPropagation();
          this.downloadSingleItem(index);
        } else {
          this.setActiveQueueItem(index);
        }
      });

      this.queueContainer.appendChild(qItem);
    });

    if (this.currentTool?.multiple !== false) {
      const addBtn = document.createElement('div');
      addBtn.className = 'queue-add-btn';
      addBtn.innerHTML = `<span>+</span><span>Add</span>`;
      addBtn.addEventListener('click', () => this.fileInput.click());
      this.queueContainer.appendChild(addBtn);
    }

    this.updateDownloadButtons();
  }

  removeQueueItem(index) {
    this.filesQueue.splice(index, 1);
    if (this.filesQueue.length === 0) {
      this.dropzone.style.display = 'flex';
      this.workspaceMain.style.display = 'none';
    } else {
      this.activeQueueIndex = Math.max(0, Math.min(index, this.filesQueue.length - 1));
      this.renderQueue();
      this.setActiveQueueItem(this.activeQueueIndex);
    }
    this.updateDownloadButtons();
  }

  setActiveQueueItem(index) {
    this.activeQueueIndex = index;
    document.querySelectorAll('.queue-item').forEach((el, i) => {
      el.classList.toggle('active', i === index);
    });
    this.requestPreviewUpdate();
    this.updateDownloadButtons();
  }

  updateDownloadButtons() {
    const count = this.filesQueue.length;
    if (count === 0) {
      if (this.downloadGroup) this.downloadGroup.style.display = 'none';
      return;
    }

    if (this.downloadGroup) this.downloadGroup.style.display = 'flex';

    const isPdf = this.currentTool?.id === 'pdf-to-jpg';
    const activeItem = this.filesQueue[this.activeQueueIndex];
    const pageLabel = isPdf && activeItem?.pageNumber ? `Page #${activeItem.pageNumber}` : `#${this.activeQueueIndex + 1}`;

    if (this.downloadSingleBtn) {
      this.downloadSingleBtn.style.display = 'flex';
      this.downloadSingleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        <span>Download Active ${isPdf ? 'Page' : 'Image'} (${pageLabel})</span>
      `;
    }

    if (this.downloadZipBtn) {
      if (count > 1) {
        this.downloadZipBtn.style.display = 'flex';
        this.downloadZipBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/><path d="M14 12h7"/></svg>
          <span>Download All as ZIP (${count} ${isPdf ? 'Pages' : 'Images'})</span>
        `;
      } else {
        this.downloadZipBtn.style.display = 'none';
      }
    }
  }

  requestPreviewUpdate() {
    if (this.previewDebounceTimer) {
      clearTimeout(this.previewDebounceTimer);
    }
    this.previewDebounceTimer = setTimeout(() => this.updateLivePreview(), 80);
  }

  async updateLivePreview() {
    if (!this.currentTool || !this.filesQueue[this.activeQueueIndex]) return;

    const item = this.filesQueue[this.activeQueueIndex];
    const handler = ToolHandlers[this.currentTool.id];
    if (!handler) return;

    try {
      const result = await handler.process(item, this.toolState);
      item.processed = result;

      this.canvasViewport.innerHTML = '';
      this.canvasViewport.appendChild(result.canvas);

      // Update compression summary stats if applicable
      const statOrig = document.getElementById('statOrigSize');
      const statNew = document.getElementById('statNewSize');
      const statSaved = document.getElementById('statSaved');
      if (statOrig && statNew && statSaved) {
        statOrig.textContent = formatBytes(result.originalSize);
        statNew.textContent = formatBytes(result.newSize);
        const pctSaved = Math.max(0, Math.round((1 - (result.newSize / result.originalSize)) * 100));
        statSaved.textContent = `-${pctSaved}%`;
      }
    } catch (err) {
      console.error('Preview update error:', err);
    }
  }

  async processAll() {
    if (!this.filesQueue.length || this.isProcessing) return;

    this.isProcessing = true;
    this.processingOverlay.classList.add('active');
    const overlayText = this.processingOverlay.querySelector('p');
    const handler = ToolHandlers[this.currentTool.id];

    try {
      for (let i = 0; i < this.filesQueue.length; i++) {
        if (overlayText) {
          overlayText.textContent = `Processing image ${i + 1} of ${this.filesQueue.length}...`;
        }
        const item = this.filesQueue[i];
        const res = await handler.process(item, this.toolState);
        item.processed = res;
      }

      this.updateDownloadButtons();

      // Trigger instant download on conversion for best user experience
      if (this.filesQueue.length === 1) {
        showToast(`Processing complete! Downloading image...`, 'success');
        await this.downloadSingleItem(0);
      } else {
        showToast(`Processing complete! Downloading ZIP package...`, 'success');
        await this.downloadAllZip();
      }
    } catch (err) {
      console.error('Process error:', err);
      showToast('An error occurred during processing.', 'error');
    } finally {
      this.isProcessing = false;
      this.processingOverlay.classList.remove('active');
      if (overlayText) overlayText.textContent = 'Processing images, please wait...';
    }
  }

  // Download a single item by index (or active item)
  async downloadSingleItem(index) {
    if (!this.filesQueue[index]) return;

    const item = this.filesQueue[index];
    const handler = ToolHandlers[this.currentTool.id];

    try {
      if (!item.processed) {
        showToast(`Preparing #${index + 1}...`, 'info', 1000);
        item.processed = await handler.process(item, this.toolState);
      }

      const fileName = item.processed?.name || item.file?.name || `image_${index + 1}.jpg`;

      // 1. Direct Canvas Data URL download (immune to Chrome Blob UUID bug)
      if (item.processed?.canvas) {
        const mime = this.currentTool?.id === 'pdf-to-jpg' ? 'image/jpeg' : (item.file?.type || 'image/jpeg');
        const quality = this.toolState?.quality !== undefined ? this.toolState.quality : 0.92;
        downloadCanvas(item.processed.canvas, fileName, mime, quality);
        showToast(`Downloaded #${index + 1} (${fileName})!`, 'success');
        return;
      }

      // 2. Otherwise download using robust downloadBlob
      if (item.processed?.blob) {
        await downloadBlob(item.processed.blob, fileName);
        showToast(`Downloaded #${index + 1} (${fileName})!`, 'success');
      }
    } catch (err) {
      console.error('Failed to download item:', err);
      showToast('Failed to download image.', 'error');
    }
  }

  // Download the currently active/viewed item
  async downloadActiveItem() {
    await this.downloadSingleItem(this.activeQueueIndex);
  }

  // Download all files as a ZIP package
  async downloadAllZip() {
    if (!this.filesQueue.length || this.isProcessing) return;

    this.isProcessing = true;
    this.processingOverlay.classList.add('active');
    const overlayText = this.processingOverlay.querySelector('p');
    const handler = ToolHandlers[this.currentTool.id];

    try {
      const zipFiles = [];

      for (let i = 0; i < this.filesQueue.length; i++) {
        const item = this.filesQueue[i];
        if (overlayText) {
          overlayText.textContent = `Rendering image ${i + 1} of ${this.filesQueue.length} for ZIP...`;
        }

        // Process if not processed or if settings changed
        const res = await handler.process(item, this.toolState);
        item.processed = res;

        zipFiles.push({
          name: res.name || `image_${i + 1}.jpg`,
          blob: res.blob
        });
      }

      if (overlayText) {
        overlayText.textContent = 'Compressing into ZIP archive...';
      }

      const zipName = this.currentTool.id === 'pdf-to-jpg' && this.filesQueue[0]?.baseName
        ? `${this.filesQueue[0].baseName}-jpg-pages.zip`
        : `${this.currentTool.id}-rasx-batch.zip`;
      await downloadZip(zipFiles, zipName);
      showToast(`ZIP package with ${zipFiles.length} images downloaded!`, 'success');
    } catch (err) {
      console.error('ZIP generation error:', err);
      showToast('Failed to generate ZIP. Please try individual download.', 'error');
    } finally {
      this.isProcessing = false;
      this.processingOverlay.classList.remove('active');
      if (overlayText) overlayText.textContent = 'Processing images, please wait...';
    }
  }
}

// Initialize on DOM ready or immediately if already loaded
function initRasxApp() {
  if (!window.rasxApp) {
    window.rasxApp = new RasxToolsApp();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRasxApp);
} else {
  initRasxApp();
}


})(window, document);
