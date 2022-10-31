import {Button} from "@mui/material";
import Header from "../misc/Header";
import PollOption from "./PollOption";

const Poll = () => {

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
                <PollOption pollData={{question: 'Build our new app with JS', id: 1}}/>
                <PollOption pollData={{question: 'Build with TS', id:1}}/>
            </div>
        </div>
    )
}

export default Poll;