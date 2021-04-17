export const _isSelectionList = (key) => {
  const list = new Set(['group'])
  return list.has(key)
}
