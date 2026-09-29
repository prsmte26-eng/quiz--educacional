# UX Checklist: Quiz Computacional

**Purpose**: Revisão rigorosa da clareza, completude, consistência e verificabilidade dos requisitos de experiência do quiz
**Created**: 2026-09-28
**Feature**: [spec.md](../spec.md)

**Note**: Esta checklist avalia a qualidade dos requisitos, não a implementação.
**Review Ownership**: Artefato de revisão de requisitos pertencente ao revisor. Marque `[x]` somente quando o critério de qualidade do requisito tiver sido avaliado e satisfeito.
**Marker Semantics**: `[x]` significa aprovação da qualidade do requisito; não significa que a implementação foi concluída.

## Completude dos Requisitos

- [x ] CHK001 A especificação define o conteúdo mínimo esperado para as 10 questões de “conhecimentos básicos de Computação”, além da quantidade? [Completude, Spec §RF-002, Gap]
- [x ] CHK002 Os requisitos descrevem integralmente seleção, alteração antes da confirmação, bloqueio após confirmação e rejeição de confirmação sem seleção? [Completude, Spec §RF-005–RF-007]
- [x ] CHK003 O feedback para respostas corretas e incorretas está definido, incluindo a alternativa correta e a explicação em caso de erro? [Completude, Spec §RF-007, RF-014]
- [x ] CHK004 Os requisitos distinguem claramente o feedback da décima questão da apresentação do resultado final e definem a ação que conclui o quiz? [Completude, Spec §RF-009, Cenários da História 1]
- [x ] CHK005 A reinicialização define quais dados da tentativa são descartados e em que estado o estudante retoma o fluxo? [Completude, Spec §RF-013]

## Clareza dos Requisitos

- [x ] CHK006 O termo “explicação breve” tem orientação suficiente para produzir conteúdo de extensão consistente? [Clareza, Spec §RF-007, RF-014, Ambiguidade]
- [x ] CHK007 Está explícito quando a ação de avançar ou concluir fica disponível em cada questão, inclusive na décima? [Clareza, Spec §RF-008–RF-009]
- [x ] CHK008 A regra de pontuação distingue acertos, erros, peso igual por questão e cálculo percentual sem depender de interpretação? [Clareza, Spec §RF-011–RF-012, Pressupostos]
- [x ] CHK009 Os requisitos especificam como o progresso da tentativa é comunicado sem revelar uma pontuação parcial? [Clareza, Spec §RF-003, RF-010, Plan §Contrato de Interface]

## Consistência dos Requisitos

- [x ] CHK010 A apresentação de feedback após cada resposta é compatível com o momento definido para exibir o resultado final após a décima resposta? [Consistência, Spec §RF-007, RF-009–RF-010]
- [x ] CHK011 Os cenários, requisitos funcionais e critérios de sucesso concordam sobre navegação somente para a frente e bloqueio de respostas confirmadas? [Consistência, Spec §RF-005–RF-009, CS-001]
- [x ] CHK012 As restrições técnicas informadas no planejamento — aplicação estática no navegador, JSON local, sem frameworks, backend, banco ou autenticação — estão alinhadas com o escopo normativo da especificação? [Consistência, Spec §RF-001, Plan §Constraints]

## Qualidade dos Critérios de Aceitação

- [x ] CHK013 Os critérios permitem determinar objetivamente que cada questão tem exatamente quatro alternativas e uma correta? [Aceitação, Spec §RF-003–RF-004, CS-002]
- [x ] CHK014 Os critérios definem resultados verificáveis para 0/10, 10/10 e valores intermediários, incluindo a relação entre acertos, erros e percentual? [Aceitação, Spec §RF-011–RF-012, CS-003–CS-004]
- [x ] CHK015 Os critérios medem de forma objetiva o bloqueio de respostas duplicadas e a ausência de alteração após confirmação? [Aceitação, Spec §RF-007, Casos de borda]
- [x ] CHK016 Os critérios de sucesso cobrem qualidade educacional do feedback incorreto, além da presença da alternativa correta? [Aceitação, Spec §CS-006, Clareza]

## Cobertura de Cenários

- [x ] CHK017 Os cenários cobrem início, resposta correta, resposta incorreta, seleção ausente, avanço, conclusão e reinício como fluxos distinguíveis? [Cobertura, Spec §Cenários das Histórias 1–3]
- [x ] CHK018 A experiência em smartphone e desktop está formulada como requisito verificável, com limites observáveis de layout e uso? [Cobertura, Plan §Technical Context, Contrato de Interface, Gap]
- [x ] CHK019 Os requisitos de teclado e tecnologia assistiva cobrem seleção, confirmação, feedback, avanço e reinício? [Cobertura, Plan §Contrato de Interface, Gap]

## Cobertura de Casos de Borda

- [x ] CHK020 Há requisito para falha ou invalidade do arquivo JSON, incluindo uma resposta compreensível e prevenção de quiz incompleto? [Cobertura, Plan §Contrato de Interface, Gap]
- [x ] CHK021 Estão definidos os limites de estado para tentativas de confirmar repetidamente, alterar resposta bloqueada ou avançar antes de responder? [Cobertura, Spec §RF-006–RF-008, Casos de borda]
- [x ] CHK022 O comportamento está especificado para resultado mínimo, máximo e reinício sem carregar respostas anteriores? [Cobertura, Spec §RF-011–RF-013, CS-004–CS-005]

## Requisitos Não Funcionais

- [x ] CHK023 Os requisitos de acessibilidade tornam explícitos uso por teclado, associação de rótulos e feedback que não dependa apenas de cor? [Completude, Plan §Contrato de Interface, Gap]
- [x ] CHK024 A responsividade define critérios observáveis para diferentes larguras de tela e ausência de conteúdo ou controles inacessíveis? [Mensurabilidade, Plan §Technical Context, Guia Rápido]
- [x ] CHK025 As expectativas de carregamento e apresentação do conjunto local de 10 questões têm um limite mensurável, ou a ausência de meta está registrada como decisão? [Clareza, Plan §Performance Goals, Ambiguidade]

## Dependências e Pressupostos

- [x ] CHK026 A necessidade de servir os arquivos por HTTP está documentada de modo compatível com “funcionar diretamente no navegador” e com a proibição de backend? [Consistência, Plan §Constraints, Research §Carregamento do arquivo JSON]
- [x ] CHK027 O escopo deixa explícito que abrir por `file://` não é suportado para carregar o JSON, e identifica a alternativa de execução local estática? [Completude, Plan §Constraints, Quickstart §Pré-requisitos]
- [x ] CHK028 Os pressupostos de tentativa em memória, ausência de persistência e ordem fixa das questões estão reconhecidos como decisões de produto? [Dependência, Spec §Pressupostos, Plan §Storage]

## Ambiguidades e Conflitos

- [x ] CHK029 Existe uma única regra coerente para o instante em que o resultado final substitui a tela de feedback da última questão? [Ambiguidade, Spec §RF-009, Cenários da História 1]
- [x ] CHK030 A especificação e os artefatos de planejamento usam termos consistentes para resposta, pontuação parcial, resultado, conclusão e reinício? [Consistência, Spec §Esclarecimentos, RF-005–RF-013, Contrato de Interface]

## Notes

- Marque um item `[x]` somente após revisão humana confirmar que o requisito está completo, claro, consistente e verificável.
- Itens `[ ]` indicam pontos que ainda precisam de avaliação ou refinamento dos requisitos.
- Esta checklist não comprova implementação nem substitui `requirements.md`, que tem ciclo de vida próprio.
- `$speckit-implement` trata o estado da checklist como um gate e não deve alterar seus marcadores.
