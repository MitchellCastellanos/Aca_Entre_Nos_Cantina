document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".main-navbar");
  const backToTopButton = document.getElementById("backToTop");
  const currentYear = document.getElementById("currentYear");
  const revealElements = document.querySelectorAll(".reveal");
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"], .btn[href^="#"], .footer-links a[href^="#"]');
const galleryLinks = Array.from(document.querySelectorAll(".gallery-card"));
  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");
let currentGalleryIndex = 0;
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
function handleNavbarScroll() {
    if (!navbar) return;
if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
function handleBackToTop() {
    if (!backToTopButton) return;
if (window.scrollY > 500) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  }
function scrollToElement(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;
const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight + 1;
window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  }
navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
if (!href || !href.startsWith("#")) return;
const target = document.querySelector(href);
      if (!target) return;
event.preventDefault();
      scrollToElement(href);
const navbarCollapse = document.querySelector(".navbar-collapse.show");
      if (navbarCollapse) {
        const bsCollapse =
          bootstrap.Collapse.getInstance(navbarCollapse) ||
          new bootstrap.Collapse(navbarCollapse, { toggle: false });
        bsCollapse.hide();
      }
    });
  });
if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
const observerOptions = {
    threshold: 0.14
  };
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
document.addEventListener("click", (event) => {
    const reserveButton = event.target.closest(".reserve-event-btn");
    if (!reserveButton) return;
const eventName = reserveButton.dataset.event || "";
    const eventDate = reserveButton.dataset.date || "";
    const eventTime = reserveButton.dataset.time || "";
    const eventType = reserveButton.dataset.type || "";
const eventField = document.getElementById("evento");
    const dateField = document.getElementById("fecha");
    const timeField = document.getElementById("hora");
    const commentsField = document.getElementById("comentarios");
if (eventField) eventField.value = eventName;
    if (dateField) dateField.value = eventDate;
    if (timeField) timeField.value = eventTime;
if (commentsField) {
      commentsField.value = `Quiero reservar para ${eventName}${eventType ? ` (${eventType})` : ""}.`;
    }
scrollToElement("#reservaciones");
  });
function updateLightbox(index) {
    if (!galleryLinks.length || !lightboxImage) return;
currentGalleryIndex = index;
    const activeLink = galleryLinks[currentGalleryIndex];
    const imageSrc = activeLink.getAttribute("href");
    const imageElement = activeLink.querySelector("img");
    const imageAlt = imageElement ? imageElement.getAttribute("alt") : "Imagen de la galería";
lightboxImage.src = imageSrc;
    lightboxImage.alt = imageAlt;
  }
function openLightbox(index) {
    if (!lightbox || !galleryLinks.length) return;
updateLightbox(index);
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
  }
function closeLightbox() {
    if (!lightbox || !lightboxImage) return;
lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    lightboxImage.src = "";
    lightboxImage.alt = "";
  }
function showPreviousImage() {
    if (!galleryLinks.length) return;
    const prevIndex = (currentGalleryIndex - 1 + galleryLinks.length) % galleryLinks.length;
    updateLightbox(prevIndex);
  }
function showNextImage() {
    if (!galleryLinks.length) return;
    const nextIndex = (currentGalleryIndex + 1) % galleryLinks.length;
    updateLightbox(nextIndex);
  }
galleryLinks.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openLightbox(index);
    });
  });
if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }
if (lightboxPrev) {
    lightboxPrev.addEventListener("click", showPreviousImage);
  }
if (lightboxNext) {
    lightboxNext.addEventListener("click", showNextImage);
  }
if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }
document.addEventListener("keydown", (event) => {
    if (!lightbox || !lightbox.classList.contains("show")) return;
if (event.key === "Escape") {
      closeLightbox();
    }
if (event.key === "ArrowLeft") {
      showPreviousImage();
    }
if (event.key === "ArrowRight") {
      showNextImage();
    }
  });
handleNavbarScroll();
  handleBackToTop();
window.addEventListener("scroll", () => {
    handleNavbarScroll();
    handleBackToTop();
  });
});
