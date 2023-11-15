import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import TranslatorApp from './index'

test('Translating function works as expected', async () => {
  const user = userEvent.setup()
  const app = render(<TranslatorApp />)

  const textareaForm = app.getByPlaceholderText('Input text')

  expect(textareaForm).toBeTruthy()

  await user.type(textareaForm, 'Hola mundo!')
  const result = await app.findByDisplayValue(
    /Hello world/i,
    {},
    { timeout: 5000 },
  )

  expect(result).toBeTruthy()
})
