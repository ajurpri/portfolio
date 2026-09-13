const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");

function closeMenu({ restoreFocus = false } = {}) {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menú");
  navigation.classList.remove("is-open");
  if (restoreFocus) menuToggle.focus();
}
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
  navigation.classList.toggle("is-open", !isOpen);
});
navigation
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", () => closeMenu()));
document.addEventListener("click", (event) => {
  if (!navigation.contains(event.target) && !menuToggle.contains(event.target))
    closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuToggle.getAttribute("aria-expanded") === "true"
  )
    closeMenu({ restoreFocus: true });
});
document.addEventListener("focusin", (event) => {
  if (!navigation.contains(event.target) && !menuToggle.contains(event.target))
    closeMenu();
});
window.matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

const projects = {
  tenis: {
    title: "Tenis Isturgi",
    category: "04 / Portal del club",
    image: "images/tenis.webp",
    alt: "Portal de Tenis Isturgi",
    description:
      "Una plataforma para gestionar la actividad del club: reservas de pistas, calendarios de liga y generación de enfrentamientos con el algoritmo Berger (todos contra todos). La interfaz en React se conecta a un gestor de contenidos Strapi y una base de datos PostgreSQL.",
    technologies: "React / Node.js / Strapi / PostgreSQL / Algoritmo Berger",
  },
  redes: {
    title: "Reaktor Redes",
    category: "05 / Monitorización de red",
    image: "images/redes.webp",
    alt: "Mapa de las aulas y los equipos de Reaktor Redes",
    description:
      "Un escáner de la red local de un instituto. Consulta el estado de los equipos mediante conexiones TCP y representa las IP activas o caídas en un mapa interactivo de las aulas. El backend en Spring Boot utiliza grupos de hilos para realizar las comprobaciones.",
    technologies: "Java / Spring Boot / Thread Pools / Sockets TCP / SVG",
  },
  padel: {
    title: "Torneo Pádel",
    category: "06 / PWA & gestión deportiva",
    image: "images/padel.webp",
    alt: "Aplicación de gestión de torneos de pádel",
    description:
      "Una aplicación web que permite gestionar torneos de pádel sin depender de una conexión a internet. Organiza los partidos según la disponibilidad horaria y permite exportar la agenda en formato iCal o como imagen PNG.",
    technologies: "JavaScript / PWA / LocalStorage / iCal / Google Webhooks",
  },
  patriarca: {
    title: "Mantecados Patriarca",
    category: "07 / Pedidos & integración de datos",
    image: "images/patriarca.webp",
    alt: "Plataforma de pedidos de Mantecados Patriarca",
    description:
      "Un sistema para organizar las ventas de una campaña escolar de dulces navideños. Los pedidos se sincronizan con una hoja de Google Sheets, para poder consultarlos y trabajar con ellos en una herramienta familiar.",
    technologies: "Spring Boot / Google Sheets API / Thymeleaf / Firebase Auth",
  },
};
const dialog = document.querySelector("#project-dialog");
let projectTrigger;
document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projects[button.dataset.project];
    if (!project) return;
    projectTrigger = button;
    document.querySelector("#dialog-title").textContent = project.title;
    document.querySelector("#dialog-category").textContent = project.category;
    document.querySelector("#dialog-description").textContent =
      project.description;
    document.querySelector("#dialog-technologies").textContent =
      project.technologies;
    const image = document.querySelector("#dialog-image");
    image.src = project.image;
    image.alt = project.alt;
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add("modal-open");
  });
});
document
  .querySelector(".dialog-close")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  const bounds = dialog.getBoundingClientRect();
  if (
    event.target === dialog &&
    (event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom)
  )
    dialog.close();
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
  projectTrigger?.focus({ preventScroll: true });
});

const copyButton = document.querySelector("#copy-email");
const copyStatus = document.querySelector("#copy-status");
let copyTimeout;
copyButton.addEventListener("click", async () => {
  clearTimeout(copyTimeout);
  copyButton.disabled = true;
  try {
    if (!navigator.clipboard?.writeText)
      throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText("alvarorema2016@gmail.com");
    copyStatus.textContent = "Correo copiado. ¡Hablamos!";
  } catch {
    copyStatus.textContent =
      "Puedes seleccionar y copiar el correo que aparece arriba.";
    const range = document.createRange();
    range.selectNodeContents(document.querySelector(".email-contact > a"));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  } finally {
    copyButton.disabled = false;
    copyTimeout = setTimeout(() => {
      copyStatus.textContent = "";
    }, 6000);
  }
});
document.querySelector("#year").textContent = new Date().getFullYear();
