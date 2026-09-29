# Contrato de Interface do Quiz

Este contrato descreve o comportamento observável da interface. A aplicação não expõe API de rede nem integração com backend.

## Estados da interface

1. **Carregamento**: busca e valida o JSON local na mesma origem HTTP; início indisponível até validação completa.
2. **Erro de dados**: arquivo ausente, JSON malformado ou regra de integridade violada gera mensagem clara; o quiz não inicia.
3. **Abertura**: apresenta nome/instrução do quiz e ação para iniciar sem cadastro, habilitada somente após validação dos dados.
4. **Questão aguardando resposta**: apresenta progresso (questão atual de 10), enunciado e quatro alternativas exclusivas. Permite trocar seleção e confirmar. Sem seleção, confirmar não registra resposta e mostra orientação.
5. **Feedback**: mantém a questão visível, informa textualmente acerto/erro e expõe a mensagem como status acessível. Em erro, aponta a alternativa correta e mostra uma explicação de uma frase com até 25 palavras. Resposta e alternativas ficam bloqueadas.
6. **Questão seguinte**: a ação para avançar fica disponível após feedback nas questões 1 a 9; não há ação de retorno.
7. **Conclusão da décima questão**: após o feedback final, mostra a ação “Ver resultado”. Acioná-la substitui o feedback pelo resultado; não há décima primeira questão.
8. **Resultado**: mostra acertos, erros e percentual; oferece reinício. Nenhuma pontuação parcial é exibida antes deste estado.

## Navegação e regras

- Uma questão é apresentada por vez; navegação somente para a frente.
- Confirmação contabiliza cada questão uma única vez e bloqueia edição.
- Reinício existe somente no resultado e limpa índice, seleção, respostas e resultado.
- Não há cadastro, autenticação, persistência ou comunicação com backend.

## Acessibilidade e responsividade

- Iniciar, selecionar alternativas, confirmar, avançar, ver resultado e reiniciar são operáveis por teclado; o foco atual permanece visível.
- Alternativas usam controles semânticos com rótulos associados.
- Feedback não depende somente de cor e é exposto como mensagem de status para tecnologia assistiva.
- Nas larguras de viewport de 320 CSS px e 1280 CSS px, todos os estados e controles permanecem utilizáveis sem rolagem horizontal.