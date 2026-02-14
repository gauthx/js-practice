const toChars = (buff) =>
  buff.reduce((chars, byte) => chars + String.fromCharCode(byte), "");

const ESC_CHAR = "\x1b";

export const displayImage = (imageBuffer) => {
  const chars = toChars(imageBuffer);
  const base64 = btoa(chars);
  /*
Part	     Meaning
ESC_G	    Start Kitty graphics command
q=2	      Transmission type = base64 + full payload
a=T	      Action = transmit & display
f=100	    Format = PNG (100 is PNG in Kitty protocol)
;	        Separator
<base64>	Image bytes
ESC \	    End of command
  */
  const image = `${ESC_CHAR}_Gq=2,a=T,f=100;${base64}${ESC_CHAR}\\`;
  console.log(image);
};

export const clearScreen = () => {
  // ESC[2J ESC[H
  //
  // ESC (\x1b) : Escape character — signals the start of a terminal control sequence
  // [          : Control Sequence Introducer (CSI)
  // 2          : Parameter (mode = 2 → entire screen)
  // J          : Erase in Display — clears the screen buffer
  // ESC[H      : Cursor Position (CUP) — moves cursor to row 1, column 1 (top-left)
  console.log(`${ESC_CHAR}[2J${ESC_CHAR}[H`);
};
