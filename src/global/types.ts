export type ThemeState = {
  themeName: string,
  setTheme: (newTheme: string) => void
}

export type FullScreenModalState = {
  showModal: boolean,
  setShowModal: (show: boolean) => void
}

export interface NavigationItem {
  link: string,
  messageKey: string,
  component: JSX.Element,
}