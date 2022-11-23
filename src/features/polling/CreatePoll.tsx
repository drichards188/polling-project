import {Button, TextField} from "@mui/material";
import Header from "../misc/Header";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {populateStore, saveQuestion, selectUser} from "./pollingSlice";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const CreatePoll = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();

    const [optionOne, setOptionOne] = useState('');
    const [optionTwo, setOptionTwo] = useState('');

    const containerStyle = {
        backgroundColor: "#C9ced2",
        padding: '1%',
        margin: '1%',
        display: 'inline-block',
        width: '80%'
    }

    const createPoll = () => {
        const guid = crypto.randomUUID();
        const poll = {id: guid, option1: optionOne, option2: optionTwo, author: user.name, answered1: 0, answered2: 0, time: Date.now(), date: '11/22/2022'};
        const questionData = {
            author: user.id,
            optionOneText: optionOne,
            optionTwoText: optionTwo
        };

        dispatch(saveQuestion(questionData));
        dispatch(populateStore());
        navigate('/')
    }

    return (
        <div>
            <Header/>
            <div style={containerStyle}>
                <h1>Would you rather _____?</h1>
                <TextField id="outlined-basic" label="Option One" variant="outlined" required={true} onChange={(e) => setOptionOne(e.target.value)}/>
                <TextField id="outlined-basic" label="Option Two" variant="outlined" required={true} onChange={(e) => setOptionTwo(e.target.value)}/>
                <Button variant="contained" onClick={createPoll}>Submit</Button>
            </div>
        </div>
    )
}

export default CreatePoll;