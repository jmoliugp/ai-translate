export enum Language {
  English = 'English',
  Spanish = 'Español',
  German = 'Deutsch',
}

// JavaScript: Language Tags (BCP 47)
// https://www.techonthenet.com/js/language_tags.php#:~:text=BCP%2047%20Language%20Tags%20is,languages%20both%20spoken%20and%20written.
enum VoiceLanguage {
  English = 'en-GB',
  Spanish = 'es-AR',
  German = 'de-CH',
}

export const getVoiceLanguage = (language: Language) => {
  if (language === Language.English) return VoiceLanguage.English
  if (language === Language.Spanish) return VoiceLanguage.Spanish
  if (language === Language.German) return VoiceLanguage.German

  return VoiceLanguage.English
}

export const AUTO_LENGUAGE = 'auto'
export type AutoLenguage = typeof AUTO_LENGUAGE

export enum SectionType {
  From = 'From',
  To = 'To',
}
