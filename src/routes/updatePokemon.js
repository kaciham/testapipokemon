const { Pokemon } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");

module.exports = (app) => {
  app.put("/api/pokemons/:id", (req, res) => {
    const id = req.params.id;
    Pokemon.update(req.body, { where: { id: id } })
      .then(() => {
        return Pokemon.findByPk(id).then((pokemon) => {
          if (pokemon === null) {
            const message = "Le pokemon demandé n'existe pas";
            return res.status(404).json({ message });
          }
          const message = `Le pokemon ${pokemon.name} a bien été mis à jour`;
          res.json({ message, data: pokemon });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message =
          "Le pokémon n'a pas pu être modifié. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};
