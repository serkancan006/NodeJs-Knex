module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "nodejsKnexDB",
      user: "postgres",
      password: "123456",
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};

//database in olması gerekiyor mig_1 migration a göre
//npx knex migrate:make mig_1 -> migration oluşturma komutu yada global olarka yükleyerek knex migrate:make mig_1 bu şekilde kullanabilirsin
//Migration komutları
// npx knex migrate:up -> oluşturulan migrate i up etmek komutu
// npx knex migrate:down -> oluşturulan migrate i down etmek komutu
// npx knex migrate:lates -> oluşturulan migrate sırasıyla çalıştırır
//Seed komutları  -  Sırayla gerçekleşmez hepsini yükler
// npx knex seed:make 01_aktor_ekle
//npx knex seed:run   

// postgre sql baglanma cmd ile
//psql -d veritabanı_adı -U kullanıcı_adı

