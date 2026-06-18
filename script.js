// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Smooth scrolling for same-page links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId.length === 1) return;

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Scroll reveal animation
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

// Animated counters
const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.target);
      const duration = 1300;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(eased * target).toLocaleString("en-IN");

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString("en-IN");
        }
      }

      requestAnimationFrame(updateCounter);
      counterObserver.unobserve(counter);
    });
  },
  { threshold: 0.7 }
);

counters.forEach((counter) => counterObserver.observe(counter));

// Active navigation and back-to-top button
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");
const backToTop = document.getElementById("backToTop");

function updateScrollState() {
  const scrollPosition = window.scrollY + 120;

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
      navItems.forEach((item) => item.classList.remove("active"));
      const activeItem = document.querySelector(`.nav-links a[href="#${section.id}"]`);
      if (activeItem) activeItem.classList.add("active");
    }
  });

  backToTop.classList.toggle("show", window.scrollY > 500);
}

window.addEventListener("scroll", updateScrollState);
updateScrollState();

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Contact form validation
const form = document.getElementById("contactForm");
const successMessage = document.getElementById("formSuccess");

function setError(field, message) {
  const errorElement = field.nextElementSibling;
  field.classList.add("invalid");
  if (errorElement) errorElement.textContent = message;
}

function clearError(field) {
  const errorElement = field.nextElementSibling;
  field.classList.remove("invalid");
  if (errorElement) errorElement.textContent = "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  successMessage.classList.remove("show");

  const name = form.elements.name;
  const email = form.elements.email;
  const branch = form.elements.branch;
  const message = form.elements.message;
  let isValid = true;

  [name, email, branch, message].forEach(clearError);

  if (name.value.trim().length < 3) {
    setError(name, "Please enter at least 3 characters.");
    isValid = false;
  }

  if (!isValidEmail(email.value.trim())) {
    setError(email, "Please enter a valid email address.");
    isValid = false;
  }

  if (!branch.value) {
    setError(branch, "Please select a branch.");
    isValid = false;
  }

  if (message.value.trim().length < 10) {
    setError(message, "Please write a message of at least 10 characters.");
    isValid = false;
  }

  if (isValid) {
    form.reset();
    successMessage.classList.add("show");
  }
});

// Gallery lightbox preview
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".gallery-grid img").forEach((image) => {
  image.addEventListener("click", () => {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeLightbox() {
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("show")) {
    closeLightbox();
  }
});
