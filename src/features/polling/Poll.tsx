import Header from "../misc/Header";
import PollOption from "./PollOption";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {catalogVote, selectQuestions} from "./pollingSlice";

const Poll = () => {
    const polls = useAppSelector(selectQuestions);
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
        if (typeof idParam === 'string') {
            let poll = polls.find((poll: any) => poll.id === idParam);
            setPollData(poll);
        } else {
            alert('poll not found');
            navigate('/home');
        }
    })

    const containerStyle = {
        backgroundColor: "#C9ced2",
        padding: '1%',
        margin: '1%',
        display: 'inline-block',
        width: '80%'
    }

    const registerVote = (selectedOption: number) => {
        if (!hasVoted) {
            dispatch(catalogVote({id: desiredPoll, vote: selectedOption}));
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

    return (
        <div style={{width: '100%'}}>
            <Header/>
            <h2>Poll by {pollData.author}</h2>
            <h1>Would You Rather</h1>
            <div style={containerStyle}>
                <div>
                <PollOption pollData={{question: pollData.optionOne.text, id: 1, optionNum: 'optionOne'}}
                            voteCallback={registerVote}/>
                    {stat1}
                </div>
                <div>
                <PollOption pollData={{question: pollData.optionTwo.text, id: 1, optionNum: 'optionTwo'}}
                            voteCallback={registerVote}/>
                    {stat2}
            </div>
            </div>
        </div>
    )
}

export default Poll;