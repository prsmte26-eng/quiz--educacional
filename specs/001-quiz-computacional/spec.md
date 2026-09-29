# Especificação da Funcionalidade: Quiz Computacional

**Branch da funcionalidade**: `001-quiz-computacional`

**Criada em**: 2026-09-27

**Status**: Rascunho

**Entrada**: Descrição do usuário: "Desenvolver uma aplicação educacional chamada Quiz Computacional. A aplicação permitirá que um estudante pratique conhecimentos básicos de Computação respondendo questões de múltipla escolha. Ao iniciar o quiz, o estudante deverá visualizar uma questão por vez. Cada questão deverá apresentar o enunciado, quatro alternativas e apenas uma alternativa correta. O estudante deverá selecionar uma alternativa e confirmar sua resposta. Depois da confirmação, a aplicação deverá informar se a resposta está correta ou incorreta. O estudante poderá então avançar para a próxima questão. O quiz terá inicialmente 10 questões. Ao finalizar todas as questões, a aplicação deverá apresentar quantidade de acertos, quantidade de erros e percentual de acertos. O estudante deverá poder reiniciar o quiz. Não haverá cadastro ou autenticação nesta primeira versão."

## Esclarecimentos

### Sessão 2026-09-27

- P: Depois de selecionar uma alternativa, o estudante pode trocá-la antes de confirmar e, após a confirmação, a resposta fica bloqueada? → A: Pode trocar a seleção antes de confirmar; depois da confirmação, a resposta fica bloqueada.
- P: Depois de avançar para a próxima questão, o estudante pode voltar às questões anteriores? → A: Não; o quiz avança em sequência até o resultado.
- P: O estudante deve poder reiniciar durante uma tentativa ou somente depois de ver o resultado final? → A: Somente depois do resultado final.
- P: Durante o quiz, o estudante deve ver uma pontuação parcial ou somente o feedback de cada resposta e o resultado completo ao final? → A: Não há pontuação parcial; acertos, erros e percentual aparecem somente no resultado final.
- P: Quando uma resposta estiver incorreta, que feedback o estudante deve receber? → C: Informar que está incorreta, indicar a alternativa correta e explicar brevemente.

## Cenários do Usuário e Testes

### História do Usuário 1 — Responder ao quiz (Prioridade: P1)

Como estudante, quero responder questões de Computação uma por vez e receber feedback após cada resposta para praticar e acompanhar meu desempenho.

**Por que esta prioridade**: Responder às questões é a experiência central e fornece o valor educacional principal.

**Teste independente**: Iniciar sem cadastro, responder às 10 questões sequencialmente e verificar seleção, confirmação, feedback por resposta e ausência de retorno a questões anteriores.

**Cenários de aceitação**:

1. **Dado** que os dados válidos foram carregados, **quando** o estudante inicia o quiz, **então** a primeira questão é apresentada sem cadastro ou autenticação.
2. **Dado** que uma questão está ativa e nenhuma alternativa foi selecionada, **quando** o estudante tenta confirmar, **então** a resposta não é registrada e ele recebe uma indicação para selecionar uma alternativa.
3. **Dado** que o estudante selecionou uma alternativa, **quando** ainda não a confirmou, **então** pode alterar sua seleção; **quando** confirma, **então** a resposta é registrada uma única vez e bloqueada.
4. **Dado** que o estudante confirmou uma resposta correta, **então** a aplicação informa textualmente que está correta.
5. **Dado** que o estudante confirmou uma resposta incorreta, **então** a aplicação informa que está incorreta, indica a alternativa correta e apresenta uma explicação de uma frase com até 25 palavras.
6. **Dado** que o feedback de uma questão foi apresentado, **quando** o estudante avança, **então** a próxima questão é exibida e não há opção de voltar.
7. **Dado** que a décima resposta foi confirmada, **então** seu feedback é apresentado; **quando** o estudante escolhe “Ver resultado”, **então** o resumo final substitui o feedback e nenhuma décima primeira questão é exibida.

---

### História do Usuário 2 — Consultar o resultado final (Prioridade: P2)

Como estudante, quero ver meus acertos, erros e percentual ao concluir para entender meu desempenho no quiz.

**Por que esta prioridade**: O resultado resume a prática depois da atividade principal.

**Teste independente**: Completar as 10 questões com padrões de resposta conhecidos, escolher “Ver resultado” e comparar o resumo com os valores calculados.

