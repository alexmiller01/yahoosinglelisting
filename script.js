/**
 * Supertop Search Results Prototype
 * Interactive behaviors for Yahoo Search local business results
 */

document.addEventListener('DOMContentLoaded', () => {
  initializeSearchField();
  initializeTabs();
  initializeExpandableOverview();
  initializeGallery();
  initializeActionButtons();
  initializeRatingBars();
  initializeHereMap();
});

/**
 * HERE Maps Integration
 */
function initializeHereMap() {
  const mapContainer = document.getElementById('here-map');
  
  if (!mapContainer || typeof H === 'undefined') {
    console.warn('HERE Maps SDK not loaded or map container not found');
    return;
  }
  
  const platform = new H.service.Platform({
    apikey: 'CJQ-lNVWhFhWMO8mTrCJ-SAPvK4Cv3dsfs3VqONzJpo'
  });
  
  const defaultLayers = platform.createDefaultLayers();
  
  const map = new H.Map(
    mapContainer,
    defaultLayers.vector.normal.map,
    {
      center: { lat: 40.7291, lng: -73.9542 },
      zoom: 15,
      pixelRatio: window.devicePixelRatio || 1
    }
  );
  
  // Add custom marker for Eavesdrop location
  const iconElement = document.createElement('div');
  iconElement.innerHTML = `<img src="Default-pin.svg" width="22" height="37" style="transform: translate(-50%, -100%);" />`;
  const domIcon = new H.map.DomIcon(iconElement);
  const marker = new H.map.DomMarker({ lat: 40.7291, lng: -73.9542 }, { icon: domIcon });
  map.addObject(marker);
  
  // Hide HERE branding
  const style = document.createElement('style');
  style.textContent = `
    #here-map .H_logo,
    #here-map .H_copyright {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
  
  // Add custom info icon
  const infoIcon = document.createElement('div');
  infoIcon.className = 'map-info-icon';
  infoIcon.innerHTML = `
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="5" stroke="#666" stroke-width="1.5" fill="none"/>
      <path d="M6 5.5V8.5" stroke="#666" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="6" cy="3.5" r="0.75" fill="#666"/>
    </svg>
  `;
  mapContainer.appendChild(infoIcon);
}

/**
 * Search Field Interactions
 */
function initializeSearchField() {
  const searchInput = document.querySelector('.search-input');
  const searchField = document.querySelector('.search-field');
  const searchIcons = document.querySelector('.search-icons');
  
  if (!searchInput || !searchField || !searchIcons) return;
  
  // Clear button functionality
  const clearBtn = document.createElement('button');
  clearBtn.className = 'icon-btn search-icon-btn clear-btn';
  clearBtn.setAttribute('aria-label', 'Clear search');
  clearBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" fill="#e3e3e3"/>
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#666" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `;
  clearBtn.style.display = searchInput.value ? 'flex' : 'none';
  
  searchIcons.insertBefore(clearBtn, searchIcons.firstChild);
  
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    searchInput.focus();
  });
  
  searchInput.addEventListener('input', () => {
    clearBtn.style.display = searchInput.value ? 'flex' : 'none';
  });
  
  // Submit on Enter
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      showToast(`Searching for "${searchInput.value}"...`);
    }
  });
}

/**
 * Tab Navigation
 */
function initializeTabs() {
  const tabs = document.querySelectorAll('.tab');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Visual feedback
      tab.style.transform = 'scale(0.95)';
      setTimeout(() => {
        tab.style.transform = '';
      }, 100);
    });
  });
}

/**
 * Expandable Overview Section
 */
