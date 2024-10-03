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

export interface WithStartAndEnd {
  dateStart: string,
  dateEnd: string,
}

export interface ExperienceData extends WithStartAndEnd {
  title: string,
  companyName: string,
  description: string[]
};

export interface EducationData extends WithStartAndEnd {
  universityName: string,
  description: string[]
};

export function isExperience(data: ExperienceData | EducationData): data is ExperienceData {
  return (data as ExperienceData).title !== undefined
}

export interface Section {
  id: string,
  title: string,
  level: number,
  subSections: Section[]
}

export interface SimpleDate {
  year: number,
  month: number,
  day: number,
}

export interface Post {
  path: string,
  content: string,
  title: string,
  tags: string[],
  publishDate: SimpleDate,
  description: string,
}

export class PageState {
  scrollTop: number
  read: boolean

  constructor(scrollTop: number, read: boolean) {
    this.scrollTop = scrollTop
    this.read = read
  }
}

export type ReadingState = {
  [path: string]: PageState
}

export type Props = {
  params: {
    locale: string,
    slug?: string
  }
}