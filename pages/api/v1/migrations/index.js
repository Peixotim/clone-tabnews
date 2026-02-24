import migrationRunner from "node-pg-migrate";
import { configDotenv } from "dotenv";
import { join } from "node:path";
configDotenv();
import database from "infra/database";

export default async function migrations(request, response) {

  const allowedMethods = ['POST','GET'];

  if(!allowedMethods.includes(request.method)){
      response.status(405).json({
        error: `Method "${request.method}" not allowed`
      })
  }

  let dbClient;
  try{
  dbClient = await database.getNewClient();
  
  const defaultMigrationOptions = {
      dbClient: dbClient ,
      dir: join("infra", "migrations"),
      dryRun: true,
      direction: "up",
      migrationsTable: "pgmigrations",
    }

  if (request.method === "POST") {
    const migratedMigrations = await migrationRunner({...defaultMigrationOptions , dryRun:false});
    if(migratedMigrations.length > 0){
      response.status(201).json(migratedMigrations);
    }
    response.status(200).json(migratedMigrations);
  }

  if (request.method === "GET") {
    const pendingMigrations = await migrationRunner({...defaultMigrationOptions});
    return response.status(200).json(pendingMigrations);
  }

}catch(error){
  console.error(`${error}`);
  throw error;
}finally{
  await dbClient.end();
}
}