function initializeExpandableOverview() {
  const expandBtn = document.querySelector('.expand-btn');
  const overviewText = document.querySelector('.overview-text');
  
  if (!expandBtn || !overviewText) return;
  
  let isExpanded = false;
  const fullText = `Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac tincidunt nisl consectetur. Maecenas volutpat blandit aliquam etiam erat velit scelerisque. Pretium lectus quam id leo in vitae turpis massa sed elementum. Eavesdrop is a listening bar and restaurant in Greenpoint, Brooklyn, featuring an exceptional vinyl collection, craft cocktails, and Japanese-inspired small plates. The space is designed for music appreciation with high-end audio equipment and a carefully curated atmosphere.`;
  
  const truncatedText = overviewText.textContent;
  
  expandBtn.addEventListener('click', () => {
    isExpanded = !isExpanded;
    
    if (isExpanded) {
      overviewText.textContent = fullText;
      expandBtn.style.transform = 'rotate(180deg)';
    } else {
      overviewText.textContent = truncatedText;
      expandBtn.style.transform = 'rotate(0deg)';
    }
  });
}

/**
 * Image Gallery Interactions
 */
function initializeGallery() {
  const galleryBtn = document.querySelector('.gallery-btn');
  const imageGallery = document.querySelector('.image-gallery');
  
  if (!imageGallery) return;
  
  // Click anywhere in image gallery to open modal
  imageGallery.addEventListener('click', () => {
    showGalleryModal();
  });
}

/**
 * Gallery Modal
 */
