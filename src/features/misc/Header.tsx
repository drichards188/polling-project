import {Link} from "react-router-dom";
import {Button} from "@mui/material";

const Header = () => {

    const linkStyle = {
        margin: "2%",
        textDecoration: 'none'
    };

    return (
        <div>
            <nav style={{display: "inline-block", minWidth: "50%"}}>
                <Link style={linkStyle} to={"/home"}>
                    <Button variant="contained">Home</Button>
                </Link>

                <Link style={linkStyle} to={"/leaderboard"}>
                    <Button variant="contained">Leaderboard</Button>
                </Link>

                <Link style={linkStyle} to={"/new"}>
                    <Button variant="contained">New</Button>
                </Link>
            </nav>
            <div style={{display: "inline-block", minWidth: "50%"}}>
                <div>
                    drichards
                </div>
                <Link style={linkStyle} to={'/'}>
                    <Button variant="contained">Log Out</Button>
                </Link>
            </div>
        </div>
    )
}

export default Header;