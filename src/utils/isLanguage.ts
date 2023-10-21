import { Language } from './constants'

export function isLanguage(input: unknown): input is Language {
  return Object.values(Language).includes(input as Language)
}
