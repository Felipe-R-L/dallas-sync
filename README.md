# Dallas Sync

[![Project Status](https://img.shields.io/badge/status-in%20development-yellowgreen)](https://github.com/your-username/dallas-sync)
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

**Dallas Sync** is a SaaS, Multi-Tenant ERP (Enterprise Resource Planning) focused on the motel industry. The system was co-developed with a real client, designed to meet the operational needs and simplify the daily tasks of employees.

## 🎯 Project Philosophy

The project's goal is to avoid the common pitfalls of "one-size-fits-all" ERPs by providing a solution that is:
* **Minimalist and Focused:** No unnecessary features that complicate usage.
* **Easy to Use:** With an intuitive design and a performant UI.
* **Stable and Reliable:** Built on a modern and robust codebase.

> For an in-depth look at the architecture, data model, and development plan, please read **[Project Vision Document](./PROJECT.md)**.

---

## 🛠️ Tech Stack

### Back-end
- **Framework:** NestJS
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Containerization:** Docker

### Front-end
- **Framework:** Angular
- **Component Library:** Storybook
- **Styling:** Tailwind CSS

---

## 🚀 Getting Started

Follow the steps below to set up and run the local development environment.

### Prerequisites
* [Node.js](https://nodejs.org/) (version 20.x or higher)
* [pnpm](https://pnpm.io/) (or `npm`/`yarn`)
* [Docker](https://www.docker.com/) and Docker Compose

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/dallas-sync.git](https://github.com/your-username/dallas-sync.git)
cd dallas-sync
```

### 2. Install Dependencies
```bash
# Navigate to the backend or frontend folder
cd backend
pnpm install
```

### 3. Configure Environment Variables
Create a `.env` file in the backend's root directory, based on the `.env.example`.
```env
DATABASE_HOST = localhost
DATABASE_PORT = 5432
DATABASE_USER = postgres
DATABASE_PASSWORD  = postgres
DATABASE_NAME = postgres

POSTGRES_DB = postgres
POSTGRES_USER = postgres
POSTGRES_PASSWORD = dallasroot
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
```

### 4. Start the Database with Docker
From the project's root directory, run:
```bash
docker-compose up -d
```
This will start a PostgreSQL container with the settings defined in `docker-compose.yml`.

### 5. Run Prisma Migrations
With the database running, apply the schema:
```bash
# Inside the backend folder
pnpm prisma migrate dev
```

### 6. Run the Application
```bash
# Development mode (with hot-reload)
pnpm start:dev
```
The API will be available at `http://localhost:3000`.

---

## 📜 Key Scripts

* `pnpm start:dev`: Starts the application in development mode.
* `pnpm build`: Compiles the project for production.
* `pnpm test`: Runs the unit tests.
* `pnpm prisma:studio`: Opens the Prisma Studio UI to view and edit data.
* `pnpm prisma:generate`: Generates the Prisma Client after changes to `schema.prisma`.

---

## 📄 License

This project is licensed under the MIT License and The Commons Clause. See the [LICENSE](./LICENSE.md) file for details.
