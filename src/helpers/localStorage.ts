export function setInLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function getFromLocalStorage(key: string) {
  return localStorage.getItem(key) ?? undefined;
}
