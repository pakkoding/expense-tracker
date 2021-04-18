export const _isSelectionList = (key) => {
  const list = new Set(['type'])
  return list.has(key)
}
