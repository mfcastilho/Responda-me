# Responda-me

Bem-vindo ao Responda-me, um sistema de enquetes onde os usuários podem criar e responder enquetes após se registrarem e fazerem login.

## Funcionalidades

- Registro de usuário: Os usuários podem criar uma conta no sistema fornecendo um nome de usuário, endereço de e-mail e senha.
- Autenticação: Os usuários podem fazer login no sistema com suas credenciais registradas.
- Criar enquetes: Os usuários podem criar enquetes com perguntas e opções de resposta.
- Responder enquetes: Os usuários logados podem escolher uma opção de resposta de cada uma das enquetes existentes.
- Visualização de resultados: Os usuários podem ver os resultados das enquetes após responderem.

## Tecnologias utilizadas

### Backend/API

- TypeScript: Linguagem de programação utilizada para o desenvolvimento do backend.
- Node.js: Ambiente de execução JavaScript utilizado para o desenvolvimento do backend.
- Express: Framework web utilizado para construir a API REST.
- Express-validator: Conjunto de middlewares express usado para fazer validações.
- Sequelize: ORM (Object-Relational Mapping) para interagir com o banco de dados PostgreSQL.
- PostgreSQL: Banco de dados relacional utilizado para armazenar os dados do sistema.
- JWT (JSON Web Token): Método de autenticação utilizado para verificar a identidade do usuário.

### Frontend

- TypeScript: Linguagem de programação utilizada para o desenvolvimento do frontend.
- React: Biblioteca JavaScript utilizada para a construção da interface do usuário.
- CSS: Linguagem de estilização utilizada para a aparência visual do frontend.

## Configuração do ambiente de desenvolvimento

1. Certifique-se de ter o Node.js instalado em sua máquina.
2. Clone este repositório: `git clone https://github.com/seu-usuario/Responda-me.git`.
3. Navegue até o diretório do backend: `cd Responda-me/backend`.
4. Instale as dependências do backend: `npm install`.
5. Configure as variáveis de ambiente no arquivo `.env`, incluindo as credenciais do banco de dados PostgreSQL.
6. Execute as migrações do banco de dados: `npx sequelize-cli db:migrate`.
7. Inicie o servidor do backend: `npm start`.
8. Navegue até o diretório do frontend: `cd ../frontend`.
9. Instale as dependências do frontend: `npm install`.
10. Inicie o servidor de desenvolvimento do frontend: `npm start`.

