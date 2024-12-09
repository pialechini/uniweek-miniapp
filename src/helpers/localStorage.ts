function setInLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

function getFromLocalStorage(key: string) {
  return localStorage.getItem(key) ?? undefined;
}

export { setInLocalStorage, getFromLocalStorage };
