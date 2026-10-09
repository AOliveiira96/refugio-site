/* =====================================================================
   CONFIGURAÇÃO DO SITE REFÚGIO
   Este é o ÚNICO arquivo que você precisa mexer no dia a dia:
   links de reserva, WhatsApp, Instagram e fotos.
   Depois de salvar, é só atualizar a página no navegador.
   ===================================================================== */

window.REFUGIO = {

  /* WhatsApp com DDI + DDD + número, só números. Ex.: "5521999998888".
     Enquanto estiver vazio, o botão de WhatsApp não aparece. */
  whatsapp: "5521000000000",   // NÚMERO FICTÍCIO: trocar pelo número real antes de divulgar o site

  imoveis: {

    arraial: {
      nome: "Refúgio Arraial",
      pagina: "arraial.html",
      airbnb: "https://www.airbnb.com.br/rooms/1606844707777208662",
      booking: "",   // cole aqui o link do Booking
      instagram: "https://www.instagram.com/refugio.arraialrj/",
      arroba: "@refugio.arraialrj",

      /* Fotos da galeria, na ordem em que aparecem.
         Basta salvar a foto na pasta img/arraial/ com o MESMO nome do arquivo abaixo.
         Se a foto ainda não existir, o site mostra um espaço reservado. */
      fotos: [
        { arquivo: "img/arraial/fachada.jpg",      legenda: "Fachada e garagem" },
        { arquivo: "img/arraial/sala.jpg",         legenda: "Sala integrada com mesa de jantar" },
        { arquivo: "img/arraial/sala-sofa.jpg",    legenda: "Sala de estar" },
        { arquivo: "img/arraial/cozinha.jpg",      legenda: "Cozinha completa" },
        { arquivo: "img/arraial/area-gourmet.jpg", legenda: "Área gourmet com churrasqueira" },
        { arquivo: "img/arraial/quintal.jpg",      legenda: "Quintal" },
        { arquivo: "img/arraial/banheiro.jpg",     legenda: "Banheiro" },
        { arquivo: "img/arraial/fechadura.jpg",    legenda: "Fechadura digital para self check-in" }
      ],
      quartos: [
        { arquivo: "img/arraial/quarto-1.jpg", legenda: "Quarto de casal", detalhe: "1 cama de casal" },
        { arquivo: "img/arraial/quarto-2.jpg", legenda: "Quarto família", detalhe: "4 camas de solteiro" }
      ],
      fotoLocal: { arquivo: "img/arraial/praia-dos-anjos.jpg", legenda: "Praia dos Anjos" }
    },

    carioca: {
      nome: "Refúgio Carioca",
      pagina: "carioca.html",
      airbnb: "",    // quando o anúncio sair, cole o link aqui e as reservas abrem sozinhas
      booking: "",
      instagram: "https://www.instagram.com/refugio.cariocarj/",
      arroba: "@refugio.cariocarj",
      fotos: [
        { arquivo: "img/carioca/foto-1.jpg", legenda: "Em breve" },
        { arquivo: "img/carioca/foto-2.jpg", legenda: "Em breve" },
        { arquivo: "img/carioca/foto-3.jpg", legenda: "Em breve" }
      ]
    },

    duocopa: {
      nome: "Refúgio Duo Copa",
      pagina: "duocopa.html",
      airbnb: "",
      booking: "",
      instagram: "https://www.instagram.com/refugio.duocopa/",
      arroba: "@refugio.duocopa",
      fotos: [
        { arquivo: "img/duocopa/foto-1.jpg", legenda: "Em breve" },
        { arquivo: "img/duocopa/foto-2.jpg", legenda: "Em breve" },
        { arquivo: "img/duocopa/foto-3.jpg", legenda: "Em breve" }
      ]
    }
  }
};