**Cenários de aceitação**:

1. **Dado** que o estudante ainda está respondendo ou vendo feedback, **então** não é exibido resumo parcial; **quando** escolhe “Ver resultado” após o feedback da décima questão, **então** são apresentados acertos, erros e percentual.
2. **Dado** qualquer resultado final, **quando** acertos e erros são somados, **então** a soma é 10 e o percentual corresponde a acertos divididos por 10, multiplicados por 100.
3. **Dado** que o estudante acerta zero ou todas as questões, **então** o resultado apresenta respectivamente 0% ou 100%.

---

### História do Usuário 3 — Reiniciar o quiz (Prioridade: P3)

Como estudante, quero reiniciar o quiz depois de ver o resultado para praticar novamente.

**Por que esta prioridade**: A repetição permite praticar mais de uma vez sem criar conta nem depender de armazenamento de sessões.

**Teste independente**: Concluir o quiz, reiniciar e verificar que uma nova tentativa começa na primeira questão, sem respostas ou pontuação anteriores.

**Cenários de aceitação**:

1. **Dado** que o resultado final está visível, **quando** o estudante escolhe reiniciar, **então** uma nova tentativa começa na primeira questão com seleção, respostas e resultado anterior limpos.
2. **Dado** que uma tentativa ainda está em andamento, **então** não há ação para reiniciar.

### Casos de borda

- O estudante tenta confirmar sem selecionar uma alternativa: a questão continua sem resposta registrada e a aplicação orienta a seleção.
- O estudante tenta confirmar novamente ou alterar uma resposta já confirmada: a resposta continua bloqueada e não altera a contagem.
- Após o feedback da décima resposta, somente a ação “Ver resultado” conclui o quiz; não existe questão adicional.
- Com zero acertos ou dez acertos, o resultado apresenta corretamente 0% ou 100%.
- Se o JSON estiver ausente, malformado ou violar qualquer regra de integridade definida em RF-015, a aplicação não inicia o quiz e apresenta uma mensagem clara.
- O reinício está disponível somente após o resultado final e limpa o estado da tentativa anterior.

## Requisitos

### Requisitos funcionais

- **RF-001**: A aplicação DEVE permitir ao estudante iniciar uma tentativa anônima, sem cadastro ou autenticação, depois que os dados válidos forem carregados.
- **RF-002**: O quiz DEVE conter exatamente 10 questões de conhecimentos básicos de Computação, com ao menos uma questão sobre cada tema: hardware; software; sistemas operacionais e arquivos; redes e internet; segurança e privacidade; algoritmos e programação; representação de dados; pensamento computacional. As duas questões restantes podem aprofundar qualquer tema.
- **RF-003**: A aplicação DEVE apresentar uma única questão por vez, com enunciado e exatamente quatro alternativas.
- **RF-004**: Cada questão DEVE ter exatamente uma alternativa correta.
- **RF-005**: A aplicação DEVE permitir que o estudante selecione e altere uma alternativa antes de confirmar a resposta.
- **RF-006**: A aplicação NÃO DEVE registrar uma resposta enquanto nenhuma alternativa estiver selecionada e DEVE orientar o estudante a selecionar uma.
- **RF-007**: Após a confirmação, a aplicação DEVE informar textualmente se a resposta está correta ou incorreta, bloquear alterações e impedir contabilização repetida. Se incorreta, DEVE indicar a alternativa correta e apresentar uma explicação de uma frase com até 25 palavras.
- **RF-008**: Após o feedback, o estudante DEVE poder avançar somente para a questão seguinte; a aplicação NÃO DEVE permitir voltar às questões anteriores.
- **RF-009**: Após a confirmação da décima resposta, a aplicação DEVE apresentar o feedback dessa resposta. O resultado final DEVE aparecer somente quando o estudante escolher “Ver resultado”; nenhuma décima primeira questão DEVE ser apresentada.
- **RF-010**: Somente após a ação “Ver resultado”, o resultado final DEVE apresentar quantidade de acertos, quantidade de erros e percentual. Durante a tentativa e o feedback por questão, a aplicação NÃO DEVE exibir pontuação parcial.
- **RF-011**: A aplicação DEVE calcular acertos a partir das respostas confirmadas; erros DEVEM ser iguais a 10 menos acertos e acertos mais erros DEVEM totalizar 10.
- **RF-012**: A aplicação DEVE calcular o percentual por `acertos / 10 * 100`, sem arredondamento adicional.
- **RF-013**: O estudante DEVE poder reiniciar somente após a exibição do resultado final; a nova tentativa DEVE começar na primeira questão com seleção, respostas e resultado zerados. Durante a tentativa, a ação de reiniciar NÃO DEVE ser oferecida.
- **RF-014**: Instruções e feedback DEVEM usar linguagem simples e adequada a estudantes. Cada explicação de resposta incorreta DEVE conter uma frase com até 25 palavras.
- **RF-015**: Antes de permitir iniciar, a aplicação DEVE validar que o JSON contém exatamente 10 questões; IDs de questão únicos; enunciados não vazios; cada questão com um tema permitido, quatro alternativas com IDs únicos e textos não vazios; `correctOptionId` referindo-se a exatamente uma alternativa; e uma explicação não vazia de uma frase com até 25 palavras. Se qualquer condição falhar ou o arquivo não puder ser carregado ou interpretado, a aplicação DEVE impedir o início e apresentar uma mensagem clara.
- **RF-016**: A interface DEVE permanecer utilizável sem rolagem horizontal nas larguras de viewport de 320 CSS px e 1280 CSS px, cobrindo smartphone estreito e desktop.
- **RF-017**: Todas as ações do quiz (iniciar, selecionar, confirmar, avançar, ver resultado e reiniciar) DEVEM ser operáveis por teclado. O foco DEVE permanecer visível; feedback DEVE ser textual, não depender somente de cor e ser exposto como mensagem de status a tecnologias assistivas.

