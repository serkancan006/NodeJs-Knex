const db = require("./db-config");

module.exports = {
  findAktor,
  addAktor,
  updateAktor,
  deleteAktor,
  findAktorById,
};

function findAktor() {
  return db("aktor");
}

function addAktor(yeniAktor) {
  return db("aktor")
    .insert(yeniAktor, "id")
    .then(([id]) => {
      return db("aktor").where(id).first();
    });
}

function updateAktor(updatedAktor, id) {
  return db("aktor")
    .update(updatedAktor)
    .where({ id: id })
    .then((updated) => {
      if (updated) {
        return db("aktor").where({ id }).first();
      }
    });
}

function deleteAktor(id) {
  return db("aktor").del().where({ id });
}

function findAktorById(id) {
  return db("aktor").where({ id }).first();
}
