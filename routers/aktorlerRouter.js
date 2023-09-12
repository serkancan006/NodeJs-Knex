const router = require("express").Router();
let data = require("../data.js"); //let olmaz ise hata verir
const Aktor = require("../data/data-model");

router.get("/", (req, res) => {
  Aktor.findAktor()
    .then((aktorler) => {
      res.status(200).json(aktorler);
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Aktorler Alınırken hata oluştu.",
        error: error, //aynı isimde kullanıcaksan error da yazabilirsin
      });
    });
});

router.post("/", (req, res, next) => {
  const yeniAktor = req.body;
  if (!yeniAktor.isim) {
    next({
      statusCode: 400,
      errorMessage: "Aktor Eklemek icin isim girmelisinz",
    });
  } else {
    Aktor.addAktor(yeniAktor)
      .then((added) => {
        res.status(201).json(added);
      })
      .catch((error) => {
        next({
          statusCode: 500,
          errorMessage: "Aktor Eklerken hata olustu",
          error,
        });
      });
  }
});

router.delete("/:aktor_id", (req, res, next) => {
  const { aktor_id } = req.params;

  Aktor.findAktorById(aktor_id)
    .then((silinecekAktor) => {
      Aktor.deleteAktor(aktor_id)
        .then((deleted) => {
          if (deleted) {
            res.status(204).end();
          }
          next({
            statusCode: 400,
            errorMessage: "Silmeye çalıştıgınız aktor sistemde mevcut değil",
          });
        })
        .catch((error) => {
          next({
            statusCode: 500,
            errorMessage: "Aktor silinirken hata olustu",
            error,
          });
        });
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Aktor bulunurken hata olustu",
        error,
      });
    });
});

router.patch("/:id", (req, res, next) => {
  const { id } = req.params;
  const updatedAktor = req.body;

  if (!updatedAktor.isim) {
    next({
      statusCode: 400,
      errorMessage: "Aktor ismi boş olmaz.",
    });
  }

  Aktor.updateAktor(updatedAktor, id)
    .then((updated) => {
      res.status(200).json(updated);
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Aktor düzenlenirken hata oluştu",
        error,
      });
    });
});

router.get("/:aktor_id", (req, res, next) => {
  const { aktor_id } = req.params;

  Aktor.findAktorById(aktor_id)
    .then((aktor) => {
      if (aktor) {
        res.status(200).json(aktor);
      } else {
        next({
          statusCode: 400,
          errorMessage: "aktor bulunamadı",
        });
      }
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "aktor bulunurken hata olustu",
        error,
      });
    });
});

module.exports = router;
