const router = require("express").Router();
let data = require("../data.js");    //let olmaz ise hata verir


router.get("/", (req, res) => {
    res.status(200).json(data);
  });
  
  let next_id = 4;
  
  router.post("/", (req, res) => {
    let yeni_aktor = req.body;
    yeni_aktor.id = next_id;
    next_id++;
    data.push(yeni_aktor);
    res.status(201).json(yeni_aktor);
  });
  
  router.delete("/:aktor_id", (req, res) => {
    const silinecek_aktor_id = req.params.aktor_id;
    const silinecek_aktor = data.find(
      (aktor) => aktor.id === Number(silinecek_aktor_id)
    );
    if (silinecek_aktor) {
      // data'nın içeriğini değiştirmek yerine filter kullanarak yeni bir dizi oluşturun
      data = data.filter((aktor) => aktor.id !== Number(silinecek_aktor_id));
      res.status(204).end();
    } else {
      res
        .status(404)
        .json({ errorMessage: "silmeye çalıştığınız aktör sistemde yok" });
    }
  });
  
  router.get("/:aktor_id", (req, res) => {
    const { aktor_id } = req.params;
    const aktor = data.find((aktor) => aktor.id === parseInt(aktor_id));
    if (aktor) {
      res.status(200).json(aktor);
    } else {
      res.status(404).send("aradığınız aktör bulunamadı");
    }
  });

  //put işlemini yap req.params ve req.body ile

module.exports = router;
