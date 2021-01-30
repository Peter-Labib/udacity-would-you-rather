import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  makeStyles,
} from '@material-ui/core'
import { questionAnswerHandler } from '../../../store/actions/index'
import Error from '../../Error/Error'

const useStyles = makeStyles((theme) => ({
  details: {
    display: 'flex',
    alignItems: 'start',
  },
  cover: {
    width: theme.spacing(11),
    height: theme.spacing(11),
    margin: theme.spacing(3),
  },
  legend: {
    fontWeight: 'bold',
    color: 'inherit',
  },
}))

const UnansweredQuestionControl = (props) => {
  const { authedUser, selectedQuestion, users, submitAnswer } = props
  const [answer, setAnswer] = useState('')
  const classes = useStyles()

  const chooseAnswerHandler = (e) => {
    setAnswer(e.target.value)
  }
  const submitAnswerHandler = (e) => {
    e.preventDefault()
    submitAnswer(authedUser, selectedQuestion.id, answer)
    props.history.replace(`/answered/${selectedQuestion.id}`)
  }

  let renderedComponent = <Error />

  if (selectedQuestion) {
    const author = users[selectedQuestion.author]

    return (renderedComponent = (
      <Card>
        <CardHeader title={author.name + ' asks:'} />
        <div className={classes.details}>
          <Avatar src={author.avatarURL} className={classes.cover} />
          <CardContent>
            <form onSubmit={submitAnswerHandler}>
              <FormControl component='fieldset'>
                <FormLabel component='legend' className={classes.legend}>
                  Would You Rather...
                </FormLabel>
                <RadioGroup
                  aria-label='answer'
                  name='answer'
                  value={answer}
                  onChange={chooseAnswerHandler}
                >
                  <FormControlLabel
                    value='optionOne'
                    control={<Radio />}
                    label={selectedQuestion.optionOne.text}
                  />
                  <FormControlLabel
                    value='optionTwo'
                    control={<Radio />}
                    label={selectedQuestion.optionTwo.text}
                  />
                </RadioGroup>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={!answer}
                >
                  Submit
                </Button>
              </FormControl>
            </form>
          </CardContent>
        </div>
      </Card>
    ))
  }

  return <React.Fragment>{renderedComponent}</React.Fragment>
}

const mapStateToProps = ({ questions, users, auth }, props) => {
  const id = props.match.params.id
  const authedUser = auth.authedUser
  const selectedQuestion = questions[id]

  return {
    authedUser,
    selectedQuestion,
    users,
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitAnswer: (authedUser, qid, answer) =>
    dispatch(questionAnswerHandler(authedUser, qid, answer)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnansweredQuestionControl)
