/**
 * main.js — Images to PDF
 * 100% client-side image to PDF conversion with pdf-lib
 */

import { PDFDocument } from 'pdf-lib';
import { initI18n, t } from './i18n.js';

// State
let images = []; // [{ id, file, thumbnail, width, height }]
let currentFormat = 'a4';
let currentOrientation = 'portrait';
let currentMargin = 10;
let currentQuality = 'medium';

// Elements
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('file-input');
const workspace = document.getElementById('workspace');
const filenameEl = document.getElementById('filename');
const imagesGrid = document.getElementById('images-grid');
const btnReset = document.getElementById('btn-reset');
const btnAddMore = document.getElementById('btn-add-more');
const formatSelect = document.getElementById('format-select');
const marginRange = document.getElementById('margin-range');
const marginValue = document.getElementById('margin-value');
const _qualityGroup = document.querySelector('[data-quality="medium"]').closest('.control-group');
const progressContainer = document.getElementById('progress-container');
const progressFill = document.getElementById('progress-fill');
const progressPercent = document.getElementById('progress-percent');
const progressText = document.getElementById('progress-text');
const resultInfo = document.getElementById('result-info');
const btnConvert = document.getElementById('btn-convert');
const btnDownload = document.getElementById('btn-download');
const srLive = document.getElementById('sr-live');

// === Initialization ===
async function init() {
  await initI18n();
  setupEventListeners();
  updateControlsVisibility();
}

function setupEventListeners() {
  // Drag & drop
  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('dragleave', handleDragLeave);
  dropzone.addEventListener('drop', handleDrop);
  dropzone.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', handleFileSelect);

  // Add more files
  btnAddMore.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
  });

  // Reset
  btnReset.addEventListener('click', resetAll);

  // Controls
  formatSelect.addEventListener('change', (e) => {
    currentFormat = e.target.value;
  });

  // Orientation
  document.querySelectorAll('.seg-btn[data-orientation]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.seg-btn[data-orientation]').forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
        b.tabIndex = -1;
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');
      btn.tabIndex = 0;
      currentOrientation = btn.dataset.orientation;
    });
  });

  // Margin
  marginRange.addEventListener('input', (e) => {
    currentMargin = parseInt(e.target.value, 10);
    marginValue.textContent = currentMargin;
  });

  // Quality
  document.querySelectorAll('.seg-btn[data-quality]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.seg-btn[data-quality]').forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
        b.tabIndex = -1;
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');
      btn.tabIndex = 0;
      currentQuality = btn.dataset.quality;
    });
  });

  // Select/deselect all
  document.getElementById('btn-select-all').addEventListener('click', selectAllImages);
  document.getElementById('btn-deselect-all').addEventListener('click', deselectAllImages);

  // Convert
  btnConvert.addEventListener('click', convertToPdf);

  // Download
  btnDownload.addEventListener('click', downloadPdf);
}

// === Drag & Drop Handlers ===
function handleDragOver(e) {
  e.preventDefault();
  dropzone.classList.add('dragover');
}

function handleDragLeave(e) {
  e.preventDefault();
  dropzone.classList.remove('dragover');
}

async function handleDrop(e) {
  e.preventDefault();
  dropzone.classList.remove('dragover');
  const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
  await handleFiles(files);
}

async function handleFileSelect(e) {
  const files = Array.from(e.target.files).filter((f) => f.type.startsWith('image/'));
  await handleFiles(files);
  fileInput.value = '';
}

async function handleFiles(files) {
  if (files.length === 0) return;

  workspace.hidden = false;

  for (const file of files) {
    try {
      const image = await loadImage(file);
      images.push(image);
    } catch (err) {
      console.error('Failed to load image:', file.name, err);
    }
  }

  renderImages();
  updateFilename();
  updateConvertButton();
  announce(`${files.length} image${files.length > 1 ? 's' : ''} loaded`);
}

// === Image Loading ===
function loadImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = async () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const maxWidth = 280;
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const thumbnail = canvas.toDataURL('image/jpeg', 0.85);

        resolve({
          id: crypto.randomUUID(),
          file,
          thumbnail,
          width: img.width,
          height: img.height,
        });
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = () => reject(new Error(`Failed to load ${file.name}`));

    const url = URL.createObjectURL(file);
    img.src = url;
  });
}

// === Rendering ===
function renderImages() {
  imagesGrid.innerHTML = '';

  images.forEach((image, idx) => {
    const card = createImageCard(image, idx);
    imagesGrid.appendChild(card);
  });
}

