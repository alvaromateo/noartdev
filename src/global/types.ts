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