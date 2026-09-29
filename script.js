/*
 * Conteúdo da vitrine. Edite os arrays abaixo pra adicionar/trocar itens —
 * cada shelf (projetos, redes, contato) vira uma prateleira que rola na horizontal.
 */
const CONFIG = {
  taglines: [
    'DESENVOLVENDO DIA APÓS DIA',
    'FORMAÇÃO TÉCNICA EM DESENVOLVIMENTO DE SOFTWARE',
    'SOLUCIONANDO PROBLEMAS REAIS',
    'TODOS OS CAMINHOS TE LEVAM À INOVAÇÃO',
  ],

  shelves: {
    projetos: [
      {
        glyph: '01',
        tag: 'HTML / CSS / JS',
        title: 'ÓTICAS GOMES',
        desc: 'Website desenvolvido para as Óticas Gomes - RN',
        label: 'VER WEBSITE →',
        href: 'https://kkjkeiso.github.io/oticas-gomes'
      },
      {
        glyph: '02',
        tag: 'HTML / CSS / JS',
        title: 'PORTFOLIO',
        desc: 'Portfólio de design neo-brutalism com estética de TV de tubo.',
        label: 'VER CÓDIGO →',
        href: 'https://github.com/kkjkeiso/kkjkeiso.github.io',
      },
      {
        glyph: '03',
        tag: 'JAVASCRIPT',
        title: 'THERMINAL RPG',
        desc: 'Forje sua própria aventura em um RPG de terminal!',
        label: 'VER CÓDIGO →',
        href: 'https://github.com/kkjkeiso/therminal-rpg',
      },
      {
        glyph: '04',
        tag: 'HTML / CSS / JS',
        title: 'ASSEGURA LINK',
        desc: 'Ferramenta web para verificação de segurança de links.',
        label: 'VER CÓDIGO →',
        href: 'https://github.com/kkjkeiso/assegura-link',
      },
      {
        glyph: '05',
        tag: 'EM PRODUÇÃO',
        title: 'PHASE',
        desc: 'Plataforma Heurística de Avaliação, Suporte e Educação.',
        label: 'EM BREVE',
        disabled: true,
      },
      {
        glyph: '??',
        tag: 'EM PRODUÇÃO',
        title: 'PRÓXIMA FITA',
        desc: 'Espaço reservado para o próximo projeto da coleção.',
        label: 'EM BREVE',
        disabled: true,
      },
    ],

    redes: [
      {
        glyph: 'In',
        tag: 'PERFIL',
        title: 'LINKEDIN',
        desc: 'Keyrrison Costa — experiência, projetos e serviços de desenvolvimento web.',
        label: 'SEGUIR →',
        href: 'https://www.linkedin.com/in/keyrrison-costa-07901638a/',
      },
      {
        glyph: 'GH',
        tag: 'PERFIL',
        title: 'GITHUB',
        desc: '@kkjkeiso — repositórios, contribuições e histórico de desenvolvimento.',
        label: 'SEGUIR →',
        href: 'https://github.com/kkjkeiso',
      },
      {
        glyph: 'IG',
        tag: 'PERFIL',
        title: 'INSTAGRAM',
        desc: '@keisodev — projetos, bastidores e o dia a dia como desenvolvedor.',
        label: 'SEGUIR →',
        href: 'https://www.instagram.com/keisodev/',
      },
      {
        glyph: 'X',
        tag: 'PERFIL',
        title: 'X',
        desc: '@kkjkeiso — código, tecnologia e o que estou construindo.',
        label: 'SEGUIR →',
        href: 'https://x.com/kkjkeiso',
      },
    ],

    contato: [
      {
        glyph: 'WA',
        tag: 'WHATSAPP',
        title: 'WHATSAPP',
        desc: 'Resposta mais rápida. Peça seu orçamento de site ou sistema por aqui.',
        label: 'ORÇAMENTO →',
        href: 'https://wa.me/5584994785695?text=Ol%C3%A1!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento.',
      },
      {
        glyph: 'IG',
        tag: 'INSTAGRAM',
        title: 'DIRECT',
        desc: 'Prefere pelo instagram? Envie um direct para @keisodev e faça já seu orçamento.',
        label: 'ABRIR DIRECT →',
        href: 'https://ig.me/m/keisodev',
      },
      {
        glyph: '@',
        tag: 'E-MAIL',
        title: 'E-MAIL',
        desc: 'Para propostas, parcerias e orçamentos com mais detalhes.',
        label: 'ENVIAR E-MAIL →',
        href: 'mailto:keiso.developer@icloud.com?subject=Or%C3%A7amento',
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

  // Só no mouse: touch já tem scroll nativo do navegador (com snap e
  // momentum próprios) — aplicar scrollLeft manual junto com ele é o que
  // causava aquele "flick" no celular, os dois brigando pela mesma rolagem.
  shelfEl.addEventListener('mousedown', (e) => onDown(e.pageX));
  window.addEventListener('mousemove', (e) => onMove(e.pageX));
  window.addEventListener('mouseup', onUp);

  // Evita clique fantasma em links depois de arrastar com o mouse
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

function syncHeaderHeightVar() {
  const header = document.querySelector('.tv-bar');
  if (!header) return;

  const update = () => {
    document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
  };

  update();
  window.addEventListener('resize', update);
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  syncHeaderHeightVar();

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
