export const TICK = 350
export const LENGTH = 25

export function gaussian (i) {
  const variance = 0.6
  const shift = 2
  const x = (shift * 2 * i) / (LENGTH - 1) - shift
  return Math.exp(-Math.pow(x, 2) / (2 * variance)) / Math.sqrt(2 * Math.PI * variance)
}

export const createGUID = (): string => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }

  return `${s4()}${s4()}${s4()}${s4()}${s4()}${s4()}${s4()}${s4()}`
}

export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
export const random = (min: number, max: number): number => {
  return min + Math.random() * max
}
