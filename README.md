# Simbolo Server

## File Structure

```
.
├── apollo
│   ├── datasources   <- https://www.apollographql.com/docs/apollo-server/v2/data/data-sources/
│   ├── resolvers.js  <- definations of queries and mutations in one file. can split into multiple file
│   ├── schema.js     <- graphQl schema
├── mongoose
│   ├── schema        <- database schema
│   ├── index.js
├── inndex.js
```

## Pre-release and deployment

```
- npm version [major|minor|patch]
```

## Environment Variables

```
PORT=8000
```

## Project setup

```
yarn install (or) npm install
```

## Compiles and hot-reloads for development

```
yarn start (or) npm run start
```
