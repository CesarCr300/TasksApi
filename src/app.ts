import express from "express";
import dotenv from "dotenv";
import { DataSourceSingletone } from "./database/datasource";
dotenv.config();

const app = express();
app.use(express.json());

const routersLocation = ["./modules/tasks/routes/task.routes"];

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    const dataSource = DataSourceSingletone.get();
    await dataSource.initialize();
    routersLocation.forEach(async (routerLocation) => {
      const { router } = await import(routerLocation);
      app.use("/", router);
    });
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.log(error);
    console.log("Server is not running");
  }
});
