import Header from "../misc/Header";
import PollOption from "./PollOption";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppSelector} from "../../app/hooks";
import {selectPolls} from "./pollingSlice";

const Poll = () => {
    const polls = useAppSelector(selectPolls);

    const [searchParams, setSearchParams] = useSearchParams();
    const [pollData, setPollData] = useState({
        id: 0,
        option1: 'option1',
        option2: 'option2',
        answered1: 0,
        answered2: 0, name: 'name', time: '3:00 pm', date: '01/01/2022'
    });

    useEffect(() => {
        let idParam = searchParams.get('id');
        let desiredPoll: number;
        if (typeof idParam === 'string') {
            desiredPoll = parseInt(idParam);
        }
        let poll = polls.find((poll: any) => poll.id === desiredPoll);
        setPollData(poll);
    })

    const containerStyle = {
        backgroundColor: "#C9ced2",
        padding: '1%',
        margin: '1%',
        display: 'inline-block',
        width: '80%'
    }

    return (
        <div style={{width: '100%'}}>
            <Header/>
            <h1>Would You Rather</h1>
            <div style={containerStyle}>
                <PollOption pollData={{question: pollData.option1, id: 1}}/>
                <PollOption pollData={{question: pollData.option2, id: 1}}/>
            </div>
        </div>
    )
}

export default Poll;