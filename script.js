
const photos = [
  {
    src: "assets/images/foto-14.jpeg",
    title: "Onde tudo começa",
    place: "Sua casa",
    description:
      "Já tem um tempo desde que estamos juntos, esssa foto me lembra das vezes em que me senti parte da sua familia. Quando tudo parecia soar tão certo e nada poderia abalar nós dois."
  },
  {
    src: "assets/images/foto-02.jpeg",
    title: "Conturbação",
    place: "Casinha da Agatha",
    description:
      "Eu não sei por qual razão, mas gosto dessa foto. Tinha sido um dia estressante e ver você se divertindo me enchendo de coisa na cara com varias risadas em volta, deixou tudo mais tranquilo pra mim."
  },
  {
    src: "assets/images/foto-03.jpeg",
    title: "Nosso tempo",
    place: "Casa do Nero",
    description:
      "Uma foto das poucas vezes em que você veio aqui em casa, saiba que sinto tua falta por aqui, volte."
  },
  {
    src: "assets/images/foto-04.jpeg",
    title: "Perto",
    place: "Senai",
    description:
      "Essas fotos em baixa resolução me fazem sentir uma nostalgia boa, como se a gente já existisse antes mesmo de sermos um."
  },
  {
    src: "assets/images/foto-05.jpeg",
    title: "Seus olios, meus olios",
    place: "Zerbini",
    description:
      "Queria achar palavras melhores para descrever o tanto que eu gosto de ti, do seu olhar e todos os seus detalhes."
  },
  {
    src: "assets/images/foto-06.jpeg",
    title: "Depois dos olios, mais olios",
    place: "Sua minha casa",
    description:
      "por favor, nunca perca esse brilho que tem nos olhos."
  },
  {
    src: "assets/images/foto-07.jpeg",
    title: "Quase sem perceber",
    place: "Casa minha sua",
    description:
      "Até hoje não sei como agradecer por essa blusa que você me deu, ou melhor, não sei como agradecer pela felicidade que me traz."
  },
  {
    src: "assets/images/foto-08.jpeg",
    title: "Venus",
    place: "Sua nossa casa",
    description:
      "Você deveria me deixar tirar mais fotos suas, você sempre fica perfeita em todo momento congelado, mais linda ainda de se ver em movimento."
  },
  {
    src: "assets/images/foto-09.jpeg",
    title: "Uma flo pa ota flo",
    place: "Calçada do senai",
    description:
      "Eu ainda te entrego todas as flores desse mundo, você vai ver."
  },
  {
    src: "assets/images/foto-10.jpeg",
    title: "Minha luz de fim de tarde",
    place: "Minha casa",
    description:
      "Gosto dessa foto, voce tava parecendo um gatinho."
  },
  {
    src: "assets/images/foto-11.jpeg",
    title: "cansaço e aconchego",
    place: "Cotidiano",
    description:
      "Não acho que precise explicar, você faz meus olhos ainda terem esperança em ver o que tem a seguir, me faz correr na direção do que pode ser melhor para mim e para nós."
  },
  {
    src: "assets/images/foto-12.jpeg",
    title: "Pitico",
    place: "mal encarado",
    description:
      "Valeu a pena gastar minha sorte naquela maquina, que ele sempre te faça companhia."
  },
  {
    src: "assets/images/foto-13.jpeg",
    title: "Mais um capítulo",
    place: "Continuamos",
    description:
      "Aqui pode entrar uma fotografia que mostre mudança: um corte de cabelo, uma viagem, uma conquista ou só vocês dois um pouco diferentes."
  },
  {
    src: "assets/images/foto-01.jpeg",
    title: "Antes da última",
    place: "Shopee",
    description:
      "Foi um dia bem complicado, mas ao final, foi bom estar lá ao seu lado. Sem você teria sido completamente diferente."
  },
  {
    src: "assets/images/foto-15.jpeg",
    title: "Não temos uma última.",
    place: "Onde estivermos",
    description:
      "Eu ainda vou te amar em cada beijo, cada segundo ou realidade. Você é a minha paz, amor. Eu te amo."
  }
];

