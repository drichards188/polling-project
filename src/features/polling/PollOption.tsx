import {Button} from "@mui/material";

const PollOption = ({pollData, voteCallback}: any) => {

    const cardStyle = {
        backgroundColor: "white",
        width: '25%',
        padding: '.5%',
        margin: '.5%',
        display: 'inline-block'
    }

    return (
        <div style={cardStyle}>
            <h2>{pollData.question}</h2>
            <Button variant="contained" onClick={() => voteCallback(2)}>This One!</Button>
        </div>
    )
}

export default PollOption;