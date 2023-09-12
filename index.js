const express = require("express");
const data = require("./data.js");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send("express ten merhaba");
});

server.get("/aktorler", (req, res) => {
  res.status(200).json(data);
});

server.get("/aktorler/:aktor_id", (req, res) => {
  // query,params,body haricinde header... gibi özelliklerde var   tam tersi res içinde status data gibi değerler olabilir.
  //http://127.0.0.1:5000/aktorler/1?isim=kemal&soyisim=sunal&film_turu=komedi
  //console.log(req.query);
  ////http://127.0.0.1:5000/aktorler/1
  //console.log(req.params);
  //bir body gönderirsen eğer json bir veri mesela
  //console.log(req.body)    ile değer hem get hem post metodlarından çekilebilir
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