function createImageCard(image, index) {
  const card = document.createElement('div');
  card.className = 'page-card';
  card.draggable = true;
  card.dataset.id = image.id;
  card.setAttribute('role', 'listitem');
  card.setAttribute('aria-label', `${image.file.name}, page ${index + 1}`);

  // Thumbnail wrapper
  const thumbWrapper = document.createElement('div');
  thumbWrapper.className = 'page-card__thumb';

  const img = document.createElement('img');
  img.src = image.thumbnail;
  img.className = 'page-card__img';
  img.alt = image.file.name;
  thumbWrapper.appendChild(img);

  // Checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'page-card__checkbox';
  checkbox.checked = true;
  checkbox.setAttribute('aria-label', `Select ${image.file.name}`);
  checkbox.addEventListener('change', () => {
    card.classList.toggle('page-card--selected', checkbox.checked);
    announce(`${image.file.name} ${checkbox.checked ? 'selected' : 'deselected'}`);
  });

  // Number badge
  const badge = document.createElement('span');
  badge.className = 'page-card__number';
  badge.textContent = index + 1;

  // Filename
  const nameBadge = document.createElement('span');
  nameBadge.style.cssText =
    'font-size:0.75rem;color:var(--text-secondary);text-overflow:ellipsis;overflow:hidden;white-space:nowrap;max-width:100%;';
  nameBadge.textContent = image.file.name;

  card.appendChild(thumbWrapper);
  card.appendChild(checkbox);
  card.appendChild(badge);
  card.appendChild(nameBadge);

  // Drag events
  card.addEventListener('dragstart', handleDragStart);
  card.addEventListener('dragend', handleDragEnd);
  card.addEventListener('dragover', handleDragOverCard);
  card.addEventListener('dragenter', handleDragEnterCard);
  card.addEventListener('dragleave', handleDragLeaveCard);
  card.addEventListener('drop', handleDropCard);

  // Click checkbox toggle
  card.addEventListener('click', (e) => {
    if (e.target !== checkbox) {
      checkbox.checked = !checkbox.checked;
      card.classList.toggle('page-card--selected', checkbox.checked);
    }
  });

  return card;
}

// === Drag & Drop Reordering ===
let draggedImageId = null;

function handleDragStart(e) {
  draggedImageId = e.currentTarget.dataset.id;
  e.currentTarget.classList.add('page-card--dragging');
  e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
  e.currentTarget.classList.remove('page-card--dragging');
  draggedImageId = null;
  imagesGrid.querySelectorAll('.page-card').forEach((c) => {
    c.classList.remove('page-card--drag-over');
  });
}

