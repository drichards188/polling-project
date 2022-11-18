import {Button} from "@mui/material";
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "./pollingSlice";
import {useEffect, useState} from "react";
import {_saveQuestionAnswer} from "../misc/DATA";

const PollOption = ({pollData, voteCallback}: any) => {
    const [displayVoted, setDisplayVoted] = useState(false);

    const user = useAppSelector(selectUser);

    const cardStyle = {
        backgroundColor: "white",
        width: '25%',
        padding: '.5%',
        margin: '.5%',
        display: 'inline-block'
    }

    let voteIcon;
    if (displayVoted) {
        voteIcon = <h1>You Voted</h1>
    }

    useEffect(() => {
        if (pollData.id in user.answers) {
            if (user.answers[pollData.id] === pollData.optionNum) {
                setDisplayVoted(true);
            }
        } else {
            setDisplayVoted(false);
        }
    })

    return (
        <div style={cardStyle}>
            <h2>{pollData.question}?</h2>
            {voteIcon}
            <Button variant="contained" onClick={()=>{voteCallback(pollData.optionNum)}}>This One!</Button>
        </div>
    )
}

export default PollOption;