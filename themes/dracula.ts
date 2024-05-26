import { Theme } from 'tailwindcss-theming/dist/api';

const dracula = new Theme()
  .setName('dracula')
  .targetable()
  .addColors({
    sun: '#717171',
    moon: '#717171',
    sparkles: '#717171',
    background: {
      light: '#',
      DEFAULT: '#f1f1f1',
      dark: '',
    },
    'on-background': 'black',
  });

export default dracula;