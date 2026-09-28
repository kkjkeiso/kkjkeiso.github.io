/*
 * Conteúdo da vitrine. Edite os arrays abaixo pra adicionar/trocar itens —
 * cada shelf (projetos, redes, contato) vira uma prateleira que rola na horizontal.
 */
const CONFIG = {
  taglines: [
    'APRENDENDO SPRING BOOT NA MARRA',
    'ESCREVENDO JAVA TODO DIA',
    'AUTODIDATA DESDE JANEIRO DE 2025',
    'CONSTRUINDO COISA DE VERDADE, NÃO SÓ TUTORIAL',
  ],

  shelves: {
    projetos: [
      {
        glyph: '01',
        tag: 'HTML / CSS / JS',
        title: 'PORTFOLIO.EXE',
        desc: 'Este site que você tá vendo agora. Neo-brutalismo + vibe de TV de tubo, feito do zero.',
        label: 'VER CÓDIGO →',
        href: 'https://github.com/kkjkeiso/kkjkeiso.github.io',
      },
      {
        glyph: '??',
        tag: 'EM PRODUÇÃO',
        title: 'PRÓXIMA FITA',
        desc: 'Novo projeto sendo gravado. Volta aqui em breve.',
        label: 'EM BREVE',
        disabled: true,
      },
      {
        glyph: '??',
        tag: 'EM PRODUÇÃO',
        title: 'PRÓXIMA FITA',
        desc: 'Espaço reservado pro próximo projeto na estante.',
        label: 'EM BREVE',
        disabled: true,
      },
    ],

    redes: [
      {
        glyph: 'GH',
        tag: 'PERFIL',
        title: 'GITHUB',
        desc: '@kkjkeiso — repositórios, commits e o histórico de aprendizado.',
        label: 'SEGUIR →',
        href: 'https://github.com/kkjkeiso',
      },
      {
        glyph: '??',
        tag: 'EM BREVE',
        title: 'NOVA REDE',
        desc: 'Espaço reservado — Instagram, X ou LinkedIn entram aqui.',
        label: 'EM BREVE',
        disabled: true,
      },
    ],

    contato: [
      {
        glyph: '@',
        tag: 'E-MAIL',
        title: 'FALA COMIGO',
        desc: 'Pra proposta de projeto, freela ou só trocar ideia sobre dev.',
        label: 'ENVIAR E-MAIL →',
        href: 'mailto:keiso.developer@icloud.com',
      },
      {
        glyph: '??',
        tag: 'EM BREVE',
        title: 'OUTRO CANAL',
        desc: 'Espaço reservado — WhatsApp, Discord ou o que preferir.',
        label: 'EM BREVE',
        disabled: true,
      },
    ],
  },
};

function renderShelf(sectionEl, items) {
  const shelfEl = sectionEl.querySelector('.shelf');
  shelfEl.innerHTML = items
    .map((item) => {
      const tagName = item.disabled ? 'div' : 'a';
      const hrefAttr = item.href ? `href="${item.href}" target="_blank" rel="noopener noreferrer"` : '';
      const disabledClass = item.disabled ? ' tape--disabled' : '';

      return `
        <${tagName} class="tape${disabledClass}" role="listitem" ${hrefAttr}>
          <div class="tape__window"><span class="tape__glyph">${item.glyph}</span></div>
          <div class="tape__body">
            <span class="tape__tag">${item.tag}</span>
            <h3 class="tape__title">${item.title}</h3>
            <p class="tape__desc">${item.desc}</p>
            <span class="tape__label">${item.label}</span>
          </div>
        </${tagName}>
      `;
    })
    .join('');
}

function enableDragScroll(shelfEl) {
  let isDown = false;
  let startX = 0;
  let scrollStart = 0;
  let moved = false;

  const onDown = (x) => {
    isDown = true;
    moved = false;
    startX = x;
    scrollStart = shelfEl.scrollLeft;
  };

  const onMove = (x) => {
    if (!isDown) return;
    const delta = x - startX;
    if (Math.abs(delta) > 4) moved = true;
    shelfEl.scrollLeft = scrollStart - delta;
  };

  const onUp = () => {
    isDown = false;
  };

  shelfEl.addEventListener('mousedown', (e) => onDown(e.pageX));
  window.addEventListener('mousemove', (e) => onMove(e.pageX));
  window.addEventListener('mouseup', onUp);

  shelfEl.addEventListener('touchstart', (e) => onDown(e.touches[0].pageX), { passive: true });
  shelfEl.addEventListener('touchmove', (e) => onMove(e.touches[0].pageX), { passive: true });
  shelfEl.addEventListener('touchend', onUp);

  // Evita clique fantasma em links depois de arrastar
  shelfEl.addEventListener(
    'click',
    (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    true
  );
}

function startTypewriter(el, phrases) {
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const current = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(tick, deleting ? 35 : 55);
  };

  tick();
}

function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const STORAGE_KEY = 'keiso-theme';

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      toggleBtn.textContent = '☀ MODO DIA';
      toggleBtn.setAttribute('aria-pressed', 'true');
    } else {
      document.documentElement.removeAttribute('data-theme');
      toggleBtn.textContent = '☾ MODO NOITE';
      toggleBtn.setAttribute('aria-pressed', 'false');
    }
  };

  const stored = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(stored || (prefersDark ? 'dark' : 'light'));

  toggleBtn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();

  document.querySelectorAll('.shelf-section').forEach((section) => {
    const key = section.dataset.shelf;
    const items = CONFIG.shelves[key];
    if (!items) return;
    renderShelf(section, items);
    enableDragScroll(section.querySelector('.shelf'));
  });

  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) startTypewriter(typewriterEl, CONFIG.taglines);

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
