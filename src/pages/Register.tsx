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
import { toast } from 'react-toastify'

const RegistrationForm = () => {
  const auth = useAuth()
  const validationSchema = Yup.object({
    username: Yup.string().required(''),
    password: Yup.string().required(''),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  })

  const onFormSubmit = (
    { username, password, passwordConfirm }: { username: string, password: string, passwordConfirm: string },
    { setSubmitting }: { setSubmitting: (val: boolean) => void },
  ) => {
    setSubmitting(true)
    try {
      auth.onRegisterClick({ username, password, passwordConfirm }).then(() => {
        setSubmitting(false)
        toast.success('You have been succesfully registered. Now proceed to login page.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      })
    } catch (e) { }
  }

  return (
    <Formik
      initialValues={{ username: '', password: '', passwordConfirm: '' }}
      validationSchema={validationSchema}
      onSubmit={onFormSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6" style={{ width: '100%' }}>
          <Field placeholder="Username" className={inputClassNames} name="username" type="text" autoComplete="true" required />
          <span className={inputErrorClassNames}><ErrorMessage name="username" /></span>
          <Field placeholder="Password" className={inputClassNames} name="password" type="password" autoComplete="true" required />
          <span className={inputErrorClassNames}><ErrorMessage name="password" /></span>
          <Field placeholder="Repeat password" className={inputClassNames} name="passwordConfirm" type="password" autoComplete="true" required />
          <span className={inputErrorClassNames}><ErrorMessage name="passwordConfirm" /></span>

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

export function Registration() {
  const navigate = useNavigate()

  useEffect(() => {
    if (isUserFlagSet()) {
      return navigate('/')
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>{generalPageTitle} - Registration</title>
        <meta name="description" content={`${generalPageTitle} - Registration`} />
      </Helmet>
      <div className="min-h-full flex flex-col justify-center py-6 sm:py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="md:mt-6 text-center text-xl md:text-3xl font-bold text-cmBlack">Register new account</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="md:py-8 px-4 sm:px-10">
            <RegistrationForm />

            <div className="text-center">
              <a className="inline-block pt-3 text-sm" href="/login">Already have an account? Log in</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
