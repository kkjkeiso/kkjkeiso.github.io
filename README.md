# kkjkeiso.github.io

Este é o portfólio pessoal do Keiso: um site de página única com visual neo-brutalista em preto e branco e uma pegada de TV de tubo antiga, com scanlines discretas e uma leve vinheta nas bordas. Em vez do clássico "sobre mim / projetos / contato", o conteúdo é organizado como as prateleiras de uma locadora de fitas — catálogos horizontais para projetos, redes sociais e canais de contato, cada um deles com cards no formato de capa de VHS. O site está no ar em https://kkjkeiso.github.io e é construído inteiramente com HTML, CSS e JavaScript puros, sem framework e sem etapa de build: o GitHub Pages serve os arquivos exatamente como estão no repositório.

Todo o conteúdo das prateleiras vive num único objeto chamado `CONFIG`, no topo do arquivo `script.js`. Adicionar ou trocar um item é só editar o array correspondente (`projetos`, `redes` ou `contato`) — cada objeto dentro dele vira automaticamente um card na vitrine, seguindo este formato:

```js
{
  glyph: '01',
  tag: 'HTML / CSS / JS',
  title: 'PORTFOLIO.EXE',
  desc: 'Descrição curta do item.',
  label: 'VER CÓDIGO →',
  href: 'https://...',
}
```

Pra deixar um card como "em breve", sem link clicável, basta omitir o `href` e adicionar `disabled: true`.

Como é um site inteiramente estático, sem `fetch`, módulos JS ou qualquer coisa que dependa de servidor, basta abrir o `index.html` direto no navegador — todas as funcionalidades, incluindo o modo escuro, funcionam normalmente. Se quiser simular com mais fidelidade o jeito como o GitHub Pages serve os arquivos de verdade (caminhos relativos e a sensibilidade a maiúsculas/minúsculas do sistema de arquivos do servidor), rodar por um servidor local simples é opcional:

```bash
python3 -m http.server 3000
```

Depois é só abrir `http://localhost:3000` no navegador.

O projeto é distribuído sob a licença MIT — o texto completo, em inglês (versão oficial) e em português (tradução de apoio), está em [LICENSE](LICENSE). Na prática, isso significa que qualquer pessoa pode usar, copiar, modificar e redistribuir este código livremente, inclusive para fins comerciais, desde que mantenha o aviso de direitos autorais original.

---

# kkjkeiso.github.io (English)

This is Keiso's personal portfolio: a single-page site with a black-and-white neo-brutalist look and an old cathode-ray-tube TV feel, with subtle scanlines and a soft vignette around the edges. Instead of the usual "about me / projects / contact" layout, the content is organized like the shelves of a video rental store — horizontal catalogs for projects, social profiles, and contact channels, each rendered as VHS-style cover cards. The site is live at https://kkjkeiso.github.io and built entirely with plain HTML, CSS, and JavaScript, with no framework and no build step: GitHub Pages simply serves the repository files as they are.

All of the shelf content lives in a single `CONFIG` object at the top of `script.js`. Adding or swapping an item just means editing the matching array (`projetos`, `redes`, or `contato`) — each object inside it automatically becomes a card in the showcase, following this shape:

```js
{
  glyph: '01',
  tag: 'HTML / CSS / JS',
  title: 'PORTFOLIO.EXE',
  desc: 'Short description of the item.',
  label: 'VIEW CODE →',
  href: 'https://...',
}
```

To leave a card as "coming soon", with no clickable link, just omit `href` and add `disabled: true`.

Since this is a fully static site with no `fetch` calls, JS modules, or anything depending on a server, just open `index.html` directly in a browser — every feature, including dark mode, behaves normally. If you'd rather more closely mirror how GitHub Pages actually serves the files (relative paths and the server's case-sensitive filesystem), serving it through a simple local server is optional:

```bash
python3 -m http.server 3000
```

Then open `http://localhost:3000` in your browser.

This project is distributed under the MIT license — the full text, in English (the official version) and Portuguese (a courtesy translation), lives in [LICENSE](LICENSE). In practice, that means anyone is free to use, copy, modify, and redistribute this code, including for commercial purposes, as long as the original copyright notice is kept.
