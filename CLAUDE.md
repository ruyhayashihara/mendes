# Centro de Soldagem Mendes - Project Context & Rules

## 🏗 Arquitetura e Decisões Técnicas
- **Tech Stack:** React 19, Vite v6, Tailwind CSS v4, Framer Motion (motion/react), TypeScript.
- **Design System / UI:** Layouts cinematográficos (imagens edge-to-edge com gradients masks - ex: g-gradient-to-r, g-gradient-to-t), containers com Aspect Ratio rigorosos (spect-[652/752]), e elementos float com Glassmorphism.
- **Estilização:** Baseada integralmente no **Tailwind CSS v4** via configurações @theme no src/index.css (para fontes customizadas, blocos @keyframes, variáveis estruturais e de cores base).
- **Animações:** Efeitos de Parallax (gerenciados pelo ramer-motion via useScroll e useSpring), e navegação fluida em infinite scroll (nimate-marquee).
- **Data Source:** Estrutura de dados statless com conteúdo e configuração principal exportada e mapeada a partir de src/data.ts.

## 🤖 Instruções Mandatórias para a IA (Agente)
Essas regras substituem o comportamento padrão e devem ser seguidas de forma rigorosa em todas as interações.

1. **Consultar o Graphify SEMPRE:** 
   - Antes de analisar, responder a qualquer solicitação ou planejar a alteração de código, VOCÊ DEVE consultar a estrutura do **Graphify** para entender as relações e dependências (ex: lendo o graphify-out/GRAPH_REPORT.md ou usando os comandos nativos de busca no graph.json). 
   - **NUNCA PULE ESTA ETAPA**, independentemente de quão simples pareça o pedido.

2. **Garantir Atualização Unificada e Síncrona:** 
   - Sempre que fizer uma alteração no código fonte do projeto você deve ATUALIZAR, no mesmo turno:
     1. O contexto do subgrafo executando atualizações automáticas via script/cli do graphify (para refletir a mudança no grafo localmente, processando graphify).
     2. Este arquivo (CLAUDE.md), CASO a alteração envolver novas abordagens de arquitetura, refatorações amplas, decisões técnicas ou componentes núcleo novos.
   - Ambas as ações não devem em hipótese alguma ser adiadas para "após o commit" ou separadas da ação que modificou o código originalmente.
