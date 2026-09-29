export const Routes = {
  Home: '/',
  Characters: '/characters',
  CharacterDetail: (id: string) => `/characters/${id}`,
} as const
