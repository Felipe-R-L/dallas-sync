# Dallas Sync

É um ERP focado no setor moteleiro, desenvolvido em conjunto com um cliente real, pensado para atender as necessidades da operação e facilitando o dia a dia dos colaboradores.
O objetivo do projeto é evitar pitfalls comuns em ERPs "one-size-fits-all", fornecendo algo minimalista, fácil de usar e que agregue valor real aos clientes. Sem features desnecessárias, design mal estruturado e UI lenta e cheia de bugs.

## 🛠️ Stack

### Front-end

- **Angular**
- **Storybook** — documentação do design system
- **Tailwind CSS** — estilos consistentes, leves e modernos

### Back-end

- **NestJS**
- **Prisma ORM**
- **PostgreSQL**
- **Docker**


# ERP de Motelaria - Arquitetura e Modelo de Dados

Este documento descreve a arquitetura do banco de dados e a estratégia de implementação para um sistema ERP de motelaria. A stack de tecnologia definida é:


A arquitetura geral segue os padrões de **Monolito Modular**, **Clean Architecture** e **Domain-Driven Design (DDD)**, com um modelo de dados **Multi-Tenant**.

## Modelo de Dados

A fonte para a estrutura do banco de dados é o arquivo `schema.prisma`. Este documento é a base para geração do SQL puro das migrations pelo Prisma ORM.

---

## Bounded Contexts (Contextos Delimitados)

O sistema é dividido nos seguintes contextos de negócio, cada um com suas responsabilidades, modelos e enums.

### 1. Identity & Access Management (IAM) Context

Este contexto é responsável por tudo relacionado a identidade, autenticação e autorização. Ele gerencia quem pode acessar o sistema e o que cada um pode fazer.

* **Responsabilidades:** Gerenciamento de tenants (clientes), controle de usuários, autenticação (login), sistema de permissões granulares, grupos e cargos.
* **Models (Tabelas):**
    * `Tenant`
    * `User`
    * `UserGroup`
    * `Role`
    * `Permission`
* **Enums:** N/A

### 2. Accommodations & Assets Context

Este contexto lida com a estrutura física e o patrimônio do estabelecimento.

* **Responsabilidades:** Cadastro e gerenciamento de tipos de quartos, quartos físicos, e o inventário de todo o patrimônio (móveis, eletrônicos, etc.), incluindo seu histórico e localização.
* **Models (Tabelas):**
    * `RoomType`
    * `Room`
    * `AssetType`
    * `Asset`
    * `AssetHistory`
* **Enums:**
    * `RoomStatus`
    * `AssetStatus`
    * `AssetHistoryEventType`

### 3. Core Operations Context

O coração do sistema. Este contexto gerencia o fluxo principal da operação de um motel: a estadia do cliente do início ao fim.

* **Responsabilidades:** Gerenciamento de reservas, o processo de check-in e check-out, registro de consumo, e cobrança por danos ao patrimônio.
* **Models (Tabelas):**
    * `Price`
    * `Reservation`
    * `Stay`
    * `StayConsumption`
    * `DamageFee`
* **Enums:**
    * `ReservationStatus`
    * `StayType`
    * `StayStatus`

### 4. Finance & Inventory Context

Este contexto gerencia todo o fluxo financeiro e de estoque do negócio.

* **Responsabilidades:** Controle de turnos de caixa, registro de todas as transações financeiras (entradas e saídas), processamento de pagamentos e estornos, cadastro de despesas, e movimentação do estoque de produtos consumíveis.
* **Models (Tabelas):**
    * `Shift`
    * `FinancialTransaction`
    * `PaymentMethod`
    * `StayPayment`
    * `Expense`
    * `Refund`
    * `Product`
    * `StockMovement`
* **Enums:**
    * `ShiftStatus`
    * `TransactionType`
    * `PaymentStatus`
    * `ExpenseStatus`
    * `StockMovementType`

---

## Roadmap de Implementação

Este roteiro sugere uma ordem lógica de desenvolvimento para construir o sistema de forma incremental e segura.

### Fase 0: Configuração e Base do Projeto

* [ ] Inicializar o projeto NestJS.
* [ ] Configurar o Prisma e conectar com o banco de dados PostgreSQL.
* [ ] Rodar a migração inicial para criar as tabelas (`prisma migrate dev`).
* [ ] Configurar ferramentas de qualidade de código (ESLint, Prettier).
* [ ] Implementar um logger centralizado
* [ ] Configurar variáveis de ambiente (`.env`).

### Fase 1: IAM - O Núcleo de Segurança

