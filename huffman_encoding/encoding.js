const calculateFrequencies = (word) => {
  const frequencies = {};
  for (const letter of word) {
    frequencies[letter] = (frequencies[letter] + 1) || 1;
  }
  return frequencies;
};

const createNode = (char, freq) => ({
  char,
  freq,
  right: null,
  left: null,
});

const createNodes = (frequencies) => {
  const nodes = [];
  for (const frequency in frequencies) {
    const letter = frequency;
    const occurence = frequencies[frequency];
    nodes.push(createNode(letter, occurence));
  }
  return nodes;
};

const sortNodes = (nodes) => nodes.sort((a, b) => a.freq - b.freq);

const mergeNodes = (leftChild, rightChild) => {
  const parentNode = createNode(null, leftChild.freq + rightChild.freq);
  parentNode.left = leftChild;
  parentNode.right = rightChild;
  return parentNode;
};

const buildHuffmanTree = (nodes) => {
  const [leftLeaf, rightLeaf, ...restOfNodes] = nodes;
  let root = mergeNodes(leftLeaf, rightLeaf);

  for (const node of restOfNodes) {
    root = mergeNodes(node, root);
  }
  return root;
};

const generateHuffmanCodes = (tree, huffmanCodes = {}, depth = "") => {
  if (tree.right == null) {
    huffmanCodes[tree.char] = depth;
    return huffmanCodes;
  }
  const letter = tree.left.char;
  const code = depth + "0";
  huffmanCodes[letter] = code;

  return generateHuffmanCodes(tree.right, huffmanCodes, depth + "1");
};

const displayUTFRepresentation = (word) => {
  console.log("Word :", word);
  const UTFCodes = [];
  for (const letter of word) {
    UTFCodes.push(letter.charCodeAt().toString(2));
  }
  console.log("UTF Representation :", UTFCodes.join(" "));
};

const compress = (word, codes) => {
  const compressedBits = [];
  for (const letter of word) {
    compressedBits.push(codes[letter]);
  }
  return compressedBits;
};

const displayCompressedWord = (compressed, codes) => {
  console.table(codes);

  console.log("Compressed Bits: ", compressed.join(" "));
};

const main = () => {
  const wordToCompress = "lossless";
  const frequencies = calculateFrequencies(wordToCompress);
  const nodes = sortNodes(createNodes(frequencies));
  const tree = buildHuffmanTree(nodes);
  const codes = generateHuffmanCodes(tree);

  const compressed = compress(wordToCompress, codes);
  displayUTFRepresentation(wordToCompress);
  displayCompressedWord(compressed, codes);
};

main();
