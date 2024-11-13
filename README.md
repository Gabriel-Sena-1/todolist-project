# Sistema de Tarefas - Documentação
Requisitos

* **Docker**

* **Node.js versão 20.x**

* **.NET Core SDK versão 8.x**

## Instalação

Clone o repositório principal:

```bash
git clone https://github.com/Gabriel-Sena-1/todolist-project.git
```

Navegue até o diretório do projeto:

```bash
cd todolist-project
```

Clone o submódulo do backend:

```bash
git submodule update --init --recursive
```
Instale as dependências do frontend:
```bash
cd frontend
npm install
```

## Inicialização
Na raiz do projeto, execute o comando para inicializar o ambiente Docker:


```bash
docker compose up --build
```

Aguarde até que todos os serviços sejam iniciados. Você deve ver algo como:

```plaintext
 ✔ Network todolist-project_default       Created                             0.0s 
 ✔ Volume "todolist-project_db-data"      Created                             0.0s 
 ✔ Container todolist-project-backend-1   Created                             0.1s 
 ✔ Container todolist-project-frontend-1  Created                             0.1s 
```
Acesse a aplicação em seu navegador:

Frontend: http://localhost:8080

Backend: http://localhost:5000/swagger

## Estrutura do Projeto

O projeto está dividido em dois principais componentes:

### Backend

Localização: Todolist/

Tecnologia: Desenvolvido em .NET Core

Função: Responsável pela API REST e lógica de negócios

### Frontend

Localização: frontend-todolist/

Tecnologia: Desenvolvido em HTML, Bootstrap CSS e JavaScript (NodeJS)

Função: Responsável pela interface do usuário e interação com a API do backend

### Observações Adicionais

Configurações de Ambiente: Certifique-se de que as variáveis de ambiente, como URLs da API e banco de dados, estejam devidamente configuradas nos arquivos .env do projeto.

Comandos Docker: 

* Para desligar o ambiente Docker, você pode usar o comando:
```bash
docker compose down
```

_Acesso à API: O backend fornece uma documentação interativa (Swagger) para a API, disponível em http://localhost:5000/swagger, onde você pode visualizar e testar os endpoints._