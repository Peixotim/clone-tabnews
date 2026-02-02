import database from "infra/database.js";

async function status(req, res) {
  try {
    const updatedAt = new Date().toISOString();
    const versionPostgres = await database.query("SHOW server_version;");
    const version = versionPostgres.rows[0].server_version;

    const queryMaxConnections = await database.query("SHOW max_connections;");
    const { max_connections } = queryMaxConnections.rows[0];

    const databaseName = process.env.POSTGRES_DB;
    const queryConnectionUsed = await database.query({
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname= $1;",
      values: [databaseName],
    });

    const { count } = queryConnectionUsed.rows[0];

    res.status(200).json({
      updated_at: updatedAt,
      dependencies: {
        database: {
          version: version,
          max_connections: parseInt(max_connections),
          opened_connections: count,
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export default status;
