import React, { useEffect } from 'react'
import { Container } from '@material-ui/core'
import LoadingBar from 'react-redux-loading-bar'
import { connect } from 'react-redux'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { handleInitialData } from './store/actions/index'
import Nav from './components/Navigation/Nav'
import Home from './components/Home/Home'
import UnasweredQuestion from './components/Home/UnansweredQuestion/UnansweredQuestion'
import SignIn from './components/SignIn'
import CreateQuestion from './components/CreateQuestion/CreateQuestion'
import AnsweredQuestion from './components/Home/AnsweredQuestion/AnsweredQuestion'
import LeaderBoard from './components/LeaderBoard/LeaderBoard'

function App(props) {
  const { getInitialData, authedUser } = props

  useEffect(() => {
    getInitialData()
  }, [getInitialData])

  return (
    <div className="App">
      <Nav />
      <LoadingBar style={{ 'backgroundColor': '#0056C3' }} />
      <Container maxWidth='sm' style={{'marginTop':'3rem'}}>
        <Route path='/signin' component={SignIn} />
        {authedUser == null ? <Redirect to='/signin' /> :
          (<React.Fragment>
            <Route path='/' exact component={Home} />
            <Route path='/unanswered/:id' component={UnasweredQuestion} />
            <Route path='/add' component={CreateQuestion} />
            <Route path='/answered/:id' component={AnsweredQuestion} />
            <Route path='/leaderboard' component={LeaderBoard} />
          </React.Fragment>)
        }
      </Container>
    </div>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  authedUser
})

const mapDispatchToProps = dispatch => ({
  getInitialData: () => dispatch(handleInitialData())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
