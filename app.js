document.documentElement.classList.add("js");

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
const header = document.querySelector("#site-header");

function closeMenu({ restoreFocus = false } = {}) {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menú");
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  if (restoreFocus) menuToggle.focus();
}

menuToggle?.addEventListener("click", () => {
  const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  menuToggle.setAttribute(
    "aria-label",
    willOpen ? "Cerrar menú" : "Abrir menú",
  );
  navigation.classList.toggle("is-open", willOpen);
  document.body.classList.toggle("menu-open", willOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => closeMenu());
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuToggle?.getAttribute("aria-expanded") === "true"
  ) {
    closeMenu({ restoreFocus: true });
  }
});

window.matchMedia("(min-width: 821px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 30);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const revealItems = document.querySelectorAll(".reveal");

if (reducedMotion.matches || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -5%" },
  );
  revealItems.forEach((item) => revealObserver.observe(item));
}

const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

if (finePointer.matches && !reducedMotion.matches) {
  document.querySelectorAll(".project-media").forEach((media) => {
    media.addEventListener("pointermove", (event) => {
      const bounds = media.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      media.style.setProperty("--project-rx", `${(-y * 2.2).toFixed(2)}deg`);
      media.style.setProperty("--project-ry", `${(x * 2.2).toFixed(2)}deg`);
    });
    media.addEventListener("pointerleave", () => {
      media.style.removeProperty("--project-rx");
      media.style.removeProperty("--project-ry");
    });
  });
}

const aboutSection = document.querySelector("#sobre-mi");
const aboutCanvas = document.querySelector("#about-canvas");
const aboutPortrait = document.querySelector(".about-portrait");

if (aboutSection && aboutCanvas) {
  const context = aboutCanvas.getContext("2d");
  let width = 0;
  let height = 0;
  let frame = 0;
  let isVisible = false;
  let pointer = { x: 0.54, y: 0.42 };
  let nodes = [];

  function makeNodes() {
    const count = Math.max(28, Math.min(52, Math.round(width / 28)));
    nodes = Array.from({ length: count }, (_, index) => ({
      x: ((index * 137.5 + 41) % width) / width,
      y: ((index * 83.2 + 67) % height) / height,
      size: 0.8 + ((index * 17) % 8) / 10,
      phase: index * 0.71,
    }));
  }

  function resizeAboutCanvas() {
    const bounds = aboutSection.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, Math.round(bounds.width));
    height = Math.max(1, Math.round(bounds.height));
    aboutCanvas.width = Math.round(width * ratio);
    aboutCanvas.height = Math.round(height * ratio);
    aboutCanvas.style.width = `${width}px`;
    aboutCanvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    makeNodes();
  }

  function drawAboutCanvas(time = 0) {
    context.clearRect(0, 0, width, height);
    const positions = nodes.map((node) => ({
      ...node,
      px: node.x * width + Math.sin(time * 0.00018 + node.phase) * 10,
      py: node.y * height + Math.cos(time * 0.00016 + node.phase) * 8,
    }));

    const pointerX = pointer.x * width;
    const pointerY = pointer.y * height;

    positions.forEach((node, index) => {
      const distanceToPointer = Math.hypot(
        node.px - pointerX,
        node.py - pointerY,
      );
      if (distanceToPointer < 210) {
        context.beginPath();
        context.moveTo(node.px, node.py);
        context.lineTo(pointerX, node.py);
        context.lineTo(pointerX, pointerY);
        context.strokeStyle = `rgba(92, 142, 255, ${0.15 * (1 - distanceToPointer / 210)})`;
        context.lineWidth = 0.8;
        context.stroke();
      }

      const next = positions[index + 1];
      if (next && Math.hypot(node.px - next.px, node.py - next.py) < 190) {
        context.beginPath();
        context.moveTo(node.px, node.py);
        context.lineTo(next.px, node.py);
        context.lineTo(next.px, next.py);
        context.strokeStyle = "rgba(159, 188, 255, 0.08)";
        context.lineWidth = 0.7;
        context.stroke();
      }

      context.fillStyle = "rgba(190, 210, 255, 0.45)";
      const nodeSize = Math.max(1, Math.round(node.size));
      context.fillRect(
        Math.round(node.px - nodeSize / 2),
        Math.round(node.py - nodeSize / 2),
        nodeSize,
        nodeSize,
      );
    });

    context.beginPath();
    context.moveTo(pointerX - 8, pointerY);
    context.lineTo(pointerX + 8, pointerY);
    context.moveTo(pointerX, pointerY - 8);
    context.lineTo(pointerX, pointerY + 8);
    context.strokeStyle = "rgba(31, 94, 255, 0.7)";
    context.lineWidth = 1;
    context.stroke();

    if (isVisible && !reducedMotion.matches) {
      frame = requestAnimationFrame(drawAboutCanvas);
    }
  }

  resizeAboutCanvas();
  const aboutResizeObserver = new ResizeObserver(resizeAboutCanvas);
  aboutResizeObserver.observe(aboutSection);

  const aboutVisibilityObserver = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
    cancelAnimationFrame(frame);
    if (isVisible) frame = requestAnimationFrame(drawAboutCanvas);
  });
  aboutVisibilityObserver.observe(aboutSection);

  if (finePointer.matches && !reducedMotion.matches) {
    aboutSection.addEventListener("pointermove", (event) => {
      const bounds = aboutSection.getBoundingClientRect();
      pointer = {
        x: Math.min(
          1,
          Math.max(0, (event.clientX - bounds.left) / bounds.width),
        ),
        y: Math.min(
          1,
          Math.max(0, (event.clientY - bounds.top) / bounds.height),
        ),
      };
      const x = (pointer.x - 0.5) * 14;
      const y = (pointer.y - 0.5) * 10;
      aboutPortrait?.style.setProperty("--portrait-x", `${x.toFixed(1)}px`);
      aboutPortrait?.style.setProperty("--portrait-y", `${y.toFixed(1)}px`);
      aboutPortrait?.style.setProperty(
        "--portrait-r",
        `${(x * 0.08).toFixed(2)}deg`,
      );
    });
  } else {
    drawAboutCanvas();
  }
}

