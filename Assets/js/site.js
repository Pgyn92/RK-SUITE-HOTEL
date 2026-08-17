/* RK Suite Hotel — comportamento do site. Sem dependências. */
(function () {
  "use strict";
  var CFG = window.RK_CONFIG || {};
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  document.addEventListener("DOMContentLoaded", function () {

    /* ---------- ano no rodapé ---------- */
    $$("[data-year]").forEach(function (e) { e.textContent = new Date().getFullYear(); });

    /* ---------- menu mobile ---------- */
    var tog = $(".nav-toggle"), nav = $("#nav");
    if (tog && nav) {
      tog.addEventListener("click", function () {
        var open = tog.getAttribute("aria-expanded") === "true";
        tog.setAttribute("aria-expanded", String(!open));
        nav.classList.toggle("is-open", !open);
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") { tog.setAttribute("aria-expanded", "false"); nav.classList.remove("is-open"); }
      });
    }

    /* ---------- botão Reservar ---------- */
    $$("[data-book]").forEach(function (a) {
      if (CFG.BOOKING_URL) {
        a.href = CFG.BOOKING_URL;
        a.target = CFG.BOOKING_TARGET || "_blank";
        a.rel = "noopener";
      } else {
        var pt = document.documentElement.lang === "pt";
        var root = a.getAttribute("href") === "#" ? "" : "";
        a.href = (location.pathname.indexOf("/pt/") > -1 || pt)
          ? (pt && location.pathname.split("/").length > 3 ? "../contacto.html" : "contacto.html")
          : "contact.html";
        // caminho seguro: usa o link de Contacto do menu
        var navContact = $$("#nav a").filter(function (x) {
          return /contact|contacto/i.test(x.getAttribute("href") || "");
        })[0];
        if (navContact) a.href = navContact.getAttribute("href");
      }
    });

    /* ---------- slider do hero ---------- */
    $$("[data-slider]").forEach(function (hero) {
      var slides = $$(".hero__slide", hero);
      if (slides.length < 2) return;
      var dots = $$(".hero__dots button", hero), i = 0, timer = null;
      function go(n) {
        i = (n + slides.length) % slides.length;
        slides.forEach(function (s, k) { s.classList.toggle("is-active", k === i); });
        dots.forEach(function (d, k) { d.classList.toggle("is-active", k === i); });
      }
      function play() { stop(); timer = setInterval(function () { go(i + 1); }, 6000); }
      function stop() { if (timer) clearInterval(timer); }
      dots.forEach(function (d, k) { d.addEventListener("click", function () { go(k); play(); }); });
      var p = $(".hero__arrow--prev", hero), n = $(".hero__arrow--next", hero);
      if (p) p.addEventListener("click", function () { go(i - 1); play(); });
      if (n) n.addEventListener("click", function () { go(i + 1); play(); });
      hero.addEventListener("mouseenter", stop);
      hero.addEventListener("mouseleave", play);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) play();
    });

    /* ---------- lightbox da galeria ---------- */
    var lb = $(".lightbox");
    if (lb) {
      var lbImg = $("img", lb), lbCount = $(".lightbox__count", lb);
      var items = [], cur = 0;
      function open(list, idx) {
        items = list; cur = idx;
        show(); lb.classList.add("is-open");
        document.body.style.overflow = "hidden";
      }
      function show() {
        var b = items[cur];
        lbImg.src = b.getAttribute("data-full");
        lbImg.alt = ($("img", b) || {}).alt || "";
        lbCount.textContent = (cur + 1) + " / " + items.length;
      }
      function close() { lb.classList.remove("is-open"); lbImg.src = ""; document.body.style.overflow = ""; }
      function move(d) { cur = (cur + d + items.length) % items.length; show(); }

      $$("[data-gallery]").forEach(function (g) {
        var list = $$(".gallery__item", g);
        list.forEach(function (b, k) {
          b.addEventListener("click", function () { open(list, k); });
        });
      });
      $(".lightbox__close", lb).addEventListener("click", close);
      $(".lightbox__nav--prev", lb).addEventListener("click", function () { move(-1); });
      $(".lightbox__nav--next", lb).addEventListener("click", function () { move(1); });
      lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
      document.addEventListener("keydown", function (e) {
        if (!lb.classList.contains("is-open")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") move(-1);
        if (e.key === "ArrowRight") move(1);
      });
    }

    /* ---------- formulários ---------- */
    $$("[data-form]").forEach(function (f) {
      if (CFG.FORM_ENDPOINT) { f.action = CFG.FORM_ENDPOINT; f.method = "POST"; return; }
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        var d = new FormData(f), lines = [];
        d.forEach(function (v, k) { if (v) lines.push(k + ": " + v); });
        var pt = document.documentElement.lang === "pt";
        location.href = "mailto:" + (CFG.EMAIL || "") +
          "?subject=" + encodeURIComponent(pt ? "Pedido via site — RK Suite Hotel" : "Website enquiry — RK Suite Hotel") +
          "&body=" + encodeURIComponent(lines.join("\n"));
      });
    });

    /* ---------- GA4 (só se configurado) ---------- */
    if (CFG.GA4_ID) {
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + CFG.GA4_ID;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      gtag("js", new Date()); gtag("config", CFG.GA4_ID);
    }
  });
})();
