
export const formatDate = (date, sep, newSpe) => {
  if (!date) return null

  const [year, month, day] = date.split(sep)
  return `${month}${newSpe}${day}${newSpe}${year}`
}

export const parseDate = (date, sep, newSpe) => {
  if (!date) return null

  const [month, day, year] = date.split(sep)
  return `${year}${newSpe}${month.padStart(2, '0')}${newSpe}${day.padStart(2, '0')}`
}
