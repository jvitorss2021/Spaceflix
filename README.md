# Spaceflix

Spaceflix é uma plataforma de streaming moderno inspirado nos serviços de streaming populares, oferecendo uma biblioteca diversificada de filmes, séries e animes. A aplicação proporciona uma experiência interativa onde usuários podem explorar conteúdos de diferentes gêneros, assistir trailers e obter informações detalhadas sobre cada título.

## 🌐 Demo

Acesse a aplicação aqui: [https://spaceflix-pearl.vercel.app/](https://spaceflix-pearl.vercel.app/)

## ✨ Funcionalidades

- **Catálogo Diversificado:** Filmes, séries e animes de diversos gêneros e épocas
- **Busca Inteligente:** Encontre facilmente conteúdos por título
- **Cards Interativos:** Cards expansíveis que mostram detalhes do conteúdo quando clicados
- **Detalhes do Conteúdo:** Informações como diretor, elenco, ano de lançamento e classificação indicativa
- **Trailers:** Assista aos trailers diretamente da plataforma
- **Interface Responsiva:** Experiência consistente em dispositivos móveis e desktop
- **Sistema de Autenticação:** Registro e login de usuários

## 🛠️ Tecnologias Utilizadas

### Frontend

- **Next.js** - Framework React para renderização do lado do servidor
- **TypeScript** - Tipagem estática para melhor desenvolvimento
- **Tailwind CSS** - Framework CSS para design responsivo
- **Framer Motion** - Biblioteca de animações para React
- **Heroicons** - Conjunto de ícones SVG

### Backend

- **ASP.NET Core** - Framework para construção de APIs
- **Entity Framework Core** - ORM para acesso a dados
- **SQL Server** - Banco de dados relacional

### Deployment

- **Vercel** - Hosting do frontend
- **Fly.io** - Hosting do backend

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura de aplicação web moderna, com:

- **Frontend**: Aplicação Next.js que consome a API RESTful
- **Backend**: API RESTful construída com ASP.NET Core
- **Banco de Dados**: SQL Server para persistência de dados

## 🚀 Como Executar Localmente

### Pré-requisitos

- Node.js (v14+)
- .NET SDK (v6.0+)
- SQL Server ou SQLite

### Frontend

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/spaceflix.git

# Navegar para a pasta do frontend
cd spaceflix/frontend

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

### Backend

```bash
# Navegar para a pasta do backend
cd spaceflix/backend

# Restaurar pacotes
dotnet restore

# Executar migrações
dotnet ef database update

# Iniciar o servidor
dotnet run
```

## 📝 Notas de Desenvolvimento

Este projeto foi desenvolvido como uma demonstração de habilidades full-stack, integrando tecnologias modernas de frontend e backend. A aplicação utiliza práticas recomendadas de desenvolvimento web, incluindo:

- Design responsivo
- Animações fluidas
- Boas práticas de UX
- Arquitetura escalável
- Autenticação segura

---
