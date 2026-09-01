/**
 * i18n - Internationalization module
 * 7 languages: EN, FR, DE, ES, PT, NL, IT
 */

export const STORAGE_KEY = 'images2pdf_lang';

export const LANGUAGES = {
  en: { code: 'en', name: 'English' },
  fr: { code: 'fr', name: 'Français' },
  de: { code: 'de', name: 'Deutsch' },
  es: { code: 'es', name: 'Español' },
  pt: { code: 'pt', name: 'Português' },
  nl: { code: 'nl', name: 'Nederlands' },
  it: { code: 'it', name: 'Italiano' },
};

export const TRANSLATIONS = {
  en: {
    'app.title': 'Images to PDF — Convert photos into a PDF',
    'app.tagline': 'Combine multiple images into a single PDF document',
    'privacy.badge': '🔒 100% local — your files never leave your browser',
    'dropzone.title': 'Drop images here',
    'dropzone.subtitle': 'or click to browse',
    'dropzone.accept': 'PNG, JPEG, WebP, GIF supported',
    'dropzone.multi': 'You can select multiple files',
    'controls.format': 'Page Format',
    'format.a4': 'A4',
    'format.a4Desc': '210 × 297 mm',
    'format.letter': 'Letter',
    'format.letterDesc': '8.5 × 11 inches',
    'format.fit': 'Fit to Image',
    'format.fitDesc': 'Auto-size to image dimensions',
    'controls.orientation': 'Orientation',
    'orientation.portrait': 'Portrait',
    'orientation.landscape': 'Landscape',
    'controls.margin': 'Margin (mm)',
    'controls.quality': 'Image Quality',
    'quality.high': 'High (100%)',
    'quality.medium': 'Medium (80%)',
    'quality.low': 'Low (50%)',
    'pages.order': 'Drag to reorder pages',
    'selection.all': 'Select All',
    'selection.none': 'Deselect All',
    'alerts.noFiles': 'No images selected',
    'alerts.tooFew': 'Please select at least one image',
    'alerts.invalidType': 'Please select valid image files (PNG, JPEG, WebP)',
    'alerts.error': 'Error: {msg}',
    'alerts.success': '{count} images converted successfully',
    'progress.converting': 'Converting images...',
    'progress.image': 'Processing {current} of {total}',
    'progress.finalizing': 'Finalizing PDF...',
    'result.pdfCreated': 'PDF created!',
    'result.imageCount': '{count} images → 1 PDF',
    'btn.convert': 'Convert to PDF',
    'btn.download': 'Download PDF',
    'btn.reset': 'Reset',
    'btn.selectFile': 'Select Files',
    'btn.addMore': 'Add more',
    'btn.selectAll': 'Select all',
    'btn.deselectAll': 'Deselect all',
    'label.language': 'Language',
    'header.tagline': 'Combine images into a PDF in your browser',
    'controls.action': 'Action',
    'controls.images': 'Images to include',
    'images.all': 'All images',
    'images.custom': 'Selected only',
    'result.ready': 'PDF ready to download',
    'privacy.link': 'View on GitHub',
    'footer.bmc': 'Buy me a coffee',
  },
  fr: {
    'app.title': 'Images vers PDF — Convertir des photos en PDF',
    'app.tagline': 'Regroupez plusieurs images en un seul document PDF',
    'privacy.badge': '🔒 100% local — vos fichiers ne quittent jamais votre navigateur',
    'dropzone.title': 'Déposez vos images ici',
    'dropzone.subtitle': 'ou cliquez pour parcourir',
    'dropzone.accept': 'PNG, JPEG, WebP, GIF supportés',
    'dropzone.multi': 'Vous pouvez sélectionner plusieurs fichiers',
    'controls.format': 'Format de page',
    'format.a4': 'A4',
    'format.a4Desc': '210 × 297 mm',
    'format.letter': 'Lettre',
    'format.letterDesc': '8.5 × 11 pouces',
    'format.fit': "Adapter à l'image",
    'format.fitDesc': "Dimension automatique selon l'image",
    'controls.orientation': 'Orientation',
    'orientation.portrait': 'Portrait',
    'orientation.landscape': 'Paysage',
    'controls.margin': 'Marge (mm)',
    'controls.quality': "Qualité de l'image",
    'quality.high': 'Haute (100%)',
    'quality.medium': 'Moyenne (80%)',
    'quality.low': 'Basse (50%)',
    'pages.order': 'Glissez pour réorganiser les pages',
    'selection.all': 'Tout sélectionner',
    'selection.none': 'Tout dé sélectionner',
    'alerts.noFiles': 'Aucune image sélectionnée',
    'alerts.tooFew': 'Veuillez sélectionner au moins une image',
    'alerts.invalidType': 'Veuillez sélectionner des fichiers image valides (PNG, JPEG, WebP)',
    'alerts.error': 'Erreur : {msg}',
    'alerts.success': '{count} images converties avec succès',
    'progress.converting': 'Conversion des images...',
    'progress.image': 'Traitement {current} sur {total}',
    'progress.finalizing': 'Finalisation du PDF...',
    'result.pdfCreated': 'PDF créé !',
    'result.imageCount': '{count} images → 1 PDF',
    'btn.convert': 'Convertir en PDF',
    'btn.download': 'Télécharger le PDF',
    'btn.reset': 'Réinitialiser',
    'btn.selectFile': 'Sélectionner des fichiers',
    'btn.addMore': 'Ajouter',
    'btn.selectAll': 'Tout sélectionner',
    'btn.deselectAll': 'Tout désélectionner',
    'label.language': 'Langue',
    'header.tagline': 'Combinez vos images en un PDF dans votre navigateur',
    'controls.action': 'Action',
    'controls.images': 'Images à inclure',
    'images.all': 'Toutes les images',
    'images.custom': 'Sélectionnées uniquement',
    'result.ready': 'PDF prêt à télécharger',
    'privacy.link': 'Voir sur GitHub',
    'footer.bmc': 'Achetez-moi un café',
  },
  de: {
    'app.title': 'Bilder zu PDF — Fotos in PDF konvertieren',
    'app.tagline': 'Mehrere Bilder zu einem einzigen PDF-Dokument kombinieren',
    'privacy.badge': '🔒 100% lokal — Ihre Dateien verlassen nie den Browser',
    'dropzone.title': 'Bilder hier ablegen',
    'dropzone.subtitle': 'oder klicken zum Durchsuchen',
    'dropzone.accept': 'PNG, JPEG, WebP, GIF unterstützt',
    'dropzone.multi': 'Sie können mehrere Dateien auswählen',
    'controls.format': 'Seitenformat',
    'format.a4': 'A4',
    'format.a4Desc': '210 × 297 mm',
    'format.letter': 'Letter',
    'format.letterDesc': '8.5 × 11 Zoll',
    'format.fit': 'An Bild anpassen',
    'format.fitDesc': 'Automatische Größe nach Bildabmessungen',
    'controls.orientation': 'Ausrichtung',
    'orientation.portrait': 'Hochformat',
    'orientation.landscape': 'Querformat',
    'controls.margin': 'Rand (mm)',
    'controls.quality': 'Bildqualität',
    'quality.high': 'Hoch (100%)',
    'quality.medium': 'Mittel (80%)',
    'quality.low': 'Niedrig (50%)',
    'pages.order': 'Ziehen Sie zum Neuordnen der Seiten',
    'selection.all': 'Alle auswählen',
    'selection.none': 'Alle abwählen',
    'alerts.noFiles': 'Keine Bilder ausgewählt',
    'alerts.tooFew': 'Bitte wählen Sie mindestens ein Bild aus',
    'alerts.invalidType': 'Bitte wählen Sie gültige Bilddateien (PNG, JPEG, WebP)',
    'alerts.error': 'Fehler: {msg}',
    'alerts.success': '{count} Bilder erfolgreich konvertiert',
    'progress.converting': 'Bilder werden konvertiert...',
    'progress.image': 'Verarbeitung {current} von {total}',
    'progress.finalizing': 'PDF wird finalisiert...',
    'result.pdfCreated': 'PDF erstellt!',
    'result.imageCount': '{count} Bilder → 1 PDF',
    'btn.convert': 'In PDF konvertieren',
    'btn.download': 'PDF herunterladen',
    'btn.reset': 'Zurücksetzen',
    'btn.selectFile': 'Dateien auswählen',
    'btn.addMore': 'Hinzufügen',
    'btn.selectAll': 'Alle auswählen',
    'btn.deselectAll': 'Alle abwählen',
    'label.language': 'Sprache',
    'header.tagline': 'Kombinieren Sie Bilder zu einem PDF in Ihrem Browser',
    'controls.action': 'Aktion',
    'controls.images': 'Einzubindende Bilder',
    'images.all': 'Alle Bilder',
    'images.custom': 'Nur ausgewählte',
    'result.ready': 'PDF bereit zum Herunterladen',
    'privacy.link': 'Auf GitHub ansehen',
    'footer.bmc': 'Kauf mir einen Kaffee',
  },
  es: {
    'app.title': 'Imágenes a PDF — Convertir fotos en PDF',
    'app.tagline': 'Combine múltiples imágenes en un solo documento PDF',
    'privacy.badge': '🔒 100% local — tus archivos nunca salen del navegador',
    'dropzone.title': 'Suelte las imágenes aquí',
    'dropzone.subtitle': 'o haga clic para buscar',
    'dropzone.accept': 'PNG, JPEG, WebP, GIF admitidos',
    'dropzone.multi': 'Puede seleccionar varios archivos',
    'controls.format': 'Formato de página',
    'format.a4': 'A4',
    'format.a4Desc': '210 × 297 mm',
    'format.letter': 'Carta',
    'format.letterDesc': '8.5 × 11 pulgadas',
    'format.fit': 'Ajustar a imagen',
    'format.fitDesc': 'Ajuste automático a las dimensiones de la imagen',
    'controls.orientation': 'Orientación',
    'orientation.portrait': 'Retrato',
    'orientation.landscape': 'Apaisado',
    'controls.margin': 'Margen (mm)',
    'controls.quality': 'Calidad de imagen',
    'quality.high': 'Alta (100%)',
    'quality.medium': 'Media (80%)',
    'quality.low': 'Baja (50%)',
    'pages.order': 'Arrastre para reordenar páginas',
    'selection.all': 'Seleccionar todo',
    'selection.none': 'Deseleccionar todo',
    'alerts.noFiles': 'No se han seleccionado imágenes',
    'alerts.tooFew': 'Por favor, seleccione al menos una imagen',
    'alerts.invalidType': 'Por favor, seleccione archivos de imagen válidos (PNG, JPEG, WebP)',
    'alerts.error': 'Error: {msg}',
    'alerts.success': '{count} imágenes convertidas correctamente',
    'progress.converting': 'Convirtiendo imágenes...',
    'progress.image': 'Procesando {current} de {total}',
    'progress.finalizing': 'Finalizando PDF...',
    'result.pdfCreated': '¡PDF creado!',
    'result.imageCount': '{count} imágenes → 1 PDF',
    'btn.convert': 'Convertir a PDF',
    'btn.download': 'Descargar PDF',
    'btn.reset': 'Restablecer',
    'btn.selectFile': 'Seleccionar archivos',
    'btn.addMore': 'Añadir más',
    'btn.selectAll': 'Seleccionar todo',
    'btn.deselectAll': 'Deseleccionar todo',
    'label.language': 'Idioma',
    'header.tagline': 'Combine imágenes en un PDF en su navegador',
    'controls.action': 'Acción',
    'controls.images': 'Imágenes a incluir',
    'images.all': 'Todas las imágenes',
    'images.custom': 'Solo seleccionadas',
    'result.ready': 'PDF listo para descargar',
    'privacy.link': 'Ver en GitHub',
    'footer.bmc': 'Cómprame un café',
  },
  pt: {
    'app.title': 'Imagens para PDF — Converter fotos em PDF',
    'app.tagline': 'Combine várias imagens em um único documento PDF',
    'privacy.badge': '🔒 100% local — seus arquivos nunca saem do navegador',
    'dropzone.title': 'Solte as imagens aqui',
    'dropzone.subtitle': 'ou clique para procurar',
    'dropzone.accept': 'PNG, JPEG, WebP, GIF suportados',
    'dropzone.multi': 'Você pode selecionar vários arquivos',
    'controls.format': 'Formato de página',
    'format.a4': 'A4',
    'format.a4Desc': '210 × 297 mm',
    'format.letter': 'Carta',
    'format.letterDesc': '8.5 × 11 polegadas',
    'format.fit': 'Ajustar à imagem',
    'format.fitDesc': 'Tamanho automático conforme dimensões da imagem',
    'controls.orientation': 'Orientação',
    'orientation.portrait': 'Retrato',
    'orientation.landscape': 'Paisagem',
    'controls.margin': 'Margem (mm)',
    'controls.quality': 'Qualidade da imagem',
    'quality.high': 'Alta (100%)',
    'quality.medium': 'Média (80%)',
    'quality.low': 'Baixa (50%)',
    'pages.order': 'Arraste para reorganizar as páginas',
    'selection.all': 'Selecionar tudo',
    'selection.none': 'Desmarcar tudo',
    'alerts.noFiles': 'Nenhuma imagem selecionada',
    'alerts.tooFew': 'Por favor, selecione pelo menos uma imagem',
    'alerts.invalidType': 'Por favor, selecione arquivos de imagem válidos (PNG, JPEG, WebP)',
    'alerts.error': 'Erro: {msg}',
    'alerts.success': '{count} imagens convertidas com sucesso',
    'progress.converting': 'Convertendo imagens...',
    'progress.image': 'Processando {current} de {total}',
    'progress.finalizing': 'Finalizando PDF...',
    'result.pdfCreated': 'PDF criado!',
    'result.imageCount': '{count} imagens → 1 PDF',
    'btn.convert': 'Converter em PDF',
    'btn.download': 'Baixar PDF',
    'btn.reset': 'Redefinir',
    'btn.selectFile': 'Selecionar arquivos',
    'btn.addMore': 'Adicionar mais',
    'btn.selectAll': 'Selecionar tudo',
    'btn.deselectAll': 'Desmarcar tudo',
    'label.language': 'Idioma',
    'header.tagline': 'Combine imagens em um PDF no seu navegador',
    'controls.action': 'Ação',
    'controls.images': 'Imagens para incluir',
    'images.all': 'Todas as imagens',
    'images.custom': 'Apenas selecionadas',
    'result.ready': 'PDF pronto para baixar',
    'privacy.link': 'Ver no GitHub',
    'footer.bmc': 'Me pague um café',
  },
  nl: {
    'app.title': "Afbeeldingen naar PDF — Foto's omzetten naar PDF",
    'app.tagline': 'Meerdere afbeeldingen combineren in één PDF-document',
    'privacy.badge': '🔒 100% lokaal — uw bestanden verlaten nooit uw browser',
    'dropzone.title': 'Sleep afbeeldingen hierheen',
    'dropzone.subtitle': 'of klik om te bladeren',
    'dropzone.accept': 'PNG, JPEG, WebP, GIF ondersteund',
    'dropzone.multi': 'U kunt meerdere bestanden selecteren',
    'controls.format': 'Paginaformaat',
    'format.a4': 'A4',
    'format.a4Desc': '210 × 297 mm',
    'format.letter': 'Letter',
    'format.letterDesc': '8.5 × 11 inch',
    'format.fit': 'Passen bij afbeelding',
    'format.fitDesc': 'Automatische grootte volgens afmetingen van de afbeelding',
    'controls.orientation': 'Oriëntatie',
    'orientation.portrait': 'Staand',
    'orientation.landscape': 'Liggend',
    'controls.margin': 'Marge (mm)',
    'controls.quality': 'Afbeeldingskwaliteit',
    'quality.high': 'Hoog (100%)',
    'quality.medium': 'Middel (80%)',
    'quality.low': 'Laag (50%)',
    'pages.order': "Sleep om pagina's te herschikken",
    'selection.all': 'Alles selecteren',
    'selection.none': 'Alles deselecteren',
    'alerts.noFiles': 'Geen afbeeldingen geselecteerd',
    'alerts.tooFew': 'Selecteer minimaal één afbeelding',
    'alerts.invalidType': 'Selecteer geldige afbeeldingsbestanden (PNG, JPEG, WebP)',
    'alerts.error': 'Fout: {msg}',
    'alerts.success': '{count} afbeeldingen succesvol geconverteerd',
    'progress.converting': 'Afbeeldingen converteren...',
    'progress.image': 'Verwerken {current} van {total}',
    'progress.finalizing': 'PDF wordt afgerond...',
    'result.pdfCreated': 'PDF gemaakt!',
    'result.imageCount': '{count} afbeeldingen → 1 PDF',
    'btn.convert': 'Converteren naar PDF',
    'btn.download': 'PDF downloaden',
    'btn.reset': 'Reset',
    'btn.selectFile': 'Bestanden selecteren',
    'btn.addMore': 'Meer toevoegen',
    'btn.selectAll': 'Alles selecteren',
    'btn.deselectAll': 'Alles deselecteren',
    'label.language': 'Taal',
    'header.tagline': 'Combineer afbeeldingen tot een PDF in uw browser',
    'controls.action': 'Actie',
    'controls.images': 'Op te nemen afbeeldingen',
    'images.all': 'Alle afbeeldingen',
    'images.custom': 'Alleen geselecteerde',
    'result.ready': 'PDF klaar om te downloaden',
    'privacy.link': 'Bekijk op GitHub',
    'footer.bmc': 'Koop een koffie voor me',
  },
  it: {
    'app.title': 'Immagini in PDF — Convertire foto in PDF',
    'app.tagline': 'Combina più immagini in un singolo documento PDF',
    'privacy.badge': '🔒 100% locale — i tuoi file non lasciano mai il browser',
    'dropzone.title': 'Rilascia le immagini qui',
    'dropzone.subtitle': 'o clicca per sfogliare',
    'dropzone.accept': 'PNG, JPEG, WebP, GIF supportati',
    'dropzone.multi': 'Puoi selezionare più file',
    'controls.format': 'Formato pagina',
    'format.a4': 'A4',
    'format.a4Desc': '210 × 297 mm',
    'format.letter': 'Letter',
    'format.letterDesc': '8.5 × 11 pollici',
    'format.fit': "Adatta all'immagine",
    'format.fitDesc': "Dimensione automatica in base alle dimensioni dell'immagine",
    'controls.orientation': 'Orientamento',
    'orientation.portrait': 'Verticale',
    'orientation.landscape': 'Orizzontale',
    'controls.margin': 'Margine (mm)',
    'controls.quality': 'Qualità immagine',
    'quality.high': 'Alta (100%)',
    'quality.medium': 'Media (80%)',
    'quality.low': 'Bassa (50%)',
    'pages.order': 'Trascina per riordinare le pagine',
    'selection.all': 'Seleziona tutto',
    'selection.none': 'Deseleziona tutto',
    'alerts.noFiles': 'Nessuna immagine selezionata',
    'alerts.tooFew': "Seleziona almeno un'immagine",
    'alerts.invalidType': 'Seleziona file immagine validi (PNG, JPEG, WebP)',
    'alerts.error': 'Errore: {msg}',
    'alerts.success': '{count} immagini convertite con successo',
    'progress.converting': 'Conversione delle immagini...',
    'progress.image': 'Elaborazione {current} su {total}',
    'progress.finalizing': 'Finalizzazione del PDF...',
    'result.pdfCreated': 'PDF creato!',
    'result.imageCount': '{count} immagini → 1 PDF',
    'btn.convert': 'Converti in PDF',
    'btn.download': 'Scarica PDF',
    'btn.reset': 'Ripristina',
    'btn.selectFile': 'Seleziona file',
    'btn.addMore': 'Aggiungi altro',
    'btn.selectAll': 'Seleziona tutto',
    'btn.deselectAll': 'Deseleziona tutto',
    'label.language': 'Lingua',
    'header.tagline': 'Combina immagini in un PDF nel tuo browser',
    'controls.action': 'Azione',
    'controls.images': 'Immagini da includere',
    'images.all': 'Tutte le immagini',
    'images.custom': 'Solo selezionate',
    'result.ready': 'PDF pronto per il download',
    'privacy.link': 'Vedi su GitHub',
    'footer.bmc': 'Offrimi un caffè',
  },
};

