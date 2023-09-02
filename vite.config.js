import eslint from 'vite-plugin-eslint';

/** @type {import('vite').UserConfig} */
export default {
  plugins: [
    eslint({
      cache: true,
    }),
  ],
};
