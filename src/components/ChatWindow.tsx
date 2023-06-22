import { useEffect, useRef, useState } from 'react'
import * as Yup from 'yup'
import {
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { useParams } from 'react-router-dom'
import { Field, Formik, Form } from 'formik'
import { io } from 'socket.io-client'

import { useChatEngine } from '../services/chatEngine'
import { getThreadId, getToken, getUserFlag, setThreadId } from '../utils/user-storage'

const wsEnvUrl = import.meta.env.VITE_WS_URL as string

const token = getToken()
const socket = io(wsEnvUrl, {
  reconnection: false,
  withCredentials: true,
  auth: {
    token
  },
  transports: ['websocket'],
  path: '/socket/',
  query: {
    thread: getThreadId(),
  },
})

interface Message {
  id: string,
  content: string,
  sender: string,
  user: { id: number, username: string }
}

export const ChatWindow = () => {
  const messagesWindow = useRef(null)
  const [messages, setMessages] = useState(Array<Message>)
  const [connected, setIsConnected] = useState(false)
  const urlParams = useParams()
  const validationSchema = Yup.object({
    comment: Yup.string().required(''),
  })

  useEffect(() => {
    messagesWindow.current && messagesWindow.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
  }, [messages])

  const threadId = Number(urlParams.threadId)
  setThreadId(threadId + '')

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.on('message', (message) => {
      setMessages(messages => {
        const currentMessages = messages.slice()
        currentMessages.push(message)
        return currentMessages
      })
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [])

  const chatEngine = useChatEngine()
  const sendMessageClick = (
    { comment }: { comment: string },
    { setSubmitting, resetForm }: {
      setSubmitting: (val: boolean) => void,
      resetForm: () => void,
    },
  ) => {
    setSubmitting(true)
    try {
      chatEngine.onSendMessageClick({
        threadId: threadId,
        content: comment,
      }).then(() => {
        setSubmitting(false)
        resetForm()
      })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    try {
      chatEngine.onRequestMessages({ threadId })
        .then((response: any) => setMessages(response))
    } catch (e) {
      console.log(e)
    }
  }, [threadId])

  useEffect(() => {
    socket.io.opts.query.thread = threadId
    socket.disconnect().connect()
  }, [threadId])

  useEffect(() => {
    return () => {
      socket.disconnect()
    }
  })

  return (
    <div className="flex flex-col max-h-full">
      <div className="flex-shrink overflow-x-hidden">
        <ul role="list" className="-mb-8 overflow-x-auto flex flex-col" ref={messagesWindow}>
          {messages && messages.map(
            (message: Message) => (
              <li key={message.id}>
                <div className="relative pb-8">
                  <>
                    <div className="relative flex items-start space-x-3">
                      <div className="relative px-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                          <UserCircleIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                        </div>
                      </div>
                      <div className="relative flex items-start space-x-3">
                        <div className="min-w-0 flex-1">
                          <div className="min-w-0 flex-1 py-1.5">
                            <div className="text-sm text-gray-500">
                              <span className="font-medium text-gray-900">
                                {message.user.username}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-gray-700">
                            <p>{message.content}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                </div>
              </li>
            ))}
        </ul>
      </div>

      <div className="flex items-start space-x-4 pt-4 flex-1">
        <div className="min-w-0 flex-1">
          <Formik
            initialValues={{ comment: '' }}
            onSubmit={sendMessageClick}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => (
              <div className="relative overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                <Form>
                  <Field
                    as="textarea"
                    type="textarea"
                    rows={3}
                    name="comment"
                    id="comment"
                    className="block w-full resize-none border-0 py-3 focus:ring-0 sm:text-sm outline-0"
                    placeholder="Add your comment..."
                  />

                  <div className="py-2" aria-hidden="true">
                    <div className="py-px">
                      <div className="h-9" />
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                    <div className="flex-shrink-0">
                      <button
                        type="submit"
                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        disabled={isSubmitting}
                        name="submit-comment"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div >
      </div>
    </div>
  )
}
