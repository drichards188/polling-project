import {
    selectQuestions, selectUser
} from './pollingSlice'
import Header from "../misc/Header";
import Card from "./Card";

import {useAppSelector} from "../../app/hooks";

const Home = () => {
    const questions = useAppSelector(selectQuestions);
    const user = useAppSelector(selectUser);

    const containerStyle = {
        backgroundColor: "#C9ced2",
        padding: '1%',
        margin: '1%'
    }

    //todo answers changes to answer using new profile data
    const generatePollanswers = (): [any] => {
        return questions.filter((poll: any) => {
            if (poll.id in user.answers) {
                return poll;
            }

        })
    }

    const generatePollUnanswers = (): [any] => {
        return questions.filter((poll: any) => {
            if (!(poll.id in user.answers)) {
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
                {generatePollUnanswers().map((poll: any) => <Card key={poll.id}
                    pollData={{id: poll.id, name: poll.author, time: poll.time, date: poll.date}}/>)}
            </div>
            <div style={containerStyle}>
                <h1>answers Questions</h1>
                {generatePollanswers().map((poll: any) => <Card key={poll.id}
                    pollData={{id: poll.id, name: poll.author, time: poll.time, date: poll.date}}/>)}
            </div>
        </div>
    )
}

export default Home;