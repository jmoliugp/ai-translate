import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useReducer } from 'react'

export enum Language {
  Auto = 'auto',
  English = 'en',
  Spanish = 'es',
}

export enum TranslatorAction {
  InterchangeLanguage = 'InterchangeLanguage',
  SetFromLanguage = 'SetFromLanguage',
  SetToLanguage = 'SetToLanguage',
  SetFromText = 'SetFromText',
  SetResult = 'SetResult',
}

interface State {
  fromLanguage: Language
  toLanguage: Language
  fromText: string
  result: string
  loading: boolean
}

type Action =
  | { type: TranslatorAction.InterchangeLanguage }
  | { type: TranslatorAction.SetFromLanguage; payload: Language }
  | { type: TranslatorAction.SetToLanguage; payload: Language }
  | { type: TranslatorAction.SetFromText; payload: string }
  | { type: TranslatorAction.SetResult; payload: string }

const initialState: State = {
  fromLanguage: Language.Auto,
  toLanguage: Language.English,
  fromText: '',
  result: '',
  loading: false,
}

function reducer(state: State, action: Action): State {
  const { type } = action

  if (type === TranslatorAction.InterchangeLanguage)
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    }

  if (type === TranslatorAction.SetFromLanguage)
    return {
      ...state,
      fromLanguage: action.payload,
    }

  if (type === TranslatorAction.SetToLanguage)
    return {
      ...state,
      toLanguage: action.payload,
    }

  if (type === TranslatorAction.SetFromText)
    return {
      ...state,
      loading: true,
      fromText: action.payload,
      result: '',
    }

  if (type === TranslatorAction.SetResult)
    return {
      ...state,
      loading: false,
      result: action.payload,
    }

  return { ...state }
}

export const useTranslateReducer = () => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState,
  )

  return { state, dispatch }
}
