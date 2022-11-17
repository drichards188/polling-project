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
    let desiredPoll: string;
    const [searchParams, setSearchParams] = useSearchParams();
    const [pollData, setPollData] = useState({
        id: 0,
        author: 'author',
        option1: 'option1',
        option2: 'option2',
        answered1: 0,
        answered2: 0, name: 'name', time: '3:00 pm', date: '01/01/2022'
    });
    const [displayStats, setDisplayStats] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {
        let idParam = searchParams.get('id');

        if (typeof idParam === 'string') {
            desiredPoll = idParam;
            let poll = polls.find((poll: any) => poll.id === desiredPoll);
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
        stat1 = <p>{pollData.answered1} voted this one which is {parseFloat(pollData.answered1 / (pollData.answered1 + pollData.answered2) * 100).toFixed(2)} percent</p>
        // @ts-ignore
        stat2 = <p>{pollData.answered2} voted for this which is {parseFloat(pollData.answered2 / (pollData.answered1 + pollData.answered2) * 100).toFixed(2)} percent</p>
    }

    return (
        <div style={{width: '100%'}}>
            <Header/>
            <h2>Poll by {pollData.author}</h2>
            <h1>Would You Rather</h1>
            <div style={containerStyle}>
                <div>
                <PollOption pollData={{question: pollData.option1, id: 1, optionNum: 1}}
                            voteCallback={registerVote}/>
                    {stat1}
                </div>
                <div>
                <PollOption pollData={{question: pollData.option2, id: 1, optionNum: 2}}
                            voteCallback={registerVote}/>
                    {stat2}
            </div>
            </div>
        </div>
    )
}

export default Poll;