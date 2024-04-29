type Draft<T> = Omit<T, 'id'> & { id?: string }

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
  quantity: number
}
