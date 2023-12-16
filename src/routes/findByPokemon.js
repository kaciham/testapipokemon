const { Pokemon } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/pokemons/:id", auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (pokemon === null) {
          const message = "Le Pokémon n'a pas été trouvé";
          return res.status(404).json({ message });
        }
        const message = `Un pokémon a bien été trouvé. Il s'agit de ${pokemon.name}`;
        return res.json({ message, data: pokemon });
      })
      .catch((error) => {
        const message =
          "Le Pokémon n'a pas pu être récupéré. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};
