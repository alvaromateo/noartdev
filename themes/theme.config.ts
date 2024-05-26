import { Theme, ThemeManager } from 'tailwindcss-theming/dist/api';

import catppuccin_latte from './catppuccin_latte';
import dracula from './dracula';

const themeManager = new ThemeManager()
  .setDefaultTheme(new Theme())
  .addTheme(catppuccin_latte)
  .addTheme(dracula);

export default themeManager;