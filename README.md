# To-Do List

A modern, fully responsive To-Do List app designed for efficiency and ease of use. It allows users to quickly organize their tasks by easily creating, updating, and deleting them. With an intuitive and smooth interface, the app provides a practical solution for managing both personal and professional activities. It ensures a seamless experience with real-time updates and a clean, user-friendly design.

## Table of Contents

- [Requirements](#requirements)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Requirements

You need to have the following installed:

A source code editor such as [VSCode](https://code.visualstudio.com/), [Sublime Text](https://www.sublimetext.com/), or any other editor of your choice.

[![NodeJS](https://img.shields.io/badge/Node.js-6DA55F.svg?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/en)
[![npm](https://img.shields.io/badge/npm-%23CB3837.svg?style=flat&logo=npm&logoColor=white)](https://www.npmjs.com/)

> [!NOTE]
> Clicking on the Node.js badge will take you to the Node.js website, where you can download the installer. It is recommended to use the stable version. When you install Node.js, npm will be installed automatically.

Check your Node.js and npm installation by running:

```bash
node --version
npm --version
```

## Technology Stack

This project utilizes the following technologies:

<p>
  <a href="#"><img src="https://skillicons.dev/icons?i=next" width="40" height="40" alt="Next.js" /></a>
  <a href="#"><img src="https://skillicons.dev/icons?i=ts" width="40" height="40" alt="TypeScript" /></a>
  <a href="#"><img src="https://skillicons.dev/icons?i=tailwind" width="40" height="40" alt="Tailwind CSS" /></a>
  <a href="#"><img src="https://skillicons.dev/icons?i=docker" width="40" height="40" alt="Docker" /></a>
  <a href="#"><img src="https://skillicons.dev/icons?i=prisma" width="40" height="40" alt="Prisma" /></a>
  <a href="#"><img src="https://skillicons.dev/icons?i=postgres" width="40" height="40" alt="PostgreSQL" /></a>
</p>

## Project Structure

```bash
├───📁 prisma/
│   ├───📁 migrations/
│   └───📄 schema.prisma
├───📁 public/
├───📁 src/
│   ├───📁 app/
│   │   ├───📁 api/
│   │   │   └───📁 seed/
│   │   ├───📁 fonts/
│   │   ├───📄 favicon.ico
│   │   ├───📄 globals.css
│   │   ├───📄 layout.tsx
│   │   └───📄 page.tsx
│   └───📁 lib/
├───📄 .env.template
├───📄 .eslintrc.json
├───📄 docker-compose.yml
├───📄 LICENSE
├───📄 next.config.ts
├───📄 package-lock.json
├───📄 package.json
├───📄 postcss.config.mjs
├───📄 README.md
├───📄 tailwind.config.ts
└───📄 tsconfig.json
```

> [!NOTE]
> This section will be updated once the project structure is finalized.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/daniel-pompa/next-to-do-list.git
```

2. **Navigate to the project directory:**

```bash
cd next-to-do-list
```

3. **Install dependencies:**

```bash
npm install
```

## Usage

After completing the installation and environment setup, you can start the application for development use. Follow the steps below to get started:

### Running the Application in Development Mode

1. Start the PostgreSQL database

Ensure Docker is installed and running, then launch the PostgreSQL container using the following command:

```bash
docker compose up -d
```

> [!NOTE]
> This command starts the database in the background. Ensure that your `docker-compose.yml` file is properly configured for PostgreSQL, including ports and volume mappings.

2. Configure environment variables

Create a copy of the `.env.template` file and rename it to `.env`. Update the variables in the `.env` file to match your local setup or project requirements.

Ensure that the `DATABASE_URL` is correctly set to point to your local PostgreSQL instance. For example:

```.env
DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase
```

3. Prepare the database

Use Prisma to set up and synchronize the database schema with your local environment. Follow these steps:

- Initialize Prisma (if needed):

Run this command only if Prisma is not yet initialized in the project. If the `prisma/schema.prisma` file already exists (as in this repository), skip this step.

```bash
npx prisma init
```

- Apply database migrations:

Apply any pending migrations to the database. If no migrations exist, Prisma will prompt you to create one interactively:

```bash
npx prisma migrate dev
```

- Generate the Prisma client:

Ensure the Prisma client reflects the latest schema. This step is required for database operations within the application:

```bash
npx prisma generate
```

> [!NOTE]
> Before running these commands, verify that the DATABASE_URL in the `.env` file is correct.

4. Start the development server

Launch the app in development mode:

```bash
npm run dev
```

> [!NOTE]
> The server will typically run on <http://localhost:3000>, but check the output on your terminal to be sure.
> For troubleshooting, ensure Docker, Node.js, and the dependencies are correctly installed. Verify that the `.env` configuration matches your setup.

5. Seed the database

Populate the local database by running the seed script. Trigger the seed endpoint using an API testing tool like Postman or directly in your browser:

[Execute Seed Script](http://localhost:3000/api/seed)

> [!TIP]
> Use this step only after confirming that the application server is running and the database is properly configured.

6. Troubleshooting

- Verify that Docker, Node.js, and project dependencies are correctly installed.

- Ensure the `.env` file is properly configured with all required environment variables.

- Check the `prisma/schema.prisma` file for errors in the database schema.

- If Prisma commands fail, try running `npx prisma format` to ensure the schema is correctly formatted.

- Review the logs of your Docker container to confirm that the PostgreSQL database is running:

```bash
docker logs <container_name>
```

> [!NOTE]
> Replace `<container_name>` with the name of your PostgreSQL container, as defined in `docker-compose.yml`

## Prisma Command Overview

Here’s a summary of the Prisma commands used in this project:

- `npx prisma init`: Initializes Prisma by creating a `prisma/schema.prisma` file and the necessary configuration. This command is typically run once during setup.

- `npx prisma migrate dev`: Applies migrations to the database. If no migrations exist, it will prompt you to create one interactively.

- `npx prisma generate`: Generates the Prisma client based on the schema. This command must be run after any schema change.

## Contributing

Contributions from the community are greatly appreciated. To contribute, please follow the steps below

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

**Code Standards**  

Before submitting a pull request, please ensure your code follows the project's coding standards. We use [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) to maintain code consistency and readability. Please run these tools before submitting.

## License

This project is licensed under the MIT License.

[![MIT License](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://choosealicense.com/licenses/mit/)

> [!NOTE]
> Clicking on the MIT License badge to see the LICENSE file for details.

## Author

This project is maintained and developed by **Daniel Pompa Pareja**.

For any questions or suggestions, feel free to reach out via [email](mailto:daniel.40.pompa@gmail.com).

[Back to Top](#table-of-contents)
