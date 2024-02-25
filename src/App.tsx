import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/shared/ScrollToTop'
import CardPage from './pages/Card'
import HomePage from './pages/Home'
import SignupPage from './pages/Signup'
import SigninPage from './pages/Signin'
import Navbar from './components/shared/Navbar'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/card/:id" Component={CardPage} />
        <Route path="/signup" Component={SignupPage} />
        <Route path="/signin" Component={SigninPage} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
