import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Counter} from './features/counter/Counter';
import './App.css';
import Landing from "./features/misc/Landing";
import Home from "./features/polling/Home";
import Poll from "./features/polling/Poll";
import CreatePoll from "./features/polling/CreatePoll";
import Header from "./features/misc/Header";
import Leaderboard from "./features/polling/Leaderboard";

function App() {
    return (
        <BrowserRouter>
            <div className="App">

                <header className="App-header">
                    <Routes>
                        <Route path={'/'} element={<Landing/>}/>
                        <Route path={'/counter'} element={<Counter/>}/>
                        <Route path={'/home'} element={<Home/>}/>
                        <Route path={'/poll'} element={<Poll/>}/>
                        <Route path={'/add'} element={<CreatePoll/>}/>
                        <Route path={'/leaderboard'} element={<Leaderboard />}/>
                        <Route path={'*'} element={
                            <div>
                                <Header />
                                <h1>oopsies... page not found</h1>
                            </div>
                        }/>
                    </Routes>
                </header>

            </div>
        </BrowserRouter>
    );
}

export default App;
