const first = (x) => (y) => x;
const second = (x) => (y) => y;

const not = (x) => x(second)(first);
