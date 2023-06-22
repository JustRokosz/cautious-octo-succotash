import { createRoot } from 'react-dom/client'

import { AppContainer } from './App'

const container = document.getElementById('root') as Element
const root = createRoot(container)

root.render(<AppContainer />)
