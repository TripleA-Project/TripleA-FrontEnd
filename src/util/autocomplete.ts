export function isSymbolKeyword(keyword: string) {
  const regex = new RegExp(`^[a-zA-Z]{1,${keyword.length}}$`, 'g');

  return regex.test(keyword);
}

export function isCategoryKeyword(keyword: string) {
  const regex = new RegExp(`^[가-힣\/ ]{1,${keyword.length}}$`, 'g');

  return regex.test(keyword);
}

export function getRecentSearchLocalStorage(): string[] | null {
  const recentSearch = localStorage.getItem('recent');

  return recentSearch ? JSON.parse(recentSearch) : null;
}

export function setRecentSearchLocalStorage(value: string) {
  const recentSearch = getRecentSearchLocalStorage();

  if (recentSearch?.find((history) => history === value)) {
    localStorage.setItem('recent', JSON.stringify([value, ...recentSearch.filter((history) => history !== value)]));

    return;
  }

  if (!recentSearch) {
    localStorage.setItem('recent', JSON.stringify([value]));

    return;
  }

  if (recentSearch.length >= 10) {
    recentSearch.pop();
    localStorage.setItem('recent', JSON.stringify([value, ...recentSearch]));

    return;
  }

  recentSearch.push(value);
  localStorage.setItem('recent', JSON.stringify(recentSearch));
}

export function deleteRecentSearchLocalStorage(idx?: number) {
  if (idx === undefined) {
    localStorage.removeItem('recent');

    return;
  }

  const recentSearch = getRecentSearchLocalStorage();

  if (!recentSearch) return;

  recentSearch.splice(idx, 1);

  if (!recentSearch.length) {
    localStorage.removeItem('recent');

    return;
  }

  localStorage.setItem('recent', JSON.stringify(recentSearch));
}
