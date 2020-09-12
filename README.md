# README

# Setting up the project


Requirements: Node LTS 12.x, yarn 1.16.x, PostgreSQL 12.x.

```
yarn
```

Creating the database
```
createdb -U postgres walletapi-dev
```

Running the migrations
```
yarn db:migrate up
```


