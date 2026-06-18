const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const scrollTopButton = document.querySelector("#scrollTop");
const counters = document.querySelectorAll(".counter");
const fadeItems = document.querySelectorAll(".fade-in");
const contactForm = document.querySelector("#contactForm");
const formSuccess = document.querySelector("#formSuccess");
const noticeGrid = document.querySelector("#noticeGrid");

const notices = [
    {
        title: "Admission Open 2026",
        date: "2026-06-18",
        displayDate: "18 Jun 2026",
        text: "Diploma admission guidance and document verification support is available at the institute office."
    },
    {
        title: "Semester Exam Schedule",
        date: "2026-06-24",
        displayDate: "24 Jun 2026",
        text: "Students should check the final timetable and follow examination instructions carefully."
    },
    {
        title: "Campus Placement Drive",
        date: "2026-07-02",
        displayDate: "02 Jul 2026",
        text: "Eligible final-year students can register with the Training and Placement Cell."
    },
    {
        title: "Workshop on AI",
        date: "2026-07-10",
        displayDate: "10 Jul 2026",
        text: "A hands-on workshop on AI tools and machine learning basics will be conducted for students."
    }
];

function updateHeaderState() {
    const isScrolled = window.scrollY > 24;
    header.classList.toggle("scrolled", isScrolled);
    scrollTopButton.classList.toggle("show", window.scrollY > 500);
}

function renderNotices() {
    noticeGrid.innerHTML = notices.map((notice) => `
        <article class="notice-card fade-in">
            <time datetime="${notice.date}">${notice.displayDate}</time>
            <h3>${notice.title}</h3>
            <p>${notice.text}</p>
        </article>
    `).join("");
}

function animateCounter(counter) {
    const target = Number(counter.dataset.target);
    const duration = 1400;
    const startTime = performance.now();

    function tick(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
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

function validateField(field, message) {
    const wrapper = field.closest(".form-field");
    const error = wrapper.querySelector(".error");

    if (!field.value.trim()) {
        error.textContent = message;
        return false;
    }

    error.textContent = "";
    return true;
}

function validateEmail(field) {
    const wrapper = field.closest(".form-field");
    const error = wrapper.querySelector(".error");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!field.value.trim()) {
        error.textContent = "Email address is required.";
        return false;
    }

    if (!emailPattern.test(field.value.trim())) {
        error.textContent = "Enter a valid email address.";
        return false;
    }

    error.textContent = "";
    return true;
}

function validatePhone(field) {
    const wrapper = field.closest(".form-field");
    const error = wrapper.querySelector(".error");
    const phonePattern = /^[0-9+\-\s]{8,15}$/;

    if (!field.value.trim()) {
        error.textContent = "Phone number is required.";
        return false;
    }

    if (!phonePattern.test(field.value.trim())) {
        error.textContent = "Enter a valid phone number.";
        return false;
    }

    error.textContent = "";
    return true;
}

renderNotices();

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.18 });

document.querySelectorAll(".fade-in").forEach((item) => observer.observe(item));

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.6 });

counters.forEach((counter) => counterObserver.observe(counter));

navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
    }
});

scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = contactForm.elements.name;
    const email = contactForm.elements.email;
    const phone = contactForm.elements.phone;
    const message = contactForm.elements.message;

    const isValid = [
        validateField(name, "Full name is required."),
        validateEmail(email),
        validatePhone(phone),
        validateField(message, "Message is required.")
    ].every(Boolean);

    if (!isValid) {
        formSuccess.textContent = "";
        return;
    }

    contactForm.reset();
    formSuccess.textContent = "Thank you. Your message has been validated successfully.";
});

contactForm.addEventListener("input", (event) => {
    const field = event.target;

    if (field.name === "name") validateField(field, "Full name is required.");
    if (field.name === "email") validateEmail(field);
    if (field.name === "phone") validatePhone(field);
    if (field.name === "message") validateField(field, "Message is required.");
});

window.addEventListener("scroll", updateHeaderState, { passive: true });
document.querySelector("#year").textContent = new Date().getFullYear();
updateHeaderState();
