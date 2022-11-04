import {
    increment,
    selectCount, selectPolls, selectUser
} from './pollingSlice'
import Header from "../misc/Header";
import Card from "./Card";
import {useAppDispatch, useAppSelector} from "../../app/hooks";

const Home = () => {
    const polls = useAppSelector(selectPolls);
    const user = useAppSelector(selectUser);

    const containerStyle = {
        backgroundColor: "#C9ced2",
        padding: '1%',
        margin: '1%'
    }

    const generatePollAnswered = (): [any] => {
        return polls.filter((poll: any) => {
            if (user.answered.find((pollId: any) => pollId === poll.id)) {
                return poll;
            }
        })
    }

    const generatePollUnanswered = (): [any] => {
        return polls.filter((poll: any) => {
            if (!user.answered.find((pollId: any) => pollId === poll.id)) {
                return poll;
            }
        })
    }

    return (
        <div style={{minWidth: "80%"}}>
            <Header/>
            <h1>Home</h1>
            <div style={containerStyle}>
                <h1>New Questions</h1>
                {generatePollUnanswered().map((poll: any) => <Card
                    pollData={{id: poll.id, name: poll.author, time: poll.time, date: poll.date}}/>)}
            </div>
            <div style={containerStyle}>
                <h1>Answered Questions</h1>
                {generatePollAnswered().map((poll: any) => <Card
                    pollData={{id: poll.id, name: poll.author, time: poll.time, date: poll.date}}/>)}
            </div>
        </div>
    )
}

export default Home;