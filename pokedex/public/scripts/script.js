const createFragment = ([tag, attributes, ...content]) => {
  const element = document.createElement(tag);

  Object.entries(attributes).forEach(([attribute, value]) =>
    element.setAttribute(attribute, value),
  );

  if (content.length === 1 && typeof content[0] === "string") {
    element.textContent = content[0];
    return element;
  }
  const children = content.map(createFragment);
  element.append(...children);

  return element;
};

const capitalizeFirstLetter = (word) => word[0].toUpperCase() + word.slice(1);

const createCard = (pokemon) => {
  const imageContainer = [
    "div",
    { class: "image-container" },
    ["img", { src: pokemon.imageUrl }],
  ];

  const types = pokemon.types.map((type) => [
    "div",
    { class: `type ${type}` },
    capitalizeFirstLetter(type),
  ]);

  const typesContainer = ["div", { class: "types-container" }, ...types];

  const stats = Object.entries(pokemon.stats).map(([stat, value]) => [
    "div",
    { class: "stat" },
    ["p", { class: "stat-name" }, stat],
    ["p", { class: "stat-name" }, String(value)],
  ]);

  const statsContainer = ["div", { class: "stats-container" }, ...stats];

  const cardDetails = [
    "div",
    { class: "card-details" },
    [
      "div",
      { class: "name-types-container" },
      ["h2", { }, capitalizeFirstLetter(pokemon.name)],
      typesContainer,
    ],

    statsContainer,
  ];

  console.log("Stats Cotainer: ", JSON.stringify(statsContainer));
  const card = ["div", { class: "card" }, imageContainer, cardDetails];

  return createFragment(card);
};

const createCards = (pokemons) => pokemons.map(createCard);

window.onload = () => {
  const pokemons = [
    {
      imageUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      name: "bulbasaur",
      types: ["grass", "poison"],
      stats: {
        weight: 69,
        baseXP: 64,
        hp: 45,
        attack: 49,
        defense: 49,
        speed: 45,
      },
    },
    // {
    //   imageUrl:
    //     "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
    //   name: "ivysaur",
    //   types: ["grass", "poison"],
    //   stats: {
    //     weight: 130,
    //     baseXP: 142,
    //     hp: 60,
    //     attack: 62,
    //     defense: 63,
    //     speed: 60,
    //   },
    // },
  ];

  const cardsContainer = document.querySelector("#cards-container");
  const cards = createCards(pokemons);
  cardsContainer.append(...cards);
};
