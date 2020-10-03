import React from 'react'
import App from './App'
import { Provider as StoreProvider } from 'react-redux'
import store from './redux/store'

export default function App() {
  return (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  )
}