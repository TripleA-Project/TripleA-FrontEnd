export const publishedDateHandler = (string) => {
  return string.substring(0, 10);
};

export const newsSourceHandler = (string) => {
  const pattern = /^(.*)\.(com|co\.uk)$/;
  const matches = string.match(pattern);
  if (matches) {
    return matches[1];
  } else {
    return string;
  }
};
