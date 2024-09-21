'use client'

import { useEffect, useState } from "react";
import { ContentTable, Section } from "@/src/global/types";

const useContentTable = () => {
  const [contentTable, setContentTable] = useState<ContentTable>([])

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll('h2, h3, h4')
    ) as HTMLHeadingElement[]

    const newIndex = getContentTable(headingElements)
    setContentTable(newIndex)
  }, [])

  return contentTable
};

class SectionImpl implements Section {
  readonly id: string;
  readonly title: string;
  readonly subSections: Section[];

  constructor(id: string, title: string) {
    this.id = id
    this.title = title
    this.subSections = []
  }
}

const getContentTable = (headings: HTMLHeadingElement[]) : ContentTable => {
  const table: ContentTable = []
  let currentParent: null | Section

  headings.forEach(heading => {
    const section = new SectionImpl(heading.id, heading.innerText)
    switch (heading.nodeName.toLowerCase()) {
      case 'h2':
        // main heading, goes directly to he content table array
        table.push(section)
        break
      case 'h3':
      case 'h4':
        // sub-heading, goes as child of the currentParent
        currentParent?.subSections.push(section)
        break
      default:
        console.error('Queried for headings, but found: ', section)
        break
    }
    currentParent = section
  })

  return table
}

export default useContentTable