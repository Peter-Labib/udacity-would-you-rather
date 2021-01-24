import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Card, CardHeader, CardContent, Typography, TextField, Button, makeStyles } from '@material-ui/core'
import { createQuestionHandler } from '../../store/actions/index'

const useStyles = makeStyles((theme) => ({
    subTitle: {
        marginBottom: theme.spacing(1)
    },
    formRoot: {
        display: 'flex',
        flexDirection: 'column'
    }
}))

const CreateQuestion = (props) => {
    const { createNewQuestion } = props
    const classes = useStyles()
    const [firstOpt, setFirstOpt] = useState('')
    const [secondOpt, setSecondOpt] = useState('')

    const submitQuestion = (e) => {
        e.preventDefault()
        props.history.replace('/')
        createNewQuestion(firstOpt, secondOpt)
    }

    return (
        <div>
            <Card>
                <CardHeader title='Create New Question' style={{ 'textAlign': 'center' }} />
                <CardContent>
                    <Typography variant='subtitle2' className={classes.title}>Complete the question:</Typography>
                    <Typography variant='h6' className={classes.subTitle}>Would you rather ...</Typography>
                    <form className={classes.formRoot} onSubmit={submitQuestion}>
                        <TextField label='Enter Option One Here' variant='outlined' value={firstOpt} onChange={e => setFirstOpt(e.target.value)} />
                        <span style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '1rem', 'margin': '1rem 0' }}>OR</span>
                        <TextField label='Enter Option Two Here' variant='outlined' value={secondOpt} onChange={e => setSecondOpt(e.target.value)} />
                        <Button type='submit' variant='outlined' color='primary' style={{ 'marginTop': '.8rem' }} disabled={!firstOpt.trim() && !secondOpt.trim()}>Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
    createNewQuestion: (optionOneText, optionTwoText) => dispatch(createQuestionHandler(optionOneText, optionTwoText))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion)
