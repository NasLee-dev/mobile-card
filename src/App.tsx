import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAlertContext } from './contexts/AlertContext'
import HomePage from './pages/Home'
import TestPage from './pages/Test'

function App() {
  const { open }: any = useAlertContext()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
