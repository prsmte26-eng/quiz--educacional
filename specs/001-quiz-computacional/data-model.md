# Modelo de Dados: Quiz Computacional

## Conjunto de questões

O arquivo JSON contém exatamente 10 questões em uma ordem fixa. O conjunto cobre todos os temas permitidos; cada tema aparece ao menos uma vez e as duas questões restantes podem aprofundar qualquer tema.

Temas permitidos: `hardware`, `software`, `sistemas-arquivos`, `redes-internet`, `seguranca-privacidade`, `algoritmos-programacao`, `representacao-dados`, `pensamento-computacional`.

## Questão

| Campo | Tipo | Regra |
|---|---|---|
| `id` | string | Obrigatório, não vazio e único no conjunto. |
| `topic` | string | Obrigatório; um dos oito temas permitidos acima. |
| `prompt` | string | Enunciado não vazio. |
| `options` | array de Alternativa | Exatamente quatro elementos; IDs únicos dentro da questão. |
| `correctOptionId` | string | Corresponde a exatamente um ID das quatro alternativas. |
| `explanation` | string | Obrigatória, não vazia, uma frase com até 25 palavras; exibida após resposta incorreta. |

O JSON precisa ser válido e conter exatamente 10 questões, com cobertura de todos os temas permitidos.

## Alternativa

| Campo | Tipo | Regra |
|---|---|---|
| `id` | string | Obrigatório, não vazio e único dentro da questão. |
| `text` | string | Obrigatório e não vazio. |

A correção é definida pelo `correctOptionId` da questão, evitando múltiplos indicadores de correção.

## Tentativa

Estado transitório em memória para uma execução do quiz; não é persistido.

| Campo | Tipo | Regra |
|---|---|---|
| `currentQuestionIndex` | inteiro | Índice da questão ativa; só avança após resposta confirmada e ação para prosseguir; nunca diminui. |
| `selectedOptionId` | string ou nulo | Seleção editável antes da confirmação da questão atual. |
| `answers` | coleção indexada por questão | No máximo uma resposta confirmada por questão; não pode ser substituída. |
| `phase` | enumeração | `loading`, `intro`, `question`, `feedback`, `result` ou `error`. |

### Transições

- `loading` → `intro`: JSON válido carregado e validado; a ação de iniciar é habilitada.
- `loading` → `error`: arquivo ausente, JSON inválido ou qualquer regra de integridade violada; o início permanece indisponível.
- `intro` → `question`: estudante inicia a tentativa.
- `question` → `question`: estudante muda a seleção antes de confirmar.
- `question` → `feedback`: estudante confirma uma alternativa; a resposta fica bloqueada e o feedback é calculado.
- `feedback` → `question`: estudante avança da questão 1 a 9 para a próxima questão.
- `feedback` da questão 10 → `result`: estudante escolhe “Ver resultado”.
- `result` → `intro`: estudante reinicia; índice, seleção, respostas e resultado anterior são limpos.

## Resultado

Derivado das respostas confirmadas ao concluir a décima questão.

| Campo | Cálculo |
|---|---|
| `correctCount` | Número de respostas cujo `selectedOptionId` equivale ao `correctOptionId`. |
| `incorrectCount` | 10 menos `correctCount`. |
| `percentage` | `correctCount / 10 * 100`; múltiplos de 10, sem arredondamento adicional. |

O resultado não aparece parcialmente durante a tentativa. Recarregar ou sair descarta o estado em memória.