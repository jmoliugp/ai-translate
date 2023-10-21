import { useReducer } from 'react'

export enum Language {
  Auto = 'auto',
  English = 'en',
  Spanish = 'es',
  German = 'de',
}
type AutoLenguage = 'auto'

export type FromLanguage = Language | AutoLenguage
export type ToLanguage = Language

export enum TranslatorAction {
  InterchangeLanguage = 'InterchangeLanguage',
  SetFromLanguage = 'SetFromLanguage',
  SetToLanguage = 'SetToLanguage',
  SetFromText = 'SetFromText',
  SetResult = 'SetResult',
}

interface State {
  fromLanguage: FromLanguage
  toLanguage: ToLanguage
  fromText: string
  result: string
  loading: boolean
}

type Action =
  | { type: TranslatorAction.InterchangeLanguage }
  | { type: TranslatorAction.SetFromLanguage; payload: FromLanguage }
  | { type: TranslatorAction.SetToLanguage; payload: ToLanguage }
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

  if (type === TranslatorAction.InterchangeLanguage) {
    if (state.fromLanguage === 'auto') return { ...state }

    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    }
  }

  if (type === TranslatorAction.SetFromLanguage) {
    return {
      ...state,
      fromLanguage: action.payload,
    }
  }

  if (type === TranslatorAction.SetToLanguage) {
    return {
      ...state,
      toLanguage: action.payload,
    }
  }

  if (type === TranslatorAction.SetFromText) {
    return {
      ...state,
      loading: true,
      fromText: action.payload,
      result: '',
    }
  }

  if (type === TranslatorAction.SetResult) {
    return {
      ...state,
      loading: false,
      result: action.payload,
    }
  }

  return { ...state }
}

export const useTranslate = () => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState,
  )

  const interchangeLanguage = () =>
    dispatch({
      type: TranslatorAction.InterchangeLanguage,
    })
  const setToLanguage = (language: Language) =>
    dispatch({
      type: TranslatorAction.SetToLanguage,
      payload: language,
    })
  const setFromLanguage = (language: Language) =>
    dispatch({
      type: TranslatorAction.SetFromLanguage,
      payload: language,
    })
  const setFromText = (fromText: string) =>
    dispatch({
      type: TranslatorAction.SetFromText,
      payload: fromText,
    })
  const setResult = (text: string) =>
    dispatch({
      type: TranslatorAction.SetResult,
      payload: text,
    })

  return {
    interchangeLanguage,
    setFromLanguage,
    setFromText,
    setResult,
    setToLanguage,
    state,
  }
}
