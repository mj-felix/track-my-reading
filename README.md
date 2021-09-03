# TrackMyReading by MJ Felix

*Frontend coming soon ... watch this space! APIs are functional in Production.*

## Table of Contents

  - [Description](#description)
  - [Scope of Functionalities](#scope-of-functionalities)
  - [Technologies/Components](#technologiescomponents)
    - [Backend/APIs](#backendapis)
    - [Frontend](#frontend)
  - [Installation Notes](#installation-notes)
    - [Node.js](#nodejs)
    - [PostgreSQL](#postgresql)
    - [Auth0](#auth0)
    - [Environement Variables](#environement-variables)
    - [Install Dependecies](#install-dependencies)
    - [Run Application](#run-application)
  - [API Specification](#api-specification)
  - [Contact](#contact)

## Description

Add books you want to read, add reading sessions and analyse the stats around your reading.

## Scope of Functionalities

*Coming soon ...*

## Technologies/Components

![PERN stack](https://mjfelix.dev/img/external/pern-stack.jpg)

### Backend/APIs

 - Node
 - Express
 - PostgreSQL
 - Sequelize ORM
 - Express Validator
 - Auth0
 - SwaggerUI + Swagger JSDoc
 - Others ([see package.json](https://github.com/mj-felix/track-my-reading/blob/main/package.json))

### Frontend

*Coming soon ...*

 - React
 - Redux
 - React Router
 - Material UI
 - Progressive Web App
 - Others ([see package.json](https://github.com/mj-felix/track-my-reading/blob/main/frontend/package.json))

## Installation Notes

Below components are required to run the application locally (frontend app accessible via [localhost:3000](http://localhost:3000), APIs - via [localhost:5000](http://localhost:5000)):

### Node.js

Download installer from [the Node.js website](https://nodejs.org/en/download/) and follow the instructions.

### PostgreSQL

On macOS you can install [Postgres](https://www.postgresql.org) with [Homebrew](https://brew.sh/):

```
brew install postgresql
```

and start it with:

```
brew services start postgres
```

You can stop Postgres with:

```
brew services stop postgres
```

For other operating systems, please check [the Postgres website](https://www.postgresql.org/download/).

Database's name is `track_my_reading`. Please make sure it exists in your local Postgres instance. You can either use a UI-like [PgAdmin](https://www.pgadmin.org) or you can do so with `psql`:

```
psql -h localhost -U <your-username> postgres
```

When installing locally, Postgres creates a database user with your operation system's username. You can run `whoami` on any Unix-like operating system to find out your username.

Then you can create a new database with:

```
postgres=# create database track_my_reading;
```

### Auth0

Implementation of Auth0 follows [this guide](https://auth0.com/blog/complete-guide-to-react-user-authentication).

Steps:
1. Signup for Auth0.
2. Create new Application (Name: `Track My Reading DEV`, Application Type: `Single Page Application`).
3. Once application created, in Settings tab add `http://localhost:3000` to Allowed Callback URLs, Allowed Logout URLs, Allowed Web Origins and save.
4. Create new API (Name: `Auth0 Track My Reading DEV`, Identifier: `https://track-my-reading-dev`, Signing Algorithm: `RS256`).
5. Set up environment variables as per the next section.

### Environement Variables

```
# src/.env:

DATABASE_URL=postgres://<your-username>@localhost:5432/track_my_reading
AUTH0_AUDIENCE=<Auth0 API: Auth0 Track My Reading DEV - Settings - Identifier>
AUTH0_DOMAIN=<Auth0 application: Track My Reading DEV - Settings tab - Domain>
```
```
# src/frontend/.env:

REACT_APP_AUTH0_DOMAIN=<Auth0 application: Track My Reading DEV - Settings tab - Domain>
REACT_APP_AUTH0_CLIENT_ID=<Auth0 application: Track My Reading DEV - Settings tab - Client ID>
REACT_APP_AUTH0_AUDIENCE=<Auth0 API: Auth0 Track My Reading DEV - Settings - Identifier>
```

### Install Dependencies

```
npm install
cd frontend
npm install
```

### Run Application

```
# Run frontend (localhost:3000) and backend (localhost:5000 && with nodemon) concurrently
npm run dev

# Run backend only (with nodemon)
npm run server

# Run backend only (no nodemon)
npm start

# Run frontend only
npm run client
```

## API Specification

APIs have been documented using Swagger:
- Production: [trackmyreading.mjfelix.dev/api/v1/docs](https://trackmyreading.mjfelix.dev/api/v1/docs)
- Locally: [localhost:5000/api/v1/docs](http://localhost:5000/api/v1/docs)

## Contact

MJ Felix<br>
[mjfelix.dev](https://mjfelix.dev)<br>
mjfelixdev@gmail.com<br>
[linkedin.com/in/mszonline](https://www.linkedin.com/in/mjfelix/) ![Linkedin Profile](https://i.stack.imgur.com/gVE0j.png)
