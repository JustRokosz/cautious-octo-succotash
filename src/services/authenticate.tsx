import { getAxiosInstance } from '../utils/axiosInstance'
import {
  setToken,
  clearToken,
  setUserFlag,
  clearUserFlag,
  setUsername,
  clearUsername,
  setUserId,
  clearUserId,
} from '../utils/user-storage'

const REGISTER_URL = '/auth/register'
const LOGIN_URL = '/auth/login'
const axiosInstance = getAxiosInstance()

interface AuthInterface {
  onLoginClick: (
    { username, password }: { username: string, password: string }
  ) => Promise<any>,
  onRegisterClick: (
    { username, password, passwordConfirm }: { username: string, password: string, passwordConfirm: string }
  ) => Promise<any>,
  onLogout: () => Promise<any>,
}

export function useAuth(): AuthInterface {
  function onRegisterClick({ username, password, passwordConfirm }: { username: string, password: string, passwordConfirm: string }) {
    async function makeLoginCall() {
      try {
        await axiosInstance({
          url: REGISTER_URL,
          method: 'POST',
          data: { username, password, passwordConfirm },
          headers: { 'Content-Type': 'application/json' },
        })
      } catch (errorResponse: any) {
        console.error('Error occured', errorResponse)
      }
    }

    return makeLoginCall()
  }

  function onLoginClick({ username, password }: { username: string, password: string }) {
    async function makeLoginCall() {
      try {
        await axiosInstance({
          url: LOGIN_URL,
          method: 'POST',
          data: { username, password },
          headers: { 'Content-Type': 'application/json' },
        }).then(response => {
          const { username, id, token } = response.data
          setUserFlag()
          setToken(token)
          setUsername(username)
          setUserId(id)
        })
      } catch (errorResponse: any) {
        console.error('Error occured', errorResponse)
      }
    }

    return makeLoginCall()
  }

  function onLogout() {
    async function makeAuthCall() {
      try {
        await axiosInstance({
          url: LOGIN_URL,
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        })
      } catch (errorResponse: any) {
        console.error('Error occured', errorResponse)
      }
      clearToken()
      clearUserFlag()
      clearUsername()
      clearUserId()
    }

    return makeAuthCall()
  }

  return {
    onLoginClick,
    onRegisterClick,
    onLogout,
  }
}
