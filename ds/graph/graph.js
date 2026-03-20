const addNode = (adjacenyList, word) => {
  adjacenyList.set(word, []);
};

const addEdge = (adjacenyList, word1, word2) => {
  adjacenyList.get(word1).push(word2);
  adjacenyList.get(word2).push(word1);
};

const main = () => {
  const words = ["cat", "bat", "bet", "bed", "cot", "cog", "dog"];

  const rhymingWords = [
    ["cat", "bat"],
    ["bat", "bet"],
    ["bet", "bed"],
    ["cat", "cot"],
    ["cot", "cog"],
    ["cog", "dog"],
  ];

  const adjacenyList = new Map();
  words.forEach((word) => addNode(adjacenyList, word));
  rhymingWords.forEach((rhymingPair) => addEdge(adjacenyList, ...rhymingPair));
  console.log(adjacenyList);
};

main();