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

    const accountsData = {
        accounts:
            [
                {
                    id: '12',
                    name: 'david',
                    company: 'enveloperty'
                },
                {
                    id: '13',
                    name: 'Allie',
                    company: 'EF Go Ahead'
                }
            ]
    }

    const handleAccountSelect = (target: any) => {

        let userName = target.value;

        let userProfile = users.find((x: { id: string; }) => x.id === userName)

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
            >
                {
                    users.map((account: any) => {
                        return <MenuItem value={account.id}>{account.name}</MenuItem>
                    })
                }

            </Select>
        </div>
    )
}

export default Landing;