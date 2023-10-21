import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import { AUTO_LENGUAGE, useTranslate } from './useTranslate'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { SwapArrowsIcon } from '../../components/SwapArrowsIcon'

const TranslatorApp: React.FC = () => {
  const {
    interchangeLanguage,
    setFromLanguage,
    setFromText,
    setResult,
    setToLanguage,
    state,
  } = useTranslate()

  console.log({ state })

  return (
    <Container fluid>
      <div className="App">
        <h1>AI Translate</h1>

        <Row>
          <Col>
            <h2>From</h2>
            {state.fromLanguage}
          </Col>

          <Col>
            <Button
              disabled={state.fromLanguage === AUTO_LENGUAGE}
              onClick={interchangeLanguage}
              variant="link">
              <SwapArrowsIcon />
            </Button>
          </Col>

          <Col>
            <h2>To</h2>
            {state.toLanguage}
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default TranslatorApp
