import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import Landing from "./features/misc/Landing";
import Home from "./features/polling/Home";
import Poll from "./features/polling/Poll";
import CreatePoll from "./features/polling/CreatePoll";
import Header from "./features/misc/Header";
import Leaderboard from "./features/polling/Leaderboard";
import RequireAuth from "./features/misc/RequireAuth";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <header className="App-header">
                    <Routes>
                        <Route path={'/'} element={<RequireAuth><Home/></RequireAuth>}/>
                        <Route path={'/login'} element={<Landing/>}/>
                        <Route path={'/questions/*'} element={<RequireAuth><Poll/></RequireAuth>}/>
                        <Route path={'/add'} element={<RequireAuth><CreatePoll/></RequireAuth>}/>
                        <Route path={'/leaderboard'} element={<RequireAuth><Leaderboard/></RequireAuth>}/>
                        <Route path={'*'} element={
                            <div>
                                <RequireAuth>
                                    <Header/>
                                    <h1>oopsies... page not found</h1>
                                </RequireAuth>
                            </div>
                        }/>
                    </Routes>
                </header>
            </div>
        </BrowserRouter>
    );
}

export default App;
