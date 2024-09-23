export default function idFromTitle(title: string) {
  return title.replace(/ /g, "_").toLowerCase()
}