function handleDragOverCard(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function handleDragEnterCard(e) {
  e.preventDefault();
  if (e.currentTarget.dataset.id !== draggedImageId) {
    e.currentTarget.classList.add('page-card--drag-over');
  }
}

function handleDragLeaveCard(e) {
  e.currentTarget.classList.remove('page-card--drag-over');
}

function handleDropCard(e) {
  e.preventDefault();
  const targetId = e.currentTarget.dataset.id;

  if (draggedImageId && targetId !== draggedImageId) {
    const draggedIndex = images.findIndex((img) => img.id === draggedImageId);
    const targetIndex = images.findIndex((img) => img.id === targetId);

    if (draggedIndex >= 0 && targetIndex >= 0) {
      const [moved] = images.splice(draggedIndex, 1);
      images.splice(targetIndex, 0, moved);
      renderImages();
      announce('Image order changed');
    }
  }

  imagesGrid.querySelectorAll('.page-card').forEach((c) => {
    c.classList.remove('page-card--drag-over');
  });
}

// === Selection Controls ===
function selectAllImages() {
  const _cards = imagesGrid.querySelectorAll('.page-card');
  const checkboxes = imagesGrid.querySelectorAll('.page-card__checkbox');
  checkboxes.forEach((cb) => {
    cb.checked = true;
    cb.closest('.page-card').classList.add('page-card--selected');
  });
  announce('All images selected');
}

function deselectAllImages() {
  const _cards = imagesGrid.querySelectorAll('.page-card');
  const checkboxes = imagesGrid.querySelectorAll('.page-card__checkbox');
  checkboxes.forEach((cb) => {
    cb.checked = false;
    cb.closest('.page-card').classList.remove('page-card--selected');
  });
  announce('All images deselected');
}

// === UI Updates ===
function updateFilename() {
  filenameEl.textContent = `${images.length} image${images.length > 1 ? 's' : ''}`;
}

function updateConvertButton() {
  const selectedCount = images.filter((img) =>
    imagesGrid.querySelector(`[data-id="${img.id}"]`).classList.contains('page-card--selected'),
  ).length;
  btnConvert.disabled = selectedCount === 0;
}

function updateControlsVisibility() {
  // Show/hide based on format selection
  const _isFitMode = currentFormat === 'fit';
  // For now, all controls remain visible
}

function announce(message) {
  srLive.textContent = message;
}

function resetAll() {
  images = [];
  imagesGrid.innerHTML = '';
  workspace.hidden = true;
  progressContainer.hidden = true;
  resultInfo.hidden = true;
  btnDownload.hidden = true;
  btnConvert.hidden = false;
  fileInput.value = '';
  announce('Reset complete');
}

// === PDF Conversion ===
async function convertToPdf() {
  const selectedImages = images.filter((img) => {
    const card = imagesGrid.querySelector(`[data-id="${img.id}"]`);
    return card.classList.contains('page-card--selected');
  });

  if (selectedImages.length === 0) return;

  btnConvert.disabled = true;
  progressContainer.hidden = false;
  progressFill.style.width = '0%';
  progressPercent.textContent = '0%';
  resultInfo.hidden = true;
  btnDownload.hidden = true;

  try {
    const pdfDoc = await PDFDocument.create();
    const quality = currentQuality === 'low' ? 0.5 : currentQuality === 'medium' ? 0.8 : 0.95;

    for (let i = 0; i < selectedImages.length; i++) {
      const image = selectedImages[i];
      progressText.textContent = t('progress.processing', {
        current: i + 1,
        total: selectedImages.length,
      });
      const percent = Math.round(((i + 1) / selectedImages.length) * 100);
      progressFill.style.width = `${percent}%`;
      progressPercent.textContent = `${percent}%`;

      let jpgBytes, pngBytes;

      if (image.file.type === 'image/jpeg') {
        // Read JPEG directly
        const arrayBuffer = await image.file.arrayBuffer();
        jpgBytes = new Uint8Array(arrayBuffer);
      } else if (image.file.type === 'image/png') {
        const arrayBuffer = await image.file.arrayBuffer();
        pngBytes = new Uint8Array(arrayBuffer);
      } else {
        // WebP or other → convert to JPEG
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const img = new Image();
        await new Promise((r) => {
          img.onload = r;
          img.onerror = r;
          img.src = image.thumbnail.replace(/data:[^;]+;base64,/, 'data:image/jpeg;base64,');
        });
        ctx.drawImage(img, 0, 0);
        const jpegDataUrl = await new Promise((resolve) => {
          canvas.toBlob(
            (blob) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result);
              reader.readAsDataURL(blob);
            },
            'image/jpeg',
            quality,
          );
        });
        const base64 = jpegDataUrl.split(',')[1];
        jpgBytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
      }

      // Embed image
      let embeddedImage;
      if (jpgBytes) {
        embeddedImage = await pdfDoc.embedJpg(jpgBytes);
      } else {
        embeddedImage = await pdfDoc.embedPng(pngBytes);
      }

      // Calculate dimensions
      let pageWidth, pageHeight;
      const marginPts = (currentMargin * 72) / 25.4; // Convert mm to points

      if (currentFormat === 'fit') {
        // Fit mode: page = image size + margin
        pageWidth = embeddedImage.width + marginPts * 2;
        pageHeight = embeddedImage.height + marginPts * 2;
      } else if (currentFormat === 'a4') {
        // A4: 210 × 297 mm
        pageWidth = (210 * 72) / 25.4;
        pageHeight = (297 * 72) / 25.4;
        if (currentOrientation === 'landscape') [pageWidth, pageHeight] = [pageHeight, pageWidth];
      } else {
        // US Letter: 8.5 × 11 inches
        pageWidth = 612;
        pageHeight = 792;
        if (currentOrientation === 'landscape') [pageWidth, pageHeight] = [pageHeight, pageWidth];
      }

      // Create page
      const page = pdfDoc.addPage([pageWidth, pageHeight]);
      const { width: imgW, height: imgH } = embeddedImage;

      // Center image on page
      const _x = marginPts;
      const _y = marginPts;
      const scaledW = currentFormat === 'fit' ? imgW : Math.min(imgW, pageWidth - marginPts * 2);
      const scaledH = currentFormat === 'fit' ? imgH : Math.min(imgH, pageHeight - marginPts * 2);
      const centerX = (pageWidth - scaledW) / 2;
      const centerY = (pageHeight - scaledH) / 2;

      page.drawImage(embeddedImage, {
        x: centerX,
        y: centerY,
        width: scaledW,
        height: scaledH,
      });
    }

    progressText.textContent = t('progress.finalizing');
    const pdfBytes = await pdfDoc.save();

    // Store PDF for download
    window.currentPdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    progressFill.style.width = '100%';
    progressPercent.textContent = '100%';
    resultInfo.hidden = false;
    btnConvert.hidden = true;
    btnDownload.hidden = false;
    announce(t('progress.completed'));
  } catch (err) {
    console.error('PDF creation failed:', err);
    progressText.textContent = t('error.failed');
    resultInfo.querySelector('.result-label').textContent = t('error.pdfCreation');
    resultInfo.style.background = 'rgba(232, 69, 69, 0.1)';
    resultInfo.style.borderColor = 'var(--danger)';
    resultInfo.hidden = false;
  } finally {
    btnConvert.disabled = false;
  }
}

async function downloadPdf() {
  if (!window.currentPdfBlob) return;

  const url = URL.createObjectURL(window.currentPdfBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `images-${new Date().toISOString().slice(0, 10)}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  announce(t('btn.downloadStarted'));
}

// Start
init();