function showGalleryModal() {
  // Image data with categories
  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&h=600&fit=crop', category: 'atmosphere', author: 'Alex M.' },
    { src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop', category: 'food', author: 'Sarah K.' },
    { src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop', category: 'atmosphere', author: 'Mike R.' },
    { src: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&h=600&fit=crop', category: 'drink', author: 'Lisa T.' },
    { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop', category: 'food', author: 'John D.' },
    { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop', category: 'atmosphere', author: 'Emma W.' },
    { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop', category: 'food', author: 'Chris P.' },
    { src: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800&h=600&fit=crop', category: 'drink', author: 'Anna L.' },
    { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop', category: 'atmosphere', author: 'Tom B.' },
  ];
  
  const categories = [
    { id: 'all', label: 'All', count: galleryImages.length },
    { id: 'food', label: 'Food', count: galleryImages.filter(i => i.category === 'food').length },
    { id: 'drink', label: 'Drink', count: galleryImages.filter(i => i.category === 'drink').length },
    { id: 'atmosphere', label: 'Atmosphere', count: galleryImages.filter(i => i.category === 'atmosphere').length },
  ];
  
  let currentCategory = 'all';
  let currentIndex = 0;
  
  const getFilteredImages = () => {
    if (currentCategory === 'all') return galleryImages;
    return galleryImages.filter(img => img.category === currentCategory);
  };

  const modal = document.createElement('div');
  modal.className = 'gallery-modal';
  modal.innerHTML = `
    <div class="gallery-modal-backdrop"></div>
    <div class="gallery-modal-panel">
      <div class="gallery-modal-header">
        <div class="gallery-chips">
          ${categories.map(cat => `
            <button class="gallery-chip ${cat.id === 'all' ? 'active' : ''}" data-category="${cat.id}">
              ${cat.label} (${cat.count})
            </button>
          `).join('')}
        </div>
        <button class="gallery-modal-close" aria-label="Close gallery">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6l-12 12" stroke="#141414" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      <div class="gallery-modal-body">
        <div class="gallery-main-view">
          <div class="gallery-main-image-container">
            <button class="gallery-nav-btn prev" aria-label="Previous">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 4l-4 4 4 4" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
            <img class="gallery-main-image" src="${galleryImages[0].src}" alt="Gallery image" />
            <button class="gallery-nav-btn next" aria-label="Next">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          <div class="gallery-main-footer">
            <div class="gallery-author">
              <div class="gallery-author-avatar">${galleryImages[0].author.split(' ').map(n => n[0]).join('')}</div>
              <span class="gallery-author-name">${galleryImages[0].author} • 2 Days ago</span>
            </div>
            <a href="https://www.yelp.com/biz/eavesdrop-brooklyn" target="_blank" rel="noopener" class="gallery-yelp-link">
              View more photos on <span>Yelp.com</span>
            </a>
          </div>
        </div>
        <div class="gallery-thumbnails-container">
          <div class="gallery-thumbnails">
            ${galleryImages.map((img, idx) => `
              <div class="gallery-thumbnail ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                <img src="${img.src}" alt="Thumbnail ${idx + 1}" />
              </div>
            `).join('')}
          </div>
          <div class="gallery-scrollbar-track">
            <div class="gallery-scrollbar-thumb"></div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add modal styles
  const style = document.createElement('style');
  style.textContent = `
    .gallery-modal {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: galleryFadeIn 0.25s ease;
    }
    
    @keyframes galleryFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .gallery-modal-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(20, 20, 20, 0.5);
    }
    
    .gallery-modal-panel {
      position: relative;
      background: white;
      border-radius: 16px;
      width: 974px;
      max-width: 95vw;
      max-height: 90vh;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      overflow: hidden;
      animation: gallerySlideIn 0.3s ease;
    }
    
    @keyframes gallerySlideIn {
      from { 
        opacity: 0;
        transform: translateY(20px) scale(0.98);
      }
      to { 
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    .gallery-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .gallery-chips {
      display: flex;
      gap: 8px;
    }
    
    .gallery-chip {
      padding: 6px 12px;
      border-radius: 9999px;
      border: 1px solid #cdcdcd;
      background: white;
      font-size: 14px;
      font-weight: 450;
      color: #141414;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    
    .gallery-chip:hover {
      background: #f5f5f5;
    }
    
    .gallery-chip.active {
      background: #141414;
      color: white;
      border-color: #141414;
    }
    
    .gallery-modal-close {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      cursor: pointer;
      border-radius: 50%;
      transition: background 0.15s ease;
    }
    
    .gallery-modal-close:hover {
      background: #f5f5f5;
    }
    
    .gallery-modal-body {
      display: flex;
      gap: 20px;
      flex: 1;
      min-height: 0;
    }
    
    .gallery-main-view {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-width: 0;
    }
    
    .gallery-main-image-container {
      position: relative;
      flex: 1;
      border-radius: 16px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px;
      min-height: 394px;
    }
    
    .gallery-main-image {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 16px;
    }
    
    .gallery-nav-btn {
      position: relative;
      z-index: 1;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(31, 31, 31, 0.6);
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.15s ease;
    }
    
    .gallery-nav-btn:hover {
      background: rgba(31, 31, 31, 0.8);
    }
    
    .gallery-nav-btn.prev {
      opacity: 0;
    }
    
    .gallery-main-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .gallery-author {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .gallery-author-avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 500;
      color: #5a5a5a;
    }
    
    .gallery-author-name {
      font-size: 11px;
      color: #141414;
    }
    
    .gallery-yelp-link {
      font-size: 11px;
      color: #141414;
      text-decoration: none;
    }
    
    .gallery-yelp-link span {
      color: #444;
      text-decoration: underline;
    }
    
    .gallery-thumbnails-container {
      width: 310px;
      display: flex;
      gap: 4px;
      flex-shrink: 0;
    }
    
    .gallery-thumbnails {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: min-content;
      gap: 12px;
      max-height: 450px;
      overflow-y: auto;
      padding: 4px;
      padding-right: 8px;
      align-content: start;
    }
    
    .gallery-thumbnails::-webkit-scrollbar {
      display: none;
    }
    
    .gallery-thumbnail {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      cursor: pointer;
      transition: opacity 0.15s ease;
    }
    
    .gallery-thumbnail img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .gallery-thumbnail:hover {
      opacity: 0.85;
    }
    
    .gallery-thumbnail.active {
      outline: 2px solid #141414;
      outline-offset: 2px;
    }
    
    .gallery-scrollbar-track {
      width: 4px;
      background: #ffffff;
      border-radius: 9999px;
      height: 100%;
      max-height: 450px;
      flex-shrink: 0;
      position: relative;
      cursor: pointer;
    }
    
    .gallery-scrollbar-thumb {
      width: 4px;
      background: #E3E3E3;
      border-radius: 9999px;
      position: absolute;
      top: 0;
      left: 0;
      cursor: grab;
      transition: background 0.15s ease;
    }
    
    .gallery-scrollbar-thumb:hover {
      background: #CACACA;
    }
    
    .gallery-scrollbar-thumb.dragging {
      cursor: grabbing;
      background: #CACACA;
    }
    
    @media (max-width: 768px) {
      .gallery-modal-panel {
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        border-radius: 0;
      }
      
      .gallery-modal-body {
        flex-direction: column;
      }
      
      .gallery-thumbnails-container {
        width: 100%;
        max-height: 120px;
      }
      
      .gallery-thumbnails {
        display: flex;
        overflow-x: auto;
        gap: 12px;
      }
      
      .gallery-thumbnail {
        width: 80px;
        height: 80px;
        flex-shrink: 0;
      }
      
      .gallery-scrollbar-track {
        display: none;
      }
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  // Elements
  const closeBtn = modal.querySelector('.gallery-modal-close');
  const backdrop = modal.querySelector('.gallery-modal-backdrop');
  const mainImage = modal.querySelector('.gallery-main-image');
  const thumbnails = modal.querySelectorAll('.gallery-thumbnail');
  const chips = modal.querySelectorAll('.gallery-chip');
  const prevBtn = modal.querySelector('.prev');
  const nextBtn = modal.querySelector('.next');
  const authorAvatar = modal.querySelector('.gallery-author-avatar');
  const authorName = modal.querySelector('.gallery-author-name');
  
  // Update main image and author
  const updateMainImage = (index) => {
    const filtered = getFilteredImages();
    if (index < 0 || index >= filtered.length) return;
    
    currentIndex = index;
    const img = filtered[index];
    mainImage.src = img.src;
    authorAvatar.textContent = img.author.split(' ').map(n => n[0]).join('');
    authorName.textContent = `${img.author} • 2 Days ago`;
    
    // Update thumbnail active state
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
    
    // Show/hide prev button
    prevBtn.style.opacity = index === 0 ? '0' : '1';
    prevBtn.style.pointerEvents = index === 0 ? 'none' : 'auto';
  };
  
  // Filter by category
  const filterByCategory = (category) => {
    currentCategory = category;
    currentIndex = 0;
    
    chips.forEach(chip => {
      chip.classList.toggle('active', chip.dataset.category === category);
    });
    
    // Update thumbnails visibility
    thumbnails.forEach((thumb, i) => {
      const img = galleryImages[i];
      const show = category === 'all' || img.category === category;
      thumb.style.display = show ? 'block' : 'none';
    });
    
    updateMainImage(0);
    
    // Reset scroll and update scrollbar after filter
    setTimeout(() => {
      const thumbnailsContainer = document.querySelector('.gallery-thumbnails');
      if (thumbnailsContainer) {
        thumbnailsContainer.scrollTop = 0;
      }
    }, 50);
  };
  
  // Close modal
  const closeModal = () => {
    modal.style.animation = 'galleryFadeIn 0.2s ease reverse';
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = '';
    }, 200);
  };
  
  // Event listeners
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escHandler);
    }
  });
  
  thumbnails.forEach((thumb, i) => {
    thumb.addEventListener('click', () => updateMainImage(i));
  });
  
  // Scrollbar functionality
  const thumbnailsContainer = modal.querySelector('.gallery-thumbnails');
  const scrollbarTrack = modal.querySelector('.gallery-scrollbar-track');
  const scrollbarThumb = modal.querySelector('.gallery-scrollbar-thumb');
  
  const updateScrollbar = () => {
    const { scrollTop, scrollHeight, clientHeight } = thumbnailsContainer;
    const trackHeight = scrollbarTrack.clientHeight;
    const thumbHeight = Math.max(40, (clientHeight / scrollHeight) * trackHeight);
    const maxScroll = scrollHeight - clientHeight;
    const thumbTop = maxScroll > 0 ? (scrollTop / maxScroll) * (trackHeight - thumbHeight) : 0;
    
    scrollbarThumb.style.height = `${thumbHeight}px`;
    scrollbarThumb.style.top = `${thumbTop}px`;
  };
  
  // Initial scrollbar update
  setTimeout(updateScrollbar, 100);
  
  // Update on scroll
  thumbnailsContainer.addEventListener('scroll', updateScrollbar);
  
  // Drag scrollbar thumb
  let isDragging = false;
  let startY = 0;
  let startScrollTop = 0;
  
  scrollbarThumb.addEventListener('mousedown', (e) => {
    isDragging = true;
    startY = e.clientY;
    startScrollTop = thumbnailsContainer.scrollTop;
    scrollbarThumb.classList.add('dragging');
    e.preventDefault();
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const deltaY = e.clientY - startY;
    const trackHeight = scrollbarTrack.clientHeight;
    const thumbHeight = scrollbarThumb.clientHeight;
    const { scrollHeight, clientHeight } = thumbnailsContainer;
    const maxScroll = scrollHeight - clientHeight;
    const scrollRatio = deltaY / (trackHeight - thumbHeight);
    
    thumbnailsContainer.scrollTop = startScrollTop + scrollRatio * maxScroll;
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      scrollbarThumb.classList.remove('dragging');
    }
  });
  
  // Click on track to scroll
  scrollbarTrack.addEventListener('click', (e) => {
    if (e.target === scrollbarThumb) return;
    
    const trackRect = scrollbarTrack.getBoundingClientRect();
    const clickY = e.clientY - trackRect.top;
    const trackHeight = scrollbarTrack.clientHeight;
    const thumbHeight = scrollbarThumb.clientHeight;
    const { scrollHeight, clientHeight } = thumbnailsContainer;
    const maxScroll = scrollHeight - clientHeight;
    
    // Center thumb on click position
    const targetThumbTop = clickY - thumbHeight / 2;
    const scrollRatio = targetThumbTop / (trackHeight - thumbHeight);
    thumbnailsContainer.scrollTop = scrollRatio * maxScroll;
  });
  
  // Watch for layout changes (filtering) and update scrollbar
  const resizeObserver = new ResizeObserver(() => {
    updateScrollbar();
  });
  resizeObserver.observe(thumbnailsContainer);
  
  chips.forEach(chip => {
    chip.addEventListener('click', () => filterByCategory(chip.dataset.category));
  });
  
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) updateMainImage(currentIndex - 1);
  });
  
  nextBtn.addEventListener('click', () => {
    const filtered = getFilteredImages();
    if (currentIndex < filtered.length - 1) updateMainImage(currentIndex + 1);
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', function arrowHandler(e) {
    if (!document.body.contains(modal)) {
      document.removeEventListener('keydown', arrowHandler);
      return;
    }
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  });
}

