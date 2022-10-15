import express from "express";
import { dataSource } from "../database";

export class Server {
  constructor() {}

  public async start() {
    dataSource.initialize().then(() => console.log("data initialized"));

    const app = express();

    app.listen(5000, () => {
      try {
        console.log("server start");
      } catch (e) {
        console.error(e);
      }
    });
  }
}
