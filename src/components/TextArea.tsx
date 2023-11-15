import { Form } from 'react-bootstrap'
import { SectionType } from '../utils/language'

// prettier-ignore
type Props =
  | { type: SectionType.From, loading?: undefined, onChange: (value: string) => void, value: string }
  | { type: SectionType.To, loading?: boolean, onChange: (value: string) => void, value: string }

const commonStyle = { border: 0, height: '200px', resize: 'none' }
const fromStyle = { ...commonStyle }
const toStyle = { ...commonStyle }

const getPlaceHolder = (type: SectionType, loading: boolean) => {
  if (type === SectionType.From) return 'Input text'
  if (loading) return 'Loading...'
  return 'Translation'
}

export const TextArea: React.FC<Props> = ({
  loading,
  onChange,
  type,
  value,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      value={value}
      onChange={handleChange}
      loading
      as="textarea"
      autoFocus={type === SectionType.From}
      placeholder={getPlaceHolder(type, !!loading)}
      disabled={type === SectionType.To}
      // Not recgonizing 'resize' but it works, maybe an issue on 'react-bootstrap' on TS typing.
      // @ts-ignore
      style={type === SectionType.From ? fromStyle : toStyle}
    />
  )
}
