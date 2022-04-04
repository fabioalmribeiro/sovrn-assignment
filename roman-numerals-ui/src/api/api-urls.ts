const apiUrls = {
  allNumerals: 'numerals/all',
  numeral: 'numerals/:type/:inputValue',
  removeAllNumerals: 'numerals/remove'
};

export const replaceUrl = (url: string, obj: Record<string, string>) => {
  const pattern = /:[\w]+/ig; // :property
  return url.replace(pattern, (token) => obj[token.substring(1)] || '');
};

export default apiUrls;
