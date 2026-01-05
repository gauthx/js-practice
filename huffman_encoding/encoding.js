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


const main = () => {
  const wordToCompress = "lossless";
  const frequencies = dbg.log(
    "Frequencies",
    calculateFrequencies(wordToCompress),
  );
  const nodes = dbg.log(
    "Created and sorted nodes",
    sortNodes(createNodes(frequencies)),
  );
  const tree = buildHuffmanTree(nodes);
  console.log(tree)
};

main();
