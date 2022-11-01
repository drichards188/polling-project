import {
    increment,
    selectCount, selectUser
} from './pollingSlice'
import Header from "../misc/Header";
import Card from "./Card";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Button} from "@mui/material";

const Home = () => {
    const dispatch = useAppDispatch();

    const containerStyle = {
        backgroundColor: "#C9ced2",
        padding: '1%',
        margin: '1%'
    }

    return (
        <div style={{minWidth: "80%"}}>
            <Header/>
            <h1>Home</h1>
            <Button variant="contained" onClick={()=> dispatch(increment())}>+</Button>
            <div style={containerStyle}>
                <h1>New Questions</h1>
                <Card userData={{id: 12, name: 'David', time: '3:00 pm', date: '11/22/2022'}}/>
            </div>
            <div style={containerStyle}>
                <h1>Answered Questions</h1>
                <Card userData={{id: 12, name: 'Allie', time: '3:25 pm', date: '01/22/2022'}}/>
            </div>
        </div>
    )
}

export default Home;