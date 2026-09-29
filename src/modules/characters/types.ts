export interface Character {
  id: string
  name: string
  status: string
  species: string
  image: string
}

export interface CharactersPageInfo {
  pages: number
  next: number | null
  prev: number | null
}
