import {Button} from "@mui/material";
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "./pollingSlice";

const PollOption = ({pollData, voteCallback}: any) => {
    const user = useAppSelector(selectUser);

    const cardStyle = {
        backgroundColor: "white",
        width: '25%',
        padding: '.5%',
        margin: '.5%',
        display: 'inline-block'
    }

    return (
        <div style={cardStyle}>
            <h2>{pollData.question}?</h2>
            <Button variant="contained" onClick={() => voteCallback(pollData.optionNum, user.id)}>This One!</Button>
        </div>
    )
}

export default PollOption;