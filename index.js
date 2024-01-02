const express = require("express");
const bodyParse = require("body-parser");
const sequelize = require("./src/db/sequelize");

const app = express();
const port = process.env.PORT || 3333;

sequelize.initDb();

app.use(bodyParse.json());

app.get("/", (req, res) => {
  const message = "hi there, you're online !! ";
  const message2 = "isn't that awesome ?! ";
  res.json({ message, message2 });
});

app.get("/", (req, res) => res.send("hello there"));
app.get("/test", (req, res) => res.send("this is test endpoint mate"));

// Endpoint

require("./src/routes/allPokemons")(app);
require("./src/routes/findByPokemon")(app);
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);
require("./src/routes/login")(app);

// Gestion des erreurs 404

app.use(({ res }) => {
  const message = "La page demandée n'existe pas";
  res.status(404).json({ message });
});

//Tous les pokémons

// app.get("/all", (req, res) => {
//   const message = `Voici tous les pokemons, il y a ${pokemons.length} pokemons au total `;
//   res.json(success(message, pokemons));
// });

// //Rechercher un pokemon

// app.get("/pokemon/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const pokemon = pokemons.find((pokemon) => pokemon.id === id);
//   const message = `Vous avez sélectionné un pokemon, il s'agit de ${pokemon.name}`;
//   res.json(success(message, pokemon));
// });

// //Numero + Nom

// app.get("/exercice/:id/:name", (req, res) => {
//   const id = req.params.id;
//   const name = req.params.name;
//   res.send(`il s'agit du pokemon n°${id} qui se nomme ${name}`);
// });

// //Ajouter un pokemon

// app.post("/pokemon", (req, res) => {
//   const id = getUniqueId(pokemons);
//   const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
//   pokemons = pokemons.push(pokemonCreated);
//   const message = `Le Pokemon ${pokemonCreated.name} a bien été créé.`;
//   res.json(success(message, pokemonCreated));
// });

// //Modifier un pokemon

// app.put("/pokemon/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const pokemonUpdated = { ...req.body, id: id };
//   pokemons = pokemons.map((pokemon) => {
//     return pokemon.id === id ? pokemonUpdated : pokemon;
//   });
//   const message = `Le pokemon ${pokemonUpdated.name} a été mis à jour`;
//   res.json(success(message, pokemonUpdated));
// });

// //Supprimer un pokemon

// app.delete("/pokemon/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const pokemonDeleted = pokemons.find((pokemon) => pokemon.id === id);
//   pokemons.filter((pokemon) => pokemon.id !== id);
//   const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`;
//   res.json(success(message, pokemonDeleted));
// });

app.listen(port, () => console.log(`started on http://localhost:${port}`));
