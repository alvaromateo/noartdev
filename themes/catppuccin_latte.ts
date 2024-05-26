import { Theme } from 'tailwindcss-theming/dist/api';

const catppuccin_latte = new Theme()
  .setName('catppuccin_latte')
  .targetable()
  .addColors({
    sun: '#717171',
    moon: '#717171',
    sparkles: '#717171',
    background: '#f1f1f1',
    'on-background': 'black',
  });

export default catppuccin_latte;