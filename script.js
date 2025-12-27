// Interactive Book Functionality
document.addEventListener("DOMContentLoaded", function () {
  // =====================
  // INTRODUCTION PAGE
  // =====================
  const introPage = document.getElementById("intro");
  const heroSection = document.getElementById("home");
  const exploreMoreBtn = document.getElementById("explore-more");

  // Handle explore more button
  if (exploreMoreBtn) {
    exploreMoreBtn.addEventListener("click", function() {
      // Smooth scroll to hero section with book
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
  const book = document.querySelector(".book-mockup");
  const pages = document.querySelectorAll(".book-page");
  const prevBtn = document.querySelector(".page-prev");
  const nextBtn = document.querySelector(".page-next");
  const pageIndicator = document.querySelector(".page-indicator");

  let currentPage = 0;
  const totalPages = pages.length;

  // Update page display
  function updateBook() {
    pages.forEach((page, index) => {
      page.classList.remove("active", "prev", "next");

      if (index === currentPage) {
        page.classList.add("active");
      } else if (index < currentPage) {
        page.classList.add("prev");
      } else {
        page.classList.add("next");
      }
    });

    // Update indicator
    if (pageIndicator) {
      pageIndicator.textContent = `${currentPage + 1} / ${totalPages}`;
    }

    // Update button states
    if (prevBtn) {
      prevBtn.style.opacity = currentPage === 0 ? "0.3" : "1";
      prevBtn.style.pointerEvents = currentPage === 0 ? "none" : "auto";
    }

    // Update next button state
    if (nextBtn) {
      if (currentPage === totalPages - 1) {
        nextBtn.style.opacity = "0.3";
        nextBtn.style.pointerEvents = "none";
      } else {
        nextBtn.style.opacity = "1";
        nextBtn.style.pointerEvents = "auto";
      }
    }
  }

  // Next page
  function nextPage() {
    if (currentPage < totalPages - 1) {
      currentPage++;
      updateBook();
    }
  }

  // Previous page
  function prevPage() {
    if (currentPage > 0) {
      currentPage--;
      updateBook();
    }
  }

  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener("click", nextPage);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", prevPage);
  }

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    // Only work if book is in viewport
    const bookRect = book.getBoundingClientRect();
    const isVisible = bookRect.top < window.innerHeight && bookRect.bottom > 0;

    if (isVisible) {
      if (e.key === "ArrowRight") {
        nextPage();
      } else if (e.key === "ArrowLeft") {
        prevPage();
      }
    }
  });

  // Swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  if (book) {
    book.addEventListener(
      "touchstart",
      function (e) {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    book.addEventListener(
      "touchend",
      function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      { passive: true }
    );
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next page
        nextPage();
      } else {
        // Swipe right - prev page
        prevPage();
      }
    }
  }

  // Initialize
  updateBook();

  // =====================
  // BUY BUTTON FUNCTIONALITY
  // =====================
  const buyButton = document.getElementById("go-to-buy-page");

  if (buyButton) {
    buyButton.addEventListener("click", function() {
      // Navigate to last page of the book
      currentPage = totalPages - 1;
      updateBook();

      // Scroll to book to show the buy page
      if (book) {
        book.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }

  // =====================
  // CATEGORIES POPUP
  // =====================
  const exploreBtn = document.getElementById("explore-btn");
  const popup = document.getElementById("categories-popup");
  const popupClose = document.getElementById("popup-close");
  const popupBuy = document.getElementById("popup-buy");
  const navCategoriesLink = document.querySelector('a[href="#categories"]');

  // Function to open popup
  function openPopup() {
    if (popup) {
      popup.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  // Function to close popup
  function closePopup() {
    if (popup) {
      popup.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // Open popup - explore button
  if (exploreBtn) {
    exploreBtn.addEventListener("click", openPopup);
  }

  // Open popup - nav categories link
  if (navCategoriesLink) {
    navCategoriesLink.addEventListener("click", function (e) {
      e.preventDefault();
      openPopup();
    });
  }

  // Close popup - close button
  if (popupClose) {
    popupClose.addEventListener("click", closePopup);
  }

  // Close popup - click outside
  if (popup) {
    popup.addEventListener("click", function (e) {
      if (e.target === popup) {
        closePopup();
      }
    });
  }

  // Close popup - ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && popup && popup.classList.contains("active")) {
      closePopup();
    }
  });

  // Close popup when clicking "Get The Book" and navigate to buy page
  if (popupBuy) {
    popupBuy.addEventListener("click", function() {
      closePopup();

      // Navigate to last page of the book
      currentPage = totalPages - 1;
      updateBook();

      // Scroll to book to show the buy page
      if (book) {
        book.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }

  // =====================
  // CATEGORY WIDGET SYSTEM
  // =====================

  // Product data
  const productData = {
    gaming: [
      { name: "Pokemon GO Plus Device", price: "$35.00", icon: "🎮", link: "https://www.amazon.com/dp/B01H482N6E" },
      { name: "Overwatch Collector's Edition", price: "$129.99", icon: "🕹️", link: "https://www.amazon.com/dp/B017L187LE" },
      { name: "Nintendo 3DS XL", price: "$199.99", icon: "📱", link: "https://www.amazon.com/dp/B01LYUA6OS" },
      { name: "VR Headset Starter Kit", price: "$399.00", icon: "🎯", link: "https://www.amazon.com/dp/B00Z7D174S" }
    ],
    tech: [
      { name: "iPhone 7 Wireless Headphones", price: "$159.00", icon: "📱", link: "https://www.amazon.com/dp/B01LXFKGBS" },
      { name: "Apple Watch Series 2", price: "$369.00", icon: "⌚", link: "https://www.amazon.com/dp/B01M0URIQJ" },
      { name: "MacBook Pro Touch Bar", price: "$1799.00", icon: "💻", link: "https://www.amazon.com/dp/B01LW0W4TW" },
      { name: "USB-C Hub Collection", price: "$49.99", icon: "🔌", link: "https://www.amazon.com/dp/B01MI0E3K8" }
    ],
    fashion: [
      { name: "Vintage Choker Collection", price: "$24.99", icon: "📿", link: "https://www.amazon.com/dp/B01N1UQQQJ" },
      { name: "Bomber Jacket Classic", price: "$89.00", icon: "🧥", link: "https://www.amazon.com/dp/B01M4I7L9D" },
      { name: "Athleisure Sneaker Set", price: "$119.99", icon: "👟", link: "https://www.amazon.com/dp/B01NALR6WR" },
      { name: "Mini Backpack Trend", price: "$54.00", icon: "👜", link: "https://www.amazon.com/dp/B01N9QKHKP" }
    ],
    music: [
      { name: "Drake Views Vinyl", price: "$34.99", icon: "🎧", link: "https://www.amazon.com/dp/B01F7HJZM2" },
      { name: "Chainsmokers Concert Tee", price: "$29.99", icon: "🔊", link: "https://www.amazon.com/dp/B01HRXJ2G8" },
      { name: "Beyoncé Lemonade Deluxe", price: "$39.99", icon: "🎵", link: "https://www.amazon.com/dp/B01EW8CGKW" },
      { name: "Portable Bluetooth Speaker", price: "$79.99", icon: "🎤", link: "https://www.amazon.com/dp/B01GE6M69Q" }
    ]
  };

  // Handle category name clicks (now works as filters)
  const categoryNames = document.querySelectorAll('.category-name');
  const productWidget = document.getElementById('product-widget');
  const widgetTitle = document.getElementById('widget-title');
  const widgetProducts = document.getElementById('widget-products');

  categoryNames.forEach(name => {
    name.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      if (category) {
        filterProducts(category, this);
      }
    });
  });

  // Filter products based on category
  function filterProducts(category, clickedElement) {
    // Update active state
    categoryNames.forEach(name => name.classList.remove('active'));
    clickedElement.classList.add('active');

    // Set widget title
    const titles = {
      all: 'All Products',
      gaming: 'Gaming Products',
      tech: 'Technology Products',
      fashion: 'Fashion Products',
      music: 'Music Products'
    };
    widgetTitle.textContent = titles[category];

    // Clear and populate products
    widgetProducts.innerHTML = '';
    widgetProducts.className = 'products-grid widget-products';

    // Get products to show
    let productsToShow = [];
    if (category === 'all') {
      // Show all products from all categories
      Object.keys(productData).forEach(cat => {
        productsToShow = [...productsToShow, ...productData[cat]];
      });
    } else {
      // Show products from specific category
      productsToShow = productData[category] || [];
    }

    // Create product cards
    productsToShow.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <div class="product-image">${product.icon}</div>
        <h3>${product.name}</h3>
        <p class="price">${product.price}</p>
        <a href="${product.link}" target="_blank" class="buy-widget">Buy on Amazon</a>
      `;
      widgetProducts.appendChild(productCard);
    });

    // Scroll to widget on first click
    if (category !== 'all') {
      productWidget.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Initialize with all products
  function initializeProducts() {
    const allButton = document.querySelector('.category-name[data-category="all"]');
    if (allButton) {
      filterProducts('all', allButton);
    }
  }

  // Initialize products on page load
  initializeProducts();

  // =====================
  // LEGACY CATEGORY NAVIGATION (for existing category pages)
  // =====================

  // Handle category card clicks in popup
  const categoryCards = document.querySelectorAll('.category-card');
  const categoryPages = document.querySelectorAll('.category-page');
  const categoriesSection = document.querySelector('.categories-section');

  categoryCards.forEach(card => {
    card.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      if (category) {
        showCategoryPage(category);
        closePopup();
      }
    });
  });

  // Show category page
  function showCategoryPage(category) {
    // Hide main sections
    if (introPage) introPage.style.display = 'none';
    if (heroSection) heroSection.style.display = 'none';
    if (categoriesSection) categoriesSection.style.display = 'none';

    // Hide all category pages
    categoryPages.forEach(page => {
      page.style.display = 'none';
    });

    // Show selected category page
    const targetPage = document.getElementById(category);
    if (targetPage) {
      targetPage.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Handle back to home buttons
  const backToHomeButtons = document.querySelectorAll('.back-to-home');
  backToHomeButtons.forEach(button => {
    button.addEventListener('click', function() {
      showHomePage();
    });
  });

  // Show home page
  function showHomePage() {
    // Hide all category pages
    categoryPages.forEach(page => {
      page.style.display = 'none';
    });

    // Show all main sections
    if (introPage) introPage.style.display = 'flex';
    if (heroSection) heroSection.style.display = 'flex';
    if (categoriesSection) categoriesSection.style.display = 'block';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // =====================
  // SMOOTH SCROLLING FOR ALL NAVIGATION LINKS
  // =====================

  // Handle all anchor links with smooth scrolling
  document.addEventListener('click', function(e) {
    // Check if the clicked element is an anchor link with a hash
    if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
      const href = e.target.getAttribute('href');

      // Skip empty hash or just "#"
      if (href === '#') {
        return;
      }

      // Handle categories link - only open popup
      if (href === '#categories') {
        e.preventDefault();
        openPopup();
        return;
      }

      // Handle home link
      if (href === '#home') {
        e.preventDefault();
        showHomePage();
        return;
      }

      // Find target element for other links
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();

        // Close popup if it's open before scrolling
        if (popup && popup.classList.contains('active')) {
          closePopup();
          // Add a small delay to let popup close animation finish
          setTimeout(() => {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }, 300);
        } else {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    }
  });
});
