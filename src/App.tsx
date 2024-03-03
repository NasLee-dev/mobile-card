import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/shared/ScrollToTop'
import CardPage from './pages/Card'
import HomePage from './pages/Home'
import SignupPage from './pages/Signup'
import SigninPage from './pages/Signin'
import Navbar from './components/shared/Navbar'
import PrivateRoute from './components/auth/PrivateRoute'
import ApplyPage from './pages/Apply'
import ApplyDone from './pages/ApplyDone'
import { Suspense } from 'react'
import MyPage from './pages/My'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/signup" Component={SignupPage} />
        <Route path="/signin" Component={SigninPage} />
        <Route path="/card/:id" Component={CardPage} />
        <Route
          path="/apply/:id"
          element={
            <PrivateRoute>
              <Suspense fallback={<></>}>
                <ApplyPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/apply/done"
          element={
            <PrivateRoute>
              <ApplyDone />
            </PrivateRoute>
          }
        />
        <Route
          path="/my"
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
