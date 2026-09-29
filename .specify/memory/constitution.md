<!-- Relatório de Impacto da Sincronização
Alteração de versão: 1.0.0 → 1.1.0
Princípios modificados: II. Código Legível e de Fácil Manutenção (orientação ampliada)
Seções adicionadas: nenhuma
Seções removidas: nenhuma
Pendências: confirmar a data original de ratificação.
-->
# Constituição do Quiz Computacional

## Princípios Fundamentais

### I. Interface Adequada para Estudantes
A interface DEVE ser simples, clara e adequada a estudantes. Rótulos, instruções e feedback
DEVEM usar uma linguagem compreensível para os estudantes. Isso mantém o foco na aprendizagem.

### II. Código de Qualidade, Legível e de Fácil Manutenção
O código DEVE ser organizado em unidades com nomes claros e responsabilidades bem definidas,
e seguir os padrões e convenções existentes no projeto. Cada alteração DEVE ser focada,
compreensível e fácil de manter. Antes de concluir uma mudança, colaboradores DEVEM verificar
que ela atende aos critérios objetivos pertinentes e não introduz erros conhecidos. A qualidade
é avaliada pela legibilidade, consistência, comportamento correto e facilidade de manutenção.

### III. Exatamente Quatro Alternativas
Cada questão DEVE apresentar exatamente quatro alternativas. Os dados da questão e a interface
DEVEM preservar essa quantidade para que todas as questões tenham um formato consistente.

### IV. Exatamente Uma Alternativa Correta
Cada questão DEVE indicar exatamente uma das quatro alternativas como correta. Os dados da
questão DEVEM deixar a resposta correta inequívoca.

### V. Feedback Após Cada Resposta
Após cada resposta do estudante, a aplicação DEVE fornecer feedback que indique se a resposta
está correta e, quando aplicável, explique o resultado em linguagem adequada ao estudante.

### VI. Cálculo Automático da Pontuação
A aplicação DEVE calcular automaticamente a pontuação com base na correção das respostas enviadas.
A pontuação DEVE ser consistente com as respostas registradas no quiz.

### VII. Simplicidade e Dependências Mínimas
O projeto DEVE preferir a implementação mais simples que atenda aos requisitos e EVITAR
dependências sem uma finalidade clara e necessária. Isso reduz o esforço de manutenção e configuração.

### VIII. Comportamento Verificável
Cada funcionalidade e regra visível ao usuário DEVE ter um critério de aceitação objetivo,
verificável por testes ou por uma checagem manual documentada. Isso torna a correção observável
e repetível.

## Regras do Quiz
As questões DEVEM cumprir os Princípios III e IV antes de serem apresentadas. O processamento
das respostas DEVE fornecer o feedback exigido pelo Princípio V e atualizar a pontuação conforme
o Princípio VI. Dados inválidos de questões DEVEM ser detectados por uma verificação objetiva
antes da disponibilização.

## Qualidade e Manutenção
Os colaboradores DEVEM manter as alterações focadas e consistentes com a estrutura existente
do projeto. Novos comportamentos DEVEM incluir ou identificar as verificações objetivas necessárias
para validá-los. A inclusão de uma dependência DEVE ter uma necessidade documentada e vinculada
a um requisito do projeto. Revisões DEVEM considerar legibilidade, consistência com as convenções
do projeto, correção do comportamento e facilidade de manutenção.

## Governança
Esta constituição orienta as decisões de produto e engenharia do Quiz Computacional. As alterações
DEVEM ser feitas neste documento, revisadas em relação ao comportamento existente do projeto e
refletidas nas especificações e nos critérios de aceitação relacionados. A inclusão de um princípio
ou uma ampliação substancial das regras exige incrementar a versão MINOR; um esclarecimento
compatível exige incrementar PATCH; a remoção ou redefinição incompatível exige incrementar MAJOR.
A versão segue o formato MAJOR.MINOR.PATCH.

Colaboradores e revisores DEVEM avaliar a conformidade das alterações propostas com estes princípios.
Qualquer exceção DEVE ter sua justificativa e seu escopo documentados no artefato pertinente do
projeto. Uma funcionalidade só DEVE ser considerada concluída quando atender aos critérios
objetivos de aceitação.

**Versão**: 1.1.0 | **Ratificada em**: TODO(RATIFICATION_DATE): data original de adoção desconhecida | **Última alteração**: 2026-09-27
