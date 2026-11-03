# API Controle de TI

API RESTful desenvolvida em **Next.js (App Router)**, **TypeScript** e **MySQL (`mysql2/promise`)**, estruturada em camadas (`types`, `repositories` e `app/api`).

## 1. Configuração Inicial

1. Execute o script `sql/schema.sql` no seu MySQL para criar o banco `controle_ti` e as tabelas.
2. Confira as credenciais do MySQL no arquivo `.env`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=controle_ti
   DB_PORT=3306
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   Servidor disponível em `http://localhost:3000`.

## 2. Rotas da API

### Setores
- `GET /api/setores` — Lista todos os setores
- `GET /api/setores/:id` — Busca setor por ID
- `POST /api/setores` — Cria setor (`{ nome, responsavel, localizacao }`)
- `PUT /api/setores/:id` — Atualiza setor
- `DELETE /api/setores/:id` — Remove setor

### Usuários
- `GET /api/usuarios` — Lista todos os usuários
- `GET /api/usuarios/:id` — Busca usuário por ID
- `POST /api/usuarios` — Cria usuário (`{ nome, email, senha }`)
- `PUT /api/usuarios/:id` — Atualiza usuário (`{ nome, email }`)
- `DELETE /api/usuarios/:id` — Remove usuário
- `POST /api/auth/login` — Login de usuário (`{ email, senha }`)
- `POST /api/auth/register` — Registro de usuário (`{ nome, email, senha }`)

### Equipamentos
- `GET /api/equipamentos` — Lista todos os equipamentos
- `GET /api/equipamentos/:id` — Busca equipamento por ID
- `POST /api/equipamentos` — Cria equipamento (`{ nome, tipo, numero_patrimonio, marca, modelo, numero_serie, status, data_aquisicao, observacoes, setor_id }`)
- `PUT /api/equipamentos/:id` — Atualiza equipamento
- `DELETE /api/equipamentos/:id` — Remove equipamento

### Manutenções
- `GET /api/manutencoes` — Lista todas as manutenções
- `GET /api/manutencoes/:id` — Busca manutenção por ID
- `POST /api/manutencoes` — Cria manutenção (`{ equipamento_id, usuario_id, tipo, descricao, custo }`)
- `PUT /api/manutencoes/:id` — Atualiza/conclui manutenção (`{ tipo, descricao, status, custo }`)
- `DELETE /api/manutencoes/:id` — Remove manutenção

### Relatórios
- `GET /api/relatorios/equipamentos-por-setor`
- `GET /api/relatorios/equipamentos-por-status`
- `GET /api/relatorios/manutencoes`
