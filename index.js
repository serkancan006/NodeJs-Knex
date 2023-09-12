const express = require("express");
const aktorlerRouter = require("./routers/aktorlerRouter");

const server = express();
server.use(express.json());
server.use("/aktorler", aktorlerRouter);

server.get("/", (req, res) => {
  res.send("express ten merhaba");
});

server.listen(5000, () => {
  console.log("localhost:5000 adresine gelen istekler dinleniyor");
});
