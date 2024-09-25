export default function uniq<T extends Object>(array: T[]) : T[] {
  const seen : {
    [key: string]: boolean
  } = {}
  const out : T[] = []
  const len = array.length

  for(let i = 0; i < len; i++) {
    const item = array[i]
    const key = item.toString()
    if (!seen[key]) {
          seen[key] = true
          out.push(item)
    }
  }

  return out;
}
