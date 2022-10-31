import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Counter} from './features/counter/Counter';
import './App.css';
import Landing from "./features/landing/Landing";

function App() {
    return (
        <BrowserRouter>
            <div className="App">

                <header className="App-header">
                    <Routes>
                        <Route path={'/'} element={<Landing />} />
                        <Route path={'/counter'} element={<Counter />} />
                    </Routes>
                </header>

            </div>
        </BrowserRouter>
    );
}

export default App;
