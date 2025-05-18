import {api} from '../api'

export const COOKIES = {
  authToken: 'token'
}

const login = async (userLogin) => {
  try {
    const res = await api('POST', 'signin', userLogin)

    return res

  } catch (error) {
    console.log('🚀 ~ file: login.js ~ line 15 ~ error', error)
  }
}

export default login
