import en from '../../../messages/en.json'
import { ExperienceData, EducationData } from './custom'
 
type Messages = typeof en
 
declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}