interface AppNavigationState {
  fromApp: true
}

export const FROM_APP_STATE: AppNavigationState = { fromApp: true }

export function isFromApp(state: unknown): boolean {
  return typeof state === 'object' && state !== null && 'fromApp' in state && state.fromApp === true
}
