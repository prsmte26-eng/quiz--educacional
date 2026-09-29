# Pesquisa: Quiz Computacional

## Decisões

### Carregamento do arquivo JSON

- **Decisão**: manter `data/questions.json` como arquivo independente e carregá-lo pelo navegador a partir da mesma origem HTTP estática da aplicação. No desenvolvimento, usar um servidor local de arquivos estáticos; na publicação, usar hospedagem estática.
- **Justificativa**: os navegadores restringem requisições `fetch()` feitas de URLs `file://`; abrir o HTML diretamente não garante acesso ao JSON local. A documentação da MDN explica o erro CORS de requisições de origem não HTTP e recomenda servir os arquivos por HTTP para testes locais.
- **Alternativas consideradas**: embutir o JSON no HTML/JavaScript permitiria abrir um arquivo local, mas contrariaria a separação solicitada; pedir que o estudante selecione o JSON adicionaria uma ação e não é adequado ao fluxo do quiz. Um backend de aplicação é desnecessário.
- **Referência**: [MDN — CORS request not HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors/CORSRequestNotHttp).

### Seleção das alternativas

- **Decisão**: usar controles nativos de rádio agrupados por questão em formulário semântico. A seleção pode mudar até a confirmação; após confirmar, os controles ficam bloqueados.
- **Justificativa**: rádio nativo expressa a escolha única e oferece interação por teclado sem controles personalizados. Rótulos explícitos mantêm as alternativas acionáveis e compreensíveis.
- **Referências**: [WHATWG — Form elements](https://html.spec.whatwg.org/dev/form-elements.html), [MDN — Radio buttons](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/radio), [WAI — Labels](https://www.w3.org/WAI/tutorials/forms/labels/).

### Feedback e estado dinâmico

- **Decisão**: apresentar texto além de qualquer sinal visual; usar uma região de status acessível para anunciar feedback e mudanças relevantes sem deslocar o foco indevidamente.
- **Justificativa**: mensagens de resultado atualizadas sem navegação devem ser percebidas também por tecnologias assistivas.
- **Referências**: [W3C — Understanding status messages](https://www.w3.org/WAI/WCAG21/Understanding/status-messages), [WAI — User notifications](https://www.w3.org/WAI/tutorials/forms/notifications/), [MDN — status role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role).

### Responsividade

- **Decisão**: layout fluido de uma coluna como base, ajustado por media queries apenas quando o conteúdo ou a largura disponível exigir.
- **Justificativa**: atende desktop e smartphone sem duplicar telas ou estruturas de conteúdo.
- **Referência**: [MDN — Media queries](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Media_queries).

## Alternativas de execução local

A aplicação pode ser colocada em qualquer origem HTTP estática. Para desenvolvimento, `python -m http.server` é uma opção sem dependência adicionada ao projeto; Python é apenas uma ferramenta externa de desenvolvimento. A aplicação em execução continua sem backend de negócio. O modo `file://` não será suportado para carregar o JSON separado.
