import { Link } from '@/src/i18n/routing'

import idFromTitle from '@/src/global/id-from-title'
import { Section } from '@/src/global/types'

class SectionImpl implements Section {
  readonly id: string;
  readonly title: string;
  readonly level: number;
  readonly parent: SectionImpl | null;
  readonly subSections: Section[];

  constructor(id: string, title: string, level: number, parent: SectionImpl | null) {
    this.id = id
    this.title = title
    this.level = level
    this.parent = parent
    this.subSections = []
  }
}

export default function ContentTable({
  post
} : {
  post: string
}) {
  const headings = getHeadings(post)

  return (
    <nav className='mb-16 flex justify-center'>
      <ul className='bg-mantle py-6 px-12 rounded-2xl'>
        {
          headings.map((heading) => {
            return (
              <li key={heading.id} className={`pl-${4 * (heading.level - 2)}`}>
                <Link href={`#${heading.id}`}
                  className='hover:text-hover-link'>
                  {heading.title}
                </Link>
              </li>
            )
          })
        }
      </ul>
    </nav>
  )
}

const getHeadings = (source: string): Section[] => {
  const regex = /##+.*/g;
  const regMatch = source.match(regex)
  const result: SectionImpl[] = []
  // start with a fake one at level 2, this way the first heading that matches
  // will go into the result array
  let lastHeading: SectionImpl | null = null

  if (regMatch) {
    regMatch.forEach((heading) => {
      const count = countHashes(heading.trim())
      const headingText = heading
        .replace(/##+/, '')
        .trim()
      const section = new SectionImpl(
        idFromTitle(headingText), 
        headingText, count,
        findParentHeading(count, lastHeading)
      )

      lastHeading = section
      result.push(section)
    });
  }

  return result
}

const countHashes = (title: string) => {
  let count = 0
  if (title.length > 0) {
    let index = 0
    let char = title[index]
    while (char === '#') {
      ++count
      ++index
      char = title[index]
    }
  }
  return count
}

const findParentHeading = (level: number, lastHeading: SectionImpl | null) => {
  if (lastHeading === null) {
    return null
  }

  if (lastHeading.level < level) {
    return lastHeading
  }

  if (lastHeading.level === level) {
    return lastHeading.parent
  }

  return findParentHeading(level, lastHeading.parent)
}