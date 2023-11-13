import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import { useTranslate } from './useTranslate'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import { SwapArrowsIcon } from '../../components/SwapArrowsIcon'
import { AUTO_LENGUAGE, SectionType } from '../../utils/constants'
import { LanguageSelector } from '../../components/LanguageSelector'
import { TextArea } from '../../components/TextArea'
import { useEffect } from 'react'
import { translate } from '../../utils/translate'
import { useDebounce } from './useDebounce'

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
      .catch(error => {
        console.error('## error: ', JSON.stringify(error))
        console.error('AI_API_TRANSLATION_ERROR')
      })
  }, [debouncedFromText, state.fromLanguage, state.toLanguage])

  return (
    <Container fluid>
      <div className="App">
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
            </Stack>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default TranslatorApp
