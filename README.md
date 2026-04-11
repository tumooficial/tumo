# TUMO

Site institucional da Tumo Contultoria

## > Trabalhando com o projeto

### Pré-requisitos:

- Docker
- Docker-compose

### Clone o projeto 

```bash
git clone https://github.com/tumooficial/tumo.git
```

### Executando a aplicação

Depois de criado o ambiente com o banco de dados é só subir normalmente:

```bash
sudo docker compose up
```

App - Astro:

```bash
http://localhost:4321
```

### Permissões ao arquivos criados utilizando o docker compose

Ao executar comandos utilizando **docker compose** que geram novos arquivos, é necessário alterar as configurações de permissionamento dos arquivos criados utilizando o comando linux **chown**. Na raiz do projeto execute o comando abaixo:

```bash
sudo chown -R $USER:$USER ./
```