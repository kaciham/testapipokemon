const { Sequelize, DataTypes } = require("sequelize");
const pokemon = require("../models/pokemon");
const user = require("../models/user.js");
let pokemons = require("../db/mock-pokemon");
const bcrypt = require("bcrypt");
require("dotenv").config();

const name = process.env.DB_NAME;
const usernamedb = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

const sequelize = new Sequelize(name, usernamedb, password, {
  host,
  dialect: "mysql",
  // dialectOptions: {
  //   timezone: "Etc/GMT+1",
  // },
  logging: false,
});

// sequelize
//   .authenticate()
//   .then(() =>
//     console.log("La connexion à la base de données à bien été établie.")
//   )
//   .catch((error) =>
//     console.error(
//       "Impossible d'établir une connexion avec la base de données -> " + error
//     )
//   );

const Pokemon = pokemon(sequelize, DataTypes);
const User = user(sequelize, DataTypes);

const initDb = () => {
  return sequelize
    .sync({ force: true })
    .then(() => {
      pokemons.map((pokemon) => {
        Pokemon.create({
          name: pokemon.name,
          hp: pokemon.hp,
          cp: pokemon.cp,
          picture: pokemon.picture,
          types: pokemon.types,
        }).then((pokemon) => console.log(pokemon.toJSON()));
      });

      bcrypt.hash("12345678", 10).then((hash) => {
        User.create({ username: "Kaci", password: hash });
      });
    })
    .then(console.log("la base de données a bien été initialisée"))
    .catch((error) => console.error);
};

module.exports = {
  initDb,
  Pokemon,
  User,
};
