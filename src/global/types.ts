export type StaticParams = {
  lang: string
}

export type ThemeState = {
  theme: string,
  setTheme: (newTheme: string) => void
}

export type FullScreenModalState = {
  showModal: boolean,
  setShowModal: (show: boolean) => void
}