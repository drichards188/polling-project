import {Button} from "@mui/material";

const Card = ({userData}: any) => {

    const cardStyle = {
        backgroundColor: "white",
        width: '25%',
        padding: '.5%',
        display: 'inline-block',
        margin: '.5%'
    }

    return (
        <div style={cardStyle}>
            <h2>{userData.name}</h2>
            <h3>{userData.date} | {userData.time}</h3>
            <Button variant='contained'>Show</Button>
        </div>
    )
}

export default Card;