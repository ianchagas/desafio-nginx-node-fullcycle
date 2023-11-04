const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "fullcycle",
};

const generateRandomName = () => {
  const surname = ["Silva", "Souza", "Santos", "Rodrigues", "Gomes", "Chagas"];
  const name = ["Ian", "Joao", "Jose", "Maria", "Roberta", "Matheus"];
  const randomSurnames = surname[Math.floor(Math.random() * surname.length)];
  const randomNames = name[Math.floor(Math.random() * name.length)];

  return `${randomNames} ${randomSurnames}`;
};

const insertRandomNames = () => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(config);
    const namesToInsert = [];

    for (let i = 0; i < 10; i++) {
      const randomName = generateRandomName();
      namesToInsert.push([randomName]);
    }

    const sql = `INSERT INTO people(name) values ?`;
    connection.query(sql, [namesToInsert], (err, result) => {
      connection.end();

      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

app.get("/", (req, res) => {
  const connection = mysql.createConnection(config);

  insertRandomNames()
    .then(() => {
      connection.query("SELECT * FROM people", (err, result) => {
        if (err) {
          connection.end();
          throw err;
        }

        const names = result.map((row) => row.name);
        res.send(`<h1>Full Cycle Rocks!</h1><br> ${names.join("<br> ")}`);
        connection.end();
      });
    })
    .catch((err) => {
      throw err;
    });
});

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});
