import React from 'react'
import { connect } from 'react-redux'
import {
  Card,
  Avatar,
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  cover: {
    width: theme.spacing(11),
    height: theme.spacing(11),
    margin: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  questions: {
    marginBottom: theme.spacing(1),
  },
  overall: {
    textAlign: 'center',
    alignSelf: 'stretch',
  },
  total: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    backgroundColor: 'rgba(63, 81, 181, .8)',
    color: '#fff',
    borderRadius: '50%',
    width: '23px',
    height: '23px'
  },
}))

const LeaderBoard = (props) => {
  const { leaderboardData } = props
  const classes = useStyles()

  return (
    <React.Fragment>
      {leaderboardData.map((user) => (
        <Card className={classes.root} key={user.id}>
          <div className={classes.details}>
            <Avatar src={user.avatarURL} className={classes.cover} />
            <CardContent>
              <Typography variant='h5' className={classes.title}>
                {' '}
                {user.name}{' '}
              </Typography>
              <Typography className={classes.questions}>
                {' '}
                {`Answered question:  ${user.answerCount}`}{' '}
              </Typography>
              <Typography className={classes.questions}>
                {' '}
                {`Created question:  ${user.createdQuestionCount}`}{' '}
              </Typography>
            </CardContent>
            <div className={classes.overall}>
              <h5>Score</h5>
              <div className={classes.total}>
                <span style={{ margin: 'auto' }}>{user.total}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </React.Fragment>
  )
}

const mapStateToProps = ({ users }) => {
  const leaderboardData = Object.values(users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answerCount: Object.values(user.answers).length,
      createdQuestionCount: user.questions.length,
      total: Object.values(user.answers).length + user.questions.length,
    }))
    .sort((a, b) => b.total - a.total)

  return {
    leaderboardData,
  }
}

export default connect(mapStateToProps)(LeaderBoard)
