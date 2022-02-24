export const isSvgLink = (url: string) => {
  if (!url) return null;
  const urlArr = url.split(".");
  const fileFormat = urlArr[urlArr.length - 1];

  return fileFormat === "svg";
};

export const getSvgFileName = (url: string) => {
  if (!url) return null;
  const urlArr = url.split("/");
  const fileName = urlArr[urlArr.length - 1];
  return fileName;
};
