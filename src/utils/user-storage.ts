const TOKEN_LS_KEY = 'chat-tok'
const USER_FLAG_LS_KEY = 'chat-uf'
const USERNAME_LS_KEY = 'chat-un'
const USER_ID_LS_KEY = 'chat-uid'
const THREAD_ID_LS_KEY = 'chat-tid'

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_LS_KEY, token)
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_LS_KEY)
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_LS_KEY)
}

export function getUserFlag(): string | null {
  return localStorage.getItem(USER_FLAG_LS_KEY)
}

export function setUserFlag(): void {
  localStorage.setItem(USER_FLAG_LS_KEY, '1')
}

export function isUserFlagSet(): boolean {
  const userFlag = localStorage.getItem(USER_FLAG_LS_KEY)
  return userFlag !== null
}

export function clearUserFlag(): void {
  localStorage.removeItem(USER_FLAG_LS_KEY)
}

export function setUsername(usename: string): void {
  localStorage.setItem(USERNAME_LS_KEY, usename)
}

export function getUsername(): string | null {
  return localStorage.getItem(USERNAME_LS_KEY)
}

export function clearUsername(): void {
  localStorage.removeItem(USERNAME_LS_KEY)
}

export function setUserId(userId: string): void {
  localStorage.setItem(USER_ID_LS_KEY, userId)
}

export function getUserId(): string | null {
  return localStorage.getItem(USER_ID_LS_KEY)
}

export function clearUserId(): void {
  localStorage.removeItem(USER_ID_LS_KEY)
}

export function setThreadId(threadId: string): void {
  localStorage.setItem(THREAD_ID_LS_KEY, threadId)
}

export function getThreadId(): string | null {
  return localStorage.getItem(THREAD_ID_LS_KEY)
}

export function clearThreadIdd(): void {
  localStorage.removeItem(THREAD_ID_LS_KEY)
}
