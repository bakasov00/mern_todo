import { useState, useContext } from 'react'
import { Route, Switch, Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

function AuthPage() {
  const history = useHistory()
  const { login } = useContext(AuthContext)
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  function changeHandler(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function registerHandler() {
    fetch('/auth/registration', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(() => history.push('/login'))
  }
  function loginHandler() {
    fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => login(data.token, data.userId))
  }
  return (
    <>
      <div className='container'>
        <Switch>
          <Route path='/registration' exact>
            <form className='form' onSubmit={(event) => event.preventDefault()}>
              <h3>Регистрация</h3>
              <div className='row'>
                <div className='input-field col s12'>
                  <input onChange={changeHandler} type='email' name='email' className='validate' />
                  <label htmlFor='email'>Email</label>
                </div>
                <div className='input-field col s12'>
                  <input
                    onChange={changeHandler}
                    type='password'
                    name='password'
                    className='validate'
                  />

                  <label htmlFor='password'>Password</label>
                </div>
              </div>
              <div className='row'>
                <button onClick={registerHandler} className='waves-effect btn blue'>
                  Регистрация
                </button>
                <Link to='/login' className='btn-req'>
                  Уже есть аккаунт ?
                </Link>
              </div>
            </form>
          </Route>
          <Route path='/login' exact>
            <form className='form' onSubmit={(event) => event.preventDefault()}>
              <h3>Авторизация</h3>
              <div className='row'>
                <div className='input-field col s12'>
                  <input onChange={changeHandler} type='email' name='email' className='validate' />
                  <label htmlFor='email'>Email</label>
                </div>
                <div className='input-field col s12'>
                  <input
                    onChange={changeHandler}
                    type='password'
                    name='password'
                    className='validate'
                  />

                  <label htmlFor='password'>Password</label>
                </div>
              </div>
              <div className='row'>
                <button className='waves-effect btn blue' onClick={loginHandler}>
                  Войти
                </button>
                <Link to='/registration' className='btn-req'>
                  Нет аккаунта ?
                </Link>
              </div>
            </form>
          </Route>

          <Route>Home</Route>
        </Switch>
      </div>
    </>
  )
}

export default AuthPage
