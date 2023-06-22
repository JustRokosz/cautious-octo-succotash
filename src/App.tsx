import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { pageRoutes } from './routes'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import { Helmet } from 'react-helmet'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Layout } from './components/Layout'

import { Login } from './pages/Login'
import { Registration } from './pages/Register'
import { Chat } from './pages/Chat'

import 'react-toastify/dist/ReactToastify.css'

import './index.css'
import './App.css'
import { RequireAuth as Auth } from './components/withAuth'

const queryClient = new QueryClient()
const envTitle = import.meta.env.VITE_PAGE_TITLE as string
export const generalPageTitle = `[${envTitle}] | Chat App`

export const App = () => {
  return (
    <Routes>
      {/** Open routes */}
      <Route path={pageRoutes.home} element={<Login />} />
      <Route path={pageRoutes.auth} element={<Login />} />
      <Route path={pageRoutes.register} element={<Registration />} />
      {/** Protected routes - should be surrounded with `Auth` component */}
      <Route path={pageRoutes.chat} element={<Auth><Chat /></Auth>} />
      <Route path={pageRoutes.chatThread} element={<Auth><Chat /></Auth>} />
    </Routes>
  )
}

export const AppContainer = () =>
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Helmet>
        <title>(test) {generalPageTitle}</title>
        <meta name="description" content={generalPageTitle} />
      </Helmet>
      <Layout>
        <App />
      </Layout>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>
