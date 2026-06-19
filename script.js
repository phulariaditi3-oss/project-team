const header = document.getElementById("siteHeader");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const backTop = document.getElementById("backTop");
const revealItems = document.querySelectorAll(".reveal");
const counterItems = document.querySelectorAll("[data-counter]");
const sectionLinks = document.querySelectorAll(".nav-links a[href^='#']");

// Slider content can later be replaced with data from a Java backend.
const testimonials = [
    {
        text: "The labs made every subject easier to understand. We did real projects, not just notebook work, and that changed my confidence.",
        name: "Aarav Patil",
        course: "Computer Engineering"
    },
    {
        text: "Faculty members helped me prepare for interviews step by step. The placement cell kept us focused from the second year itself.",
        name: "Sneha Jadhav",
        course: "Electrical Engineering"
    },
    {
        text: "Workshops, site visits, and CAD practice gave me a clear direction. The campus feels professional and student-friendly.",
        name: "Rohan Deshmukh",
        course: "Civil Engineering"
    }
];

let testimonialIndex = 0;
let countersStarted = false;

function updateHeader() {
    // Header and back-to-top visibility respond to scroll position.
    header.classList.toggle("scrolled", window.scrollY > 20);
    backTop.classList.toggle("show", window.scrollY > 520);
}

function closeMenu() {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
}

navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
});

document.querySelectorAll(".nav-links a, .footer a, .hero-actions a, .placement-card a").forEach((link) => {
    link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", updateHeader);
updateHeader();

backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.16 });

revealItems.forEach((item) => revealObserver.observe(item));

function animateCounter(counter) {
    // Eased number animation keeps statistics feeling polished without plugins.
    const target = Number(counter.dataset.counter);
    const duration = 1700;
    const start = performance.now();

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(target * eased).toLocaleString("en-IN");

        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            counter.textContent = target.toLocaleString("en-IN");
        }
    }

    requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            counterItems.forEach(animateCounter);
        }
    });
}, { threshold: 0.4 });

if (counterItems.length) {
    counterObserver.observe(counterItems[0].closest(".stats-band"));
}

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }

        sectionLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
    });
}, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });

sectionLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));

    if (section) {
        navObserver.observe(section);
    }
});

function renderTestimonial() {
    const testimonial = testimonials[testimonialIndex];
    document.getElementById("testimonialText").textContent = `"${testimonial.text}"`;
    document.getElementById("testimonialName").textContent = testimonial.name;
    document.getElementById("testimonialCourse").textContent = testimonial.course;
}

document.getElementById("prevTestimonial").addEventListener("click", () => {
    testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    renderTestimonial();
});

document.getElementById("nextTestimonial").addEventListener("click", () => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    renderTestimonial();
});

setInterval(() => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    renderTestimonial();
}, 6000);

renderTestimonial();

document.querySelectorAll(".faq-item button").forEach((button) => {
    button.addEventListener("click", () => {
        const item = button.closest(".faq-item");
        document.querySelectorAll(".faq-item").forEach((faq) => {
            if (faq !== item) {
                faq.classList.remove("open");
            }
        });
        item.classList.toggle("open");
    });
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
        lightboxImage.src = item.dataset.full;
        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";
    });
});

function hideLightbox() {
    lightbox.classList.remove("open");
    lightboxImage.src = "";
    document.body.style.overflow = "";
}

closeLightbox.addEventListener("click", hideLightbox);
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        hideLightbox();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) {
        hideLightbox();
    }
});

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (event) => {
    // Client-side validation only; the success path is ready to be replaced by fetch().
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const course = document.getElementById("course").value.trim();
    const message = document.getElementById("message").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9+\-\s]{8,15}$/;

    formStatus.classList.remove("success");

    if (!name || !email || !phone || !course || !message) {
        formStatus.textContent = "Please complete all fields before submitting.";
        return;
    }

    if (!emailPattern.test(email)) {
        formStatus.textContent = "Please enter a valid email address.";
        return;
    }

    if (!phonePattern.test(phone)) {
        formStatus.textContent = "Please enter a valid phone number.";
        return;
    }

    formStatus.textContent = "Thank you. Your enquiry is ready to connect with the admissions backend.";
    formStatus.classList.add("success");
    contactForm.reset();
});
