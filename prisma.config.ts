/* eslint-disable @typescript-eslint/no-require-imports */

import { defineConfig } from "prisma/config";
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

dotenvExpand.expand(dotenv.config());

function buildDatabaseUrl() {
  if (process.env.DATABASE_URL) {
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("⏳⏳⏳🔨🔨🔨🔨🔨");
    console.log("");
    console.log(process.env.DATABASE_URL);
    return process.env.DATABASE_URL;
  }

  const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
  } = process.env;
  if (
    !POSTGRES_USER ||
    !POSTGRES_PASSWORD ||
    !POSTGRES_HOST ||
    !POSTGRES_PORT ||
    !POSTGRES_DB
  ) {
    throw new Error("Missing DB env vars");
  }

  return `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public`;
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: buildDatabaseUrl(),
  },
});
