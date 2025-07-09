export const PREFIX = '404cache_';

export const getItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(`${PREFIX}${key}`);
    return item ? JSON.parse(item) as T : null;
  } catch {
    return null;
  }
};

export const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
  } catch {
    // ignore write errors
  }
};

export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(`${PREFIX}${key}`);
  } catch {
    // ignore
  }
};
