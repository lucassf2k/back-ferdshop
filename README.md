# back-ferdshop

Backend API for FerdShop, built with **Node.js + TypeScript + Express + Prisma + PostgreSQL**.

## Overview

This project provides core e-commerce APIs for:

- Authentication (JWT in HTTP-only cookie)
- Users
- Categories
- Products (including image upload)
- Reviews
- Orders
- Organization profile (singleton settings)

Base URL:

```text
http://localhost:3001/api/v1
```

Swagger:

```text
http://localhost:3001/api/v1/docs
```

## Tech stack

- Node.js
- TypeScript
- Express 5
- Prisma ORM (+ `@prisma/adapter-pg`)
- PostgreSQL
- Zod (validation)
- Multer (file upload)
- JWT (`jsonwebtoken`)
- Swagger UI

## Project structure

```text
src/
  application/      # use cases and app responses
  domain/           # entities, enums, domain logic
  infrastructure/   # Express, Prisma, repositories, services, Swagger
  common/           # errors, constants, status mapping
prisma/
  schema.prisma
  migrations/
generated/
  prisma/
uploads/
```

## Prerequisites

- Node.js 20+
- Docker + Docker Compose (recommended for local PostgreSQL)

## Environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://docker:docker@localhost:5432/app?schema=public"
APP_PORT=3001
JWT_SECRET_KEY="your-secret-with-at-least-30-characters"
API_VERSION="v1"
```

> `APP_PORT` and `API_VERSION` exist in env, but the current server bootstrap uses fixed values (`3001` and `/api/v1`).

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Start PostgreSQL (Docker):

```bash
docker compose up -d postgres
```

3. Run Prisma migrations:

```bash
npx prisma migrate deploy
```

4. Generate Prisma client:

```bash
npx prisma generate
```

5. Start the API in development mode:

```bash
npm run start:dev
```

## Available script

```bash
npm run start:dev
```

Runs `tsx watch src/main.ts`.

## Authentication model

- `POST /auth` sets a `token` cookie (HTTP-only).
- Protected routes use cookie-based auth middleware.
- Role-based access is enforced with `allowRoles(...)`.
- Supported roles: `ADMIN`, `CUSTOMER`.

## Main endpoints

All routes are prefixed with `/api/v1`.

### Auth

- `POST /auth`
- `GET /auth/me` (auth)
- `POST /auth/logout` (auth)

### Users

- `GET /users` (auth, ADMIN)
- `POST /users`
- `GET /users/:id`
- `DELETE /users/:id` (auth, CUSTOMER)
- `PATCH /users/:id/restore`
- `PUT /users/:id` (auth, ADMIN)

### Categories

- `GET /categories`
- `POST /categories` (auth, ADMIN)
- `GET /categories/search`
- `GET /categories/:id`
- `DELETE /categories/:id` (auth, ADMIN)
- `PATCH /categories/:id/restore` (auth, ADMIN)

### Products

- `GET /products`
- `POST /products` (auth, ADMIN, multipart with `file`)
- `GET /products/search`
- `GET /products/best-sellers`
- `GET /products/:id`
- `PATCH /products/:id` (auth, ADMIN)
- `PATCH /products/:id/image` (auth, ADMIN, multipart with `file`)
- `DELETE /products/:id` (auth, ADMIN)
- `PATCH /products/:id/restore` (auth, ADMIN)

### Reviews

- `POST /reviews` (auth, ADMIN/CUSTOMER)
- `DELETE /reviews/:id` (auth, ADMIN/CUSTOMER)
- `PATCH /reviews/:id/restore` (auth, ADMIN/CUSTOMER)

### Orders

- `POST /orders` (auth, ADMIN/CUSTOMER)
- `GET /orders`
- `GET /orders/:id`
- `GET /orders/:id/user` (auth, CUSTOMER)
- `DELETE /orders/:id` (auth, ADMIN)
- `PATCH /orders/:id/restore` (auth, ADMIN)

### Organization

- `POST /organizations` (auth, ADMIN)
- `GET /organizations`

## File uploads

- Product images are validated by extension/mimetype: `.jpeg`, `.jpg`, `.png`, `.webp`
- Max file size: **5 MB**
- Public files are served from:

```text
http://localhost:3001/files
```

## Local API tests

You can use `api.http` (VS Code REST Client style) to run quick requests against the local API.
