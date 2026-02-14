import { clearScreen, displayImage } from "./src/display_image.js";

const main = () => {
  const image = Deno.readFileSync("./data/pedri.png");
  console.log(image);
  displayImage(image);
  setTimeout(() => clearScreen(), 6000);
};

main();
