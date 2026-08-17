"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initializeAOS();
  initializeSmoothScroll();
  initializeMobileNavigation();
  initializeCurrentYear();
  initializeExternalLinks();
  initializeForms();
});

function initializeAOS() {
  if (typeof AOS === "undefined") return;

  AOS.init({
    duration: 800,
    once: true,
    offset: 80,
    easing: "ease-out-cubic"
  });
}

function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const selector = link.getAttribute("href");

      if (!selector || selector === "#") return;

      const target = document.querySelector(selector);

      if (!target) return;

      event.preventDefault();

      const navbar = document.querySelector(".ep-nav");
      const navbarHeight = navbar ? navbar.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight -
        12;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

      closeMobileNavigation();
    });
  });
}

function initializeMobileNavigation() {
  document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileNavigation();
    });
  });
}

function closeMobileNavigation() {
  const navigation = document.querySelector(".navbar-collapse");

  if (!navigation || !navigation.classList.contains("show")) return;

  if (typeof bootstrap !== "undefined") {
    const collapse = bootstrap.Collapse.getInstance(navigation);

    if (collapse) {
      collapse.hide();
    }
  }
}

function initializeCurrentYear() {
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
}

function initializeExternalLinks() {
  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.setAttribute("rel", "noopener noreferrer");
  });
}

function initializeForms() {
  document.querySelectorAll("[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const message =
        form.dataset.successMessage ||
        "Thank you. Your message has been submitted successfully.";

      showPortfolioMessage(message);
      form.reset();
    });
  });
}

function showPortfolioMessage(message) {
  const toast = document.createElement("div");

  toast.className = "ep-toast";
  toast.textContent = message;

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}
