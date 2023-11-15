import { Form } from 'react-bootstrap'
import { AUTO_LENGUAGE, Language, SectionType } from '../../utils/language'
import { FromLanguage } from '../../scenes/TranslatorApp/useTranslate'

// prettier-ignore
type Props =
  | { type: SectionType.From, selectedLanguage: FromLanguage, changeLanguage: (language: FromLanguage) => void }
  | { type: SectionType.To, selectedLanguage: Language, changeLanguage: (language: Language) => void }

export const LanguageSelector: React.FC<Props> = ({
  type,
  changeLanguage,
  selectedLanguage,
}) => {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(event.target.value as Language)
  }

  return (
    <Form.Select
      onChange={onChange}
      value={selectedLanguage}
      aria-label="Select language">
      {type === SectionType.From && (
        <option value={AUTO_LENGUAGE}>Detect language</option>
      )}
      {Object.entries(Language).map(([key, literal]) => {
        return (
          <option key={key} value={key}>
            {literal}
          </option>
        )
      })}
    </Form.Select>
  )
}
