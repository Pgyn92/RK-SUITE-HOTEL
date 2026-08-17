/* =========================================================================
   RK Suite Hotel — configuração do site
   Único ficheiro a editar para ligar o motor de reservas e mudar contactos.
   ========================================================================= */
window.RK_CONFIG = {

  /* ---- MOTOR DE RESERVAS -------------------------------------------------
     Quando fechar com a Cloudbeds / SiteMinder / outro, cole aqui o URL.
     Enquanto estiver vazio, o botão "Reservar" leva ao formulário de contacto.

     Cloudbeds  -> "https://hotels.cloudbeds.com/reservation/XXXXXX"
     SiteMinder -> "https://app.thebookingbutton.com/properties/XXXXXX"
  ---------------------------------------------------------------------- */
  BOOKING_URL: "",
  BOOKING_TARGET: "_blank",     // "_blank" abre em nova janela, "_self" na mesma

  /* ---- FORMULÁRIOS -------------------------------------------------------
     Endpoint que recebe os formulários de contacto / RFP / check-in.
     Vazio  -> os formulários abrem o cliente de email do visitante (mailto).
     Netlify -> deixe vazio e acrescente data-netlify="true" ao <form>.
     Formspree -> "https://formspree.io/f/XXXXXXX"
  ---------------------------------------------------------------------- */
  FORM_ENDPOINT: "",

  /* ---- CONTACTOS --------------------------------------------------------- */
  EMAIL:    "recepcao_rk@bluoshen.co.ao",
  PHONE:    "+244 918 806 165",
  WHATSAPP: "",                 // ex: "244923000000" — vazio esconde o botão

  /* ---- ANALYTICS ---------------------------------------------------------
     Vazio = nenhum script de terceiros é carregado.
  ---------------------------------------------------------------------- */
  GA4_ID: ""
};
