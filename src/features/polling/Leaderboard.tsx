import Header from "../misc/Header";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Leaderboard = () => {

    function createData(
        name: string,
        answered: number,
        created: number
    ) {
        return { name, answered, created };
    }

    const rows = [
        createData('Sarah Edo', 8, 15, ),
        createData('Mike Tsamis', 7, 4),
        createData('Tyler McGinnis', 3, 2),
        createData('Zenobia Oshikanlu', 1, 2),
    ];

    return (
        <div>
            <Header />
            <h1>Leaderboard</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Users</TableCell>
                            <TableCell align="right">Answered</TableCell>
                            <TableCell align="right">Created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.answered}</TableCell>
                                <TableCell align="right">{row.created}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Leaderboard;