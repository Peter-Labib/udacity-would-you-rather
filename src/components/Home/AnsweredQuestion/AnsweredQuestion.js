import React from 'react'
import { connect } from 'react-redux'
import {
    Card,
    CardHeader,
    Avatar,
    CardContent,
    Typography,
    LinearProgress,
    withStyles,
    makeStyles
} from '@material-ui/core'
import './AnsweredQuestion.css'

const useStyles = makeStyles((theme) => ({
    details: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    cover: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin: theme.spacing(3)
    },
    legend: {
        fontWeight: 'bold',
        color: 'inherit'
    }
}))

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);

const AnsweredQuestion = (props) => {
    const { questionData, authorData, authedUserData } = props
    const optionOneVotes = questionData.optionOne.votes.length;
    const optionTwoVotes = questionData.optionTwo.votes.length;
    const votesTotal = optionOneVotes + optionTwoVotes;
    const userVote = authedUserData.answers[questionData.id];
    const classes = useStyles()

    let option1 = 'less-votes'
    let option2 = 'less-votes'
    if (optionOneVotes > optionTwoVotes) {
        option1 = 'more-votes'
    } else if (optionTwoVotes > optionOneVotes) {
        option2 = 'more-votes'
    }

    return (
        <Card>
            <CardHeader title={'asked by ' + authorData.name} />
            <div className={classes.details}>
                <Avatar src={authorData.avatarURL} className={classes.cover} />
                <CardContent>
                    <Typography style={{ 'cursor': 'default' }} variant='h5' >Results</Typography>
                    <div className={['option-container', option1].join(' ')}>
                        <p>{`Would you rather ${questionData.optionOne.text}`}</p>
                        <BorderLinearProgress variant='determinate' value={((optionOneVotes / votesTotal) * 100)} />
                        <span >{`${optionOneVotes} out of ${votesTotal} votes`}</span>
                        {userVote === 'optionOne' && <span className='option-badge'>your <br /> result</span>}
                    </div>
                    <div className={['option-container', option2].join(' ')}>
                        <p>{`Would you rather ${questionData.optionTwo.text}`}</p>
                        <BorderLinearProgress variant='determinate' value={((optionTwoVotes / votesTotal) * 100)} />
                        <span>{`${optionTwoVotes} out of ${votesTotal} votes`}</span>
                        {userVote === 'optionTwo' && <span className='option-badge'>your <br /> result</span>}
                    </div>
                </CardContent>
            </div>
        </Card >
    )
}
const mapStateToProps = ({ questions, users, authedUser }, props) => {
    const qid = props.match.params.id
    const questionData = questions[qid]
    const authorData = users[questionData.author]
    const authedUserData = users[authedUser]

    return {
        questionData,
        authorData,
        authedUserData
    }
}

export default connect(mapStateToProps)(AnsweredQuestion)
