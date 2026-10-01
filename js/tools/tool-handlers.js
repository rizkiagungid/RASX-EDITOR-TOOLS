// Implementation of All 11 Image Tools with Interactive Settings & Processing

import { 
  formatBytes, 
  canvasToBlob, 
  canvasToBmpBlob,
  canvasToIcoBlob,
  downloadBlob, 
  downloadZip, 
  upscaleCanvas, 
  removeBackgroundCanvas, 
  showToast 
} from '../modules/utils.js';

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

export const ToolHandlers = {
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
  }
};
