const addNode = (adjacenyList, word) => {
  adjacenyList.set(word, []);
};

const addEdge = (adjacenyList, word1, word2) => {
  adjacenyList.get(word1).push(word2);
};

const bfs = (adjacenyList, start) => {
  const visited = new Set();

  const queue = [start];

  while (queue.length > 0) {
    const station = queue.shift();
    const destinations = adjacenyList.get(station);

    for (const destination of destinations) {
      console.log(`Visiting ${destination} from ${station}`);

      if (!visited.has(destination)) {
        visited.add(destination);
        queue.push(destination)
      }
    }
  }
};

const main = () => {
  const stations = [
    "Chicago",
    "Omaha",
    "Pittsburgh",
    "Kansas City",
    "Saint Louis",
  ];

  const routes = [
    ["Chicago", "Omaha"],
    ["Chicago", "Saint Louis"],
    ["Chicago", "Pittsburgh"],
    ["Omaha", "Kansas City"],
    ["Pittsburgh", "Saint Louis"],
    ["Kansas City", "Omaha"],
    ["Kansas City", "Saint Louis"],
    ["Saint Louis", "Kansas City"],
    ["Saint Louis", "Chicago"],
    ["Saint Louis", "Pittsburgh"],
  ];

  const adjacenyList = new Map();
  stations.forEach((word) => addNode(adjacenyList, word));
  routes.forEach((connectedStation) =>
    addEdge(adjacenyList, ...connectedStation),
  );
  console.log(adjacenyList);
  bfs(adjacenyList, "Chicago");
};

main();
