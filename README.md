# Install

1. Type `git clone`, and then paste the URL you copied earlier, and press Enter to create your local clone

    ```bash
    $ git clone https://github.com/THIS-OWN/THIS-REPOSITORY
    ```

2. Install the required dependencies for project

    ```bash
    $ npm install
    ```

    This command reads the package.json file and installs all the dependencies listed under the "dependencies" field.

3. Create a new file called `.env` and copy the contents of an existing file called `.env.example` into it.
   The `.env.example` file is usually included in a project to provide a template for the required environment variables, with default values or placeholders.

4. Create the container for database.

    ```bash
    $ npm run docker:db
    ```

5. Create all the necessary tables in database based on Prisma schema, and also seed data into the database
    ```bash
    $ npx prisma migrate dev
    ```

# Start the app

1.  Run the container with db your build earlier]

    ```bash
    $ npm run docker:db
    ```

2.  Create all the necessary tables in database based on Prisma schema and fill it with data.

    ```bash
    $ npx prisma migrate dev
    ```

3.  Run the app

    ```bash
    # development
    $ npm run start

    # watch mode
    $ npm run start:dev

    # production mode
    $ npm run start:prod
    ```

# Stack

-   Nest.js
-   Prisma
-   PostgreSQL
-   GraphQL
-   Docker
-   esLint / Prettier / Husky
-   Jest

# Some useful commands

## Prisma

```bash
$ npx prisma generate
```

Easy way to generate Prisma Client and start using it to interact with your database in a type-safe way.

```bash
$ npx prisma db pull
```

Command is used to update your local Prisma schema based on the schema of your database.

```bash
$ npx prisma db push
```

Command is used to apply changes to your database schema based on the changes made to your Prisma schema.

```bash
$ npx prisma migrate deploy
```

Command applies all pending migrations, and creates the database if it does not exist. Primarily used in non-development environments.

```bash
$ npx prisma migrate status
```

Command looks up the migrations in `/prisma/migrations/*` folder and the entries in the `_prisma_migrations` table and compiles information about the state of the migrations in your database.

```bash
$ npx prisma studio
```

Command allows you to interact with and manage your data interactively.

```bash
$ npx prisma db seed
```

"Seeding" refers to the process of populating your database with initial data, such as test data, sample data, or default data.

### Development environments only

```bash
$ npx prisma migrate dev
```

Command updates your database using migrations during development and creates the database if it does not exist.

```bash
$ npx prisma migrate reset
```

This command deletes and recreates the database, or performs a 'soft reset' by removing all data, tables, indexes, and other artifacts.

## Docker

Custom way to start docker container with postgreSQL image
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

## Docker Compose

You can also setup a the database and Nest application with the docker-compose

```bash
# building new NestJS docker image
docker-compose build
# or
npm run docker:build

# start docker-compose
docker-compose up -d
# or
npm run docker
```

```bash
docker build -t node-web-app .

docker run -d -t -p 3000:3000 node-web-app
```

## psql for PostgreSQL

Connect to a PostgreSQL database server

```bash
psql -U root ra
```

The `-U` flag specifies the PostgreSQL user to connect as, and `root` in this case is the username that you want to use.

The `ra` parameter at the end of the command is likely the name of the database that you want to connect to.

List of relations and tables

```bash
\dt
```

List of schemas

```bash
\dn
```

Set the schema search path for the current session.

```bash
SET search_path = schema1, public;
```

## GraphQL

Has been replaced standart graphql to Apollo server:

```url
http://localhost:3000/graphql
```

## EsLint / Prettier / Husky

Configuration https://gist.github.com/santoshshinde2012/e1433327e5f7a58f98fe3e6651c4d5de

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

App is [MIT licensed](LICENSE).
