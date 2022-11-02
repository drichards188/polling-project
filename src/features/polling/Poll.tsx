import Header from "../misc/Header";
import PollOption from "./PollOption";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {catalogVote, selectPolls} from "./pollingSlice";

const Poll = () => {
    const polls = useAppSelector(selectPolls);
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    let desiredPoll: number;
    const [searchParams, setSearchParams] = useSearchParams();
    const [pollData, setPollData] = useState({
        id: 0,
        author: 'author',
        option1: 'option1',
        option2: 'option2',
        answered1: 0,
        answered2: 0, name: 'name', time: '3:00 pm', date: '01/01/2022'
    });

    useEffect(() => {
        let idParam = searchParams.get('id');

        if (typeof idParam === 'string') {
            desiredPoll = parseInt(idParam);
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

        dispatch(catalogVote({id: desiredPoll, vote: selectedOption}))
    }

    return (
        <div style={{width: '100%'}}>
            <Header/>
            <h2>Poll by {pollData.author}</h2>
            <h1>Would You Rather</h1>
            <div style={containerStyle}>
                <PollOption pollData={{question: pollData.option1, id: 1, optionNum: 1}} voteCallback={registerVote}/>
                <PollOption pollData={{question: pollData.option2, id: 1, optionNum: 2}} voteCallback={registerVote}/>
            </div>
        </div>
    )
}

export default Poll;