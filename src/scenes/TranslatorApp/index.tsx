import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import { useTranslate } from './useTranslate'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import { SwapArrowsIcon } from '../../components/SwapArrowsIcon'
import {
  AUTO_LENGUAGE,
  SectionType,
  getVoiceLanguage,
} from '../../utils/language'
import { LanguageSelector } from '../../components/LanguageSelector'
import { TextArea } from '../../components/TextArea'
import { useEffect } from 'react'
import { translate } from '../../utils/translate'
import { useDebounce } from './useDebounce'
import { CopyIcon } from '../../components/CopyIcon'
import { SpeakerIcon } from '../../components/SpeakerIcon'

const TranslatorApp: React.FC = () => {
  const { handlers, state } = useTranslate()

  const debouncedFromText = useDebounce(state.fromText)

  useEffect(() => {
    if (debouncedFromText === '') return

    translate({
      fromLanguage: state.fromLanguage,
      text: debouncedFromText,
      toLanguage: state.toLanguage,
    })
      .then(res => {
        if (!res) return

        handlers.setResult(res)
      })
      .catch(error => console.error(error))
  }, [debouncedFromText, state.fromLanguage, state.toLanguage])

  const handleClipboard = () => navigator.clipboard.writeText(state.result)
  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(state.result)
    utterance.lang = getVoiceLanguage(state.toLanguage)
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid>
      <h1>AI Translate</h1>
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              changeLanguage={handlers.setFromLanguage}
              key={'input'}
              selectedLanguage={state.fromLanguage}
              type={SectionType.From}
            />
            <TextArea
              value={state.fromText}
              onChange={handlers.setFromText}
              type={SectionType.From}
            />
          </Stack>
        </Col>

        <Col xs="auto">
          <Button
            disabled={state.fromLanguage === AUTO_LENGUAGE}
            onClick={handlers.interchangeLanguage}
            variant="link">
            <SwapArrowsIcon />
          </Button>
        </Col>

        <Col xs="auto">
          <Stack gap={2}>
            <LanguageSelector
              changeLanguage={handlers.setToLanguage}
              key={'output'}
              selectedLanguage={state.toLanguage}
              type={SectionType.To}
            />
            <TextArea
              value={state.result}
              onChange={handlers.setResult}
              type={SectionType.To}
              loading={state.loading}
            />
            <div className="result-buttons-container">
              <Button variant="link" onClick={handleClipboard}>
                <CopyIcon />
              </Button>
              <Button variant="link" onClick={handleSpeak}>
                <SpeakerIcon />
              </Button>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default TranslatorApp
