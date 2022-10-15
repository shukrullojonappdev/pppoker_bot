import { DataSource } from "typeorm";
import { User } from "./entities";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  database: "tg-bot",
  username: "postgres",
  password: "1234",
  entities: [User],
  synchronize: true,
});
