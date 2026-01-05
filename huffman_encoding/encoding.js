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
  const parentNode = new Node(null, leftChild.freq + rightChild.freq)
  parentNode.left = leftChild;
  parentNode.right = rightChild;
  return parentNode;
}

const buildTree = (nodes) => {

}
