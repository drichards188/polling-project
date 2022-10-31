import {Link} from "react-router-dom";
import {Button} from "@mui/material";

const Home = () => {

    const linkStyle = {
        margin: "2%",
    };

    return (
        <div style={{minWidth: "80%"}}>
            <nav style={{display: "inline-block", minWidth: "100%"}}>
                <Link style={linkStyle} to={'/'}>
                    <Button variant="contained">Log Out</Button>
                </Link>

                <Link style={linkStyle} to={"/search"}>
                    <Button variant="contained">Home</Button>
                </Link>

                <Link style={linkStyle} to={"/search"}>
                    <Button variant="contained">Leaderboard</Button>
                </Link>

                <Link style={linkStyle} to={"/new"}>
                    <Button variant="contained">New</Button>
                </Link>
            </nav>
            <h1>Home</h1>
        </div>
    )
}

export default Home;