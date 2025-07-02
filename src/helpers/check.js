export function check(data, idCol) {
  return data[0]?.[idCol] !== undefined
}
