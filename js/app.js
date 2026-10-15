// Main Application Logic for Rasx Tools

import { TOOLS } from './modules/tools-registry.js';
import { ToolHandlers } from './tools/tool-handlers.js';
import { 
  formatBytes, 
  loadImage, 
  readFileAsDataURL, 
  downloadCanvas,
  downloadBlob, 
  downloadZip, 
  showToast 
} from './modules/utils.js';

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
