const groupByType = (pokedex) => {
  const cards = {
    all: [],
    bug: [],
    dark: [],
    dragon: [],
    electric: [],
    fairy: [],
    fighting: [],
    fire: [],
    flying: [],
    ghost: [],
    grass: [],
    ground: [],
    ice: [],
    normal: [],
    poison: [],
    psychic: [],
    rock: [],
    steel: [],
    water: [],
  };

  for (const pokemon of pokedex) {
    console.log({ pokemon });
    for (const type of pokemon.types) {
      cards[type].push(pokemon);
    }
  }

  return cards;
};

const writeToFiles = async (groupedPokemon) => {
  for (const type in groupedPokemon) {
    await Deno.writeTextFile(
      `public/data/${type}.json`,
      JSON.stringify(groupedPokemon[type]),
    );
  }
  console.log("Finished writing to files");
};

const main = async () => {
  const pokedex = await Deno.readTextFile("public/data/pokedex.json");
  const groupedPokemon = groupByType(JSON.parse(pokedex));
  writeToFiles(groupedPokemon);
};
main();
