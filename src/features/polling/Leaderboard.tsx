import Header from "../misc/Header";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppSelector} from "../../app/hooks";
import {selectUserList} from "./pollingSlice";

const Leaderboard = () => {
    const userList = useAppSelector(selectUserList);

    function createData(
        name: string,
        answers: number,
        questions: number
    ) {
        return {name, answers, questions};
    }

    type User = {
        id: string;
        name: string;
        company: string;
        answers: any;
        questions: Array<string>;
    }

    const orderedUsers = (): User[] => {
        let sortingList = [...userList];
        let mappedObj: any[] = [];
        let list = sortingList.sort((a: any, b: any) => {
                return (Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length);
            }
        )
        if (Array.isArray(list)) {
            mappedObj = list.map((user: any) => {
                return createData(user.name, Object.keys(user.answers).length, user.questions.length);
            })
        }

        return mappedObj;

    };

    return (
        <div>
            <Header/>
            <h1>Leaderboard</h1>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Users</TableCell>
                            <TableCell align="right">Answered</TableCell>
                            <TableCell align="right">Created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderedUsers().map((row: any) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.answers}</TableCell>
                                <TableCell align="right">{row.questions}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Leaderboard;