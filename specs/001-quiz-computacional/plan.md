# Implementation Plan: Quiz Computacional

**Branch**: `001-quiz-computacional` | **Date**: 2026-09-28 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-quiz-computacional/spec.md`

## Summary

Construir um quiz educacional estático para navegador com HTML5, CSS3 e JavaScript nativo. As 10 questões ficarão em `data/questions.json`; a apresentação e o estado/transições do quiz serão separados em arquivos JavaScript e CSS. A aplicação será executada pelo navegador a partir de uma origem HTTP estática, sem backend de aplicação, banco de dados, autenticação ou dependências de frontend.

## Technical Context

**Language/Version**: HTML5, CSS3 e JavaScript moderno com módulos ES nativos; JSON para os dados das questões.

**Primary Dependencies**: Nenhuma biblioteca ou framework de frontend.

**Storage**: Arquivo JSON estático para o conjunto fixo de questões; respostas e estado da tentativa mantidos somente em memória durante a sessão. Sem persistência entre recargas.

**Testing**: Validação objetiva do JSON e roteiro de aceitação manual no navegador, incluindo fluxo, teclado, estados de resposta, resultados, reinício e larguras desktop/smartphone. Sem dependência de teste de terceiros.

**Target Platform**: Navegadores atuais em desktop e smartphone, acessando os arquivos por HTTP na mesma origem.

**Project Type**: Aplicação web estática, executada no lado do cliente.

**Performance Goals**: Não há meta numérica de latência nesta versão. O início só fica disponível depois que o conjunto local de 10 questões foi carregado e validado; nenhum serviço remoto ou processamento intensivo é necessário.

**Constraints**: Sem frameworks frontend, backend de aplicação, banco de dados ou autenticação. O carregamento do JSON será feito a partir da mesma origem HTTP estática. Abrir `index.html` com `file://` não é um modo suportado para obter `questions.json`, pois navegadores restringem requisições locais por políticas de origem/CORS.

**Scale/Scope**: Uma tentativa individual por vez, 10 questões fixas, sem perfis, concorrência, sincronização ou retenção de dados.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio | Avaliação | Evidência no desenho |
|---|---|---|
| Interface simples e adequada a estudantes | PASS | Um enunciado por tela, instruções diretas e feedback textual. |
| Código organizado, legível e manutenível | PASS | Separação entre dados (`data/questions.json`), lógica (`js/quiz.js`) e apresentação (`index.html`, `css/styles.css`, `js/app.js`). |
| Exatamente quatro alternativas | PASS | Validação do conjunto de dados cobre contagem, tema, identificadores únicos, textos obrigatórios, resposta correta e explicação no limite definido. |
| Exatamente uma alternativa correta | PASS | Cada questão define um único `correctOptionId`, validado contra as quatro alternativas. |
| Feedback após cada resposta | PASS | Estados de feedback correto/incorreto; erro revela alternativa correta e explicação breve. |
| Pontuação automática | PASS | Acertos, erros e percentual são derivados das respostas confirmadas. |
| Simplicidade e dependências mínimas | PASS | HTML/CSS/JS nativos; nenhuma dependência em tempo de execução. |
| Comportamento verificável | PASS | Roteiro de validação objetiva cobre dados, transições, limites, resultado e responsividade. |

**Gate result**: PASS. O servidor de arquivos estáticos para desenvolvimento/entrega não é backend da aplicação e não acrescenta serviços de negócio.

**Post-design gate**: PASS. A verificação integral dos dados e os critérios objetivos de acessibilidade, responsividade e fluxo mantêm as oito regras da constituição e a arquitetura mínima solicitada.

## Project Structure

### Documentation (this feature)

```text
specs/001-quiz-computacional/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui.md
├── checklists/
│   └── requirements.md
└── tasks.md                 # Criado por $speckit-tasks, não por este comando
```

### Source Code (repository root)

```text
index.html                 # Estrutura e regiões semânticas da aplicação
css/
└── styles.css              # Apresentação responsiva
data/
└── questions.json          # Dez questões e seus dados educacionais
js/
├── app.js                  # Integração de eventos e renderização da interface
└── quiz.js                 # Estado, regras de resposta e cálculo do resultado
```

**Structure Decision**: Uma aplicação estática única na raiz do repositório, organizada em apresentação, dados e lógica. `app.js` adapta eventos/estado à interface; `quiz.js` mantém as regras independentes do DOM. `questions.json` é carregado na mesma origem por HTTP. Essa estrutura evita camadas, pacotes e ferramentas de build sem necessidade.

## Complexity Tracking

Nenhuma violação da constituição ou camada adicional requer justificativa. O servidor HTTP estático é necessário apenas para servir os arquivos e permitir o carregamento seguro do JSON; não fornece lógica de backend.
