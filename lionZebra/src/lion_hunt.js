const isLonely = (savannah) =>
  !savannah.includes("L") || !savannah.includes("Z");

const shortestOf = (distance1, distance2) =>
  distance1 < distance2 ? distance1 : distance2;

const isLion = (char) => char === "L";
const isZebra = (char) => char === "Z";

export const calculateShortestPath = (inputString) => {
  const savannah = [...inputString];
  if (isLonely(savannah)) {
    return -1;
  }

  let lion = null;
  let zebra = null;
  let shortestPath = 0;

  for (let index = 0; index < savannah.length; index++) {
    const entity = savannah[index];
    lion = isLion(entity) ? index : lion;
    zebra = isZebra(entity) ? index : zebra;

    if (lion && zebra) {
      const distance = Math.abs(lion - zebra);
      shortestPath = shortestOf(shortestPath, distance);
    }
  }

  return shortestPath;
};
