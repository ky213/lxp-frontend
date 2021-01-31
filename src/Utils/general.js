export const orderNumber = number => {
  return number < 10 ? `0${number}` : `${number}`;
};
