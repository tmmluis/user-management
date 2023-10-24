const storageKey = 'theme-preference';

export const Theme = {
  LIGHT: 'light',
  DARK: 'dark',
};

type Theme = (typeof Theme)[keyof typeof Theme];

const colorScheme: { value: Theme } = {
  value: getColorPreference(),
};

function getColorPreference() {
  if (localStorage.getItem(storageKey))
    return localStorage.getItem(storageKey) ?? Theme.LIGHT;
  else
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? Theme.DARK
      : Theme.LIGHT;
}

export function getTheme(): Theme {
  return colorScheme.value;
}

export function setTheme(theme: Theme) {
  colorScheme.value = theme;
  setThemePreference();
  return colorScheme.value;
}

export function setThemePreference() {
  localStorage.setItem(storageKey, colorScheme.value);
  reflectPreference();
}

function reflectPreference() {
  document.firstElementChild?.setAttribute('data-theme', colorScheme.value);
}

// synchronization with the system preference
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({ matches: isDark }) => {
    colorScheme.value = isDark ? Theme.DARK : Theme.LIGHT;
    setThemePreference();
  });
