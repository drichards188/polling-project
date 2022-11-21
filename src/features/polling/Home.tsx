import {
    selectQuestions, selectUser
} from './pollingSlice'
import Header from "../misc/Header";
import Card from "./Card";

import {useAppSelector} from "../../app/hooks";
import {useState} from "react";
import {Button} from "@mui/material";

const Home = () => {
    const questions = useAppSelector(selectQuestions);
    const user = useAppSelector(selectUser);

    const [showUnanswered, setShowUnanswered] = useState(true);
    const [showAnswered, setShowAnswered] = useState(true);

    const containerStyle = {
        backgroundColor: "#C9ced2",
        padding: '1%',
        margin: '1%'
    }

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
            <Button onClick={() => {
                !showUnanswered ?
                    setShowUnanswered(true)
                    :
                    setShowUnanswered(false)

            }}>toggle unanaswered polls</Button>
            <Button onClick={() => {
                !showAnswered ?
                    setShowAnswered(true)
                    :
                    setShowAnswered(false)

            }}>toggle answered polls</Button>
            <div style={containerStyle}>
                <h1>New Questions</h1>
                {showUnanswered && generatePollUnanswers().map((poll: any) => <Card key={poll.id}
                                                                                    pollData={{
                                                                                        id: poll.id,
                                                                                        name: poll.author,
                                                                                        time: poll.time,
                                                                                        date: poll.date
                                                                                    }}/>)}
            </div>
            <div style={containerStyle}>
                <h1>answers Questions</h1>
                {showAnswered && generatePollanswers().map((poll: any) => <Card key={poll.id}
                                                                                pollData={{
                                                                                    id: poll.id,
                                                                                    name: poll.author,
                                                                                    time: poll.time,
                                                                                    date: poll.date
                                                                                }}/>)}
            </div>
        </div>
    )
}

export default Home;