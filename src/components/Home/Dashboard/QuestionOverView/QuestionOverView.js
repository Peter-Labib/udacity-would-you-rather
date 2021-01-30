import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  details: {
    display: 'flex',
    alignItems: 'start',
  },
  cover: {
    width: theme.spacing(11),
    height: theme.spacing(11),
    margin: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  subTitle: {
    marginBottom: theme.spacing(1),
  },
}))

const QuestionOverView = (props) => {
  const { id, authorName, authorAvatar, answer, answered } = props
  const classes = useStyles()

  let url = '/unanswered/'
  if (answered) {
    url = '/answered/'
  }

  return (
    <Card className={classes.root}>
      <CardHeader title={authorName + ' asks:'} />
      <div className={classes.details}>
        <Avatar src={authorAvatar} className={classes.cover} />
        <CardContent>
          <Typography variant='h5' className={classes.title}>
            Would you rather
          </Typography>
          <Typography variant='subtitle2' className={classes.subTitle}>
            {'...' + answer.substr(0, 11) + '...'}
          </Typography>
          <Link to={url + id} style={{ textDecoration: 'none' }}>
            <Button variant='outlined' color='primary'>
              View Poll
            </Button>
          </Link>
        </CardContent>
      </div>
    </Card>
  )
}

const mapStateToProps = ({ users }, props) => ({
  authorName: users[props.author].name,
  authorAvatar: users[props.author].avatarURL,
})

export default connect(mapStateToProps)(QuestionOverView)
