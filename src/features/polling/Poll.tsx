import {Button} from "@mui/material";

const Poll = () => {

    const containerStyle = {
        backgroundColor: "#C9ced2",
        padding: '1%',
        margin: '1%',
        display: 'inline-block',
        width: '80%'
    }

    const cardStyle = {
        backgroundColor: "white",
        width: '25%',
        padding: '.5%',
        margin: '.5%',
        display: 'inline-block'
    }

    return (
        <div style={{width: '100%'}}>
            <h1>Would You Rather</h1>
            <div style={containerStyle}>
                <div style={cardStyle}>
                    <h2>Build our new app with JS</h2>
                    <Button variant="contained">This One!</Button>
                </div>
                <div style={cardStyle}>
                    <h2>Build with TS</h2>
                    <Button variant="contained">No No, This One!</Button>
                </div>
            </div>
        </div>
    )
}

export default Poll;