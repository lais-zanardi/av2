# 🚀 Aerocode Frontend

Este repositório contém o *frontend* da aplicação **Aerocode**, um sistema de gerenciamento de produção e qualidade de aeronaves desenvolvido como uma **Single Page Application (SPA)**. O objetivo é substituir a antiga interface de linha de comando (CLI) por uma GUI moderna e eficiente, otimizando os fluxos de trabalho para administradores, engenheiros e operadores.

## 🌟 Tecnologias Utilizadas

| Categoria | Tecnologia | Uso |
| :--- | :--- | :--- |
| **Framework** | **React** (v19) | Construção da interface de usuário baseada em componentes. |
| **Linguagem** | **TypeScript** | Garante tipagem estática e escalabilidade em todo o código. |
| **Build Tool** | **Vite** | Ferramenta de *build* rápido para desenvolvimento e produção. |
| **Estilização** | **Tailwind CSS (v4.x)** | Framework CSS utilitário para design responsivo e rápido. |
| **Roteamento** | **React Router DOM** | Gerenciamento de rotas e navegação da SPA. |

## 📦 Estrutura do Projeto

O projeto segue uma arquitetura modular baseada em funcionalidade (Módulos/Páginas) e tipo de elemento (Componentes, Hooks).

```
aerocode-frontend/
├── src/
│   ├── assets/                 # Logotipos e Imagens (Login)
│   ├── components/
│   │   ├── forms/              # Componentes Input, Select, Button
│   │   ├── layout/             # Componentes de Estrutura: Sidebar, Header, Footer, MainLayout
│   │   ├── modals/             # Modais reutilizáveis (Etapas, Relatórios)
│   │   └── ui/                 # Componentes Genéricos: GenericTable, Modal
│   ├── context/                # AuthContext (Gestão de Sessão e Permissão)
│   ├── pages/                  # Telas Principais da Aplicação (Módulos)
│   │   ├── Auth/               # Login
│   │   ├── Admin/              # Gestão de Usuários (Criação/Edição)
│   │   └── Production/         # Aeronaves, Etapas, Testes, Relatórios
│   └── types/                  # Definições de Tipos (Funcionario, Aeronave, etc.)
```

## 🔑 Fluxo de Autenticação e Usuários de Teste

A aplicação utiliza o **`AuthContext`** para simular o controle de acesso por nível de permissão. O sistema de rotas (no `App.tsx`) protege o `MainLayout`, garantindo que apenas usuários logados possam navegar.

Utilize as credenciais simuladas abaixo para testar os diferentes fluxos de usuário:

| Nível | Usuário | Senha | Acesso |
| :--- | :--- | :--- | :--- |
| **ADMINISTRADOR** | `admin` | `123` | **Total.** Vê todos os links, incluindo **Administração**. Tem permissão para CRUD completo em todos os módulos. |
| **ENGENHEIRO** | `engenheiro` | `123` | **Gerenciamento e Execução.** Vê módulos de Aeronaves, Etapas, Testes e Relatórios. Tem permissão para **Criar/Editar** (Ex: Adicionar Aeronave, Registrar Teste). |
| **OPERADOR** | `operador` | `123` | **Execução e Consulta.** Vê módulos de Aeronaves, Peças e Etapas. Não vê Administração, Relatórios ou Testes. Pode apenas **visualizar** listas e **iniciar/finalizar** etapas. |

## 🚀 Como Rodar o Projeto

### Pré-requisitos

  * Node.js (versão 18+)
  * npm (ou Yarn/pnpm)

### Instalação

1.  Clone o repositório:
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    cd aerocode-frontend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

O projeto será aberto em seu navegador (geralmente em `http://localhost:5173/login`).