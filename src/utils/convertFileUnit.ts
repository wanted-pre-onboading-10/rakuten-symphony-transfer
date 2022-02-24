export const convertFileUnit = (byte: number) => {
  let result = "";
  if (isNaN(byte)) {
    throw new TypeError("Invalid number(file size)");
  }

  if (byte === 0) result = "0.00KB";
  else if (byte < 1024) result = `${byte}.00B`;
  else if (byte < 1024 ** 2) {
    result = getRefinedNumber(byte, 1, "KB");
  } else if (byte < 1024 ** 3) {
    result = getRefinedNumber(byte, 2, "MB");
  } else if (byte < 1024 ** 4) {
    result = getRefinedNumber(byte, 3, "GB");
  } else if (byte < 1024 ** 5) {
    result = getRefinedNumber(byte, 4, "TB");
  }
  return result;
};

export const getRefinedNumber = (
  target: number,
  exponentiation: number,
  suffix: string,
) => {
  const calculatedByte = (target / 1024 ** exponentiation).toFixed(2);
  const result = calculatedByte + suffix;
  return result;
};
