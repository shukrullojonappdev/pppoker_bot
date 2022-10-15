import express from "express";

export class Server {
  constructor() {}

  public async start() {
    const app = express();

    app.listen(3000, () => {
      try {
        console.log("server start");
      } catch (e) {
        console.error(e);
      }
    });
  }
}
