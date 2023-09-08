import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Contact from './pages/Contact';
import Future from './pages/Future';
import Home from './pages/Home';
import Music from './pages/Music';

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path ="/" element={<Home />}></Route>
                <Route path ="/music" element={<Music />}></Route>
                <Route path ="/contact" element={<Contact />}></Route>
                <Route path ="/future" element={<Future />}></Route>
            </Routes>
        </div>
    )
}

export default App;