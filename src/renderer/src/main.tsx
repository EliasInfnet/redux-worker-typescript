import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux'
import { store } from './store/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider forceColorScheme="dark">
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
)
