import { app } from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./database/sequelize.js";

async function bootstrap() {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`Backend API listening on http://localhost:${env.port}`);
  });
}


// updsated code 
bootstrap().catch((error) => {
  console.error("Failed to start backend API", error);
  process.exit(1);
});
