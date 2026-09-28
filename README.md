# SHOT — Guia Técnico

Versão estática V4 — HTML + CSS + JavaScript puro.

## Estrutura
- `index.html` — landing principal
- `grupo.html` — fluxo de compra via WhatsApp
- `css/style.css` — sistema visual, responsividade e animações
- `js/script.js` — menu lateral, scroll reveal, parallax, progresso, FAQ e navegação
- `images/` — assets visuais
- `docs/` — SPEC, PRD, WORKFLOWS e BRIEFING

## Experiência V4
- menu mobile lateral com overlay e animação sequencial
- barra de progresso de leitura
- header que compacta durante o scroll
- reveal cinematográfico por seção
- cards entrando em sequência
- parallax sutil no hero
- hover com microinterações
- suporte a `prefers-reduced-motion`
- layout responsivo para desktop, tablet e mobile

## Publicação
Não exige React, Node ou build. Basta publicar a pasta em um servidor estático.

Antes da publicação, substituir `SEU_LINK_AQUI` pelo link real do grupo do WhatsApp.

## V7 — Shared motion system
- Same navigation architecture on index.html and grupo.html.
- Same mobile side-menu animation on both pages.
- Stable sticky header: no height morph / no jitter.
- Hero images deliberately excluded from parallax to prevent tremor.
- Secondary imagery uses the same subtle scroll/parallax system on both pages.
- Shared reveal-on-scroll timing and reduced-motion support.
