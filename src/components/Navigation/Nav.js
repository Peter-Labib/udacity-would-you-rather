import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppBar, Toolbar, Typography, Button, Avatar, makeStyles } from '@material-ui/core'
import { ExitToApp, LockOpen } from '@material-ui/icons'
import { setAuthedUser } from '../../store/actions/index'
import './Nav.css'

const useStyle = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  avatar: {
    margin: '0 1rem'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
}))

const Nav = (props) => {
  const { logOut, userData } = props
  const classes = useStyle()

  const logOutHandler = () => {
    logOut()
    props.history.replace('/signin')
  }

  let navAuth = (
    <React.Fragment>
      <div className={classes.grow} />
      <NavLink to='/signin' className={classes.link} activeClassName='activeNav'>
        <Button color='inherit' endIcon={<LockOpen />} className={classes.logoutBtn} onClick={logOutHandler}>Login</Button>
      </NavLink>
    </React.Fragment>)

  if (userData) {
    navAuth = (
      <React.Fragment>
        <NavLink to='/' className={classes.link} activeClassName='activeNav' exact>
          <Button color='inherit'>Home</Button>
        </NavLink>
        <NavLink to='/add' className={classes.link} activeClassName='activeNav' >
          <Button color='inherit'>New Question</Button>
        </NavLink>
        <NavLink to='/leaderboard' className={classes.link} activeClassName='activeNav' >
          <Button color='inherit'>Leader Board</Button>
        </NavLink>
        <div className={classes.grow} />
        <Typography style={{ 'cursor': 'default' }} >{userData.name}</Typography>
        <Avatar className={classes.avatar} alt={userData.name} src={userData.avatarURL} />
        <Button color='inherit' endIcon={<ExitToApp />} className={classes.logoutBtn} onClick={logOutHandler}>Logout</Button>
      </React.Fragment>)
  }

  return (
    <AppBar position='relative'>
      <Toolbar>
        {navAuth}
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = ({ authedUser, users }) => {
  const userData = users[authedUser] ? users[authedUser] : null
  return {
    userData
  }
}

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(setAuthedUser(null))
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav))

