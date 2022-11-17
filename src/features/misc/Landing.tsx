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
        let userID = target.value;
        let userProfile;

        switch (userID) {
            case '12':
                userProfile = {
                    id: '12',
                    name: 'drichards',
                    company: 'enveloperty',
                    answered: ['13', '255', '162', '18', '22'],
                    created: ['92', '1', '5', '15']
                };
                break;
            case '13':
                userProfile = {
                    id: '13',
                    name: 'arichards',
                    company: 'ef go ahead',
                    answered: ['13', '255', '22'],
                    created: ['92', '1', '5', '15']
                };
                break;
        }

        dispatch(login({user: userProfile}));
        navigate('/home');
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