
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");

// Mobile navigation
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

// Close mobile menu after clicking a link
navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

// Animate elements when they enter the screen
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries, observerInstance) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observerInstance.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => observer.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add("visible"));
}

// Highlight the active navigation link while scrolling
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navItems.forEach((link) => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === "#" + entry.target.id
                        );
                    });
                }
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    sections.forEach((section) => sectionObserver.observe(section));
}

console.log("Teerath's portfolio loaded successfully!");
