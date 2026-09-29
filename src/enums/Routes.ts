export const Routes = {
  Home: '/',
  Favorites: '/favorites',
  CharacterDetail: (id: string) => `/characters/${id}`,
} as const
