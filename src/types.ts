export type Question = {
  a: number
  operator: string
  b: number
  answer: number
}

export type Answer = {
  [key in number]: boolean
}