/**
 * Action Buttons
 */
function initializeActionButtons() {
  const actionBtns = document.querySelectorAll('.action-btn');
  
  actionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Ripple effect
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = '50%';
      ripple.style.top = '50%';
      ripple.style.marginLeft = -size / 2 + 'px';
      ripple.style.marginTop = -size / 2 + 'px';
      
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
      
      // Show feedback toast
      showToast(`${btn.textContent.trim()} action triggered!`);
    });
  });
  
  // Add ripple animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

/**
 * Toast Notifications
 */
function showToast(message) {
  // Remove existing toasts
  document.querySelectorAll('.toast').forEach(t => t.remove());
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%) translateY(100%);
    background: #141414;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    z-index: 1000;
    animation: toastIn 0.3s ease forwards;
  `;
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes toastIn {
      to {
        transform: translateX(-50%) translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease forwards';
    const outStyle = document.createElement('style');
    outStyle.textContent = `
      @keyframes toastOut {
        to {
          transform: translateX(-50%) translateY(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(outStyle);
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

/**
 * Animated Rating Bars
 */
function initializeRatingBars() {
  const ratingBars = document.querySelectorAll('.bar-fill');
  
  // Intersection Observer for scroll animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
        
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });
  
  ratingBars.forEach(bar => observer.observe(bar));
}

/**
 * Star Button Toggle
 */
document.addEventListener('DOMContentLoaded', () => {
  const starBtn = document.querySelector('.star-btn');
  
  if (starBtn) {
    let isStarred = false;
    
    starBtn.addEventListener('click', () => {
      isStarred = !isStarred;
      const svg = starBtn.querySelector('svg path');
      
      if (isStarred) {
        svg.setAttribute('fill', '#ffa448');
        svg.setAttribute('stroke', '#ffa448');
        showToast('Saved to your collection!');
      } else {
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', '#5a5a5a');
        showToast('Removed from collection');
      }
    });
  }
});

/**
 * Hours Accordion
 */
document.addEventListener('DOMContentLoaded', () => {
  const hoursAccordion = document.querySelector('.hours-accordion-trigger');
  const hoursContent = document.querySelector('.hours-accordion-content');
  const hoursCardLink = document.querySelector('a.hours-card');
  
  if (hoursAccordion && hoursContent) {
    // Toggle accordion on click
    hoursAccordion.addEventListener('click', () => {
      toggleHoursAccordion();
    });
    
    // Check if URL hash is #hours-accordion on page load
    if (window.location.hash === '#hours-accordion') {
      expandAndCenterHoursAccordion();
    }
    
    // Intercept hours card link click for custom scroll behavior
    if (hoursCardLink) {
      hoursCardLink.addEventListener('click', (e) => {
        e.preventDefault();
        history.pushState(null, '', '#hours-accordion');
        expandAndCenterHoursAccordion();
      });
    }
  }
  
  function toggleHoursAccordion() {
    const isExpanded = hoursAccordion.classList.contains('expanded');
    
    if (isExpanded) {
      hoursAccordion.classList.remove('expanded');
      hoursContent.classList.remove('expanded');
    } else {
      hoursAccordion.classList.add('expanded');
      hoursContent.classList.add('expanded');
    }
  }
  
  function expandAndCenterHoursAccordion() {
    // Expand the accordion first
    hoursAccordion.classList.add('expanded');
    hoursContent.classList.add('expanded');
    
    // Wait for the accordion animation to complete, then center in viewport
    setTimeout(() => {
      // Get the combined height of accordion trigger + content
      const triggerRect = hoursAccordion.getBoundingClientRect();
      const contentRect = hoursContent.getBoundingClientRect();
      const totalHeight = triggerRect.height + contentRect.height;
      
      // Calculate the center position
      const viewportHeight = window.innerHeight;
      const targetY = triggerRect.top + window.scrollY - (viewportHeight / 2) + (totalHeight / 2);
      
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    }, 350); // Wait for accordion animation (300ms) + buffer
  }
});

/**
 * Reviews Anchor - Center in Viewport
 */
document.addEventListener('DOMContentLoaded', () => {
  const reviewsCardLink = document.querySelector('a.reviews-card');
  const reviewsSummary = document.getElementById('reviews-summary');
  
  if (reviewsCardLink && reviewsSummary) {
    reviewsCardLink.addEventListener('click', (e) => {
      e.preventDefault();
      history.pushState(null, '', '#reviews-summary');
      centerReviewsSummary();
    });
    
    // Check if URL hash is #reviews-summary on page load
    if (window.location.hash === '#reviews-summary') {
      centerReviewsSummary();
    }
    
    // Listen for hash changes
    window.addEventListener('hashchange', () => {
      if (window.location.hash === '#reviews-summary') {
        centerReviewsSummary();
      }
    });
  }
  
  function centerReviewsSummary() {
    const rect = reviewsSummary.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const elementHeight = rect.height;
    
    // Calculate position to center the element in viewport
    const targetY = rect.top + window.scrollY - (viewportHeight / 2) + (elementHeight / 2);
    
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  }
});

console.log('🎵 Supertop Search Results Prototype loaded');
