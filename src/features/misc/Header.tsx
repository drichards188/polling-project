import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../polling/pollingSlice";

const Header = () => {
    const user = useAppSelector(selectUser);

    const linkStyle = {
        margin: "2%",
        textDecoration: 'none'
    };

    const avatarStyle = {
        width: '5%',
        // padding: '1%',
        marginTop: '1%'
    }

    return (
        <div>
            <nav style={{display: "inline-block", minWidth: "50%"}}>
                <Link style={linkStyle} to={"/home"}>
                    <Button variant="contained">Home</Button>
                </Link>

                <Link style={linkStyle} to={"/leaderboard"}>
                    <Button variant="contained">Leaderboard</Button>
                </Link>

                <Link style={linkStyle} to={"/add"} data-testid={'addPollButton'}>
                    <Button variant="contained">New</Button>
                </Link>
            </nav>
            <div style={{display: "inline-block", minWidth: "50%"}}>
                <div>
                    <img src={user.avatarURL} style={avatarStyle}/>
                    {user.name}
                </div>
                <Link style={linkStyle} to={'/'}>
                    <Button variant="contained" >Log Out</Button>
                </Link>
            </div>
        </div>
    )
}

export default Header;