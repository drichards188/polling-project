import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Counter} from './features/counter/Counter';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="App">

                <header className="App-header">
                    <Routes>
                        <Route path={'/'} element={<Counter />} />
                    </Routes>
                </header>

            </div>
        </BrowserRouter>
    );
}

export default App;
