/* eslint-disable @typescript-eslint/no-require-imports */

import { defineConfig } from "prisma/config";
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

dotenvExpand.expand(dotenv.config());

function getDatabaseUrl() {
  const dbUrl = process.env.DATABASE_URL;

  return dbUrl;
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: getDatabaseUrl(),
  },
});
