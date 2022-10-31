import {Link} from "react-router-dom";
import {Button} from "@mui/material";

import Header from "../misc/Header";
import Card from "./Card";

const Home = () => {

    const containerStyle = {
        backgroundColor: "#C9ced2",
        padding: '1%',
        margin: '1%'
    }

    return (
        <div style={{minWidth: "80%"}}>
            <Header/>
            <h1>Home</h1>
            <div style={containerStyle}>
                <h1>New Questions</h1>
                <Card userData={{id: 12, name: 'David', time: '3:00 pm', date: '11/22/2022'}} />
            </div>
            <div style={containerStyle}>
                <h1>Answered Questions</h1>
            </div>
        </div>
    )
}

export default Home;