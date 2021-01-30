import React from 'react'
import { connect } from 'react-redux'
import {
  Card,
  CardHeader,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  makeStyles,
} from '@material-ui/core'
import { setAuthedUser } from '../store/actions/index'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  btn: {
    display: 'block',
    margin: 'auto',
  },
}))

const SignIn = (props) => {
  const { usersData, selectedUser, authRedirectPath } = props
  const classes = useStyles()

  const [authedUser, setAuthedUser] = React.useState('')
  const [open, setOpen] = React.useState(false)

  const handleChange = (event) => {
    setAuthedUser(event.target.value)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    selectedUser(authedUser)
    props.history.replace(authRedirectPath)
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        title='Welcome to Would You Rather App!'
        subheader='Please sign in to continue'
      />
      <CardContent>
        <form onSubmit={onSubmitHandler}>
          <FormControl className={classes.formControl}>
            <InputLabel id='controlled-open-select-label'>
              Select User
            </InputLabel>
            <Select
              labelId='controlled-open-select-label'
              id='controlled-open-select'
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={authedUser}
              onChange={handleChange}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {usersData.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.btn}
            disabled={!authedUser}
          >
            SignIn
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

const mapStateToProps = ({ users, auth }) => ({
  usersData: Object.values(users),
  authRedirectPath: auth.authRedirectPath,
})

const mapDispatchToProps = (dispatch) => ({
  selectedUser: (id) => dispatch(setAuthedUser(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
