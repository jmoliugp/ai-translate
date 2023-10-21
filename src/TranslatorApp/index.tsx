import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import { Language, useTranslate } from './useTranslate'

const TranslatorApp: React.FC = () => {
  const { setFromLanguage, state } = useTranslate()

  console.log({ state })

  return (
    <div className="App">
      <h1>AI Translate</h1>
      <button onClick={() => setFromLanguage(Language.Spanish)}>
        Cambiar a Español
      </button>
    </div>
  )
}

export default TranslatorApp
