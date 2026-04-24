// Elements
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const revealItems = document.querySelectorAll(".reveal");
const contactForm = document.getElementById("contact-form");
const feedback = document.getElementById("form-feedback");
const yearElement = document.getElementById("year");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

// Set current year in footer
yearElement.textContent = new Date().getFullYear();

// Theme handling
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
	document.body.classList.add("dark-mode");
	themeIcon.textContent = "☀️";
}

themeToggleBtn.addEventListener("click", () => {
	document.body.classList.toggle("dark-mode");
	const isDark = document.body.classList.contains("dark-mode");
	themeIcon.textContent = isDark ? "☀️" : "🌙";
	localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Active nav link on scroll
function updateActiveLink() {
	const scrollY = window.scrollY + 140;

	sections.forEach((section) => {
		const sectionTop = section.offsetTop;
		const sectionHeight = section.offsetHeight;
		const sectionId = section.getAttribute("id");

		if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
			navLinks.forEach((link) => {
				link.classList.remove("active");
				if (link.getAttribute("href") === `#${sectionId}`) {
					link.classList.add("active");
				}
			});
		}
	});
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

// Scroll reveal animation
const revealObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("show");
			}
		});
	},
	{
		threshold: 0.15
	}
);

revealItems.forEach((item) => revealObserver.observe(item));

// Contact form validation
contactForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const name = nameInput.value.trim();
	const email = emailInput.value.trim();
	const message = messageInput.value.trim();

	[nameInput, emailInput, messageInput].forEach((field) => {
		field.classList.remove("input-error");
		field.setAttribute("aria-invalid", "false");
	});

	if (!name || !email || !message) {
		feedback.textContent = "Please fill in all fields.";
		feedback.style.color = "#d93025";
		if (!name) {
			nameInput.classList.add("input-error");
			nameInput.setAttribute("aria-invalid", "true");
		}
		if (!email) {
			emailInput.classList.add("input-error");
			emailInput.setAttribute("aria-invalid", "true");
		}
		if (!message) {
			messageInput.classList.add("input-error");
			messageInput.setAttribute("aria-invalid", "true");
		}
		return;
	}

	const nameRegex = /^[A-Za-z\s'-]{2,50}$/;
	if (!nameRegex.test(name)) {
		feedback.textContent = "Name should be 2-50 characters and contain only letters, spaces, apostrophes, or hyphens.";
		feedback.style.color = "#d93025";
		nameInput.classList.add("input-error");
		nameInput.setAttribute("aria-invalid", "true");
		return;
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		feedback.textContent = "Please enter a valid email address.";
		feedback.style.color = "#d93025";
		emailInput.classList.add("input-error");
		emailInput.setAttribute("aria-invalid", "true");
		return;
	}

	if (message.length < 20) {
		feedback.textContent = "Message should be at least 20 characters.";
		feedback.style.color = "#d93025";
		messageInput.classList.add("input-error");
		messageInput.setAttribute("aria-invalid", "true");
		return;
	}

	feedback.textContent = "Message submitted successfully!";
	feedback.style.color = "#1e8e3e";
	contactForm.reset();
});
