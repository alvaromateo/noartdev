import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'base': 'rgb(var(--color-base) / <alpha-value>)',
      'mantle': 'rgb(var(--color-mantle) / <alpha-value>)',
      'crust': 'rgb(var(--color-crust) / <alpha-value>)',
      'surface-0': 'rgb(var(--color-surface-0) / <alpha-value>)',
      'surface-1': 'rgb(var(--color-surface-1) / <alpha-value>)',
      'surface-2': 'rgb(var(--color-surface-2) / <alpha-value>)',
      'overlay-0': 'rgb(var(--color-overlay-0) / <alpha-value>)',
      'overlay-1': 'rgb(var(--color-overlay-1) / <alpha-value>)',
      'overlay-2': 'rgb(var(--color-overlay-2) / <alpha-value>)',
      // text over previous surfaces (except overlays)
      'text': 'rgb(var(--color-text) / <alpha-value>)',
      'title': 'rgb(var(--color-title) / <alpha-value>)',
      'subtitle': 'rgb(var(--color-subtitle) / <alpha-value>)',
      'success': 'rgb(var(--color-success) / <alpha-value>)',
      'info': 'rgb(var(--color-info) / <alpha-value>)',
      'warning': 'rgb(var(--color-warning) / <alpha-value>)',
      'error': 'rgb(var(--color-error) / <alpha-value>)',
      // selection
      'selection-bg': 'rgb(var(--color-selection-bg) / <alpha-value>)', // with opacity
      'selection-text': 'rgb(var(--color-selection-text) / <alpha-value>)',
      // links
      'link': 'rgb(var(--color-link) / <alpha-value>)',
      'followed-link': 'rgb(var(--color-followed-link) / <alpha-value>)',
      'hover-link': 'rgb(var(--color-hover-link) / <alpha-value>)',
      // code snippets
      'snippet-bg': 'rgb(var(--color-snippet-bg) / <alpha-value>)',
      'keyword': 'rgb(var(--color-keyword) / <alpha-value>)',
      'string': 'rgb(var(--color-string) / <alpha-value>)',
      'regex': 'rgb(var(--color-regex) / <alpha-value>)',
      'comment': 'rgb(var(--color-comment) / <alpha-value>)',
      'number': 'rgb(var(--color-number) / <alpha-value>)',
      'constant': 'rgb(var(--color-constant) / <alpha-value>)',
      'operator': 'rgb(var(--color-operator) / <alpha-value>)',
      'delimiter': 'rgb(var(--color-delimiter) / <alpha-value>)',
      'function': 'rgb(var(--color-function) / <alpha-value>)',
      'parameter': 'rgb(var(--color-parameter) / <alpha-value>)'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  variants: {},
  plugins: [
  ],
}

export default config
