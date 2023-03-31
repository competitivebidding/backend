## Installation

```bash
$ npm install
```

With your Prisma models in place, you can generate your SQL migration files and run them against the database. Run the following commands in your terminal:

```bash
npx prisma migrate dev --name init
```

## Docker PostgreSQL

Command downloads the latest PostgreSQL image from the Docker registry.

```bash
docker pull postgres
```

The docker run command runs a PostgreSQL container with the name postgresql, sets the username and password for the root user, maps the container's port 5432 to the host machine's port 5432, and creates a persistent data volume at /data on the host machine. The container is based on the official PostgreSQL Docker image and runs in detached mode.

```bash
docker run --name postgresql -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -v /data:/var/lib/postgresql/data -d postgres
```

Lists all containers on the host machine, including those that have exited

```bash
docker ps -a
```

Starts a new Bash shell session inside a running Docker container with the specified container ID

```bash
docker exec -it [container ID] bash
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
