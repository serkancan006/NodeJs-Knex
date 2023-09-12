//put ile bütün değerler beklenir patch(yama) hepsini kullanmamıza gerek yok
//put değer varsa düzenle yoksa oluştur

"callback hell" denilen şey oluşmaya başlamış kodunuzda. Şahsen ben o yüzden "async - await" kullanımını daha sade buluyorum. Siz sanırım alışkanlıktan dolayı "then - catch" yöntemini seviyorsunuz. :)

Bilmeyenler için;

router.delete('/:id', async (req, res, next) => {
     let { id } = req.params;

     // await sayesinde db'den kayıt dönene kadar bekleniyor
     let silinecekActor = await Actor.findById(id);

     if( silinecekActor ) {
          let deleted = await Actor.deleteActor(id);
          if ( deleted ) {
              res.status(204).end();
          }
          next({ statusCode: 404, errorMessage: "Silinecek aktör bulunamadı." });
     } else {
          // silinecek aktör mevcut değil
     }
})


Belirttiğiniz gibi next() sadece hata fırlatmak için değil, asıl kullanım amacı bir sonraki ara katmana geçiş içindir. Yani bir ara katmandayken hata işlemeyecek olsanız bile next() kullanmalısınız. Eğer kullanmazsanız, bu sefer next() kullanmamaktan dolayı hataya düşersiniz. Çünkü mevcut ara katman nereye gideceğini bilemez

Mesaj dönüşlerini next() yerine şu şekilde kullanıyoruz

res.json({
  errorCode: 400,
  errorMessage: 'ssdsdsdsd',
  error
})
vs... gibi

Express kullandığınzıı varsayarak, minimum bir ara katman şu şekilde olmalıdır

const express = require('express')
const app = express();
app.use((req, res, next) ==> {
next()
})
.
.
.

kodunuz herhangi bir hata veya takılmaya uğramadan devam eder (bir sonuç veya hatada dönmez, taa ki en son katmana ulaşıp kendine bir response buluncaya kadar). Akışınızda bir response yoksa, bu sefer hataya düşersiniz.
Sonuç olarak next() metodu sadece hata fırlatmak için kullanılmaz. Ama ara katmanlar arasında mesaj taşıyabilir. 

Bunu belirtmek istedim