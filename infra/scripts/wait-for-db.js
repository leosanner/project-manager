import { exec } from "child_process";

const dbName = "postgres-db";

function checkPostgres() {
  exec(`docker exec ${dbName} pg_isready --host localhost`, handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }
    console.log("\n\n✅ DB accepting connections.");
  }
}

process.stdout.write("\n\n⏳ Waiting DB accept connections");
checkPostgres();
