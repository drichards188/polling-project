import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Card = ({pollData}: any) => {
    const navigate = useNavigate();

    const cardStyle = {
        backgroundColor: "white",
        width: '25%',
        padding: '.5%',
        display: 'inline-block',
        margin: '.5%'
    }

    const handleShow = () => {
        navigate(`/poll?id=${pollData.id}`)
    }

    return (
        <div style={cardStyle}>
            <h2>{pollData.name}</h2>
            <Button variant='contained' onClick={handleShow}>Show</Button>
        </div>
    )
}

export default Card;