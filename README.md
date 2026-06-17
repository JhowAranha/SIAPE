# SIAPE 🚀

O **SIAPE** é uma aplicação web moderna e de alta performance desenvolvida para otimizar o gerenciamento e monitoramento de dados, oferecendo uma experiência fluida, segura e responsiva para o usuário. 

A aplicação foi construída utilizando uma arquitetura moderna baseada em **Single Page Application (SPA)** com separação clara de responsabilidades, tipagem estática rigorosa e infraestrutura em nuvem de última geração.

---

## 🛠️ Ecossistema Tecnológico

### Front-end
- **[React](https://react.dev/):** Biblioteca principal para a construção de interfaces de usuário modulares e baseadas em componentes.
- **[Vite](https://vitejs.dev/):** Ferramenta de build e bundling de nova geração, garantindo um ambiente de desenvolvimento ultrarrápido com Hot Module Replacement (HMR).
- **[TypeScript](https://www.typescriptlang.org/):** Supersuposto JavaScript que adiciona tipagem estática opcional, prevenindo erros em tempo de compilação e melhorando a manutenibilidade do código.

### Back-end & Infraestrutura (BaaS)
- **[Supabase](https://supabase.com/):** Plataforma backend-as-a-service de código aberto construída sobre o **PostgreSQL**.
  - **Supabase Auth:** Autenticação e gestão de usuários robusta através do protocolo **Google OAuth (OpenID Connect)**.
  - **PostgreSQL / Supabase DB:** Armazenamento seguro de dados relacionais e controle de acessos nativo via RLS (Row Level Security).

### Hospedagem & CI/CD
- **[Vercel](https://vercel.com/):** Plataforma global Edge Network utilizada para hospedagem do front-end com pipelines de Integração e Entrega Contínua (CI/CD) automáticos baseados no repositório GitHub.

---

## ⚙️ Fluxo de Autenticação & Arquitetura de Redirecionamento

O sistema implementa o fluxo seguro do **Google OAuth** mediado pelo Supabase. Abaixo está detalhada a engrenagem trilateral de comunicação:

1. **Início do Fluxo (Cliente):** O cliente React invoca dinamicamente o método `signInWithOAuth` passando `window.location.origin` para construir de forma flexível a URL de retorno.
2. **Validação do Provedor (Google Cloud Platform):** O GCP valida as credenciais contra as origens permitidas (`localhost` e `vercel.app`) e redireciona o token de acesso temporário para os servidores do Supabase.
3. **Resolução de Rotas (Vercel):** Após a validação do Supabase, o usuário é enviado para a rota interna `/home` transportando o token hash. Para evitar erros `404: NOT_FOUND` nativos de servidores que tentam buscar pastas estáticas, a Vercel reescreve as requisições direcionando o tráfego de volta ao core SPA (`index.html`).

---

## 📦 Configuração e Instalação Local

### Pré-requisitos
Certifique-se de que possui o **Node.js** (versão LTS recomendada) instalado na sua máquina operacional.

1. **Clonar o Repositório**
   ```bash
   git clone [https://github.com/JhowAranha/SIAPE.git](https://github.com/JhowAranha/SIAPE.git)
   cd SIAPE