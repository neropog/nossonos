# Nossa Exposição — template estático

Template de uma exposição fotográfica particular para aproximadamente 15 fotos.

## Arquivos

- `index.html` — estrutura da página
- `styles.css` — visual, responsividade e animações
- `script.js` — fotos, textos, galeria e apresentação
- `assets/images/` — coloque aqui as suas fotos

## Como trocar as fotos

A forma mais simples é substituir os arquivos:

- `foto-01.jpeg`
- `foto-02.jpeg`
- ...
- `foto-15.jpeg`

Mantenha exatamente os mesmos nomes. Assim, você não precisa mudar nenhuma linha de código.

## Como editar títulos e descrições

Abra `script.js` e edite o array `photos` no começo do arquivo.

Cada fotografia tem:

```js
{
  src: "assets/images/foto-01.jpeg",
  title: "Onde tudo começa",
  date: "Janeiro de 2024",
  place: "Nossa cidade",
  description: "Seu texto aqui."
}
```

## Como alterar o texto de abertura

No `index.html`, procure por:

- `Seu nome & nome dela`
- `2024 — 2026`
- `Sobre esta exposição`
- `Fim da exposição`

e substitua pelo conteúdo de vocês.

## Como testar no computador

Você pode clicar duas vezes em `index.html`.

Para uma experiência mais próxima da hospedagem, também pode iniciar um servidor local:

### Python

```bash
python -m http.server 8000
```

Depois abra:

```text
http://localhost:8000
```

## Render

Este projeto não precisa de Node.js, API nem servidor.

No Render:

1. Crie um **Static Site**.
2. Conecte o repositório.
3. Deixe **Build Command** vazio.
4. Use `.` como **Publish Directory**, se os arquivos estiverem na raiz.
5. Publique.

## Recursos incluídos

- Layout responsivo.
- Galeria com 15 fotos.
- Visualizador em tela cheia.
- Botões anterior/próximo.
- Navegação pelas teclas ← e →.
- ESC para fechar.
- Reprodução automática.
- Barra de progresso.
- Transição animada entre as fotos.
- Animações suaves ao rolar a página.
- Suporte a `prefers-reduced-motion`.

## Efeitos adicionados nesta versão

- Modo claro/escuro com botão no cabeçalho.
- Preferência de tema salva no navegador com `localStorage`.
- Usa o tema do sistema automaticamente na primeira visita.
- Barra fina de progresso no topo durante o scroll.
- Entrada animada do hero ao carregar a página.
- Elementos aparecem com fade, blur e movimento conforme entram na tela.
- Cards usam direções alternadas e atraso escalonado.
- Leve efeito parallax na fotografia principal.
- Reflexo de luz que acompanha o cursor no hero.
- Elevação/sombra e linha animada ao passar o mouse nas fotografias.
- Respeita `prefers-reduced-motion` para acessibilidade.
