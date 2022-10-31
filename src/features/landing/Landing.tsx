import {InputLabel, MenuItem, Select} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Landing = () => {

    const navigate = useNavigate();

    const accountsData = {
        accounts:
            [
                {
                    id: 12,
                    name: 'david',
                    company: 'enveloperty'
                },
                {
                    id: 13,
                    name: 'Allie',
                    company: 'EF Go Ahead'
                }
            ]
    }

    const handleAccountSelect = (e: any) => {
        navigate('/counter')
    }

    return (
        <div>
            <h1>Please Select Your Account</h1>
            <Select
                onChange={handleAccountSelect}
                label={'Select Account'}
            >
                {/*{menuItem values are account IDs}*/}

                {
                    accountsData.accounts.map((account) => {
                        return <MenuItem value={account.id}>{account.name} | {account.company}</MenuItem>
                    })
                }

                {/*<MenuItem value={12}>David</MenuItem>*/}
                {/*<MenuItem value={13}>Allie</MenuItem>*/}
            </Select>
        </div>
    )
}

export default Landing;