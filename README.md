# SWCI - Sistema Web de Controle Interno

## Visão Geral
O SWCI é um sistema web de controle interno desenvolvido para gerenciar contratos, pessoas físicas e jurídicas, com funcionalidades de alertas e geração de documentos.

## Funcionalidades Principais

### Dashboard
- Visão geral estatística dos contratos
- Cards com resumos:
  - Total de contratos
  - Contratos ativos
  - Valor total
  - Valor médio
- Gráfico de projeção de gastos com contratos (2024-2026)

### Gestão de Pessoas

#### Pessoas Físicas
- Cadastro completo com informações pessoais
- Listagem com busca e filtros
- Visualização detalhada
- Edição de cadastros

#### Pessoas Jurídicas
- Cadastro de empresas
- Listagem com busca e filtros
- Visualização detalhada
- Edição de cadastros

### Gestão de Contratos

#### Cadastro de Contratos
- Formulário completo com:
  - Identificação do contrato
  - Informações do contratante
  - Informações do contratado
  - Detalhes do contrato
  - Informações de pagamento
  - Penalidades
  - Classificação orçamentária
  - Informações adicionais

#### Lista de Contratos
- Visualização em tabela
- Filtros e busca
- Modal para visualização detalhada
- Opções para:
  - Edição de contratos
  - Visualização de PDF
  - Download de documentos

#### Editor de Modelos
- Seleção de modelos predefinidos
- Edição de templates
- Geração de PDF

### Sistema de Alertas
- Notificações de contratos próximos ao vencimento
- Classificação por cores:
  - Verde: 120 dias
  - Laranja: 60 dias
  - Vermelho: 30 dias
- Opções para renovação ou finalização

## Tecnologias Utilizadas

### Frontend
- React com TypeScript
- Vite como bundler
- Tailwind CSS para estilização
- shadcn/ui para componentes de interface
- Tanstack Query para gerenciamento de estado e requisições
- Recharts para gráficos
- Lucide React para ícones

### Bibliotecas Principais
- @tanstack/react-query
- react-router-dom
- recharts
- lucide-react
- date-fns
- zod (validação)

## Estrutura do Projeto

### Componentes Principais

```
src/
├── components/
│   ├── contract/           # Componentes relacionados a contratos
│   ├── dashboard/          # Componentes do dashboard
│   ├── ui/                 # Componentes de UI reutilizáveis
│   └── Navigation.tsx      # Navegação principal
├── pages/
│   ├── Index.tsx           # Dashboard principal
│   ├── ContractList.tsx    # Lista de contratos
│   ├── ContractAlerts.tsx  # Sistema de alertas
│   └── ...                 # Outras páginas
└── App.tsx                 # Componente principal
```

## Rotas Principais

- `/` - Dashboard
- `/contratos/novo` - Cadastro de contratos
- `/contratos` - Lista de contratos
- `/contratos/modelo/:id?` - Editor de modelos
- `/alertas/contratos` - Alertas de contratos
- `/pessoas/fisica/novo` - Cadastro de pessoa física
- `/pessoas/juridica/novo` - Cadastro de pessoa jurídica
- `/pessoas/fisica` - Lista de pessoas físicas
- `/pessoas/juridica` - Lista de pessoas jurídicas
- `/pessoas/fisica/:id` - Detalhes de pessoa física
- `/pessoas/juridica/:id` - Detalhes de pessoa jurídica

## Instalação e Execução

1. Clone o repositório:
```bash
git clone <URL_DO_REPOSITORIO>
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm run dev
```

## Desenvolvimento

### Padrões de Código
- Componentes funcionais com TypeScript
- Hooks do React para gerenciamento de estado
- Tailwind CSS para estilização
- Componentes modulares e reutilizáveis
- Validação de formulários com Zod

### Boas Práticas
- Código limpo e bem documentado
- Componentes pequenos e focados
- Reutilização de componentes
- Tipagem forte com TypeScript
- Gerenciamento de estado eficiente
- Responsividade em todas as telas

## Próximos Passos
- Integração com backend Django
- Implementação de WebSockets para atualizações em tempo real
- Sistema de autenticação e autorização
- Melhorias na geração de PDFs
- Implementação de testes automatizados

## Contribuição
Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Faça commit das mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença
Este projeto está sob a licença [MIT](https://opensource.org/licenses/MIT).