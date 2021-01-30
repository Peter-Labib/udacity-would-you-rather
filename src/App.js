import React, { useEffect } from 'react'
import { Container } from '@material-ui/core'
import LoadingBar from 'react-redux-loading-bar'
import { connect } from 'react-redux'
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
import { handleInitialData, setAuthRedirectPath } from './store/actions/index'
import Nav from './components/Navigation/Nav'
import Home from './components/Home/Home'
import UnasweredQuestion from './components/Home/UnansweredQuestion/UnansweredQuestion'
import SignIn from './components/SignIn'
import CreateQuestion from './components/CreateQuestion/CreateQuestion'
import AnsweredQuestion from './components/Home/AnsweredQuestion/AnsweredQuestion'
import LeaderBoard from './components/LeaderBoard/LeaderBoard'
import Error from './components/Error/Error'

function App(props) {
  const { getInitialData, auth, setRedirectPath } = props

  useEffect(() => {
    getInitialData()
  }, [getInitialData])

  useEffect(() => {
    if (props.location.pathname !== '/signin') {
      setRedirectPath(props.location.pathname)
    }
  }, [props.location.pathname, setRedirectPath])

  return (
    <div className='App'>
      <Nav />
      <LoadingBar style={{ backgroundColor: '#0056C3' }} />
      <Container maxWidth='sm' style={{ marginTop: '3rem' }}>
        <Route path='/signin' component={SignIn} />
        {auth.authedUser == null ? (
          <Redirect to='/signin' />
        ) : (
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/unanswered/:id' component={UnasweredQuestion} />
            <Route path='/add' component={CreateQuestion} />
            <Route path='/answered/:id' component={AnsweredQuestion} />
            <Route path='/leaderboard' component={LeaderBoard} />
            <Route component={Error} />
          </Switch>
        )}
      </Container>
    </div>
  )
}

const mapStateToProps = ({ auth }) => ({
  auth,
})

const mapDispatchToProps = (dispatch) => ({
  getInitialData: () => dispatch(handleInitialData()),
  setRedirectPath: (path) => dispatch(setAuthRedirectPath(path)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
