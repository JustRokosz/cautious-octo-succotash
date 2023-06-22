import { getAxiosInstance } from '../utils/axiosInstance'
import { getUserId } from '../utils/user-storage'

const USERS_URL = '/users'
const THREADS_URL = '/threads'
const axiosInstance = getAxiosInstance()

interface ChatEngineInterface {
  onRequestUsersList: () => any,
  onCreateThreadClick: ({ name, participantId }: { name: string, participantId: number }) => Promise<any>,
  onRequestThreadsList: () => any,
  onSendMessageClick: ({ threadId, content }: { threadId: number, content: string }) => Promise<any>,
  onRequestMessages: ({ threadId }: { threadId: number }) => any,
}

export function useChatEngine(): ChatEngineInterface {
  async function onRequestUsersList() {
    try {
      const response = await axiosInstance({
        url: USERS_URL,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const filteredResponse = response.data.filter(
        (item: { id: number, username: string }) => item.id !== Number(getUserId())
      )
      return filteredResponse
    } catch (errorResponse: any) {
      console.error('Error occured', errorResponse)
    }
  }

  async function onCreateThreadClick({ name, participantId }: { name: string, participantId: number }) {
    try {
      const response = await axiosInstance({
        url: THREADS_URL,
        method: 'POST',
        data: { name, participantId },
        headers: { 'Content-Type': 'application/json' },
      })

      return response.data
    } catch (errorResponse: any) {
      console.error('Error occured', errorResponse)
    }
  }

  async function onRequestThreadsList() {
    try {
      const response = await axiosInstance({
        url: THREADS_URL,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      return response.data
    } catch (errorResponse: any) {
      console.error('Error occured', errorResponse)
    }
  }

  async function onSendMessageClick({ threadId, content }: { threadId: number, content: string }) {
    try {
      const response = await axiosInstance({
        url: `${THREADS_URL}/${threadId}/messages`,
        method: 'POST',
        data: { content },
        headers: { 'Content-Type': 'application/json' },
      })

      return response.data
    } catch (errorResponse: any) {
      console.error('Error occured', errorResponse)
    }
  }

  async function onRequestMessages({ threadId }: { threadId: number }) {
    try {
      const response = await axiosInstance({
        url: `${THREADS_URL}/${threadId}/messages`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      return response.data
    } catch (errorResponse: any) {
      console.error('Error occured', errorResponse)
    }
  }

  return {
    onRequestUsersList,
    onCreateThreadClick,
    onRequestThreadsList,
    onSendMessageClick,
    onRequestMessages,
  }
}
