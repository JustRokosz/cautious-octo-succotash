import { Navigate, useLocation } from 'react-router-dom'
import { pageRoutes } from '../routes'
import { getUserFlag } from '../utils/user-storage'

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const userFlag = getUserFlag()
  const location = useLocation()

  if (!userFlag) {
    return <Navigate to={pageRoutes.auth} state={{ from: location }} replace />
  }

  return children
}