document.querySelectorAll(".archive details").forEach((details) => {
  details.addEventListener("toggle", () => {
    if (!details.open) return;
    document.querySelectorAll(".archive details[open]").forEach((other) => {
      if (other !== details) other.open = false;
    });
  });
});

const projects = {
  tenis: {
    title: "Tenis Isturgi",
    category: "04 / Portal del club",
    image: "images/tenis.webp",
    alt: "Portal de Tenis Isturgi",
    description:
      "Una plataforma para gestionar la actividad del club: reservas de pistas, calendarios de liga y generación de enfrentamientos con el algoritmo Berger. La interfaz en React se conecta a un gestor de contenidos Strapi y una base de datos PostgreSQL.",
    technologies: "React · Node.js · Strapi · PostgreSQL · Algoritmo Berger",
  },
  redes: {
    title: "Reaktor Redes",
    category: "05 / Monitorización de red",
    image: "images/redes.webp",
    alt: "Mapa de aulas y equipos de Reaktor Redes",
    description:
      "Un escáner de la red local de un instituto. Consulta el estado de los equipos mediante conexiones TCP y representa las IP activas o caídas en un mapa interactivo de las aulas.",
    technologies: "Java · Spring Boot · Thread Pools · Sockets TCP · SVG",
  },
  padel: {
    title: "Torneo Pádel",
    category: "06 / PWA y gestión deportiva",
    image: "images/padel.webp",
    alt: "Aplicación de gestión de torneos de pádel",
    description:
      "Una aplicación web que permite gestionar torneos de pádel sin depender de una conexión a internet. Organiza partidos según la disponibilidad y permite exportar la agenda en iCal o como imagen.",
    technologies: "JavaScript · PWA · LocalStorage · iCal · Webhooks",
  },
  patriarca: {
    title: "Mantecados Patriarca",
    category: "07 / Pedidos e integración de datos",
    image: "images/patriarca.webp",
    alt: "Plataforma de pedidos de Mantecados Patriarca",
    description:
      "Un sistema para organizar las ventas de una campaña escolar de dulces navideños. Los pedidos se sincronizan con Google Sheets para poder consultarlos y trabajar con ellos en una herramienta familiar.",
    technologies: "Spring Boot · Google Sheets API · Thymeleaf · Firebase Auth",
  },
};

const dialog = document.querySelector("#project-dialog");
let projectTrigger;

document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projects[button.dataset.project];
    if (!project || !dialog) return;
    projectTrigger = button;
    dialog.querySelector("#dialog-title").textContent = project.title;
    dialog.querySelector("#dialog-category").textContent = project.category;
    dialog.querySelector("#dialog-description").textContent =
      project.description;
    dialog.querySelector("#dialog-technologies").textContent =
      project.technologies;
    const image = dialog.querySelector("#dialog-image");
    image.src = project.image;
    image.alt = project.alt;
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add("modal-open");
  });
});

dialog
  ?.querySelector(".dialog-close")
  ?.addEventListener("click", () => dialog.close());

dialog?.addEventListener("click", (event) => {
  const bounds = dialog.getBoundingClientRect();
  const outside =
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom;
  if (outside) dialog.close();
});

dialog?.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
  projectTrigger?.focus({ preventScroll: true });
});

const copyButton = document.querySelector("#copy-email");
const copyStatus = document.querySelector("#copy-status");
const email = "alvarorema2016@gmail.com";
let copyTimeout;

copyButton?.addEventListener("click", async () => {
  clearTimeout(copyTimeout);
  copyButton.disabled = true;
  try {
    if (!navigator.clipboard?.writeText)
      throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = "Correo copiado. ¡Hablamos!";
  } catch {
    copyStatus.textContent = "Puedes seleccionar el correo para copiarlo.";
    const emailLink = document.querySelector(".email-wrap > a");
    const range = document.createRange();
    range.selectNodeContents(emailLink);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  } finally {
    copyButton.disabled = false;
    copyTimeout = setTimeout(() => {
      copyStatus.textContent = "";
    }, 5000);
  }
});

const contactForm = document.querySelector(".contact-form");
const formStatus = contactForm?.querySelector(".form-status");
const formSubmit = contactForm?.querySelector(".form-submit");
const formSubmitLabel = formSubmit?.querySelector("span");

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);
  if (formData.get("_honey")) return;

  formSubmit.disabled = true;
  formSubmit.setAttribute("aria-busy", "true");
  formSubmitLabel.textContent = "Enviando…";
  formStatus.textContent = "";
  formStatus.className = "form-status";

  try {
    const response = await fetch(contactForm.dataset.ajaxEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success === false || result.success === "false") {
      throw new Error("Form submission failed");
    }

    contactForm.reset();
    formStatus.textContent =
      "Proyecto enviado. Gracias; te responderé en cuanto lo revise.";
    formStatus.classList.add("is-success");
  } catch {
    formStatus.textContent =
      "No se ha podido enviar. Puedes escribirme directamente al correo que aparece debajo.";
    formStatus.classList.add("is-error");
  } finally {
    formSubmit.disabled = false;
    formSubmit.removeAttribute("aria-busy");
    formSubmitLabel.textContent = "Enviar proyecto";
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();
