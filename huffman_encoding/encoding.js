const calculateFrequencies = (word) => {
  const frequencies = {};
  for (const letter of word) {
    frequencies[letter] = (frequencies[letter] + 1) || 1;
  }
  return frequencies;
};

