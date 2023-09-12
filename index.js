const express = require("express");
const aktorlerRouter = require("./routers/aktorlerRouter");
const logger = require("./middlewares/logger");

const server = express();
//MiddleWares  -> 1)expres içinde gelen 2)harici dış örnek olarka CORS için 3/ custom bizim oluşturdugumuz
server.use(express.json());
server.use(logger);

server.use("/aktorler", aktorlerRouter);

server.get("/", (req, res) => {
  res.send("express ten merhaba");
});

server.listen(5000, () => {
  console.log("localhost:5000 adresine gelen istekler dinleniyor");
});