const gallery = document.getElementById("gallery");
const viewer = document.getElementById("viewer");
const viewerImage = document.getElementById("viewerImage");
const viewerTitle = document.getElementById("viewerTitle");
const viewerDetails = document.getElementById("viewerDetails");
const viewerDescription = document.getElementById("viewerDescription");
const viewerIndex = document.getElementById("viewerIndex");
const viewerCounter = document.getElementById("viewerCounter");
const viewerProgress = document.getElementById("viewerProgress");

const closeViewerButton = document.getElementById("closeViewer");
const prevPhotoButton = document.getElementById("prevPhoto");
const nextPhotoButton = document.getElementById("nextPhoto");
const autoplayButton = document.getElementById("autoplayButton");
const startPresentationButton = document.getElementById("startPresentation");
const startPresentationTopButton = document.getElementById("startPresentationTop");

let currentIndex = 0;
let isTransitioning = false;
let autoplayTimer = null;
let autoplayEnabled = false;

const twoDigits = (value) => String(value).padStart(2, "0");

function renderGallery() {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo, index) => {
    const article = document.createElement("article");
    article.className = "art-card reveal";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "art-card-button";
    button.setAttribute("aria-label", `Abrir ${photo.title} na apresentação`);

    button.innerHTML = `
      <div class="art-image-frame">
        <img
          class="art-image"
          src="${photo.src}"
          alt="${photo.title}"
          loading="${index < 4 ? "eager" : "lazy"}"
        />
      </div>

      <div class="art-info">
        <span class="art-number">${twoDigits(index + 1)}</span>
        <div>
          <h3 class="art-title">${photo.title}</h3>
          <p class="art-meta">${photo.date} · ${photo.place}</p>
        </div>
      </div>
    `;

    button.addEventListener("click", () => openViewer(index));
    article.appendChild(button);
    fragment.appendChild(article);
  });

  gallery.appendChild(fragment);
}

function openViewer(index = 0) {
  currentIndex = index;
  updateViewer(false);

  if (!viewer.open) {
    viewer.showModal();
  }

  document.body.classList.add("viewer-open");
}

function closeViewer() {
  stopAutoplay();

  if (viewer.open) {
    viewer.close();
  }

  document.body.classList.remove("viewer-open");
}

function updateViewer(animate = true) {
  const photo = photos[currentIndex];

  if (isTransitioning) return;

  const applyContent = () => {
    viewerImage.src = photo.src;
    viewerImage.alt = photo.title;
    viewerTitle.textContent = photo.title;
    viewerDetails.textContent = `${photo.date} · ${photo.place}`;
    viewerDescription.textContent = photo.description;
    viewerIndex.textContent = twoDigits(currentIndex + 1);
    viewerCounter.textContent = `${twoDigits(currentIndex + 1)} / ${twoDigits(photos.length)}`;
    viewerProgress.style.width = `${((currentIndex + 1) / photos.length) * 100}%`;
  };

  if (!animate) {
    applyContent();
    return;
  }

  isTransitioning = true;
  viewerImage.classList.add("is-changing");

  window.setTimeout(() => {
    applyContent();

    requestAnimationFrame(() => {
      viewerImage.classList.remove("is-changing");

      window.setTimeout(() => {
        isTransitioning = false;
      }, 650);
    });
  }, 240);
}

function goToPhoto(direction) {
  if (isTransitioning) return;

  currentIndex =
    (currentIndex + direction + photos.length) % photos.length;

  updateViewer(true);

  if (autoplayEnabled) {
    restartAutoplayTimer();
  }
}

function startAutoplay() {
  autoplayEnabled = true;
  autoplayButton.setAttribute("aria-pressed", "true");
  autoplayButton.innerHTML = `Ⅱ <span class="sr-only">Pausar apresentação automática</span>`;
  restartAutoplayTimer();
}

function stopAutoplay() {
  autoplayEnabled = false;
  autoplayButton.setAttribute("aria-pressed", "false");
  autoplayButton.innerHTML = `▶ <span class="sr-only">Ativar apresentação automática</span>`;

  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
}

