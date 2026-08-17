"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = getCurrentPageName();
  const pageConfig = window.PORTFOLIO_PAGES?.[currentPage];

  if (!pageConfig) return;

  updatePageInformation(pageConfig);
  updatePageNavigation(pageConfig);
  updatePartLinks(pageConfig);
});

function getCurrentPageName() {
  const pathname = window.location.pathname;
  const filename = pathname.split("/").pop();

  return filename || "index.html";
}

function updatePageInformation(pageConfig) {
  document.querySelectorAll("[data-part-name]").forEach((element) => {
    element.textContent = pageConfig.name;
  });

  document.querySelectorAll("[data-part-sections]").forEach((element) => {
    element.textContent = pageConfig.sections;
  });
}

function updatePageNavigation(pageConfig) {
  const previousLinks = document.querySelectorAll("[data-prev-page]");
  const nextLinks = document.querySelectorAll("[data-next-page]");

  previousLinks.forEach((link) => {
    if (pageConfig.previous) {
      link.href = pageConfig.previous;
      link.classList.remove("disabled");
      link.removeAttribute("aria-disabled");
      link.innerHTML =
        '<i class="fa-solid fa-arrow-left me-2"></i>Previous Part';
    } else {
      link.href = "#";
      link.classList.add("disabled");
      link.setAttribute("aria-disabled", "true");
      link.innerHTML =
        '<i class="fa-solid fa-house me-2"></i>Portfolio Start';
    }
  });

  nextLinks.forEach((link) => {
    if (pageConfig.next) {
      link.href = pageConfig.next;
      link.classList.remove("disabled");
      link.removeAttribute("aria-disabled");
      link.innerHTML =
        'Next Part<i class="fa-solid fa-arrow-right ms-2"></i>';
    } else {
      link.href = "#section50";
      link.classList.remove("disabled");
      link.removeAttribute("aria-disabled");
      link.innerHTML =
        'Contact<i class="fa-solid fa-arrow-right ms-2"></i>';
    }
  });
}

function updatePartLinks(pageConfig) {
  document.querySelectorAll("[data-page-link]").forEach((link) => {
    const targetPage = link.dataset.pageLink;

    if (!targetPage) return;

    if (targetPage === "previous") {
      link.href = pageConfig.previous || "index.html";
    }

    if (targetPage === "next") {
      link.href = pageConfig.next || "part3.html";
    }
  });
}
