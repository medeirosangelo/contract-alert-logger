
# Pendências e Melhorias do Sistema SWGCM

## Status Atual do Sistema

### ✅ Funcionalidades Implementadas
- Sistema de autenticação completo com Supabase Auth
- Dashboard analítico com gráficos interativos
- CRUD completo de contratos
- Sistema de alertas automatizado por cores
- Gestão de pessoas físicas e jurídicas
- Sistema de permissões baseado em papéis (RBAC)
- Validação robusta de dados com Zod
- Interface responsiva com Tailwind CSS
- Componentes reutilizáveis com shadcn/ui

### 🔄 Em Avaliação
#### Página Inicial (Index)
- **Situação**: Conteúdo limitado, apenas mensagem de boas-vindas
- **Opções**:
  1. **Manter e melhorar**: Adicionar links rápidos, estatísticas resumidas, últimas atividades
  2. **Remover**: Redirecionar usuários autenticados diretamente para o dashboard
  3. **Transformar em landing page**: Para usuários não autenticados

#### Recomendação
Sugere-se **remover a página inicial** atual e implementar redirecionamento automático:
- Usuários **não autenticados** → Página de Login
- Usuários **autenticados** → Dashboard

Este documento lista as pendências e melhorias necessárias para o sistema SWGCM (Sistema Web para Gestão de Contratos e Monitoramento) baseadas nas prioridades e requisitos identificados.

## Pendências Críticas

### 1. Gestão de Usuários e Permissões
- [x] Implementar tela de gerenciamento de usuários
- [x] Implementar tela de permissões de usuários
- [ ] Implementar edição de usuários existentes
- [ ] Adicionar validação de políticas de senha (requisitos mínimos)
- [ ] Implementar recuperação de senha

### 2. Contratos
- [ ] Implementar histórico de modificações de contratos
- [ ] Adicionar filtros avançados na lista de contratos
- [ ] Criar mecanismo de aprovação de contratos
- [ ] Implementar assinatura digital de contratos
- [ ] Adicionar sistema de versionamento de contratos

### 3. Segurança e Auditing
- [ ] Implementar logs de ações dos usuários
- [ ] Adicionar timeout de sessão para usuários inativos
- [ ] Implementar autenticação em dois fatores (2FA)
- [ ] Criar políticas de segurança para usuários
- [ ] Backup automático de dados críticos

## Melhorias de Interface

### 1. Dashboard
- [ ] Adicionar mais gráficos analíticos
- [ ] Implementar dashboard específico por perfil de usuário
- [ ] Criar widgets personalizáveis
- [ ] Adicionar análise financeira de contratos
- [ ] Implementar alertas visuais para itens críticos

### 2. Formulários
- [ ] Melhorar validação em tempo real
- [ ] Adicionar autopreenchimento de dados através de APIs externas
- [ ] Implementar persistência de rascunhos de formulários
- [ ] Adicionar modo de edição em massa
- [ ] Implementar importação/exportação de dados em excel

## Funcionalidades a Serem Implementadas

### 1. Módulo de Documentação
- [ ] Implementar geração automática de documentos
- [ ] Criar sistema de modelos de documentos personalizáveis
- [ ] Adicionar armazenamento de anexos para contratos e pessoas
- [ ] Implementar visualizador de documentos integrado
- [ ] Adicionar controle de versão de documentos

### 2. Notificações e Alertas
- [ ] Implementar notificações por email
- [ ] Criar sistema de notificações push no navegador
- [ ] Adicionar notificações em tempo real para ações críticas
- [ ] Implementar lembretes programáveis
- [ ] Criar centro de notificações personalizável

### 3. Relatórios
- [ ] Implementar geração de relatórios personalizados
- [ ] Criar relatórios financeiros de contratos
- [ ] Adicionar exportação para formatos PDF, Excel e CSV
- [ ] Implementar visualização de relatórios de performance
- [ ] Criar relatórios de auditoria do sistema

## Integrações

### 1. Integrações Externas
- [ ] Implementar integração com APIs governamentais para validação de dados
- [ ] Adicionar integração com serviços de verificação de documentos
- [ ] Implementar integração com sistemas de pagamentos
- [ ] Criar comunicação com sistemas bancários
- [ ] Integrar serviços de assinatura digital

### 2. Mobile
- [ ] Desenvolver versão responsiva otimizada para dispositivos móveis
- [ ] Criar aplicativo PWA para instalação em dispositivos
- [ ] Implementar notificações push para dispositivos móveis
- [ ] Adicionar funcionalidades offline
- [ ] Criar versão simplificada para acesso rápido

## Melhorias Técnicas

### 1. Infraestrutura
- [ ] Otimizar queries de banco de dados para melhorias de performance
- [ ] Implementar cache para informações frequentemente acessadas
- [ ] Adicionar sistema de monitoramento de performance
- [ ] Criar jobs de manutenção automática
- [ ] Implementar escalabilidade horizontal

### 2. Código
- [ ] Refatorar componentes grandes em componentes menores
- [ ] Melhorar cobertura de testes
- [ ] Implementar testes automatizados (unitários e e2e)
- [ ] Padronizar nomenclatura e estrutura de código
- [ ] Otimizar carregamento de recursos (lazy loading)

## Próximos Passos

1. Priorizar as pendências críticas relacionadas a gerenciamento de usuários
2. Focar em melhorias no módulo de contratos
3. Implementar as melhorias de interface no dashboard
4. Adicionar sistema de notificações e alertas
5. Desenvolver funcionalidades de geração de relatórios

## Cronograma Sugerido

| Fase | Descrição | Tempo Estimado |
|------|-----------|----------------|
| 1 | Finalização do módulo de usuários e permissões | 2 semanas |
| 2 | Melhorias no módulo de contratos | 3 semanas |
| 3 | Implementação do sistema de notificações | 2 semanas |
| 4 | Desenvolvimento do módulo de relatórios | 3 semanas |
| 5 | Melhorias de interface e experiência do usuário | 2 semanas |
| 6 | Testes, correções e ajustes finais | 2 semanas |

## Observações sobre o TCC

### Tecnologias Confirmadamente Utilizadas
- **Frontend**: React 18.3.1, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + Edge Functions)
- **Estado**: TanStack Query 5.56.2
- **Gráficos**: Recharts 2.12.7
- **Formulários**: React Hook Form + Zod
- **Notificações**: Sonner

### Tecnologias NÃO Utilizadas
- ❌ WebSockets (comunicação em tempo real limitada)
- ❌ Django REST Framework
- ❌ Celery
- ❌ Node.js backend customizado

### Arquitetura Confirmada
- **Padrão**: Component-Driven Development
- **Estrutura**: Atomic Design
- **Segurança**: Row Level Security (RLS) no PostgreSQL
- **Autenticação**: JWT com Supabase Auth
- **Deploy**: Lovable (frontend) + Supabase (backend)

---

*Documento atualizado em: Setembro 2024*

Este documento deve ser revisado e atualizado regularmente para refletir o progresso do desenvolvimento e novas prioridades.
