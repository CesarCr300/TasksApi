import { DataSource } from "typeorm";

export class DataSourceSingletone {
  private static dataSource: DataSource | null;
  static get(): DataSource {
    if (DataSourceSingletone.dataSource == null) {
      DataSourceSingletone.initialize();
    }
    return DataSourceSingletone.dataSource;
  }

  static initialize() {
    DataSourceSingletone.dataSource = new DataSource({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT as any),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + "/../**/*.entity.{js,ts}"],
      logging: true,
      synchronize: false,
    });
  }
}
