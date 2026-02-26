<img src="./IslandBanner.png" width="100%" height="100%"/>

# Island API

<div align="center">
  
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![PrismaORM](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![NPM](https://img.shields.io/badge/npm-red?style=for-the-badge&logo=npm&logoColor=white)
![node](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![ts-node](https://img.shields.io/badge/ts--node-3178C6?style=for-the-badge&logo=ts-node&logoColor=white)
</div>

## 📋 Pré-requisitos

* **Node.js** (versão 20.x.x ou superior)
* **NPM** (Gerenciador de pacotes)
* **Docker** e **Docker Compose** (Para rodar a imagem do BBD PostgreSQL)

## ⚙ Configurações do Projeto

Siga os passos abaixo para ter a API rodando localmente:

### 1. Clone o Repositório

```bash
#Clone o Repositório
git clone https://github.com/DarlanHildebrando/frontend-hackathon.git

# Vá no diretório do Projeto
cd backend-hackaton
```
### 2. Instale as Dependências

```bash
#Instale as dependências
npm install
```

### 3. Variáveis de Ambiente
Crie um arquivo ```.env``` na raiz do projeto, baseado no arquivo ```.env.example```.

## 💻 Iniciando a aplicação
### 1. Inicie o Banco de Dados (BDD)
Utilize o Docker Compose para subir o container do PostgreSQL:

```bash
docker-compose up --build
```
### 2. Execute as migrações do Prisma
Aplique o schema do BDD definido no ```prisma/schema.prisma```:

```bash
npx prisma migrate dev --name init
```
### 3. Inicie o Servidor 
Execute a aplicação em modo de desenvolvimento com ```ts-node```:

```bash
npm run dev
```

A API estará disponível em ```http://localhost:(numero da porta)```

## 🛣️ Endpoints da API
Aqui estão as rotas que o sistema possui:

| Método | Endpoint | Descrição | Requer |
|-----|-----|----|----|
| **POST**| ```/auth/login```| Gera um token JWT com os dados do usuário para realizar login no sistema | Não |
| **GET** | ```/users``` | Retorna os dados de todos os usuários da tabela "Users" | Sim |
| **GET** | ```/users/:id``` | Retorna os dados de um usuário especificado através de seu ID | Sim |
| **POST** | ```/users``` | Cria um novo usuário no sistema e as informações são adicionadas no BDD | Não |
| **PUT** | ```/users/:id``` | Atualiza as informações de um usuário já registrado no BDD | Sim |
| **DELETE** | ```/users/:id``` | Deleta todas as informações de um usuário especifico do BDD | Sim |
| **GET** | ```/address``` | Retorna os dados de todos os usuários da tabela "Address" | Sim |
| **GET** | ```/address/:id``` | Retorna os dados de um endereço específico através do ID | Sim |
| **POST** | ```/address``` | Cria um novo endereço no sistema e as informações são adicionadas no BDD | Sim |
| **PUT** | ```/address/:id``` | Atualiza os dados de um endereço selecionado pelo ID | Sim |
| **DELETE** | ```/adress/:id``` | Deleta todos os dados de um endereço selecionado pelo ID | Sim |
| **GET** | ```/roads``` | Busca todas as jornadas no BDD | Sim |
| **GET** | ```/roads/:id``` | Retorna uma jornada selecionado pelo ID | Sim |
| **POST** | ```/roads``` | Adiciona uma jornada no BDD | Sim |
| **PUT** | ```/roads/:id``` | Atualiza uma jornada já cadastrada através do ID |
| **DELETE** | ```/roads/:id``` | Deleta a jornada atavés do ID | Sim |


## 📁 Estrutura do Projeto
A estrutura do sistema está organizada de forma modular, com foco de separação nas responsabilidades (controllers, services, routes, zod, modules) dentro dentro de cada domínio dentro da pasta (`modules`).

```plaintext
.
├── src/
│   ├── generated/         # Arquivos gerados (ex: pelo Prisma Client)
│   ├── modules/           # Divisão por domínio (ex: user)
│   │   └── user/
│   │       ├── user.controller.ts  # Tratamento de requisições
│   │       ├── user.module.ts      # Definição e agrupamento do módulo
│   │       ├── user.routes.ts      # Definição de Rotas
│   │       └── user.service.ts     # Regras de Negócio
│   ├── prisma/            # Configuração e inicialização do Prisma Client
│   ├── app.ts             # Inicialização da aplicação Express
│   └── server.ts          # Arquivo principal de execução do servidor
├── prisma/                # Schema e Migrações do Banco de Dados
├── .env.example
├── .gitignore
├── LICENSE
├── package.json
├── pnpm-lock.yaml
├── prisma.config.ts
├── README.md
└── tsconfig.json
```

## 📝 Licença
Projeto sob licança MIT.

Caso queira ver em qual repositório foi desenvolvido, clique aqui: <a href="https://github.com/DarlanHildebrando/backend-hackathon">Acessar Repositório</a>

Repositório do Front-End: <a href="https://github.com/nicholas-sc-08/island-web">Acessar Repositório</a>
