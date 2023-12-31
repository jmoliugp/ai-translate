import { useReducer } from 'react'
import { AUTO_LENGUAGE, AutoLenguage, Language } from '../../utils/language'

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
  fromLanguage: AUTO_LENGUAGE,
  toLanguage: Language.English,
  fromText: '',
  result: '',
  loading: false,
}

function reducer(state: State, action: Action): State {
  const { type } = action

  if (type === TranslatorAction.InterchangeLanguage) {
    if (state.fromLanguage === 'auto') return { ...state }

    const loading = state.fromText !== ''

    return {
      ...state,
      loading,
      fromLanguage: state.toLanguage,
      result: '',
      toLanguage: state.fromLanguage,
    }
  }

  if (type === TranslatorAction.SetFromLanguage) {
    if (state.fromLanguage === action.payload) return state

    const loading = state.fromText === ''

    return {
      ...state,
      loading,
      fromLanguage: action.payload,
      result: '',
    }
  }

  if (type === TranslatorAction.SetToLanguage) {
    if (state.toLanguage === action.payload) return state

    const loading = state.fromText === ''

    return {
      ...state,
      loading,
      toLanguage: action.payload,
      result: '',
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

  const handlers = {
    interchangeLanguage: () =>
      dispatch({
        type: TranslatorAction.InterchangeLanguage,
      }),
    setToLanguage: (language: Language) =>
      dispatch({
        type: TranslatorAction.SetToLanguage,
        payload: language,
      }),
    setFromLanguage: (language: FromLanguage) =>
      dispatch({
        type: TranslatorAction.SetFromLanguage,
        payload: language,
      }),
    setFromText: (fromText: string) =>
      dispatch({
        type: TranslatorAction.SetFromText,
        payload: fromText,
      }),
    setResult: (text: string) =>
      dispatch({
        type: TranslatorAction.SetResult,
        payload: text,
      }),
  }

  return {
    handlers,
    state,
  }
}
