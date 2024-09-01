import {BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Transfer from './pages/Transfer'
import NotFound from './pages/NotFound'
import ErrorBoundary from './components/ErrorBoundary'

function App() {

  return (
    <div>
        <BrowserRouter>
          <ErrorBoundary>
            <Routes>
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/signin" element={<Signin />} />
              <Route exact path="/send" element={<Transfer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
    </div>
  )
}

export default App
