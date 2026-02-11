import migrationRunner from "node-pg-migrate";
import { configDotenv } from "dotenv";
import { join } from "node:path";
configDotenv();
import database from "infra/database";

export default async function migrations(request, response) {

  const dbClient = await database.getNewClient();
  
  const defaultMigrationOptions = {
      dbClient: dbClient ,
      dir: join("infra", "migrations"),
      dryRun: true,
      direction: "up",
      migrationsTable: "pgmigrations",
    }

  if (request.method === "POST") {
    const migratedMigrations = await migrationRunner({...defaultMigrationOptions , dryRun:false});
    await dbClient.end();
    if(migratedMigrations.length > 0){
      response.status(201).json(migratedMigrations);
    }
    response.status(200).json(migratedMigrations);
  }

  if (request.method === "GET") {
    const pendingMigrations = await migrationRunner({...defaultMigrationOptions});
    await dbClient.end();
    return response.status(200).json(pendingMigrations);
  }

  return response.status(405).end(); //405 -> Metodo não permitido
}
