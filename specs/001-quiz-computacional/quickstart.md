# Guia Rápido de Validação

## Pré-requisitos

- Navegador atual em desktop ou smartphone.
- Servidor HTTP de arquivos estáticos para o diretório raiz do repositório. Para desenvolvimento com Python instalado, execute na raiz:

```powershell
py -m http.server 8000
```

Se `py` não estiver disponível, use outro servidor estático local ou hospedagem estática. Isso não é backend de aplicação. Não abra `index.html` via `file://`: o navegador pode bloquear o carregamento separado de `data/questions.json`.

## Abrir

Acesse `http://localhost:8000/`. A ação de iniciar só fica disponível depois de carregar e validar as questões. Se o arquivo estiver ausente, malformado ou inválido, deve aparecer uma mensagem clara e o quiz não deve iniciar.

## Critérios de integridade dos dados

O arquivo deve conter exatamente 10 questões e cobrir ao menos uma vez cada tema permitido (`hardware`, `software`, `sistemas-arquivos`, `redes-internet`, `seguranca-privacidade`, `algoritmos-programacao`, `representacao-dados`, `pensamento-computacional`). Cada questão deve ter ID único e enunciado não vazio; quatro alternativas com IDs únicos e textos não vazios; `correctOptionId` que corresponda a exatamente uma alternativa; explicação não vazia em uma frase com até 25 palavras. Dados que falhem em qualquer regra devem impedir o início.

## Roteiro de aceitação

1. **Início**: confirmar que, após os dados válidos serem carregados, o quiz pode ser iniciado sem cadastro ou autenticação.
2. **Apresentação**: confirmar que só uma questão é apresentada por vez, com quatro alternativas e progresso até 10.
3. **Seleção e validação**: confirmar que seleção pode ser trocada antes de confirmar; sem seleção, a confirmação não registra resposta e mostra orientação.
4. **Feedback**: confirmar uma resposta correta e outra incorreta. Ambas ficam bloqueadas e não são contabilizadas novamente; a incorreta mostra a alternativa correta e explicação de uma frase com até 25 palavras.
5. **Navegação e conclusão**: avançar de 1 a 9 sem opção de retorno. Após feedback da questão 10, “Ver resultado” abre o resumo sem apresentar outra questão.
6. **Pontuação**: conferir padrões de 0/10 e 10/10; acertos + erros = 10 e percentual = acertos / 10 × 100. Nenhuma pontuação parcial aparece.
7. **Reinício**: reiniciar a partir do resultado; a tentativa nova começa sem seleção, respostas ou resultado anteriores. Durante uma tentativa não há ação de reinício.
8. **Validação de dados**: conferir que arquivo ausente, JSON malformado e exemplos com quantidade diferente de questões, tema inválido ou ausente, cobertura incompleta dos oito temas, ID repetido, enunciado vazio, alternativa inválida, chave correta inexistente ou explicação inválida impedem o início e exibem erro claro.
9. **Teclado e tecnologia assistiva**: percorrer início, opções, confirmação, avanço, “Ver resultado” e reinício por teclado; confirmar foco visível e feedback textual anunciado como status.
10. **Responsividade**: repetir o fluxo em viewports de 320 CSS px e 1280 CSS px; confirmar que estados e controles permanecem utilizáveis sem rolagem horizontal.