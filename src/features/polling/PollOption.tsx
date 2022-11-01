import {Button} from "@mui/material";

const PollOption = ({pollData}: any) => {

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
            <Button variant="contained" onClick={() => alert(pollData.id)}>This One!</Button>
        </div>
    )
}

export default PollOption;