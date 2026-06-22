import { defineMock } from 'vite-plugin-mock-dev-server'

import { fail, getUserByToken, readAuthorization, success } from './_utils'

export default defineMock({
  url: '/api/user/info',
  method: 'GET',
  body: ({ headers }) => {
    const authorization = readAuthorization(headers)
    const token = authorization?.replace('Bearer ', '')
    const user = getUserByToken(token)
    if (!user) {
      return fail('登录已失效', 401)
    }
    const userInfo = { ...user }
    delete (userInfo as Partial<typeof userInfo>).password
    return success(userInfo)
  }
})
