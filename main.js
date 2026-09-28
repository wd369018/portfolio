// ===== Typed.js animated text =====
var typed = new Typed(".text", {
    strings: ["Data Analyst", "SQL Developer", "Power BI Expert", "Tableau Specialist"],
    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 1200,
    loop: true
});

// ===== Preloader =====
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) preloader.classList.add("hide");
});

// ===== Scroll progress bar (top of page) =====
const scrollProgress = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const percent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = percent + "%";
});

// ===== Mobile menu toggle =====
const menuIcon = document.getElementById("menu-icon");
const navbar = document.getElementById("navbar");

menuIcon.addEventListener("click", () => {
    navbar.classList.toggle("active");
    menuIcon.classList.toggle("bx-x");
});

document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");
        menuIcon.classList.remove("bx-x");
    });
});

// ===== Theme toggle (dark / light) — saved for return visits =====
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

function applyTheme(theme) {
    if (theme === "light") {
        document.body.classList.add("light-mode");
        themeIcon.classList.remove("bx-moon");
        themeIcon.classList.add("bx-sun");
    } else {
        document.body.classList.remove("light-mode");
        themeIcon.classList.remove("bx-sun");
        themeIcon.classList.add("bx-moon");
    }
}

const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light-mode");
    const newTheme = isLight ? "dark" : "light";
    applyTheme(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// ===== Scroll reveal animation =====
const revealEls = document.querySelectorAll("[data-aos]");
revealEls.forEach(el => el.classList.add("reveal"));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// ===== Contact form (Web3Forms — free, no backend needed) =====
// 1. Go to https://web3forms.com and get a FREE Access Key with your email.
// 2. Paste the key below in place of "YOUR_ACCESS_KEY_HERE".
// This lets visitors email you directly from the form, with CV / cover letter attachments.
const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE";

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
        // Fallback: open the user's email client with a prefilled message
        const name = contactForm.name.value;
        const email = contactForm.email.value;
        const subject = contactForm.subject.value || "Portfolio Contact";
        const message = contactForm.message.value;
        const body = `Name: ${name}%0AEmail: ${email}%0A%0A${encodeURIComponent(message)}`;
        window.location.href = `mailto:wd369018@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        formStatus.textContent = "Opening your email app... (Tip: add a free Web3Forms key in main.js to send messages + attachments directly without opening an email app.)";
        formStatus.className = "form-status success";
        return;
    }

    const formData = new FormData(contactForm);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    formStatus.textContent = "Sending...";
    formStatus.className = "form-status";

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });
        const result = await response.json();

        if (result.success) {
            formStatus.textContent = "Message sent successfully! I'll get back to you soon.";
            formStatus.className = "form-status success";
            contactForm.reset();
        } else {
            formStatus.textContent = "Something went wrong. Please try again.";
            formStatus.className = "form-status error";
        }
    } catch (error) {
        formStatus.textContent = "Network error. Please try again later.";
        formStatus.className = "form-status error";
    }
});
