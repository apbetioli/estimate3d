import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { persistor, store } from './store'

import Filaments from './pages/Filaments'
import FilamentsEdit from './pages/FilamentsEdit'
import General from './pages/General'
import Header from './components/Header'
import { PersistGate } from 'redux-persist/integration/react'
import Printers from './pages/Printers'
import PrintersEdit from './pages/PrintersEdit'
import Prints from './pages/Prints'
import PrintsEdit from './pages/PrintsEdit'
import { Provider } from 'react-redux'
import Results from './pages/Results'
import ScrollToTop from './components/ScrollToTop'
import Settings from './pages/Settings'
import { createRoot } from 'react-dom/client'

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ScrollToTop />
          <Header />
          <main className="container m-auto py-5 md:px-5 md:py-0">
            <Routes>
              <Route path="/" element={<Results />} />
              <Route path="/prints" element={<Prints />} />
              <Route path="/prints/:id" element={<PrintsEdit />} />
              <Route path="/printers" element={<Printers />} />
              <Route path="/printers/:id" element={<PrintersEdit />} />
              <Route path="/filaments" element={<Filaments />} />
              <Route path="/filaments/:id" element={<FilamentsEdit />} />
              <Route path="/general" element={<General />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  )
}

const container = document.getElementById('root')
const root = createRoot(container as Element)
root.render(<App />)
