const { Pokemon } = require("../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/pokemons", auth, (req, res) => {
    if (req.query.name) {
      const name = req.query.name;
      const limit = parseInt(req.query.limit) || 5;
      if (name.length < 2) {
        const message = "la recherche doit au minimum contenir 2 caractères";
        return res.status(400).json({ message });
      }
      return Pokemon.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
        order: ["name"],
        limit: limit,
      }).then((pokemons) => {
        const message = `Il y a ${pokemons.length} pokémons qui correspondent au terme de recherche ${name}`;
        res.status(200).json({ message, data: pokemons });
      });
    } else {
      return Pokemon.findAll({ order: ["name"] })
        .then((pokemons) => {
          const message = `Voici la liste des pokémons récupérés sur la base de données, ${pokemons.length} au total`;
          res.json({ message: message, data: pokemons });
        })
        .catch((error) => {
          const message =
            "La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelques instants.";
          res.status(500).json({ message, data: error });
        });
    }
  });
};
