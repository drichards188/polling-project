import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../polling/pollingSlice";
import {Navigate, useLocation, useNavigate} from "react-router-dom";

const RequireAuth = ({children}: any) => {
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);

    const authed = (): boolean => {
        let isAuthed: boolean;

        user.id ? isAuthed = true : isAuthed = false;

        return isAuthed;
    }

    return authed() ? (
        children
    ) : (
        <Navigate to={'/'}></Navigate>
    )
}

export default RequireAuth;