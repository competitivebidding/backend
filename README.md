# Usage
1. (only first start) clone this repo with "https://github.com/MalinavyBusel/ra_backend.git" 
2. (only first start) run "npm install" in bash in the root directory of the project
3. (only first start) pull the docker container from dockerhub with "docker pull postgres" in bash 
4. (only first start) create a .env file in the root directory. 
    As an example you can take .env.example file. Create your own JWT_SECRET value there.
5. run the db in docker
    The docker run command runs a PostgreSQL container with the name postgresql, sets the username and password for the root user, maps the container's port 5432 to the host machine's port 5432, and creates a persistent data volume at /data on the host machine. The container is based on the official PostgreSQL Docker image and runs in detached mode.

    ```bash
    docker run --name postgresql -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -v /data:/var/lib/postgresql/data -d postgres
    ```
6. create a prisma migration in your docker database.
    To do this, run:
    ```bash
    npx prisma migrate dev --name init
    ```
7. run your app in watch mode with "npm run start:dev"


# Some useful commands
## Docker

Lists all containers on the host machine, including those that have exited

```bash
docker ps -a
```

Starts a new Bash shell session inside a running Docker container with the specified container ID

```bash
docker exec -it [container ID] bash
```

## graphQL

Replace standart graphql to Apollo server:
```url
http://localhost:3000/graphql
```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
