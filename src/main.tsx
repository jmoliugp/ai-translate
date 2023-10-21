import React from 'react'
import ReactDOM from 'react-dom/client'
import TranslatorApp from './TranslatorApp.tsx'
import './index.css'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TranslatorApp />
  </React.StrictMode>
)
