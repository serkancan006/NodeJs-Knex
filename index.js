const express = require("express");
const data = require("./data.js");

const server = express();

server.get("/", (req, res) => {
  res.send("express ten merhaba");
});

server.get("/aktorler", (req, res) => {
  res.status(200).json(data);
});

server.get("/aktorler/:aktor_id", (req, res) => {
  const { aktor_id } = req.params;
  const aktor = data.find((aktor) => aktor.id === parseInt(aktor_id));
  if (aktor) {
    res.status(200).json(aktor);
  } else {
    res.status(404).send("aradiginiz aktor bulunamadiiiii");
  }
});

server.listen(5000, () => {
  console.log("localhost:5000 adresine gelen istekler dinleniyor");
});
