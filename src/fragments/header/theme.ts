const storageKey = 'theme-preference';

function getColorPreference() {
  if (localStorage.getItem(storageKey))
    return localStorage.getItem(storageKey) ?? 'light';
  else
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
}

const theme = {
  value: getColorPreference(),
};

// synchronization with the system preference
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({ matches: isDark }) => {
    theme.value = isDark ? 'dark' : 'light';
    setThemePreference();
  });

function reflectPreference() {
  document.firstElementChild?.setAttribute('data-theme', theme.value);
  document
    .querySelector(`[data-color="${theme.value}"]`)
    ?.classList.add('active');
}

export function handleThemeChange(button: Element) {
  document.querySelector('.theme-button.active')?.classList.remove('active');
  button.classList.add('active');
  theme.value = button.getAttribute('data-color')!;
  setThemePreference();
}

export function setThemePreference() {
  localStorage.setItem(storageKey, theme.value);
  reflectPreference();
}
