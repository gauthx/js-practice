import { dbg } from "./dbg.js";

const calculateFrequencies = (word) => {
  const frequencies = {};
  for (const letter of word) {
    frequencies[letter] = (frequencies[letter] + 1) || 1;
  }
  return frequencies;
};

class Node {
  constructor(char, freq) {
    this.char = char;
    this.freq = freq;
    this.right = null;
    this.left = null;
  }
}

const createNodes = (frequencies) => {
  const nodes = [];
  for (const frequency in frequencies) {
    nodes.push(new Node(frequency, frequencies[frequency]));
  }
  return nodes;
};

const sortNodes = (nodes) => nodes.sort((a, b) => b.freq - a.freq);

const mergeNodes = (leftChild, rightChild) => {
  const parentNode = new Node(null, leftChild.freq + rightChild.freq);
  parentNode.left = leftChild;
  parentNode.right = rightChild;
  return parentNode;
};

const buildHuffmanTree = (nodes) => {
  let root = mergeNodes(nodes.pop(), nodes.pop());

  for (let index = nodes.length - 1; index >= 0; index--) {
    const leftChild = nodes[index];
    root = mergeNodes(leftChild, root);
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

const displayCompressedWord = (word, codes) => {
  console.log("Word to compress: ", word)
  console.table(codes);
  const compressedBits = [];
  for (const letter of word) {
    compressedBits.push(codes[letter]);
  }
  console.log(compressedBits.join(" "));
};

const main = () => {
  const wordToCompress = "lossless";
  const frequencies = calculateFrequencies(wordToCompress);
  const nodes = sortNodes(createNodes(frequencies));
  const tree = buildHuffmanTree(nodes);
  const codes = generateHuffmanCodes(tree);
  displayCompressedWord(wordToCompress, codes);
};

main();
