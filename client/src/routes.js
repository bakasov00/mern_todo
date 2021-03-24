import { Redirect, Route, Switch } from 'react-router-dom'
import { AuthPage } from './pages'
import { MainPage } from './pages'

export const useRoute = (isLogin) => {
  if (isLogin) {
    return (
      <Switch>
        <Route path='/' exact component={MainPage} />
        <Redirect to='/' />
      </Switch>
    )
  }
  return (
    <Switch>
      <Route path='/login' exact component={AuthPage} />
      <Route path='/registration' exact component={AuthPage} />
      <Redirect to='/login' />
    </Switch>
  )
}
