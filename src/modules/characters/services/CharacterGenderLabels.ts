const GENDER_LABELS: Record<string, string> = {
  male: 'Мужской',
  female: 'Женский',
  genderless: 'Без пола',
  unknown: 'Неизвестно',
}

export function getGenderLabel(gender: string): string {
  return GENDER_LABELS[gender.toLowerCase()] ?? gender
}
