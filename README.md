# kkjkeiso.github.io

Portfólio pessoal — neo-brutalismo preto e branco com pegada de TV de tubo (CRT sutil), organizado como uma locadora: prateleiras horizontais de **projetos**, **redes** e **contato**.

🔗 **Ao vivo em:** https://kkjkeiso.github.io

## Stack

HTML, CSS e JavaScript puros — sem build, sem framework. O GitHub Pages serve o repo direto.

## Como editar o conteúdo

Todo o conteúdo das prateleiras (projetos, redes, contato) fica num único objeto `CONFIG` no topo do `script.js`. Pra adicionar ou trocar um item, edite o array correspondente — cada item vira automaticamente um card na vitrine:

```js
{
  glyph: '01',            // "selo" grande mostrado na capa do card
  tag: 'HTML / CSS / JS',
  title: 'PORTFOLIO.EXE',
  desc: 'Descrição curta do item.',
  label: 'VER CÓDIGO →',
  href: 'https://...',    // omita e use disabled: true pra um card "em breve"
}
```

## Rodando localmente

Não precisa de nada instalado além de um servidor estático simples:

```bash
python3 -m http.server 3000
```

Depois abra `http://localhost:3000`.

## Licença

MIT — veja [LICENSE](LICENSE). Use, copie e adapte à vontade.

