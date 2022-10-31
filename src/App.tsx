import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Counter} from './features/counter/Counter';
import './App.css';
import Landing from "./features/misc/Landing";
import Home from "./features/polling/Home";
import Poll from "./features/polling/Poll";
import CreatePoll from "./features/polling/CreatePoll";

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
                        <Route path={'/new'} element={<CreatePoll/>}/>
                    </Routes>
                </header>

            </div>
        </BrowserRouter>
    );
}

export default App;