function restartAutoplayTimer() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
  }

  autoplayTimer = setInterval(() => {
    goToPhoto(1);
  }, 6500);
}

function toggleAutoplay() {
  if (autoplayEnabled) {
    stopAutoplay();
  } else {
    startAutoplay();
  }
}


closeViewerButton.addEventListener("click", closeViewer);
prevPhotoButton.addEventListener("click", () => goToPhoto(-1));
nextPhotoButton.addEventListener("click", () => goToPhoto(1));
autoplayButton.addEventListener("click", toggleAutoplay);
startPresentationButton.addEventListener("click", () => openViewer(0));
startPresentationTopButton.addEventListener("click", () => openViewer(0));

viewer.addEventListener("click", (event) => {
  if (event.target === viewer) {
    closeViewer();
  }
});

viewer.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeViewer();
});

document.addEventListener("keydown", (event) => {
  if (!viewer.open) return;

  if (event.key === "ArrowRight") {
    goToPhoto(1);
  }

  if (event.key === "ArrowLeft") {
    goToPhoto(-1);
  }

  if (event.key === "Escape") {
    closeViewer();
  }

  if (event.key === " ") {
    event.preventDefault();
    toggleAutoplay();
  }
});


const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  }
);

function observeRevealElements() {
  document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
  });
}


renderGallery();
observeRevealElements();


const rootElement = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeToggleText = themeToggle?.querySelector(".theme-toggle-text");
const themeColorMeta = document.getElementById("themeColorMeta");
const pageProgressBar = document.getElementById("pageProgressBar");
const siteHeader = document.querySelector(".site-header");
const heroPhotoFrame = document.querySelector(".hero-photo-frame");

function getPreferredTheme() {
  const savedTheme = localStorage.getItem("exposicao-theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme, save = false) {
  const isDark = theme === "dark";

  rootElement.dataset.theme = theme;
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  themeToggle?.setAttribute(
    "aria-label",
    isDark ? "Ativar modo claro" : "Ativar modo escuro"
  );

  if (themeToggleText) {
    themeToggleText.textContent = isDark ? "Claro" : "Escuro";
  }

  if (themeColorMeta) {
    themeColorMeta.setAttribute("content", isDark ? "#121210" : "#f4f1ea");
  }

  if (save) {
    localStorage.setItem("exposicao-theme", theme);
  }
}

applyTheme(getPreferredTheme());

themeToggle?.addEventListener("click", () => {
  const nextTheme = rootElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme, true);
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
  if (!localStorage.getItem("exposicao-theme")) {
    applyTheme(event.matches ? "dark" : "light");
  }
});

let scrollTicking = false;

function updateScrollEffects() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  if (pageProgressBar) {
    pageProgressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }

  siteHeader?.classList.toggle("is-scrolled", scrollTop > 20);

  if (heroPhotoFrame && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const rect = heroPhotoFrame.getBoundingClientRect();
    const isNearViewport = rect.bottom > 0 && rect.top < window.innerHeight;

    if (isNearViewport) {
      const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
      const parallax = Math.max(-18, Math.min(18, -centerOffset * 0.035));
      heroPhotoFrame.style.setProperty("--parallax-y", `${parallax}px`);
    }
  }

  scrollTicking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!scrollTicking) {
      requestAnimationFrame(updateScrollEffects);
      scrollTicking = true;
    }
  },
  { passive: true }
);

window.addEventListener("resize", updateScrollEffects, { passive: true });
updateScrollEffects();

heroPhotoFrame?.addEventListener("pointermove", (event) => {
  const rect = heroPhotoFrame.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  heroPhotoFrame.style.setProperty("--pointer-x", `${x}%`);
  heroPhotoFrame.style.setProperty("--pointer-y", `${y}%`);
});

document.querySelectorAll(".art-card").forEach((card, index) => {
  const directions = ["up", "left", "scale", "right"];
  card.dataset.reveal = directions[index % directions.length];
  card.style.setProperty("--reveal-delay", `${(index % 3) * 85}ms`);
});
