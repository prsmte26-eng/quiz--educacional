---
description: "Tarefas de implementação do Quiz Computacional"
---

# Tarefas: Quiz Computacional

**Entrada**: documentos de desenho em `/specs/001-quiz-computacional/`

**Pré-requisitos**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/ui.md`, `quickstart.md`

**Testes**: Não foram solicitados testes automatizados. Os critérios independentes por história e `quickstart.md` definem verificações objetivas sem ferramentas ou dependências de teste adicionais.

**Organização**: tarefas ordenadas pelas histórias do estudante, com preparação e fundação compartilhadas antes da implementação das histórias.

## Formato

- `[P]`: tarefa paralelizável em arquivos distintos e sem dependência incompleta.
- `[US1]`, `[US2]`, `[US3]`: história correspondente à especificação.
- Cada tarefa inclui caminho(s) exato(s) dos arquivos envolvidos.

## Fase 1: Preparação

**Objetivo**: criar a estrutura mínima da aplicação estática prevista no plano.

- [X] T001 Criar a estrutura de arquivos da aplicação na raiz: `index.html`, `css/styles.css`, `data/questions.json`, `js/app.js` e `js/quiz.js`.

## Fase 2: Fundação

**Objetivo**: estabelecer o esqueleto semântico, apresentação base, modelo de estado e inicialização comuns às histórias.

- [X] T002 [P] Criar o documento HTML semântico com viewport, cabeçalho, regiões de carregamento/abertura/erro e referência a `css/styles.css` e `js/app.js` em `index.html`.
- [X] T003 [P] Definir estilos base fluidos, tipografia, foco visível e layout móvel-primeiro que funcione em viewports de 320 CSS px e 1280 CSS px, sem rolagem horizontal, em `css/styles.css`.
- [X] T004 [P] Implementar em `js/quiz.js` o estado e as transições `loading`, `intro`, `question`, `feedback` e `result`; permitir seleção editável antes de confirmar, bloquear uma resposta após a confirmação única e exigir ação explícita para avançar ou ver resultado.
- [X] T005 Integrar em `js/app.js` o carregamento e a validação de `data/questions.json`: exatamente 10 questões cobrindo os oito temas permitidos; IDs únicos e textos obrigatórios não vazios; quatro alternativas por questão com IDs únicos; `correctOptionId` referente a exatamente uma alternativa; explicação não vazia de uma frase com até 25 palavras. Em qualquer falha, manter início indisponível e mostrar mensagem clara.

**Checkpoint**: estrutura, modelo de estado, carregamento e validação integral dos dados estão preparados.

## Fase 3: História 1 — Responder ao quiz (Prioridade: P1) — MVP

**Objetivo**: iniciar anonimamente, responder às 10 questões sequencialmente e receber feedback após cada confirmação.

**Critério independente**: iniciar sem conta, responder cada questão individualmente, alterar seleção antes de confirmar, ser impedido de confirmar sem seleção, receber feedback correto/incorreto e avançar sem retornar. A resposta incorreta mostra a alternativa correta e uma explicação de uma frase com até 25 palavras.

### Implementação

- [X] T006 [P] [US1] Preencher `data/questions.json` com exatamente 10 questões; incluir ao menos uma questão por tema (`hardware`, `software`, `sistemas-arquivos`, `redes-internet`, `seguranca-privacidade`, `algoritmos-programacao`, `representacao-dados`, `pensamento-computacional`) e duas questões adicionais de aprofundamento; cada questão tem `id` único, `prompt` não vazio, quatro `options` com IDs únicos e `text` não vazio, `correctOptionId` correspondente e `explanation` de uma frase com até 25 palavras.
- [X] T007 [US1] Implementar em `js/app.js` a ação de iniciar após dados válidos e o fluxo de questão: quatro opções exclusivas, seleção editável antes de confirmar, orientação quando nenhuma opção estiver selecionada, feedback textual, bloqueio de resposta após confirmação e navegação somente para a frente; erros exibem alternativa correta e `explanation`; após feedback da questão 10, apresentar a ação “Ver resultado”.
- [X] T008 [P] [US1] Estilizar os estados de questão, seleção, orientação e feedback em `css/styles.css`, preservando legibilidade e operação nas larguras móvel e desktop definidas.

**Checkpoint**: a história P1 permite praticar as 10 questões com feedback único por resposta e sem acesso a questões anteriores.

## Fase 4: História 2 — Consultar o resultado final (Prioridade: P2)

**Objetivo**: apresentar acertos, erros e percentual somente após a conclusão explícita da décima questão.

**Critério independente**: completar uma tentativa com respostas conhecidas, ver o feedback da décima questão e escolher “Ver resultado”; conferir os extremos 0/10 e 10/10, acertos + erros = 10 e percentual = acertos / 10 × 100.

### Implementação

- [X] T009 [P] [US2] Implementar em `js/quiz.js` a derivação do resultado: acertos iguais às respostas que correspondem ao `correctOptionId`, erros iguais a 10 menos acertos e percentual igual a `acertos / 10 * 100`, sem arredondamento adicional.
- [X] T010 [US2] Integrar em `index.html` e `js/app.js` a ação “Ver resultado” disponível após o feedback da décima resposta; exibir acertos, erros e percentual somente após essa ação, sem pontuação parcial durante a tentativa.
- [X] T011 [P] [US2] Estilizar o resumo de resultado em `css/styles.css`, preservando legibilidade nas larguras móvel e desktop definidas.

**Checkpoint**: o resumo só substitui o feedback final após “Ver resultado” e deriva corretamente das 10 respostas.

## Fase 5: História 3 — Reiniciar o quiz (Prioridade: P3)

**Objetivo**: permitir iniciar uma nova tentativa após consultar o resultado.

**Critério independente**: concluir o quiz, reiniciar e confirmar que a nova tentativa começa na primeira questão sem estado anterior; durante uma tentativa não existe ação de reinício.

### Implementação

- [X] T012 [US3] Implementar em `js/quiz.js` a transição de reinício permitida somente em `result`, limpando índice, seleção, respostas e resultado antes de voltar a `intro`.
- [X] T013 [US3] Incluir em `index.html` e `js/app.js` a ação de reiniciar visível somente no resultado e conectá-la à transição de `js/quiz.js`.

**Checkpoint**: a nova tentativa não herda respostas nem pontuação da anterior.

## Fase 6: Acabamento e requisitos transversais

**Objetivo**: completar os critérios de acessibilidade e responsividade da interface.

- [X] T014 Alinhar `index.html`, `css/styles.css` e `js/app.js` ao contrato `specs/001-quiz-computacional/contracts/ui.md`: rótulos associados a controles semânticos; todas as ações operáveis por teclado; foco visível; feedback textual anunciado como status e não dependente somente de cor; estados e controles utilizáveis sem rolagem horizontal em 320 CSS px e 1280 CSS px.

## Dependências e ordem de execução

### Dependências entre fases

- Preparação (Fase 1) não depende de outras fases.
- Fundação (Fase 2) depende da preparação e bloqueia as histórias.
- História 1 (Fase 3) depende da fundação.
- História 2 (Fase 4) depende da História 1, pois exige as 10 respostas confirmadas.
- História 3 (Fase 5) depende da História 2, pois reinício só existe após o resultado.
- Acabamento (Fase 6) depende das histórias selecionadas para entrega.

### Grafo de dependências

```text
Fase 1 → Fase 2 → US1 → US2 → US3 → Acabamento
```

### Oportunidades de paralelismo

- Após T001, T002, T003 e T004 podem ser executadas em paralelo por atuarem em arquivos distintos; T005 depende do HTML e do módulo de domínio.
- Na US1, T006 e T008 podem ocorrer em paralelo após a fundação; T007 integra dados e interface.
- Na US2, T009 e T011 podem ocorrer em paralelo; T010 integra cálculo e interface.
- US2 e US3 são sequenciais porque a reinicialização depende do estado final.

## Estratégia de implementação

### MVP

Preparação, fundação e US1 permitem praticar as questões e receber feedback. Para uma entrega que cumpra o resumo final especificado, incluir também US2. US3 acrescenta repetição da prática.

### Entrega incremental

1. Preparação e Fundação estabelecem estrutura, estados e validação do JSON.
2. US1 entrega início anônimo, questões sequenciais e feedback.
3. US2 entrega o resultado após “Ver resultado”.
4. US3 entrega reinício sem estado residual.
5. Acabamento aplica acessibilidade e responsividade em todos os estados.

## Observações

- Não foram incluídas tarefas de testes automatizados; `quickstart.md` mantém critérios objetivos de validação manual.
- `[P]` indica arquivos distintos sem dependências pendentes.
- Rótulos de história preservam rastreabilidade com as jornadas de `spec.md`.

## Phase 7: Convergence

- [X] T015 Alinhar o estado inicial do modelo de quiz em `js/quiz.js` a `loading` e permitir a transicao para `intro` somente depois do carregamento e validacao de `data/questions.json`, conforme T004 (partial).

