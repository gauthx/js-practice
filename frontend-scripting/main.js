window.onload = () => {
  const pElement = document.createElement("p");
  pElement.textContent = "created p element";
  const clonedP = pElement.cloneNode().textContent = "cloned p";
  
  document.body.append(pElement, clonedP);
};
