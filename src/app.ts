import { envs } from "./config/envs";
import { MongoDatabase } from "./data/mongodb";

import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.DB_NAME,
  });

  new Server({ port: envs.PORT, routes: AppRoutes.routes }).start();
}