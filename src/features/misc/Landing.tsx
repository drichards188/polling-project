import {InputLabel, MenuItem, Select} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {login, populateStore, selectUserList} from "../polling/pollingSlice";
import {useEffect} from "react";

const Landing = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const users = useAppSelector(selectUserList);

    useEffect(() => {
        dispatch(populateStore());
    }, []);

    const handleAccountSelect = (target: any) => {

        let userName = target.value;

        let userProfile = users.find((user: { id: string; }) => user.id === userName)

        if (userProfile !== undefined) {
            dispatch(login({user: userProfile}));
            navigate('/home');
        } else {
            alert('user not found error');
        }
    }

    return (
        <div>
            <h1>Please Select Your Account</h1>
            <Select
                onChange={(e)=>{handleAccountSelect(e.target)}}
                label={'Select Account'}
                data-testid={'accountSelect'}
            >
                {
                    users.map((account: any) => {
                        return <MenuItem key={account.id} value={account.id}>{account.name}</MenuItem>
                    })
                }

            </Select>
            <h3>Made by David</h3>
        </div>
    )
}

export default Landing;