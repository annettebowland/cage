export function fileComparator(a: File, b: File): number {
  let aName = a.name.toLowerCase()
  let bName = b.name.toLowerCase()
  if (aName !== bName) {
    return aName.localeCompare(bName)
  }
  return a.lastModified - b.lastModified
}
