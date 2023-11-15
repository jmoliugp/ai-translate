import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from 'openai'
import { FromLanguage } from '../scenes/TranslatorApp/useTranslate'
import { AUTO_LENGUAGE, Language } from './language'

const OPEN_AI_API_KEY = 'XXXXXXXX'

// TODO: Migrate it to a server!
const configuration = new Configuration({
  apiKey: OPEN_AI_API_KEY,
})
const openai = new OpenAIApi(configuration)

interface Input {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}

function concatenateSentences(strings: string[]): string {
  return strings.join('. ') + '.'
}

const translatorPromptRules = [
  'You are AI in charge of translating text',
  'For every input you receive limit yourself to ONLY translate it',
  'The original language is surrounded by `{{` and `}}`',
  'You can also receive {{auto}} which means that you have to detect the language',
  'You can translate to any language',
  'The laguage you translate is surrounded by `[[` and `]]`',
]
const content = concatenateSentences(translatorPromptRules)

const Role = ChatCompletionRequestMessageRoleEnum

export async function translate({ fromLanguage, text, toLanguage }: Input) {
  if (fromLanguage === toLanguage) return text

  const messages = [
    {
      role: Role.System,
      content,
    },
    {
      role: Role.User,
      content: `Hola mundo {{${Language.Spanish}}} [[${Language.English}]]`,
    },
    {
      role: Role.Assistant,
      content: `Hello world`,
    },
    {
      role: Role.User,
      content: `How are you? {{${AUTO_LENGUAGE}}} [[${Language.German}]]`,
    },
    {
      role: Role.Assistant,
      content: `Wie geht es dir?`,
    },
    {
      role: Role.User,
      content: `Bom Dia como está? {{${AUTO_LENGUAGE}}} [[${Language.English}]]`,
    },
    {
      role: Role.Assistant,
      content: `Good morning, how are you?`,
    },
  ]

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      ...messages,
      {
        role: Role.User,
        content: `${text} {{${fromLanguage}}} [[${toLanguage}]]`,
      },
    ],
  })

  return completion.data.choices[0].message?.content
}