* [ ] **CRUD para `Tenant`:** Criar endpoints para o Super Admin gerenciar os tenants.
* [ ] **Prisma Middleware para Multi-Tenancy:** Implementar o middleware que injeta o `tenantId` automaticamente em todas as queries para garantir o isolamento dos dados.
* [ ] **Autenticação:**
    * [ ] Criar `AuthModule`.
    * [ ] Implementar endpoint de login (`/auth/login`) que retorna um JWT.
    * [ ] Configurar a estratégia JWT com Passport.js.
* [ ] **Autorização (Permissions Guard):**
    * [ ] Criar um `Guard` global do NestJS.
    * [ ] Implementar a lógica que calcula o conjunto de permissões do usuário (diretas, de grupos, de cargos).
    * [ ] Proteger os endpoints com base nas permissões (`@RequirePermission('CREATE', 'Stay')`).
* [ ] **CRUDs do IAM:**
    * [ ] CRUD completo para `User`.
    * [ ] CRUD completo para `Role` e associação com `Permission`.
    * [ ] CRUD completo para `UserGroup` e associação com `User`, `Role` e `Permission`.

### Fase 2: Cadastros Essenciais (Core Setup)

* [ ] **Accommodations:**
    * [ ] CRUD para `RoomType`.
    * [ ] CRUD para `Room` (incluindo atualização de `status`).
* [ ] **Inventory & Assets:**
    * [ ] CRUD para `Product`.
    * [ ] CRUD para `AssetType`.
    * [ ] CRUD para `Asset` (incluindo a lógica para criar `AssetHistory` em mudanças de status ou localização).
* [ ] **Finance:**
    * [ ] CRUD para `PaymentMethod`.

### Fase 3: Fluxo Principal de Operação

* [ ] **Precificação Dinâmica:** Criar `PriceService` que saiba encontrar o preço correto para um `RoomType` em uma determinada data/hora.
* [ ] **Turnos (`Shift`):** Implementar `use-cases` para abrir e fechar turnos de caixa.
* [ ] **Check-in (`Stay`):**
    * [ ] Criar o `use-case` de check-in, que cria um `Stay`, associa ao `Shift` aberto, e atualiza o `Room.status`.
* [ ] **Consumo (`StayConsumption`):**
    * [ ] Criar endpoint para adicionar itens de consumo a um `Stay` ativo.
    * [ ] Implementar a lógica de abatimento de estoque (`StockMovement`) ao adicionar um consumo.
* [ ] **Check-out (`Stay`):**
    * [ ] Criar o `use-case` de check-out, o mais complexo:
        * [ ] Calcula o valor total (diária + consumo + taxas - descontos).
        * [ ] Processa um ou mais `StayPayment`.
        * [ ] Para cada pagamento, cria um `FinancialTransaction`.
        * [ ] Finaliza o `Stay` (`status: FINISHED`).
        * [ ] Atualiza o `Room.status` para `CLEANING`.

### Fase 4: Módulos de Suporte

* [ ] **Reservas (`Reservation`):**
    * [ ] CRUD para `Reservation`.
    * [ ] Criar lógica para converter uma `Reservation` em um `Stay` no momento do check-in.
* [ ] **Despesas (`Expense`):** CRUD para gerenciar e registrar o pagamento de despesas.
* [ ] **Danos ao Patrimônio (`DamageFee`):** Criar endpoint para adicionar uma taxa de dano a um `Stay`.
* [ ] **Estornos (`Refund`):** Criar endpoint para processar um estorno, associado a um `StayPayment` e que gera uma transação financeira de saída.

### Fase 5: Relatórios e BI

* [ ] Criar um `ReportsModule` com endpoints `GET` para:
    * [ ] Relatório de Ocupação.
    * [ ] Relatório de Faturamento (diário, por turno, por período).
    * [ ] Relatório de Despesas.
    * [ ] Relatório Financeiro Geral (Receitas vs Despesas).
    * [ ] Relatório de Estoque.
    * [ ] Relatório de Placas (diário, mensal).

### Fase 6: Front-end (Angular)

* [ ] Configurar o projeto Angular.
* [ ] Implementar um `HttpClientInterceptor` para injetar o JWT nas requisições.
* [ ] Desenvolver um `AuthGuard` para proteger as rotas.
* [ ] Construir as telas seguindo a ordem das fases de implementação do back-end (telas de Login e Cadastros primeiro, depois o fluxo operacional, etc.).

### Fase 7: Deploy e Produção

* [ ] Configurar pipeline de CI/CD (GitHub Actions).
* [ ] Estratégia de migração do banco de dados para produção (`prisma migrate deploy`).
* [ ] Configurar e gerenciar variáveis de ambiente de produção.
* [ ] Escolher e configurar o ambiente de hospedagem (ex: Docker, serviço de nuvem).