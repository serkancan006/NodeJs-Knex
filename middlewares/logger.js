module.exports = (req, res, next) => {
  //next bir fonksiyondu görevi sonraki middlewate yönlendirmek
  console.log(`${new Date().toUTCString()} - ${req.method} - ${req.hostname}`);
  next();
};
