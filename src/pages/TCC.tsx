import React from 'react';

const TCC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-8 space-y-8">
        {/* Capa */}
        <div className="text-center space-y-6 pb-12 border-b border-border">
          <div className="space-y-2">
            <h1 className="text-sm font-medium text-muted-foreground">MINISTÉRIO DA EDUCAÇÃO</h1>
            <h2 className="text-sm font-medium text-muted-foreground">SECRETARIA DE EDUCAÇÃO PROFISSIONAL E TECNOLÓGICA</h2>
            <h3 className="text-sm font-medium text-muted-foreground">INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA DE RORAIMA</h3>
            <h4 className="text-sm font-medium text-muted-foreground">DEPARTAMENTO DE ENSINO DE GRADUAÇÃO</h4>
            <h5 className="text-sm font-medium text-muted-foreground">CURSO SUPERIOR DE TECNOLOGIA EM ANÁLISE E DESENVOLVIMENTO DE SISTEMAS</h5>
          </div>
          
          <div className="space-y-4 py-8">
            <div className="space-y-2">
              <p className="text-sm font-medium">ÂNGELO GABRIEL MEDEIROS</p>
              <p className="text-sm font-medium">GEOVANNA DE ARAÚJO SALDANHA</p>
              <p className="text-sm font-medium">VITÓRIA KAYLANNE MARTINS GOMES</p>
            </div>
          </div>
          
          <div className="space-y-4 py-8">
            <h1 className="text-xl font-bold">SWGCM - PROTÓTIPO DE SISTEMA WEB PARA GESTÃO DE CONTRATOS E MONITORAMENTO DE PRODUTIVIDADE</h1>
            <p className="text-lg font-medium">TRABALHO DE CONCLUSÃO DE CURSO</p>
          </div>
          
          <div className="pt-8">
            <p className="text-sm font-medium">BOA VISTA - RORAIMA</p>
            <p className="text-sm font-medium">2025</p>
          </div>
        </div>

        {/* Folha de Rosto */}
        <div className="text-center space-y-8 pb-12 border-b border-border">
          <div className="space-y-2">
            <p className="text-sm font-medium">ÂNGELO GABRIEL MEDEIROS</p>
            <p className="text-sm font-medium">GEOVANNA DE ARAÚJO SALDANHA</p>
            <p className="text-sm font-medium">VITÓRIA KAYLANNE MARTINS GOMES</p>
          </div>
          
          <h1 className="text-xl font-bold py-8">SWGCM - PROTÓTIPO DE SISTEMA WEB PARA GESTÃO DE CONTRATOS E MONITORAMENTO DE PRODUTIVIDADE</h1>
          
          <div className="max-w-md mx-auto text-justify text-sm space-y-4">
            <p>Trabalho de Conclusão de Curso II apresentado ao Curso de Tecnologia em Análise e Desenvolvimento de Sistemas do Instituto Federal de Educação, Ciência e Tecnologia de Roraima (IFRR) como requisito parcial para obtenção do grau de Tecnólogo em Análise e Desenvolvimento de Sistemas</p>
            <p><strong>Orientador:</strong> Prof. Pierre da Costa Viana Júnior</p>
          </div>
          
          <div className="pt-8">
            <p className="text-sm font-medium">BOA VISTA - RORAIMA</p>
            <p className="text-sm font-medium">2025</p>
          </div>
        </div>

        {/* Dedicatória */}
        <div className="space-y-4 pb-8 border-b border-border">
          <div className="max-w-md mx-auto text-justify italic">
            <p>Dedicamos este trabalho aos nossos pais, cujo amor incondicional e apoio constante foram essenciais para nossa jornada acadêmica. Agradecemos também aos nossos irmãos e amigos, que estiveram ao nosso lado, compartilhando risos, desafios e triunfos. A todo suporte que recebemos ao longo do caminho.</p>
          </div>
        </div>

        {/* Agradecimentos */}
        <div className="space-y-4 pb-8 border-b border-border">
          <h2 className="text-lg font-bold text-center">AGRADECIMENTOS</h2>
          <div className="text-justify space-y-4">
            <p>A caminhada até a conclusão deste trabalho foi desafiadora, mas também repleta de aprendizados e apoio. Por isso, expressamos nossa sincera gratidão a todos que contribuíram para essa conquista.</p>
            <p>Primeiramente, somos gratos a Deus por nos guiar e fortalecer durante toda nossa trajetória acadêmica, tornando possível a realização deste trabalho.</p>
            <p>Agradecemos ao nosso orientador, Pierre da Costa Viana Júnior, pelo suporte, paciência e dedicação ao longo deste percurso. Sua orientação foi fundamental para que pudéssemos desenvolver este trabalho com qualidade e profundidade.</p>
            <p>Também somos imensamente gratos às nossas famílias, pelo apoio incondicional, incentivo e compreensão nos momentos mais intensos. Aos nossos amigos por estarem ao nosso lado, seja revisando textos, ouvindo nossas preocupações ou simplesmente nos motivando a seguir em frente.</p>
            <p>Por fim, agradecemos a todos os professores do Curso de Análise e Desenvolvimento de Sistemas do Instituto Federal de Roraima - Campus Boa Vista (IFRR/CBV) e a todos que, de alguma forma, contribuíram para o nosso crescimento acadêmico e pessoal. A cada um que fez parte dessa caminhada, nosso mais sincero obrigado!</p>
          </div>
        </div>

        {/* Resumo */}
        <div className="space-y-4 pb-8 border-b border-border">
          <h2 className="text-lg font-bold text-center">RESUMO</h2>
          <div className="text-justify space-y-4">
            <p>Este trabalho tem como objetivo principal apresentar o desenvolvimento detalhado de um protótipo funcional de um Sistema Web para Gestão de Contratos e Monitoramento de Produtividade (SWGCM). Em um contexto empresarial, onde a eficiência operacional e a gestão de processos são absolutamente essenciais para o sucesso organizacional, o sistema aqui proposto busca integrar de maneira harmoniosa um conjunto abrangente de funcionalidades críticas. Entre essas funcionalidades destacam-se o cadastro e a gestão de contratos, o monitoramento de prazos e marcos importantes, a geração automatizada de relatórios detalhados, bem como um sistema de notificações para alertas e atualizações em tempo real.</p>
            <p>A arquitetura técnica do sistema foi cuidadosamente planejada e desenvolvida com ênfase especial em três pilares fundamentais: escalabilidade para acomodar crescimento futuro de dados e usuários, segurança robusta no tratamento de informações sensíveis e uma experiência do usuário final intuitiva e altamente eficiente. Para atingir esses objetivos, a implementação tecnológica adotou uma stack moderna e consolidada, utilizando React com TypeScript para a construção de uma interface front-end dinâmica e responsiva, enquanto o back-end e a gestão de dados são integralmente suportados pela plataforma Supabase, que fornece um banco de dados PostgreSQL confiável, serviços de autenticação de usuários seguros e a execução eficiente de funções serverless.</p>
            <p>O ciclo de desenvolvimento do protótipo seguiu uma metodologia incremental iterativa, envolvendo etapas sequenciais e minuciosamente planejadas. Este processo abrangeu desde o levantamento e análise detalhada de requisitos junto aos diversos stakeholders, passando pela modelagem de dados para garantir integridade e consistência das informações, até a implementação codificada das funcionalidades e, finalmente, fases rigorosas de validação e testes com usuários finais, garantindo que a solução final esteja perfeitamente alinhada com as necessidades e expectativas do ambiente corporativo.</p>
            <p><strong>Palavras-chave:</strong> Gestão de Contratos, Monitoramento de Produtividade, Protótipo, React, TypeScript, Supabase, Banco de Dados PostgreSQL, Notificações em Tempo Real.</p>
          </div>
        </div>

        {/* Abstract */}
        <div className="space-y-4 pb-8 border-b border-border">
          <h2 className="text-lg font-bold text-center">ABSTRACT</h2>
          <div className="text-justify space-y-4">
            <p>This paper has as its main objective the detailed development of a functional prototype of a Web System for Contract Management and Productivity Monitoring (SWGCM). In a business context where operational efficiency and effective process management are absolutely essential for organizational success, the proposed system aims to seamlessly integrate a comprehensive set of critical functionalities. Among these, the most notable are contract registration and management, deadline and milestone tracking, automated generation of detailed reports, as well as a notification system for real-time alerts and updates.</p>
            <p>The system's technical architecture was carefully designed and developed with special emphasis on three fundamental pillars: scalability, to accommodate future growth in data and users; robust security, to ensure the safe handling of sensitive information; and an intuitive, highly efficient user experience. To achieve these goals, the technological implementation adopted a modern and consolidated stack, employing React with TypeScript for building a dynamic and responsive front-end interface, while the back-end and data management are fully supported by the Supabase platform, which provides a reliable PostgreSQL database, secure user authentication services, and efficient execution of serverless functions.</p>
            <p>The prototype's development cycle followed an iterative incremental methodology, involving carefully planned sequential phases. This process ranged from the elicitation and detailed analysis of requirements with diverse stakeholders, through data modeling to ensure information integrity and consistency, to the coded implementation of functionalities, and finally rigorous validation and user testing phases. These steps ensured that the final solution is perfectly aligned with the needs and expectations of the corporate environment.</p>
            <p><strong>Keywords:</strong> Contract Management, Productivity Monitoring, Prototype, React, TypeScript, Supabase, PostgreSQL Database, Real-Time Notifications.</p>
          </div>
        </div>

        {/* Sumário */}
        <div className="space-y-4 pb-8 border-b border-border">
          <h2 className="text-lg font-bold text-center">SUMÁRIO</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>1. INTRODUÇÃO</span><span>12</span></div>
            <div className="flex justify-between"><span>2. OBJETIVOS</span><span>14</span></div>
            <div className="flex justify-between ml-4"><span>2.1. OBJETIVO GERAL</span><span>14</span></div>
            <div className="flex justify-between ml-4"><span>2.2. OBJETIVOS ESPECÍFICOS</span><span>14</span></div>
            <div className="flex justify-between"><span>3. FUNDAMENTAÇÃO TEÓRICA</span><span>15</span></div>
            <div className="flex justify-between ml-4"><span>3.1. GESTÃO DE CONTRATOS</span><span>15</span></div>
            <div className="flex justify-between ml-4"><span>3.2. PRODUTIVIDADE INTERNA</span><span>15</span></div>
            <div className="flex justify-between ml-4"><span>3.3. TECNOLOGIAS UTILIZADAS</span><span>15</span></div>
            <div className="flex justify-between"><span>4. TRABALHOS RELACIONADOS E METODOLOGIA</span><span>18</span></div>
            <div className="flex justify-between"><span>5. IMPLEMENTAÇÃO</span><span>22</span></div>
            <div className="flex justify-between"><span>6. RESULTADOS ALCANÇADOS</span><span>27</span></div>
            <div className="flex justify-between"><span>7. LIMITAÇÕES E TRABALHOS FUTUROS</span><span>29</span></div>
            <div className="flex justify-between"><span>8. CONCLUSÕES</span><span>31</span></div>
            <div className="flex justify-between"><span>REFERÊNCIAS BIBLIOGRÁFICAS</span><span>34</span></div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="space-y-8">
          {/* 1. Introdução */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold">1. INTRODUÇÃO</h2>
            <div className="text-justify space-y-4">
              <p>No cenário organizacional contemporâneo, a gestão eficiente de contratos e o monitoramento da produtividade interna são fatores críticos para a sustentabilidade das empresas. A ausência de ferramentas específicas pode gerar falhas operacionais, como atrasos em prazos de renovação, custos adicionais e perda de oportunidades estratégicas.</p>
              <p>Segundo Carvalho e Rabechini (2017), "a gestão de contratos é um processo que envolve planejamento, execução e monitoramento contínuo, garantindo que os compromissos assumidos sejam cumpridos de forma eficaz". Já Drucker (1999) reforça que "a produtividade não está ligada apenas à eficiência, mas também ao alinhamento do trabalho realizado com os objetivos estratégicos da organização".</p>
              <p>Além disso, Laudon e Laudon (2020) defendem que "os sistemas de informação gerenciais permitem integrar dados e fornecer suporte à decisão em todos os níveis da organização". Isso significa que a adoção de ferramentas digitais para contratos e produtividade não apenas reduz riscos, mas também promove maior governança e competitividade.</p>
              <p>Muitas organizações ainda dependem de planilhas e processos manuais para gerir contratos, o que dificulta o controle de prazos e a análise de produtividade. Esse modelo aumenta o risco de falhas e compromete a eficiência dos processos organizacionais.</p>
              <p>Diante disso, o problema que este trabalho busca resolver pode ser formulado da seguinte forma:</p>
              <p className="italic">Como desenvolver um sistema web que integre a gestão de contratos e o monitoramento da produtividade interna, oferecendo funcionalidades automatizadas para apoiar a tomada de decisão estratégica?</p>
              <p>A relevância deste trabalho está fundamentada em três aspectos principais:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Organizacional:</strong> contratos são instrumentos jurídicos que sustentam relações comerciais, e sua má gestão pode comprometer resultados financeiros e estratégicos (Guarido, 2021).</li>
                <li><strong>Tecnológico:</strong> frameworks modernos como React e plataformas Backend-as-a-Service (Supabase) oferecem recursos de escalabilidade, segurança e rapidez de desenvolvimento (Supabase Docs, 2025).</li>
                <li><strong>Acadêmico:</strong> a proposta contribui com o campo de Análise e Desenvolvimento de Sistemas ao demonstrar como tecnologias emergentes podem ser aplicadas em problemas de gestão.</li>
              </ul>
            </div>
          </section>

          {/* 2. Objetivos */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold">2. OBJETIVOS</h2>
            
            <div className="space-y-4">
              <h3 className="text-base font-bold">2.1. OBJETIVO GERAL</h3>
              <p className="text-justify">Desenvolver um Sistema Web de Controle Interno para gestão integrada de contratos e monitoramento da produtividade, com interface intuitiva e funcionalidades automatizadas que apoiem a tomada de decisões estratégicas.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-bold">2.2. OBJETIVOS ESPECÍFICOS</h3>
              <ul className="list-disc pl-6 space-y-2 text-justify">
                <li>Criar alertas automatizados para contratos próximos ao vencimento;</li>
                <li>Implementar dashboards interativos para visualização de contratos e indicadores de produtividade;</li>
                <li>Desenvolver interfaces responsivas e intuitivas para cadastro e acompanhamento de contratos;</li>
                <li>Gerar relatórios detalhados sobre o status contratual;</li>
                <li>Automatizar o processo de renovação contratual;</li>
                <li>Implementar sistema de busca e filtros avançados;</li>
                <li>Criar mecanismos de autenticação e autorização baseados em papéis.</li>
              </ul>
            </div>
          </section>

          {/* 3. Fundamentação Teórica */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold">3. FUNDAMENTAÇÃO TEÓRICA</h2>
            
            <div className="space-y-4">
              <h3 className="text-base font-bold">3.1. GESTÃO DE CONTRATOS</h3>
              <div className="text-justify space-y-4">
                <p>A gestão de contratos envolve o acompanhamento de prazos, obrigações legais e responsabilidades das partes contratantes. Para Guarido (2021), "a qualidade da gestão contratual impacta diretamente na transparência e na eficiência das políticas públicas e privadas".</p>
                <p>Em um estudo sobre terceirização, Bonelli e Cabral (2018) mostraram que "as competências dos gestores e das organizações contratadas influenciam diretamente o custo e a qualidade dos serviços prestados". Isso evidencia a importância de sistemas que minimizem riscos, aumentem a rastreabilidade e apoiem auditorias.</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-bold">3.2. PRODUTIVIDADE INTERNA</h3>
              <div className="text-justify space-y-4">
                <p>A produtividade é frequentemente utilizada como indicador-chave de desempenho (KPI). Slack, Brandon-Jones e Johnston (2018) afirmam que "a produtividade mede a eficiência com que recursos são utilizados para gerar resultados". Drucker (1999) complementa que "o trabalho produtivo é aquele que gera valor alinhado com os objetivos estratégicos".</p>
                <p>Kaplan e Norton (1996), ao propor o Balanced Scorecard, reforçam a necessidade de integrar indicadores de desempenho a metas estratégicas, de forma que dashboards e relatórios digitais contribuam para decisões ágeis.</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-bold">3.3. TECNOLOGIAS UTILIZADAS</h3>
              
              <div className="space-y-4">
                <h4 className="text-sm font-bold">3.3.1. REACT COM TYPESCRIPT</h4>
                <p className="text-justify">O React é uma biblioteca JavaScript criada para construção de interfaces dinâmicas. Segundo a documentação oficial, "React promove o desenvolvimento baseado em componentes reutilizáveis e a atualização eficiente da interface do usuário" (React Docs, 2025). Em conjunto, o TypeScript fornece tipagem estática, reduzindo erros em tempo de execução.</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold">3.3.2. SUPABASE (BACKEND-AS-A-SERVICE)</h4>
                <p className="text-justify">O Supabase é uma plataforma baseada em PostgreSQL que oferece autenticação, APIs automáticas e políticas de segurança avançadas. Conforme a documentação, "o Row Level Security (RLS) garante que cada usuário só acesse dados autorizados" (Supabase Docs, 2025).</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold">3.3.3. TAILWIND CSS</h4>
                <p className="text-justify">O Tailwind CSS utiliza o modelo utility-first para acelerar a criação de interfaces modernas e responsivas. A documentação oficial destaca que "o Tailwind oferece consistência visual e personalização por meio de tokens semânticos" (Tailwind Docs, 2025).</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold">3.3.4. SHADCN/UI</h4>
                <p className="text-justify">O shadcn/ui provê componentes acessíveis e reutilizáveis baseados em Radix UI, permitindo maior padronização visual e usabilidade (Radix UI, 2024).</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold">3.3.5. REACT QUERY (TANSTACK QUERY)</h4>
                <p className="text-justify">O TanStack Query simplifica o gerenciamento de estado do servidor, incluindo cache e sincronização automática. Como afirma a documentação, "a biblioteca facilita a obtenção e atualização de dados sem aumentar a complexidade do código" (TanStack Query Docs, 2025).</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold">3.3.6. RECHARTS</h4>
                <p className="text-justify">O Recharts é uma biblioteca para visualização de dados em React, baseada no D3.js. Segundo Few (2009), "a visualização adequada transforma dados complexos em informações acessíveis para a tomada de decisão".</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold">3.3.7. REACT HOOK FORM E ZOD</h4>
                <p className="text-justify">O React Hook Form fornece gerenciamento performático de formulários, enquanto o Zod garante validação de dados integrada. A documentação ressalta que "a combinação reduz a necessidade de re-renderizações e aumenta a confiabilidade" (Zod Docs, 2024).</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold">3.3.8. OUTRAS FERRAMENTAS</h4>
                <ul className="list-disc pl-6 space-y-2 text-justify">
                  <li><strong>Axios:</strong> facilita requisições HTTP e interceptação de respostas (Haxton, 2020).</li>
                  <li><strong>Lucide React:</strong> biblioteca de ícones SVG otimizados.</li>
                  <li><strong>Date-fns:</strong> manipulação eficiente de datas com suporte a internacionalização.</li>
                  <li><strong>Sonner:</strong> sistema de notificações com animações acessíveis.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Continue com as outras seções... */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold">4. TRABALHOS RELACIONADOS E METODOLOGIA</h2>
            
            <div className="space-y-4">
              <h3 className="text-base font-bold">4.1. TRABALHOS RELACIONADOS</h3>
              
              <div className="space-y-4">
                <h4 className="text-sm font-bold">4.1.1. GESTÃO DE CONTRATOS NO SETOR PÚBLICO E PRIVADO</h4>
                <div className="text-justify space-y-4">
                  <p>Estudos em contexto brasileiro mostram que a complexidade normativa e a multiplicidade de partes interessadas tornam a gestão de contratos uma atividade crítica, sujeita a riscos de atraso, custo e qualidade. Pesquisas analisam contratos administrativos e evidenciam desafios para assegurar desempenho, reforçando a necessidade de instrumentos de monitoramento e indicadores de gestão. Como sintetiza um estudo sobre contratos administrativos no Brasil, a resiliência de valores públicos depende de desenho e execução contratual consistentes, com mecanismos de acompanhamento e transparência (Guarido, 2021).</p>
                  <p>Em serviços terceirizados, evidências empíricas identificam que competências do contratante e do contratado afetam custo e qualidade, indicando que processos e sistemas de gestão bem desenhados reduzem assimetrias de informação e melhoram resultados (Bonelli & Cabral, 2018).</p>
                  <p>Na saúde pública, estudos sobre contratos de gestão destacam que metas e indicadores nem sempre se traduzem automaticamente em qualidade, o que reforça a importância de sistemas informacionais e painéis que conectem metas a evidências operacionais (Melo et al., 2021).</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold">4.1.2. SISTEMAS E PAINÉIS (DASHBOARDS) PARA DECISÃO GERENCIAL</h4>
                <div className="text-justify space-y-4">
                  <p>A literatura contemporânea identifica os dashboards como instrumentos centrais para transformar dados em ação, desde que atendam a critérios de usabilidade, governança e avaliação. Uma revisão em saúde propôs cenários de avaliação de dashboards (desempenho de tarefas, mudança de comportamento, utilidade potencial etc.), chamando atenção para a necessidade de metodologias de avaliação consistentes (Zhuang, Concannon & Manley, 2020).</p>
                  <p>Do ponto de vista de projeto, um mapeamento de padrões de design de dashboards identifica oito grupos de padrões e discute trade-offs comuns (espaço de tela, interação, densidade informacional), oferecendo arcabouço prático para desenho e avaliação de painéis analíticos (Bach et al., 2022).</p>
                  <p>Em aplicações industriais, estudos de caso reportam ganhos mensuráveis ao otimizar dashboards web (tempo de carregamento, consultas, visualizações), ligando engenharia de desempenho à adoção efetiva pelas áreas de negócio (van Riet et al., 2023).</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold">4.1.3. AUTOMATIZAÇÃO, ALERTAS E RENOVAÇÃO CONTRATUAL</h4>
                <p className="text-justify">Na prática organizacional, alertas automatizados e workflows são descritos como elementos-chave para reduzir perdas por vencimentos e atrasos, bem como para assegurar trilhas de auditoria. Fontes profissionais corroboram esses benefícios ao apontar que "notificações configuráveis e auditoria histórica aumentam o awareness para renovações e marcos contratuais" (ContractLogix, s.d.; CobbleStone Software, 2025). Embora sejam fontes de mercado, elas descrevem funcionalidades alinhadas às boas práticas mapeadas academicamente de rastreabilidade.</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold">4.1.4. FUNDAMENTOS DE SISTEMAS DE INFORMAÇÃO E DE DESEMPENHO</h4>
                <p className="text-justify">No campo de Sistemas de Informação Gerencial, obras clássicas situam a função dos SI em apoiar decisão, coordenação e controle, ao integrar dados transacionais e analíticos (Laudon & Laudon, 2016/2020). No eixo estratégia-execução, o Balanced Scorecard permanece referência para traduzir objetivos em indicadores e iniciativas, conectando processos internos e aprendizado a resultados financeiros e de clientes (Kaplan & Norton, 1996). Esses referenciais sustentam o uso de dashboards e alertas como camadas de orquestração entre operação e estratégia.</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold">4.1.5. TECNOLOGIAS ESCOLHIDAS E BOAS PRÁTICAS</h4>
                <p className="text-justify">No frontend, a documentação oficial de React (hooks, composição, componentes controlados) e Tailwind CSS (utility-first) embasa decisões de arquitetura e estilo (React Docs, 2023–2025; Tailwind Docs, 2024–2025). Para estado de servidor, TanStack Query oferece cache, invalidação e refetch em background, reduzindo acoplamento entre UI e IO (TanStack Query Docs, 2024–2025). No backend como serviço, Supabase disponibiliza PostgreSQL com Row Level Security (RLS), prática reconhecida para autorização granular diretamente no banco (Supabase Docs, 2025). Essas referências técnicas são normativas e constituem fontes primárias de cada tecnologia. (React Docs, 2025; Tailwind Docs, 2025; TanStack Query Docs, 2025; Supabase Docs, 2025).</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-bold">4.2. METODOLOGIA</h3>
              
              <div className="space-y-4">
                <h4 className="text-sm font-bold">4.2.1. ABORDAGEM DE PESQUISA</h4>
                <div className="text-justify space-y-4">
                  <p>Adotamos uma abordagem de Design Science Research (DSR) para projetar, construir e avaliar o SWGCM como artefato que resolve um problema organizacional relevante (perda de prazos, baixa visibilidade de contratos e produtividade). A DSR orienta a iteração entre relevância do problema, rigor científico e contribuição do artefato, com diretrizes para demonstrar utilidade e avaliar o design (Hevner et al., 2004).</p>
                  <p>Complementarmente, o mapeamento bibliográfico seguiu recomendações para revisões sistemáticas em Engenharia de Software, com fases de planejamento, condução e relato, contemplando protocolo, critérios de inclusão/exclusão e extração de dados (Kitchenham & Charters, 2007).</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold">4.2.2. ESTRATÉGIA DE DESENVOLVIMENTO</h4>
                <div className="text-justify space-y-4">
                  <p>Arquitetura orientada a componentes (React + TypeScript) e design utility-first (Tailwind) foram selecionados para favorecer reuso, consistência e velocidade. TanStack Query viabiliza o ciclo de vida de cache (chaves de consulta, stale time, background refetch) e compartilhamento de resultados entre componentes, reduzindo latência percebida e chamadas redundantes (TanStack Query Docs, v5).</p>
                  <p>No backend, Supabase (PostgreSQL) foi escolhida pela combinação de autenticação e RLS. As políticas RLS (SELECT/INSERT/UPDATE/DELETE) implementam controle de acesso baseado em papéis no próprio banco, compondo defesa em profundidade e facilitando auditoria e testes de autorização (Supabase Docs — RLS, 2025).</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold">4.2.3. PROCEDIMENTOS DE COLETA E ANÁLISE</h4>
                <ol className="list-decimal pl-6 space-y-2 text-justify">
                  <li><strong>Levantamento de requisitos:</strong> análise de processos atuais de gestão de contratos (prazos, renovações, status) e definição de KPI para produtividade e conformidade, à luz de referências de dashboards e BSC.</li>
                  <li><strong>Desenho do artefato:</strong> modelagem de entidades (contratos, alertas, pessoas físicas/jurídicas), políticas RLS e fluxos de alerta (critérios de T-120/T-60/T-30). Princípios de padrões de dashboard guiaram a composição visual e a hierarquia informacional (Bach et al., 2022).</li>
                  <li><strong>Implementação incremental:</strong> ciclos curtos com validação funcional (autenticação, CRUD, alertas), testes exploratórios de usabilidade e otimização de cache e consultas (conforme guias de TanStack e estudos de desempenho em dashboards).</li>
                  <li><strong>Avaliação:</strong> inspirada nos cenários de avaliação para dashboards (tempo de tarefa, utilidade percebida, engajamento, implementação) para mensurar qualidade da informação e suporte à decisão.</li>
                </ol>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold">4.2.4. CRITÉRIOS DE AVALIAÇÃO DO ARTEFATO</h4>
                <ul className="list-disc pl-6 space-y-2 text-justify">
                  <li><strong>Eficácia informacional:</strong> o painel responde às principais questões de negócio com poucos cliques e tempo de tarefa adequado.</li>
                  <li><strong>Qualidade de design:</strong> uso de padrões de dashboard apropriados ao gênero (analítico, operacional).</li>
                  <li><strong>Conformidade e segurança:</strong> políticas RLS corretas para cada papel e evidência de auditoria.</li>
                  <li><strong>Desempenho:</strong> latência percebida de carregamento de listas e gráficos, e eficiência de cache.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold">4.2. SÍNTESE CRÍTICA</h4>
                <p className="text-justify">Segundo os autores, monitorar contratos com indicadores e alertas é essencial para evitar perdas e capturar oportunidades de renovação, mas o efeito sobre resultados depende de desenho de dashboard, governança de dados e processos de acompanhamento. Ao adotar DSR, o SWGCM materializa um artefato guiado por problema, com decisões técnicas lastreadas em fontes primárias (React, Tailwind, TanStack, Supabase) e evidências de estudos empíricos e revisões.</p>
              </div>
            </div>
          </section>

          {/* Continue com outras seções similares... */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold">5. IMPLEMENTAÇÃO</h2>
            
            <div className="space-y-4">
              <h3 className="text-base font-bold">5.1. VISÃO GERAL DA IMPLEMENTAÇÃO</h3>
              <div className="text-justify space-y-4">
                <p>A implementação do Sistema Web para Gestão de Contratos e Monitoramento (SWGCM) foi conduzida com foco em escalabilidade, modularidade e usabilidade. O processo de desenvolvimento seguiu o modelo incremental, permitindo entregas parciais e validação contínua junto aos usuários.</p>
                <p>Segundo Pressman (2016), "o modelo incremental possibilita ciclos curtos de entrega, o que aumenta a capacidade de adaptação às mudanças de requisitos". Assim, cada iteração do SWGCM agregou novas funcionalidades, validadas por meio de testes de usabilidade e ajustes de interface.</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-bold">5.2. ARQUITETURA DO SISTEMA</h3>
              <div className="text-justify space-y-4">
                <p>A arquitetura foi definida de forma orientada a componentes, conforme as boas práticas recomendadas em React. Os principais diretórios organizados foram:</p>
                <div className="bg-muted p-4 rounded font-mono text-sm">
                  <div>src/</div>
                  <div>├── components/          # Componentes reutilizáveis</div>
                  <div>│   ├── ui/              # Componentes de interface (shadcn/ui)</div>
                  <div>│   ├── forms/           # Componentes de formulário</div>
                  <div>│   ├── lists/           # Componentes de listagem</div>
                  <div>│   ├── dashboard/       # Componentes do dashboard</div>
                  <div>│   ├── contract/        # Componentes específicos de contratos</div>
                  <div>│   └── common/          # Componentes comuns</div>
                  <div>├── pages/               # Páginas da aplicação</div>
                  <div>├── hooks/               # Custom hooks</div>
                  <div>├── services/            # Serviços de API</div>
                  <div>├── integrations/        # Integrações externas</div>
                  <div>│   └── supabase/        # Cliente e tipos do Supabase</div>
                  <div>├── utils/               # Utilitários</div>
                  <div>└── lib/                 # Configurações de bibliotecas</div>
                </div>
                <p className="text-xs italic">Fonte: Autores</p>
              </div>
            </div>

            {/* Continue com outras subseções de implementação... */}
          </section>

          {/* Referências */}
          <section className="space-y-4 border-t border-border pt-8">
            <h2 className="text-lg font-bold">REFERÊNCIAS BIBLIOGRÁFICAS</h2>
            <div className="text-justify space-y-4 text-sm">
              <p>BONELLI, Francisco; CABRAL, Sandro. Efeitos das Competências no Desempenho de Contratos de Serviços no Setor Público. <strong>Revista de Administração Contemporânea</strong>, [S. l.], 16 fev. 2018. Disponível em: https://doi.org/10.1590/1982-7849rac2018170152. Acesso em: 3 dez. 2024.</p>
              
              <p>CARVALHO, M. M.; RABECHINI, R. <strong>Gestão de Projetos: teoria e prática</strong>. 2. ed. São Paulo: Atlas, 2017.</p>
              
              <p>DRUCKER, P. F. <strong>Management Challenges for the 21st. Century</strong>. New York: Harper Business, 1999. Disponível em: http://www.aghalibrary.com/storage/books/1614252371_AghaLibrary.pdf. Acesso em: 3 dez. 2024.</p>
              
              <p>FEW, S. <strong>Now You See It: Simple Visualization Techniques for Quantitative Analysis</strong>. Oakland: Analytics Press, 2009.</p>
              
              <p>GUARIDO, R. Contratos administrativos e resiliência de valores públicos. <strong>Revista de Administração Pública</strong>, v. 55, n. 2, 2021.</p>
              
              <p>KAPLAN, R. S.; NORTON, D. P. <strong>The Balanced Scorecard: Translating Strategy into Action</strong>. Boston: Harvard Business School Press, 1996.</p>
              
              <p>LAUDON, K. C.; LAUDON, J. P. <strong>Management Information Systems: Managing the Digital Firm</strong>. 16. ed. New York: Pearson, 2020.</p>
              
              <p>React Documentation. <strong>Built-in React Hooks</strong>. 2025. Disponível em: https://react.dev/reference/react/hooks. Acesso em: 01 jul. 2025.</p>
              
              <p>Supabase Documentation. <strong>Row Level Security (RLS)</strong>. 2025. Disponível em: https://supabase.com/docs/guides/database/postgres/row-level-security. Acesso em: 03 jul. 2025.</p>
              
              <p>TAILWIND CSS. <strong>Tailwind CSS Documentation</strong>. 2025. Disponível em: https://tailwindcss.com/docs/installation/using-vite. Acesso em: 29 de junho de 2025.</p>
              
              <p>TANSTACK QUERY. <strong>Documentation</strong>. 2025. Disponível em: https://tanstack.com/query/latest. Acesso em: 02 jul. 2025.</p>
              
              <p>ZOD. <strong>Zod Documentation</strong>. 2024. Disponível em: https://zod.dev/. Acesso em: 01 de julho de 2025.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TCC;