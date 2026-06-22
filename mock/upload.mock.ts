import { defineMock } from 'vite-plugin-mock-dev-server'

import { success } from './_utils'

export default defineMock({
  url: '/api/upload',
  method: 'POST',
  body: () => {
    return success({
      url: 'https://example.com/mock-file.png',
      filename: 'mock-file.png'
    })
  }
})
