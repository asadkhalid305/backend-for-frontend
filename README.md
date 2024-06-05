# Cricket Player App 🏏

### An application showcasing cricket players' biographies and career statistics. This project demonstrates the use of the Backend for Frontend (BFF) design pattern in a real-world application.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Project Breakdown](#project-breakdown)
- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)
- [Contribute](#contribute)

## Demo

![Demo](https://github.com/asadkhalid305/backend-for-frontend/assets/23138058/5787ece9-a77d-4417-bfef-18eef5e7a83b)

## Features

✔️ List Countries and Players\
✔️ Select a Country and Player\
✔️ Search a Country and Player\
✔️ Display Player's Statistics based on the selections

## Project Breakdown

This application is a [turborepo](https://turbo.build/repo/docs) comprised of two apps and various packages that are shared across both apps. This is how the scaffolding looks:

![Scaffold](https://github.com/asadkhalid305/backend-for-frontend/assets/23138058/a2c90b91-ad39-4181-a006-82ed9135d679)

### Apps

In the project, there's an `apps` folder which contains two applications:

1. api
2. client

**api**\
This app is an Express.js project with a basic setup that exposes several APIs. The following is the list of endpoints:

```text
/countries
/players
/players/:id
/players/:id/career
```

These endpoints return information about all the countries in the world and the players in each country.
This data is fetched through a public API [sportsmonks](https://docs.sportmonks.com/cricket)

**client**
This app was built in NextJs 14. It has two main parts

1. Frontend Part
2. Server Part

In the Frontend we have all the components as usual which takes care of the UI.
In the Server, we have implemented a Backend for Frontend (BFF) logic.

This is how our server (BFF) is handling Frontend requests.

![BFF](https://github.com/asadkhalid305/backend-for-frontend/assets/23138058/c21fba56-292c-4539-882d-47fa80b04ba2)

### Packages

In the project, there's a `packages` folder which have five packages i.e.

1. config-eslint
2. config-tailwind
3. config-typescript
4. jest-presets
5. logger
6. types

**config-eslint**. **config-tailwind**, **config-typescript**, and **jest-presets** are libraries that are used across both apps or meant to be in future.

**logger** is a custom package which wrapps around console.log to supress eslint warnings and keep the logs of applications.

> Note that logger has two functions i.e. `logClient` and `logAPI`

**types** is custom package which contains types that are shared across the apps.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Requirements

You'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/), and [pnpm](https://pnpm.io/) installed on your computer with the following versions:

```
node@v20.10.0 or higher
pnpm@9.0.1 or higher
git@2.39.3 or higher
```

### How To Use

From your command line, clone and run `cricket-player-app`:

```bash
# Clone this repository
git clone https://github.com/asadkhalid305/cricket-player-app

# Go into the repository
cd cricket-player-app

# Setup default environment variables

# For Linux
cp .env.example .env
# For Windows
copy .env.example .env

# Install dependencies
pnpm install

# Start a local development server
# This command will start both of your applications
pnpm dev

# Start client app only
pnpm dev:client

# Start api app only
pnpm dev:api
```

## Technologies Used

- [NextJs](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ExpressJs](https://expressjs.com/)
- [Turborepo](https://turbo.build/repo/docs)

## Contribute

If you'd like to make this app better for other users, create issues to improve this project. Or if you have created something awesome for your fork and want to share it, feel free to open a pull request.
