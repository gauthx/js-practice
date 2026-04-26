const addNode = (adjacenyList, station) => {
  adjacenyList.set(station, []);
};

const addEdge = (adjacenyList, word1, word2) => {
  adjacenyList.get(word1).push(word2);
};

const dfs = (adjacenyList, start, visited = new Set()) => {
  console.log(start);
  visited.add(start);

  const destinations = adjacenyList.get(start);

  for (const destination of destinations) {
    if (destination === target) {
      console.log(`Found ${target}`)
    }
    if (!visited.has(destination)) {
      visited.add(destination);
      dfs(adjacenyList, destination, visited);
    }
  }
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
        queue.push(destination);
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
  stations.forEach((station) => addNode(adjacenyList, station));
  routes.forEach((connectedStation) =>
    addEdge(adjacenyList, ...connectedStation),
  );
  console.log(adjacenyList);
  bfs(adjacenyList, "Chicago");
  dfs(adjacenyList,"Chicago")
};

main();
