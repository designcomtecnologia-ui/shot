# SHOT — Final Responsive System

## Breakpoints
- 360–479px: mobile compacto
- 480–767px: mobile grande
- 768–1024px: tablet/touch
- 1025px+: desktop editorial

## Regras principais
- 360px é o stress-test mínimo.
- Até 1024px o header usa menu lateral.
- O hero nunca recebe parallax, scale ou transform durante scroll em touch.
- O menu lateral é compartilhado por `index.html` e `grupo.html` via `js/script.js`.
- O scroll reveal é compartilhado entre as duas páginas.
- O parallax secundário só atua em imagens de produto abaixo do hero.
- Não há setas azuis nem decoração automática de links no menu mobile.
- Overflow horizontal é tratado na raiz e os elementos são dimensionados para a viewport.
