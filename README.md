<p align="center">
  <img src="./public/bora-rachar-logo.png" width="150" height="150" alt="Logo BoraRachar" />
</p>

<h1 align="center">BoraRachar (Front-end)</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</p>

O **BoraRachar** é uma aplicação para dividir despesas entre amigos de forma simples e prática. Este repositório contém a interface web do projeto, com visual inspirado em *post-its*, layout responsivo e temas personalizáveis para organizar os gastos de viagens, encontros e outras atividades em grupo.

A aplicação permite criar grupos, compartilhar o acesso por link, cadastrar, editar e excluir despesas, escolher quem pagou e quem participa de cada divisão, além de consultar os saldos individuais e as sugestões de acerto entre os participantes.

## 🧱 Tecnologias e Arquitetura

O front-end foi construído com foco em componentes reutilizáveis, tipagem estática e organização das responsabilidades:

* **React 19 + TypeScript:** Interface baseada em componentes, com tipos definidos para grupos, participantes, despesas e respostas da API.
* **Vite:** Servidor de desenvolvimento e ferramenta de build, com o alias `@` configurado para a pasta `src`.
* **Tailwind CSS (v4 / @tailwindcss/vite):** Estilização com classes utilitárias e variáveis CSS para uma interface responsiva com aparência de anotações em papel.

A aplicação consome a API REST do BoraRachar por uma camada de serviços baseada em `fetch`. O código está organizado em páginas, componentes, hooks, contextos e serviços. O link compartilhado contém o token de acesso ao grupo, enviado à API pelo cabeçalho `X-Group-Token`.

## 🔒 Variáveis de Ambiente

O front-end precisa se conectar à API do BoraRachar. Na raiz do repositório, crie o arquivo **`.env`** e defina a URL base da API:

```env
VITE_API_URL="https://localhost:7214"
```

Esse é também o endereço utilizado como padrão pelo cliente HTTP quando a variável não é definida. Caso o back-end esteja rodando em outro endereço, ajuste o valor. Para o perfil HTTP local da API, use `http://localhost:5008`.

Informe apenas a origem da API, sem acrescentar `/api`, pois os serviços já incluem esse prefixo nas rotas. Reinicie o servidor de desenvolvimento após alterar o `.env`.

---

## 🛠️ Executando o projeto

Tenha o **Node.js 22.12 ou superior** e o **npm** instalados. Para utilizar as funcionalidades de grupos e despesas, execute também o back-end conforme as instruções do repositório relacionado e configure o `.env` como indicado acima.

No PowerShell, siga os passos abaixo:

```powershell
# Acesse a pasta do projeto
cd bora-rachar-app

# Instale as dependências
npm install

# Inicialize o servidor de desenvolvimento
npm run dev
```

O Tailwind CSS e seu plugin do Vite já estão incluídos nas dependências do projeto.

A aplicação estará disponível por padrão em **`http://localhost:5173`**. Se a porta estiver ocupada, consulte o endereço informado pelo Vite no terminal.

Para verificar o código e gerar a versão de produção:

```powershell
# Execute a análise estática
npm run lint

# Verifique os tipos e gere o build na pasta dist
npm run build

# Visualize o build localmente
npm run preview
```

---

## 🔗 Repositório Relacionado

* ⚙️ **Back-end (ASP.NET Core / .NET 8 + MongoDB):** [antoniolpcan/bora-rachar-api](https://github.com/antoniolpcan/bora-rachar-api)

---

Desenvolvido por [Antonio Candioto](https://github.com/antoniolpcan) — Entre em contato no [LinkedIn](https://www.linkedin.com/in/antoniolpcan/)