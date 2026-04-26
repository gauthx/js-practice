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
    ["p", { class: "stat-name" }, capitalizeFirstLetter(stat)],
    ["p", { class: "stat-value" }, String(value)],
  ]);

  const statsContainer = ["div", { class: "stats-container" }, ...stats];

  const cardDetails = [
    "div",
    { class: "card-details" },
    [
      "div",
      { class: "name-types-container" },
      ["h2", {}, capitalizeFirstLetter(pokemon.name)],
      typesContainer,
    ],

    statsContainer,
  ];

  const cardStructure = ["div", { class: "card" }, imageContainer, cardDetails];

  return createFragment(cardStructure);
};

const createCards = (pokemons) => pokemons.map(createCard);

const displayPokemon = (pokedex) => {
  const cardsContainer = document.querySelector("#cards-container");
  const cards = createCards(pokedex);
  cardsContainer.append(...cards);
};

const registerListeners = () => {
  const navigations = document.querySelector("#navs-container");
  navigations.addEventListener("click", async (event) => {
    const type = event.target.getAttribute("id");
    const response = await fetch(`${type}.json`);
    const pokedex = await response.json();

    const cardsContainer = document.querySelector("#cards-container");
    const cards = createCards(pokedex);
    cardsContainer.innerHTML = "";
    cardsContainer.append(...cards);
  });
};

window.onload = async () => {
  const response = await fetch("all.json");
  const pokedex = await response.json();
  displayPokemon(pokedex);
  registerListeners();
};
