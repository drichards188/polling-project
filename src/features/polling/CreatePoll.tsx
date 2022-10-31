import {Button, TextField} from "@mui/material";
import Header from "../misc/Header";

const CreatePoll = () => {

    const containerStyle = {
        backgroundColor: "#C9ced2",
        padding: '1%',
        margin: '1%',
        display: 'inline-block',
        width: '80%'
    }

    return (
        <div>
        <Header />
        <div style={containerStyle}>
            <h1>Create Your own poll</h1>
            <TextField id="outlined-basic" label="Option One" variant="outlined" />
            <TextField id="outlined-basic" label="Option Two" variant="outlined" />
            <Button variant="contained">Submit</Button>
        </div>
        </div>
    )
}

export default CreatePoll;