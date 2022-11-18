import Header from "../misc/Header";
import PollOption from "./PollOption";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {catalogVote, populateStore, saveAnswer, selectQuestions, selectUser} from "./pollingSlice";
import {_getQuestions} from "../misc/DATA";

const Poll = () => {
    const polls = useAppSelector(selectQuestions);
    const user = useAppSelector(selectUser);

    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    let desiredPoll: string | null;
    const [searchParams, setSearchParams] = useSearchParams();
    const [pollData, setPollData] = useState({
        id: 0,
        author: 'author',
        optionOne: {text: 'option1', votes: []},
        optionTwo: {text: 'option2', votes: []},
        answered1: 0,
        answered2: 0, name: 'name', time: '3:00 pm', date: '01/01/2022'
    });
    const [displayStats, setDisplayStats] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {
        let idParam = searchParams.get('id');
        desiredPoll = idParam;
        getQuestion(desiredPoll);
    })

    const getQuestion = (questionId: string | null) => {
        if (typeof questionId === 'string') {
            let poll = polls.find((poll: any) => poll.id === questionId);
            setPollData(poll);
        } else {
            alert('poll not found');
            navigate('/home');
        }
    }

    const containerStyle = {
        backgroundColor: "#C9ced2",
        padding: '1%',
        margin: '1%',
        display: 'inline-block',
        width: '80%'
    }

    const registerVote = (selectedOption: number) => {
        if (!hasVoted) {
            dispatch(saveAnswer({authedUser: user.id, qid: pollData.id, answer: selectedOption}));
            dispatch(populateStore());
            setHasVoted(true);
        }
        setDisplayStats(true);
    }
    let stat1;
    let stat2;
    if (displayStats) {
        // @ts-ignore
        stat1 = <p>{pollData.optionOne.votes.length} voted this one which is {parseFloat(pollData.optionOne.votes.length / (pollData.optionOne.votes.length + pollData.optionTwo.votes.length) * 100).toFixed(2)} percent</p>
        // @ts-ignore
        stat2 = <p>{pollData.optionTwo.votes.length} voted for this which is {parseFloat(pollData.optionTwo.votes.length / (pollData.optionOne.votes.length + pollData.optionTwo.votes.length) * 100).toFixed(2)} percent</p>
    }

    const displayDbState = async () => {
       console.log(JSON.stringify(await _getQuestions()));
    }

    return (
        <div style={{width: '100%'}}>
            <Header/>
            <h2>Poll by {pollData.author}</h2>
            <h1>Would You Rather</h1>
            <button onClick={displayDbState}>show db state</button>
            <div style={containerStyle}>
                <div>
                <PollOption pollData={{question: pollData.optionOne.text, id: pollData.id, optionNum: 'optionOne'}}
                            voteCallback={registerVote}/>
                    {stat1}
                </div>
                <div>
                <PollOption pollData={{question: pollData.optionTwo.text, id: pollData.id, optionNum: 'optionTwo'}}
                            voteCallback={registerVote}/>
                    {stat2}
            </div>
            </div>
        </div>
    )
}

export default Poll;