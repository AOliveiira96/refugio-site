/* =====================================================================
   FUNCIONALIDADES DO SITE
   Você não precisa mexer aqui para trocar links ou fotos (isso fica em js/config.js).
   ===================================================================== */
(function () {
  const CFG = window.REFUGIO || { imoveis: {} };
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

  /* ---------- Menu no celular ---------- */
  const botaoMenu = $(".menu-toggle");
  const menu = $("#menu");
  if (botaoMenu && menu) {
    botaoMenu.addEventListener("click", () => {
      const aberto = botaoMenu.getAttribute("aria-expanded") === "true";
      botaoMenu.setAttribute("aria-expanded", String(!aberto));
      menu.classList.toggle("aberto", !aberto);
    });
    $$("a", menu).forEach(a => a.addEventListener("click", () => {
      botaoMenu.setAttribute("aria-expanded", "false");
      menu.classList.remove("aberto");
    }));
  }

  /* ---------- Cabeçalho ganha sombra ao rolar ---------- */
  const cab = $(".cabecalho");
  const aoRolar = () => cab && cab.classList.toggle("rolou", window.scrollY > 10);
  window.addEventListener("scroll", aoRolar, { passive: true });
  aoRolar();

  /* ---------- Botões de reserva ----------
     <div data-reservar="arraial"></div> vira os botões do Airbnb / Booking.
     Se o imóvel ainda não tem anúncio, mostra "Reservas em breve" + Instagram. */
  function link(href, texto, classe) {
    const a = document.createElement("a");
    a.href = href; a.className = classe; a.textContent = texto;
    a.target = "_blank"; a.rel = "noopener";
    return a;
  }
  $$("[data-reservar]").forEach(caixa => {
    const im = CFG.imoveis[caixa.dataset.reservar];
    if (!im) return;
    const compacto = caixa.hasAttribute("data-compacto");
    const tam = compacto ? " btn-sm" : "";
    if (im.airbnb) caixa.append(link(im.airbnb, "Reservar no Airbnb", "btn btn-cheio" + tam));
    if (im.booking) caixa.append(link(im.booking, "Reservar no Booking", "btn btn-contorno" + tam));
    if (!im.airbnb && !im.booking) {
      caixa.append(link(im.instagram, "Acompanhar no Instagram", "btn btn-cheio" + tam));
    }
  });

  /* Selo de status automático: "Reservas abertas" ou "Em obras · em breve" */
  $$("[data-status]").forEach(el => {
    const im = CFG.imoveis[el.dataset.status];
    if (!im) return;
    const aberto = !!(im.airbnb || im.booking);
    el.textContent = aberto ? "Reservas abertas" : "Em obras · em breve";
    el.classList.add(aberto ? "selo-aberto" : "selo-obra");
  });

  /* ---------- Fotos ----------
     Se o arquivo não existir ainda, troca por um espaço reservado bonito. */
  function figura(foto, extraClasse = "") {
    const fig = document.createElement("figure");
    fig.className = "foto " + extraClasse;
    const moldura = document.createElement("div");
    moldura.className = "foto-img";
    const img = new Image();
    img.src = foto.arquivo; img.alt = foto.legenda; img.loading = "lazy"; img.decoding = "async";
    img.addEventListener("error", () => {
      fig.classList.add("sem-foto");
      img.remove();
      const aviso = document.createElement("span");
      aviso.className = "foto-reservada";
      aviso.textContent = foto.legenda;
      moldura.append(aviso);
    });
    moldura.append(img);
    fig.append(moldura);
    if (foto.detalhe || extraClasse.includes("com-legenda")) {
      const cap = document.createElement("figcaption");
      const b = document.createElement("b"); b.textContent = foto.legenda; cap.append(b);
      if (foto.detalhe) { const s = document.createElement("span"); s.textContent = foto.detalhe; cap.append(s); }
      fig.append(cap);
    }
    return fig;
  }

  const lista = []; // todas as fotos clicáveis da página, para o visualizador
  function registrar(fig, foto) {
    const i = lista.push({ foto, fig }) - 1;
    fig.tabIndex = 0;
    fig.setAttribute("role", "button");
    fig.setAttribute("aria-label", "Ampliar foto: " + foto.legenda);
    const abrir = () => { if (!fig.classList.contains("sem-foto")) abrirVisualizador(i); };
    fig.addEventListener("click", abrir);
    fig.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrir(); } });
  }

  $$("[data-galeria]").forEach(caixa => {
    const im = CFG.imoveis[caixa.dataset.galeria];
    if (!im) return;
    im.fotos.forEach((f, i) => {
      const fig = figura(f, i === 0 ? "destaque" : "");
      registrar(fig, f); caixa.append(fig);
    });
  });
  $$("[data-quartos]").forEach(caixa => {
    const im = CFG.imoveis[caixa.dataset.quartos];
    (im && im.quartos || []).forEach(f => { const fig = figura(f, "com-legenda"); registrar(fig, f); caixa.append(fig); });
  });
  $$("[data-foto-local]").forEach(caixa => {
    const im = CFG.imoveis[caixa.dataset.fotoLocal];
    if (im && im.fotoLocal) { const fig = figura(im.fotoLocal); registrar(fig, im.fotoLocal); caixa.append(fig); }
  });

  /* ---------- Visualizador de fotos em tela cheia ---------- */
  let atual = 0;
  const vis = document.createElement("div");
  vis.className = "visualizador"; vis.hidden = true;
  vis.setAttribute("role", "dialog"); vis.setAttribute("aria-modal", "true"); vis.setAttribute("aria-label", "Fotos");
  vis.innerHTML = `
    <button class="vis-fechar" aria-label="Fechar">×</button>
    <button class="vis-seta vis-ant" aria-label="Foto anterior">‹</button>
    <figure><img alt=""><figcaption></figcaption></figure>
    <button class="vis-seta vis-prox" aria-label="Próxima foto">›</button>`;
  document.body.append(vis);
  const visImg = $("img", vis), visCap = $("figcaption", vis);

  function comFoto() { return lista.map((_, i) => i).filter(i => !lista[i].fig.classList.contains("sem-foto")); }
  function mostrar(i) {
    atual = i;
    const f = lista[i].foto;
    visImg.src = f.arquivo; visImg.alt = f.legenda;
    visCap.textContent = f.legenda;
  }
  function abrirVisualizador(i) { mostrar(i); vis.hidden = false; document.body.style.overflow = "hidden"; $(".vis-fechar", vis).focus(); }
  function fechar() { vis.hidden = true; document.body.style.overflow = ""; }
  function passo(d) {
    const ok = comFoto(); if (!ok.length) return;
    const pos = ok.indexOf(atual);
    mostrar(ok[(pos + d + ok.length) % ok.length]);
  }
  $(".vis-fechar", vis).addEventListener("click", fechar);
  $(".vis-ant", vis).addEventListener("click", () => passo(-1));
  $(".vis-prox", vis).addEventListener("click", () => passo(1));
  vis.addEventListener("click", e => { if (e.target === vis) fechar(); });
  document.addEventListener("keydown", e => {
    if (vis.hidden) return;
    if (e.key === "Escape") fechar();
    if (e.key === "ArrowLeft") passo(-1);
    if (e.key === "ArrowRight") passo(1);
  });
  let toqueX = null;
  vis.addEventListener("touchstart", e => { toqueX = e.touches[0].clientX; }, { passive: true });
  vis.addEventListener("touchend", e => {
    if (toqueX === null) return;
    const dx = e.changedTouches[0].clientX - toqueX;
    if (Math.abs(dx) > 50) passo(dx < 0 ? 1 : -1);
    toqueX = null;
  });

  /* ---------- WhatsApp ---------- */
  if (CFG.whatsapp) {
    const numero = CFG.whatsapp.replace(/\D/g, "");
    const msg = encodeURIComponent("Olá! Vi o site do Refúgio e quero saber sobre disponibilidade.");
    const url = `https://wa.me/${numero}?text=${msg}`;
    const flut = link(url, "", "whatsapp-flutuante");
    flut.setAttribute("aria-label", "Falar no WhatsApp");
    flut.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>`;
    document.body.append(flut);
    $$("[data-whatsapp]").forEach(el => {
      el.hidden = false;
      const a = $("a", el); if (a) a.href = url;
      const n = $("[data-whatsapp-numero]", el);
      if (n) n.textContent = "+" + numero.replace(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/, "$1 ($2) $3-$4");
    });
  }

  /* ---------- Abrir sempre no topo ----------
     Se o endereço tiver #algo (ex.: #contato), o navegador pula direto para essa seção,
     inclusive ao recarregar a página. Aqui o site rola até a seção uma vez e depois
     tira o #algo do endereço, para a próxima abertura começar no topo. */
  if ("scrollRestoration" in history) history.scrollRestoration = "manual"; // não lembrar a rolagem antiga
  function limparHash() { history.replaceState(null, "", location.pathname + location.search); }
  window.addEventListener("load", () => {
    if (location.hash) {
      const alvo = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (alvo) alvo.scrollIntoView();
      limparHash();
    } else {
      window.scrollTo(0, 0);
    }
  });
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href*="#"]');
    if (!link) return;
    const url = new URL(link.href);
    if (url.pathname !== location.pathname || !url.hash) return; // link para outra página: deixa normal
    const alvo = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!alvo) return;
    e.preventDefault();
    alvo.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    limparHash();
  });

  /* ---------- Ano no rodapé ---------- */
  $$("[data-ano]").forEach(el => el.textContent = new Date().getFullYear());
})();
