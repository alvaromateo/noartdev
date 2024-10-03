export class AppSettings {
  public static mobileBreakpoint = 768
  public static logoSize = 48
  public static logoSizeMobile = 32
  public static defaultLocale = 'en'
  public static defaultTheme = 'catppuccin_macchiato'
  public static darkTheme = this.defaultTheme
  public static lightTheme = 'catppuccin_latte'
  public static recentLinksNum = 5
  public static blogURL = '/blog'
}

export const languageProficiencyLevels: { [key: string]: string } = {
  'es': 'native',
  'cat': 'native',
  'gb': 'proficient',
  'it': 'intermediate',
  'fr': 'beginner'
}

export function linkToMessageKey(link: string) {
  switch (link) {
    case '/home':
      return 'home'
    case '/about':
      return 'about'
    case '/projects':
      return 'projects'
    case '/blog': 
      return 'blog'
    case '/hobbies':
      return 'hobbies'
    default:
      return null
  }
}