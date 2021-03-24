import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export default function Navbar() {
  const { isLogin, logout } = useContext(AuthContext)

  return (
    <nav>
      <div className='nav-wrapper blue'>
        <a href='/' className='brand-logo'>
          MERN Todo
        </a>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li>
            {isLogin ? (
              <button onClick={logout} className='btn red'>
                Выйти
              </button>
            ) : (
              <Link to='/login'>Войти</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}
