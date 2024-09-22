import useContentTable from "@/src/hooks/useContentTable"

export default function ContentTable() {
  const contentTable = useContentTable()
  return (
    <nav>
      <ul>
        {
          contentTable.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.title}</a>
            </li>
        ))}
      </ul>
    </nav>
  )
}