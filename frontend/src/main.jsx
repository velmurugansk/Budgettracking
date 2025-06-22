import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import store, {persistor} from './store/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {Toaster} from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster toastOptions={{
          position: 'top-right',
          style:{
            background : '#283046',
            color:'white'
          }
        }} />
    </PersistGate>    
  </Provider>    
  </BrowserRouter>,
)
