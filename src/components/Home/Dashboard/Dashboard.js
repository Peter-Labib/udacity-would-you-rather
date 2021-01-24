import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles, Paper, Tabs, Tab } from '@material-ui/core';
import QuestionOverView from './QuestionOverView/QuestionOverView'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(3)
    },
}));

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <React.Fragment>
                    {children}
                </React.Fragment>
            )}
        </div>
    );
}
const Dashboard = (props) => {
    const { unanswered, answered } = props
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <Paper className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor='primary'
                    textColor='primary'
                    centered
                >
                    <Tab label='Unanswered Question' />
                    <Tab label='Answered Question' />
                </Tabs>
            </Paper>
            <TabPanel value={value} index={0}>
                {
                    unanswered.map(question =>
                        <QuestionOverView
                            key={question.id}
                            id={question.id}
                            answered={false}
                            author={question.author}
                            answer={question.optionOne.text}
                        />)
                }
            </TabPanel>
            <TabPanel value={value} index={1}>
                {
                    answered.map(question =>
                        <QuestionOverView
                            key={question.id}
                            id={question.id}
                            answered={true}
                            author={question.author}
                            answer={question.optionOne.text}
                        />)
                }
            </TabPanel>
        </React.Fragment>
    );
}

const mapStateToProps = ({ questions, authedUser, users }) => {
    const answeredIds = Object.keys(users[authedUser].answers);
    const unanswered = Object.values(questions)
        .filter(question => !answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp)

    const answered = Object.values(questions)
        .filter(question => answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp)

    return {
        unanswered,
        answered
    }
}

export default withRouter(connect(mapStateToProps)(Dashboard))