let currentLang = 'en';

/**
 * Get current language code
 */
export function getCurrentLanguage() {
  return currentLang;
}

/**
 * Initialize i18n system
 */
export function initI18n() {
  const savedLang = localStorage.getItem(STORAGE_KEY);
  if (savedLang && TRANSLATIONS[savedLang]) {
    currentLang = savedLang;
  }
  applyTranslations();
}

/**
 * Set language and persist
 */
export function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (_e) {
    // localStorage unavailable
  }
  applyTranslations();
}

/**
 * Apply translations to DOM
 */
export function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (TRANSLATIONS[currentLang][key]) {
      el.textContent = TRANSLATIONS[currentLang][key];
    }
  });

  document.documentElement.lang = currentLang;
}

/**
 * Translation helper with param substitution
 */
export function t(key, params = {}) {
  let str = TRANSLATIONS[currentLang]?.[key] ?? TRANSLATIONS.en[key] ?? key;
  for (const [param, value] of Object.entries(params)) {
    str = str.replace(`{${param}}`, String(value));
  }
  return str;
}

/**
 * Create a language selector dropdown
 */
export function createLanguageSelector(container) {
  const select = document.createElement('select');
  select.setAttribute('aria-label', t('label.language'));

  for (const [code, { name }] of Object.entries(LANGUAGES)) {
    const opt = document.createElement('option');
    opt.value = code;
    opt.textContent = name;
    if (code === currentLang) opt.selected = true;
    select.appendChild(opt);
  }

  select.addEventListener('change', () => setLanguage(select.value));

  if (container) {
    container.appendChild(select);
  }

  return select;
}
