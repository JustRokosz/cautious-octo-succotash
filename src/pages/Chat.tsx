import { Fragment, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3BottomLeftIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { Link, useParams } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { useAuth } from '../services/authenticate'
import { useChatEngine } from '../services/chatEngine'
import { getUsername } from '../utils/user-storage'
import { ChatWindow } from '../components/ChatWindow'
import { Dashboard } from '../components/Dashboard'
import { secondaryButtonClassNames } from '../components/Button'
import { inputErrorClassNames } from '../components/Input'

export function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [usersList, setUsersList] = useState([])
  const [threadsList, setThreadsList] = useState([])

  const auth = useAuth()
  const navigate = useNavigate()
  const onLogoutClick = () => {
    auth.onLogout().then(() => {
      navigate('/login')
    })
  }

  const params = useParams()
  const currentThreadId = Number(params.threadId)
  const isThreadIdSet = !!currentThreadId

  const chatEngine = useChatEngine()
  useEffect(() => {
    try {
      chatEngine.onRequestUsersList()
        .then((response: any) => setUsersList(response))
    } catch (e) {
      console.log(e)
    }
  }, [])

  useEffect(() => {
    try {
      chatEngine.onRequestThreadsList()
        .then((response: any) => setThreadsList(response))
    } catch (e) {
      console.log(e)
    }
  }, [currentThreadId])

  const onFormSubmit = (
    { participantId, threadName }: { participantId: number, threadName: string },
    { setSubmitting, resetForm }: {
      setSubmitting: (val: boolean) => void,
      resetForm: () => void,
    },
  ) => {
    setSubmitting(true)
    try {
      chatEngine.onCreateThreadClick({
        name: threadName,
        participantId,
      }).then((response: any) => {
        setSubmitting(false)
        resetForm()
        navigate(`/chat/${response.id}`)
      })
    } catch (e) { }
  }

  const validationSchema = Yup.object({
    participantId: Yup.number().required(''),
    threadName: Yup.string().required('Select participant'),
  })

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-overlay-background bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-mobileMenu-background pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-overlay-textPrimary" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <ChatBubbleLeftRightIcon className="w-10" />
                    <h2 className="pl-2 text-2xl font-semibold">Chat App</h2>
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="space-y-1 px-2 pb-12">
                      <h2 className="mt-5 px-2 py-2 font-semibold text-base">Threads</h2>
                      {threadsList.map((item: { id: number, name: string }) => (
                        <Link
                          to={`/chat/${item.id}`}
                          key={item.id}
                          className={`${item.id === currentThreadId && 'bg-link-hoverBackground'} hover:bg-link-hoverBackground text-link-secondary group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                        >
                          {item.name}
                        </Link>
                      ))}

                      <h2 className="mt-5 px-2 py-2 font-semibold text-base">Create a new thread</h2>
                      <Formik
                        initialValues={{ participantId: usersList.length && usersList[0].id, threadName: '' }}
                        enableReinitialize
                        validationSchema={validationSchema}
                        onSubmit={onFormSubmit}
                      >
                        {({ isSubmitting }) => (
                          <Form>
                            <Field required type="text" name="threadName" placeholder="Thread name..." className="mt-2 mb-2 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                            <span className={inputErrorClassNames}><ErrorMessage name="threadName" /></span>
                            <Field
                              required
                              as="select"
                              name="participantId"
                              className="mt-2 mb-2 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                              {usersList.map((item: { username: string, id: number }) => (
                                <option
                                  key={`${item.username}-${item.id}`}
                                  value={item.id}
                                >
                                  {item.username}
                                </option>
                              ))}
                            </Field>
                            <span className={inputErrorClassNames}><ErrorMessage name="participantId" /></span>

                            <div>
                              <button
                                type="submit"
                                className={secondaryButtonClassNames}
                                disabled={isSubmitting}
                                name="submit-user"
                              >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col ">
          <div className="flex flex-grow flex-col overflow-y-auto border-r border-mobileMenu-border bg-background-primary pt-5 pb-12">
            <div className="flex flex-shrink-0 items-center px-4">
              <ChatBubbleLeftRightIcon className="w-10" />
              <h2 className="pl-2 text-2xl font-semibold">Chat App</h2>
            </div>
            <div className="mt-5 flex flex-grow flex-col">
              <nav className="flex-1 px-2 pb-4">
                <h2 className="mt-5 px-2 py-2 font-semibold text-base">Threads</h2>
                {threadsList.map((item: { id: number, name: string }) => (
                  <Link
                    to={`/chat/${item.id}`}
                    key={item.id}
                    className={`${item.id === currentThreadId && 'bg-link-hoverBackground'} hover:bg-link-hoverBackground text-link-secondary group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    {item.name}
                  </Link>
                ))}

                <h2 className="mt-5 px-2 py-2 font-semibold text-base">Create a new thread</h2>
                <Formik
                  initialValues={{ participantId: usersList.length && usersList[0].id, threadName: '' }}
                  validationSchema={validationSchema}
                  enableReinitialize
                  onSubmit={onFormSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Field required type="text" name="threadName" placeholder="Thread name..." className="mt-2 mb-2 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                      <Field
                        required
                        as="select"
                        name="participantId"
                        className="mt-2 mb-2 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        {usersList.map((item: { username: string, id: number }) => (
                          <option
                            key={`${item.username}-${item.id}`}
                            value={item.id}
                          >
                            {item.username}
                          </option>
                        ))}
                      </Field>

                      <div>
                        <button
                          type="submit"
                          className={secondaryButtonClassNames}
                          disabled={isSubmitting}
                          name="submit-user"
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-background-primary border-b border-mobileMenu-border">
            <button
              type="button"
              className="border-r border-mobileMenu-border px-4 text-text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-end px-4">
              <div className="ml-4 flex items-center md:ml-6">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-background-primary text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-background-primary py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        <span
                          className="block px-4 py-2 text-sm text-button-primaryText cursor-pointer hover:bg-button-primaryHover"
                          onClick={onLogoutClick}
                        >
                          Sign out
                        </span>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="-mt-16 pt-16 h-screen flex flex-col-reverse">
            <div className="py-6 mx-auto w-full max-h-full overflow-hidden px-4 sm:px-6 md:px-8">
              {isThreadIdSet ? <ChatWindow /> : <Dashboard />}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
