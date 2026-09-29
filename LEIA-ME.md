# Site Refúgio — guia rápido

Site das hospedagens **Refúgio Arraial**, **Refúgio Carioca** e **Refúgio Duo Copa**.
É um site estático: só HTML, CSS e JavaScript. Não precisa de servidor, banco de dados nem mensalidade.

---

## 1. Como os arquivos estão organizados

```
refugio-site/
├── index.html        → página inicial (os 3 refúgios, como reservar, contato)
├── arraial.html      → página completa do Refúgio Arraial
├── carioca.html      → página do Refúgio Carioca (em obras)
├── duocopa.html      → página do Refúgio Duo Copa (em obras)
├── css/
│   └── style.css     → cores, fontes e layout de todo o site
├── js/
│   ├── config.js     → ⭐ LINKS, WHATSAPP E FOTOS (o arquivo que você mais vai mexer)
│   └── main.js       → funcionalidades (menu do celular, galeria, visualizador, botões)
└── img/
    ├── favicon.svg   → ícone da aba do navegador
    ├── logos/        → logos dos 3 refúgios
    ├── arraial/      → fotos do Refúgio Arraial
    ├── carioca/      → fotos do Refúgio Carioca
    └── duocopa/      → fotos do Refúgio Duo Copa
```

---

## 2. Abrir no VS Code

1. Descompacte o arquivo `refugio-site.zip` numa pasta fácil de achar, por exemplo `Documentos/refugio-site`.
2. Abra o VS Code → menu **Arquivo → Abrir Pasta…** → escolha a pasta `refugio-site`.
3. Instale a extensão **Live Server** (ícone de quadradinhos na barra lateral → pesquise "Live Server" → Instalar).
4. Abra o `index.html` e clique em **Go Live**, no canto inferior direito.
   O site abre no navegador e **atualiza sozinho** toda vez que você salvar um arquivo (Ctrl+S).

---

## 3. Tarefas do dia a dia

### Colocar as fotos do Refúgio Arraial
Não precisa mexer em código. Salve as fotos dentro de `img/arraial/` com estes nomes exatos:

| Arquivo              | Onde aparece                     |
|----------------------|----------------------------------|
| `fachada.jpg`        | Foto grande da galeria           |
| `area-gourmet.jpg`   | Galeria                          |
| `sala.jpg`           | Galeria                          |
| `cozinha.jpg`        | Galeria                          |
| `banheiro.jpg`       | Galeria                          |
| `quarto-1.jpg`       | Quarto 1 (cama de casal)         |
| `quarto-2.jpg`       | Quarto 2 (4 camas de solteiro)   |
| `praia-dos-anjos.jpg`| Seção "A casa"                   |

Enquanto uma foto não existir, o site mostra um quadro "Foto em breve" no lugar.
Dica: antes de colocar, reduza as fotos para uns 1600 px de largura (ex.: no site squoosh.app) para o site carregar rápido.

Quer mais fotos, ou nomes diferentes? Abra `js/config.js` e edite a lista `fotos` do imóvel.

### Colocar o link do Booking
Em `js/config.js`, no bloco `arraial`, cole o link entre as aspas:
```js
booking: "https://www.booking.com/hotel/br/....html",
```
O botão **Reservar no Booking** aparece sozinho em todo o site.

### Ativar o WhatsApp
Em `js/config.js`, no topo:
```js
whatsapp: "5521999998888",
```
(55 + DDD + número, só números). Aparece o botão verde flutuante em todas as páginas e o cartão de WhatsApp no Contato.

### Abrir as reservas do Carioca ou do Duo Copa
Quando o anúncio sair, cole o link do Airbnb (e/ou Booking) no bloco do imóvel em `js/config.js`.
Automaticamente:
- o selo muda de "Em obras · em breve" para **"Reservas abertas"**;
- o botão "Acompanhar no Instagram" vira **"Reservar no Airbnb"**.

Depois, no `carioca.html` ou `duocopa.html`, troque o texto "em obras" da capa e o aviso da reforma.
Se quiser uma página completa igual à do Arraial, copie o `arraial.html` e adapte os textos.

### Mudar uma cor do site inteiro
Em `css/style.css`, no começo, ficam as variáveis (`--ouro`, `--areia`, `--cinza`…). Mude o código da cor e ela muda em todo lugar.

---

## 4. Colocar no ar (grátis)

### Opção A — Netlify Drop (mais fácil, 2 minutos)
1. Acesse **app.netlify.com/drop** e crie uma conta (pode entrar com o GitHub).
2. **Arraste a pasta `refugio-site` inteira** para a página.
3. Pronto: o site ganha um endereço como `nome-aleatorio.netlify.app`.
   Em **Site configuration → Change site name** você troca para algo como `refugio-hospedagens.netlify.app`.
4. Para atualizar depois: no painel do site, aba **Deploys**, arraste a pasta de novo.

### Opção B — GitHub Pages (você já usa o GitHub)
1. No GitHub, clique em **New repository** → nome `refugio-site` → **Public** → Create.
2. Na página do repositório, clique em **uploading an existing file** e arraste **o conteúdo** da pasta
   (o `index.html` tem que ficar na raiz, não dentro de outra pasta). **Commit changes**.
3. Vá em **Settings → Pages** → em *Branch* escolha `main` e `/ (root)` → **Save**.
4. Em 1 ou 2 minutos o site fica em `https://SEU-USUARIO.github.io/refugio-site/`.
5. Para atualizar: envie os arquivos alterados do mesmo jeito (ou use o controle de versão do VS Code: aba de *Source Control* → escrever mensagem → *Commit* → *Sync*).

### Endereço próprio (opcional, ~R$ 40 por ano)
1. Registre o domínio no **registro.br** (ex.: `refugiohospedagens.com.br`).
2. No Netlify: **Domain management → Add a domain** e siga as instruções de DNS que ele mostra.
   No GitHub Pages: **Settings → Pages → Custom domain**.
3. O HTTPS (cadeado) é ativado de graça pelas duas plataformas.

### Depois de publicar
Nos 4 arquivos `.html`, troque `https://SEU-ENDERECO/` pelo endereço real (linha `og:image`).
Assim a logo aparece quando alguém compartilhar o link no WhatsApp.
Dica do VS Code: **Ctrl+Shift+H** faz "localizar e substituir" em todos os arquivos de uma vez.

---

## 5. O que o site já faz
- Menu que vira "hambúrguer" no celular e cabeçalho fixo no topo
- Galeria com foto em destaque e **visualizador em tela cheia** (setas do teclado, deslizar no celular, Esc para fechar)
- Botões de reserva e selos de status gerados a partir do `config.js`
- Espaço reservado automático para fotos que ainda não existem
- Botão flutuante de WhatsApp com mensagem pronta
- Página de cada refúgio com links para os outros
- Pronto para compartilhamento (título e descrição para WhatsApp e redes sociais)
