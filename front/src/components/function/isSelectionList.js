export const _isSelectionList = (key) => {
  const list = new Set(['group', 'type'])
  return list.has(key)
}
