import Header from "../misc/Header";
import PollOption from "./PollOption";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {populateStore, saveAnswer, selectQuestions, selectUser, selectUserList} from "./pollingSlice";

const Poll = () => {
    const polls = useAppSelector(selectQuestions);
    const user = useAppSelector(selectUser);
    const userList = useAppSelector(selectUserList);

    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    let desiredPoll: string | undefined;
    const [displayVote, setDisplayVote] = useState('none');

    const location = useLocation();
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
        const path = window.location.href;
        const idParam: string | undefined = path.split('/').pop();
        desiredPoll = idParam;
        getQuestion(desiredPoll);
        checkForVote();
    })

    const getQuestion = (questionId: string | undefined) => {
        if (typeof questionId === 'string') {
            let poll = polls.find((poll: any) => poll.id === questionId);
            setPollData(poll);
        } else {
            alert('poll not found');
            navigate('/');
        }
    }

    const avatarStyle = {
        width: '5%',
        // padding: '1%',
        marginTop: '1%'
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

            setTimeout(() => {
                setHasVoted(true);
                setDisplayStats(true);
            }, 1000);
        }
    }
    let stat1;
    let stat2;
    if (displayStats) {
        // @ts-ignore
        stat1 = <p>{pollData.optionOne.votes.length} voted this one which is {parseFloat(pollData.optionOne.votes.length / (pollData.optionOne.votes.length + pollData.optionTwo.votes.length) * 100).toFixed(2)} percent</p>
        // @ts-ignore
        stat2 = <p>{pollData.optionTwo.votes.length} voted for this which is {parseFloat(pollData.optionTwo.votes.length / (pollData.optionOne.votes.length + pollData.optionTwo.votes.length) * 100).toFixed(2)} percent</p>
    }

    const checkForVote = () => {
        if (pollData.id in user.answers) {
            if (user.answers[pollData.id] === 'optionOne') {
                setDisplayVote('optionOne');
            } else if (user.answers[pollData.id] === 'optionTwo') {
                setDisplayVote('optionTwo');
            }
        }
    }

    const pollAuthorAvatar = (author: string) => {
        if (author !== 'author') {
            let authorProfile = userList.find((user: { id: string; }) => {
                return user.id === author
            });
            return <img src={authorProfile.avatarURL} style={avatarStyle} alt={'profile avatar'}/>
        }
    }

    return (
        <div style={{width: '100%'}}>
            <Header/>
            <h2>Poll by {pollData.author}{pollAuthorAvatar(pollData.author)}</h2>
            <h1>Would You Rather</h1>
            <div style={containerStyle}>
                <div>
                <PollOption pollData={{question: pollData.optionOne.text, id: pollData.id, optionNum: 'optionOne'}}
                            voteCallback={registerVote} isVoted={displayVote}/>
                    {stat1}
                </div>
                <div>
                <PollOption pollData={{question: pollData.optionTwo.text, id: pollData.id, optionNum: 'optionTwo'}}
                            voteCallback={registerVote} isVoted={displayVote}/>
                    {stat2}
            </div>
            </div>
        </div>
    )
}

export default Poll;