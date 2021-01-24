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
    makeStyles
} from '@material-ui/core'
import { questionAnswerHandler } from '../../../store/actions/index'

const useStyles = makeStyles((theme) => ({
    details: {
        display: 'flex',
        alignItems: 'start'
    },
    cover: {
        width: theme.spacing(11),
        height: theme.spacing(11),
        margin: theme.spacing(3)
    },
    legend: {
        fontWeight: 'bold',
        color: 'inherit'
    }
}))

const UnansweredQuestionControl = (props) => {
    const { authedUser, selectedQuestion, author, submitAnswer } = props
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
    return (
        <Card>
            <CardHeader title={author.name + ' asks:'} />
            <div className={classes.details}>
                <Avatar src={author.avatarURL} className={classes.cover} />
                <CardContent>
                    <form onSubmit={submitAnswerHandler}>
                        <FormControl component='fieldset'>
                            <FormLabel component='legend' className={classes.legend}>Would You Rather...</FormLabel>
                            <RadioGroup aria-label='answer' name='answer' value={answer} onChange={chooseAnswerHandler}>
                                <FormControlLabel value='optionOne' control={<Radio />} label={selectedQuestion.optionOne.text} />
                                <FormControlLabel value='optionTwo' control={<Radio />} label={selectedQuestion.optionTwo.text} />
                            </RadioGroup>
                            <Button type='submit' variant='contained' color='primary' disabled={!answer}>Submit</Button>
                        </FormControl>
                    </form>
                </CardContent>
            </div>
        </Card>
    )
}
const mapStateToProps = ({ questions, users, authedUser }, props) => {
    const id = props.match.params.id
    const selectedQuestion = questions[id]
    const author = users[selectedQuestion.author]
    return {
        authedUser,
        selectedQuestion,
        author
    }
}

const mapDispatchToProps = dispatch => ({
    submitAnswer: (authedUser, qid, answer) => dispatch(questionAnswerHandler(authedUser, qid, answer))
})

export default connect(mapStateToProps, mapDispatchToProps)(UnansweredQuestionControl)
