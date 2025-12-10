# Biblioteca Virtual - Sistema de Gerenciamento de Livros

## Visão Geral

A **Biblioteca Virtual** é uma aplicação **full-stack** que permite aos usuários gerenciar sua coleção pessoal de livros. O sistema oferece autenticação segura, dashboard interativo e funcionalidades avançadas para organização e controle de leitura.

---

## Arquitetura do Sistema

### Backend (Node.js + Express)
- **Framework:** Express.js (ES6 modules)
- **Banco de Dados:** MySQL com Sequelize ORM
- **Autenticação:** JWT (JSON Web Tokens) com bcrypt para hash de senhas
- **Validação:** Express-validator
- **CORS:** Configurado para comunicação com o frontend

### Frontend (Next.js + React)
- **Framework:** Next.js 15.5.2 com React 19
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS 4.1.13
- **UI Components:** Radix UI + componentes customizados
- **Gerenciamento de Estado:** Context API (Auth + Dashboard)
- **Formulários:** React Hook Form com validação Zod
- **Notificações:** Sonner
- **Tema:** Suporte a dark/light mode

---

## Estrutura do Banco de Dados

### Tabelas Principais

**Users** – Usuários do sistema  
Campos: `id`, `name`, `email`, `password`, `role (user/admin)`

**Books** – Catálogo de livros  
Campos: `id`, `title`, `author`, `genre`, `year`, `synopsis`

**UserBooks** – Relacionamento usuário-livro (join table)  
Campos: `user_id`, `book_id`, `status`, `favorite`  
Status possíveis: `"lido"`, `"lendo"`, `"quer ler"`, `"nenhum"`

---

## Sistema de Autenticação

- **Registro:** Validação de email único e criptografia de senha
- **Login:** JWT com expiração 
- **Middleware:** Proteção de rotas autenticadas
- **Roles:** Suporte a permissões de usuário e administrador

---

## Funcionalidades Principais

### Dashboard Interativo
- Exibição de estatísticas: total de livros, lidos, lendo, quer ler e favoritos
- Filtros por status e favoritos
- Busca por título, autor ou gênero
- Paginação dos resultados

### Gerenciamento de Livros
- Adicionar livros à estante pessoal
- Alterar status de leitura (lido, lendo, quer ler)
- Favoritar e desfavoritar livros
- Remover livros da estante
- Visualizar detalhes e sinopse

### Interface do Usuário
- Design moderno com suporte a tema escuro
- Sidebar responsiva
- Cards de livros informativos
- Modais de confirmação
- Notificações visuais (toasts)
- Componentes reutilizáveis e modulares

---

## Tecnologias Utilizadas

### Backend
- Node.js
- Express.js
- MySQL + Sequelize ORM
- JWT + bcrypt
- Express-validator
- CORS

### Frontend
- Next.js 15 + React 19
- TypeScript
- Tailwind CSS
- Radix UI
- React Hook Form + Zod
- Axios
- Lucide React

---

## Estrutura de Diretórios

```
bibliotecaFs/
├── backend/
│   ├── config/          # Configuração do banco
│   ├── controllers/     # Lógica de negócio
│   ├── middlewares/     # Autenticação e validação
│   ├── models/          # Modelos Sequelize
│   ├── routes/          # Definição de rotas
│   └── server.js        # Servidor principal
└── frontend/
    ├── src/
    │   ├── app/         # Páginas Next.js
    │   ├── components/  # Componentes React
    │   ├── context/     # Context API
    │   ├── hooks/       # Custom hooks
    │   ├── lib/         # Funções utilitárias
    │   ├── pages/       # Páginas customizadas
    │   └── types/       # Tipos TypeScript
    └── public/          # Assets estáticos
```

---

## Como Executar o Projeto

### Backend

```bash
cd backend
npm install
# Configure o banco de dados MySQL no arquivo de configuração
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação será iniciada em `http://localhost:3000`

---

## Principais Endpoints da API

| Método | Endpoint | Descrição |
|---------|-----------|-----------|
| **POST** | `/auth/register` | Registro de novo usuário |
| **POST** | `/auth/login` | Login e obtenção de token JWT |
| **GET** | `/auth/me` | Dados do usuário autenticado |
| **GET** | `/books` | Listar livros com filtros e paginação |
| **POST** | `/books` | Criar novo livro |
| **PUT** | `/books/:id` | Editar informações de um livro |
| **DELETE** | `/books/:id` | Deletar livro |
| **POST** | `/books/:id/favorite` | Favoritar ou desfavoritar |
| **POST** | `/books/:id/status` | Alterar status de leitura |
| **GET** | `/books/dashboard` | Estatísticas do dashboard |
| **GET** | `/books/userbooks` | Livros adicionados pelo usuário |
| **DELETE** | `/books/:id/userbook` | Remover da estante |

---

## Destaques Técnicos

- **Arquitetura Limpa:** Separação clara entre frontend e backend
- **TypeScript:** Tipagem forte e código seguro no frontend
- **Responsividade:** Layout adaptável a qualquer tela
- **UX Moderna:** Interface interativa com feedback visual
- **Segurança:** Autenticação JWT e validação de entrada
- **Performance:** Paginação e filtros otimizados
- **Manutenibilidade:** Código modular e documentado

---

