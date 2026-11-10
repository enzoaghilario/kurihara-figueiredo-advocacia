# Kurihara Figueiredo Advocacia

Projeto: site institucional do Grupo Kurihara e Figueiredo (página única, em português do Brasil).

O site JÁ ESTÁ PRONTO e aprovado. Ele está no arquivo anexo `index.html` (HTML + CSS + JS em um único arquivo). A tarefa NÃO é criar um design novo: é PORTAR esse arquivo para este projeto com fidelidade total, pixel a pixel. Não redesenhe, não "melhore", não troque textos, não adicione nem remova seções.

Regras de portabilidade:

1. Conteúdo: mantenha TODOS os textos exatamente como estão no anexo (títulos, parágrafos, as 12 áreas de atuação com suas descrições, os 4 passos de "Como trabalhamos", dados de contato, rodapé). Idioma do documento: `lang="pt-BR"`.

2. Estilo: copie o CSS do anexo literalmente para `src/index.css` (variáveis em `:root`, nomes de classe em português como `.topo`, `.marca`, `.abertura`, `.secao`, `.escuro`, `.grupo`, `.areas`, `.frente`, `.area`, `.metodo`, `.passos`, `.contato`, `.montar`, `.chips`, `.previa`, `.dados`, `.rodape`, `.flutuante`). Use essas mesmas classes no JSX. Não converta para utilitários Tailwind, não use componentes shadcn/ui, não aplique tema padrão, não adicione sombras, gradientes, cantos arredondados, ícones ou animações que não estejam no anexo. Garanta que o reset/base do Tailwind e as variáveis de tema do template não alterem cores, fontes, margens ou bordas do site (preto puro #000, branco puro #fff, bronze só no "&").

3. Fontes: Google Fonts Montserrat (500–800) e EB Garamond (400/500, normal e itálico), com os mesmos `<link>` de preconnect e stylesheet do anexo no `index.html` do projeto.

4. `<head>`: mantenha title, meta description, theme-color, Open Graph e o bloco JSON-LD (ProfessionalService) do anexo. Mantenha também o `<svg>` de símbolos (ícones `#i-whats` etc.) e o link "pular para o conteúdo".

5. Comportamentos (hoje em um `<script>` no fim do anexo) — reimplemente em React com o mesmo resultado:
   - classe `js` no elemento `<html>` (o CSS depende dela);
   - cabeçalho fixo que ganha a classe `rolou` ao rolar mais de 8px;
   - menu do celular (botão "Menu"/"Fechar", `aria-expanded`, fecha ao clicar em um link e com Esc);
   - acordeão das áreas: só uma aberta por vez, `aria-expanded`, animação por `grid-template-rows`; cada área tem link de WhatsApp com a mensagem "Olá, gostaria de falar sobre {área}." (use os `data-msg` do anexo);
   - compositor de mensagem do contato: chips com `aria-pressed` (rótulos dos `data-curto`), prévia do texto e botão que abre o WhatsApp com a mensagem montada, exatamente com a mesma lógica de texto do anexo;
   - botão flutuante do WhatsApp que só aparece (classe `visivel`) depois de rolar mais de 60% da altura da tela;
   - todos os links de WhatsApp no formato `https://api.whatsapp.com/send?phone=5516988014617&text=<mensagem codificada>`;
   - animação de entrada apenas na abertura (hero), respeitando `prefers-reduced-motion`.

6. Estrutura: uma única rota `/`. Pode dividir em componentes (Topo, Abertura, Grupo, Areas, Metodo, Contato, Rodape), mas a marcação HTML resultante e a ordem das seções devem ser as do anexo (âncoras `#inicio`, `#grupo`, `#areas`, `#metodo`, `#contato`). Sem backend, sem banco de dados, sem autenticação, sem formulários que enviem dados.

7. Não invente nada: nenhum número, depoimento, endereço, e-mail, foto ou logotipo que não esteja no anexo.

Ao terminar, confira o resultado comparando com o anexo em 1366px e em 375px de largura.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f1b11dbb-c93b-4edf-ad65-768ef523a417).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
