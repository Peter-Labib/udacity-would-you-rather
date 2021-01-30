import React from 'react'
import { connect } from 'react-redux'
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core'
import Error from '../../Error/Error'
import './AnsweredQuestion.css'

const useStyles = makeStyles((theme) => ({
  details: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  cover: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: theme.spacing(3),
  },
  legend: {
    fontWeight: 'bold',
    color: 'inherit',
  },
}))

const AnsweredQuestion = (props) => {
  const { questionData, authedUserData, users } = props
  const classes = useStyles()

  let renderedComponent = <Error />
  if (questionData) {
    const authorData = users[questionData.author]
    const optionOneVotes = questionData.optionOne.votes.length
    const optionTwoVotes = questionData.optionTwo.votes.length
    const votesTotal = optionOneVotes + optionTwoVotes
    const userVote = authedUserData.answers[questionData.id]
    const optionOnePercent = ((optionOneVotes / votesTotal) * 100).toFixed(0)
    const optionTwoPercent = ((optionTwoVotes / votesTotal) * 100).toFixed(0)

    let option1 = 'less-votes'
    let option2 = 'less-votes'
    if (optionOneVotes > optionTwoVotes) {
      option1 = 'more-votes'
    } else if (optionTwoVotes > optionOneVotes) {
      option2 = 'more-votes'
    }

    return (renderedComponent = (
      <Card>
        <CardHeader title={'asked by ' + authorData.name} />
        <div className={classes.details}>
          <Avatar src={authorData.avatarURL} className={classes.cover} />
          <CardContent>
            <Typography style={{ cursor: 'default' }} variant='h5'>
              Results
            </Typography>
            <div className={['option-container', option1].join(' ')}>
              <p>{`Would you rather ${questionData.optionOne.text}`}</p>
              <div className='option-progress'>
                <span
                  className='option-progress__percentage'
                  style={{ width: `${optionOnePercent}%` }}
                ></span>
                <span>{`${optionOnePercent}%`}</span>
              </div>
              <span>{`${optionOneVotes} out of ${votesTotal} votes`}</span>
              {userVote === 'optionOne' && (
                <span className='option-badge'>
                  your <br /> result
                </span>
              )}
            </div>
            <div className={['option-container', option2].join(' ')}>
              <p>{`Would you rather ${questionData.optionTwo.text}`}</p>
              <div className='option-progress'>
                <span
                  className='option-progress__percentage'
                  style={{ width: `${optionTwoPercent}%` }}
                ></span>
                <span>{`${optionTwoPercent}%`}</span>
              </div>
              <span>{`${optionTwoVotes} out of ${votesTotal} votes`}</span>
              {userVote === 'optionTwo' && (
                <span className='option-badge'>
                  your <br /> result
                </span>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    ))
  }

  return <React.Fragment>{renderedComponent}</React.Fragment>
}

const mapStateToProps = ({ questions, users, auth }, props) => {
  const qid = props.match.params.id
  const questionData = questions[qid]
  const authedUserData = users[auth.authedUser]

  return {
    questionData,
    authedUserData,
    users,
  }
}

export default connect(mapStateToProps)(AnsweredQuestion)
