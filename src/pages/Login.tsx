import { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { inputClassNames, inputErrorClassNames } from '../components/Input'
import { secondaryButtonClassNames } from '../components/Button'

import { useAuth } from '../services/authenticate'
import { isUserFlagSet } from '../utils/user-storage'
import { generalPageTitle } from '../App'

const LoginForm = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const validationSchema = Yup.object({
    username: Yup.string().required(''),
    password: Yup.string().required(''),
  })

  const onFormSubmit = (
    { username, password }: { username: string, password: string },
    { setSubmitting }: { setSubmitting: (val: boolean) => void },
  ) => {
    setSubmitting(true)
    try {
      auth.onLoginClick({ username, password }).then(() => {
        setSubmitting(false)
        navigate('/chat')
      })
    } catch (e) { }
  }

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={onFormSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6" style={{ width: '100%' }}>
          <Field placeholder="Username" className={inputClassNames} name="username" type="text" autoComplete="true" required />
          <span className={inputErrorClassNames}><ErrorMessage name="username" /></span>
          <Field placeholder="Password" className={inputClassNames} name="password" type="password" autoComplete="true" required />
          <span className={inputErrorClassNames}><ErrorMessage name="password" /></span>

          <div>
            <button type="submit" className={secondaryButtonClassNames} disabled={isSubmitting} name="submit-user">
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export function Login() {
  const navigate = useNavigate()

  useEffect(() => {
    if (isUserFlagSet()) {
      return navigate('/chat')
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>{generalPageTitle} - Login</title>
        <meta name="description" content={`${generalPageTitle} - Login`} />
      </Helmet>
      <div className="min-h-full flex flex-col justify-center py-6 sm:py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="md:mt-6 text-center text-xl md:text-3xl font-bold text-cmBlack">Sign in to your account</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="md:py-8 px-4 sm:px-10">
            <LoginForm />

            <div className="text-center">
              <a className="inline-block pt-3 text-sm" href="/registration">Not a member? Join us now</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
