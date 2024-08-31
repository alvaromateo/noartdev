export type StaticParams = {
  lang: string
}

export interface ThemeState {
  theme: string,
  setTheme: (newTheme: string) => void
}