### Entidades principais

- **Questão**: unidade do quiz com identificador único, tema, enunciado, quatro alternativas, identificador da alternativa correta e explicação breve.
- **Alternativa**: opção selecionável de uma questão, com identificador único local e texto não vazio.
- **Tentativa**: execução individual com respostas confirmadas, mantida apenas em memória e percorrida sem retorno.
- **Resultado**: resumo derivado da tentativa concluída, com acertos, erros e percentual.

## Critérios de sucesso

### Resultados mensuráveis

- **CS-001**: Uma tentativa completa apresenta exatamente 10 questões em sequência e nenhuma questão adicional.
- **CS-002**: 100% das questões apresentadas têm exatamente quatro alternativas e exatamente uma alternativa correta.
- **CS-003**: Após “Ver resultado”, o resumo apresenta acertos, erros e percentual; acertos mais erros totalizam 10.
- **CS-004**: O percentual corresponde a acertos / 10 × 100 em todos os resultados, incluindo os extremos de 0% e 100%.
- **CS-005**: Após reiniciar, a primeira questão aparece sem qualquer resposta ou resultado da tentativa anterior.
- **CS-006**: 100% das respostas incorretas exibem a alternativa correta e uma explicação de uma frase com até 25 palavras.
- **CS-007**: Dados ausentes, malformados ou que violem qualquer regra de RF-015 nunca habilitam o início do quiz e sempre geram mensagem de erro compreensível.
- **CS-008**: Em viewports de 320 CSS px e 1280 CSS px, toda questão, feedback, resumo e controle permanecem visíveis/utilizáveis sem rolagem horizontal.
- **CS-009**: 100% das ações interativas podem ser concluídas por teclado; feedback correto/incorreto permanece disponível como texto e mensagem de status acessível.

## Restrições técnicas e de escopo

- A aplicação DEVE usar HTML5, CSS3 e JavaScript puro, sem frameworks frontend.
- As questões DEVEM ficar em arquivo JSON local, carregado da mesma origem HTTP estática da aplicação.
- A aplicação DEVE executar no navegador sem backend de aplicação, banco de dados ou autenticação.
- Abrir `index.html` por `file://` não é suportado para carregar o JSON separado; a execução local exige um servidor de arquivos estáticos, sem lógica de backend.
- A estrutura DEVE separar apresentação, dados e lógica do quiz.

## Pressupostos

- “Funcionar diretamente no navegador” significa executar a aplicação no lado do cliente; os arquivos são servidos por HTTP estático para permitir o carregamento seguro do JSON.
- O conjunto de 10 questões é fixo e ordenado, sem seleção de tema ou dificuldade pelo estudante.
- As respostas e o resultado existem apenas durante a tentativa atual; recarregar ou sair descarta o estado.
- Cada questão tem o mesmo peso no cálculo do percentual.
- A experiência é individual e não identifica nem armazena dados pessoais do estudante.