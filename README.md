# Real-time Queries with Apollo Federation

## Usage

### GraphQL Server

_A Redis server must be running locally prior to starting the GraphQL server._

Add a `.env` file using the `server/.env.sample` file as a template and then run:

```sh
cd server && npm i && npm run server
```

GraphQL Playground will be available at [http://localhost:4000/graphql](http://localhost:4000/graphql).

### Client

Add a `.env` file using the `client/.env.sample` file as a template and then run:

```sh
cd client && npm i && npm start
```

A React app will be available at [http://localhost:3000](http://localhost:3000).
