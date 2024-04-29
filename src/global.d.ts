type RequireOnly<T, P extends keyof T> = Pick<T, P> & Partial<Omit<T, P>>

type Filament = {
  id: string
  name: string
  price: number
}

type Printer = {
  id: string
  name: string
  power: number
}

type Print = {
  id: string
  name: string
  printer: string
  filament: string
  weight: number
  time: number
}
