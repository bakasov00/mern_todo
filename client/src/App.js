import { NavBar } from './components'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/auth.hook'
import { useRoute } from './routes'

function App() {
  const { login, logout, token, userId, isReady } = useAuth()
  const isLogin = !!token
  const route = useRoute(isLogin)

  return (
    <AuthContext.Provider value={{ login, logout, token, userId, isReady, isLogin }}>
      <div className='App'>
        <NavBar />
        {route}
      </div>
    </AuthContext.Provider>
  )
}

export default App
