import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Contact from './pages/Contact';
import Future from './pages/Future';
import Home from './pages/Home';
import Music from './pages/Music';
import Projects from './pages/Projects';

const App = () => {
    return (
        <div className='bg-[#EBE8E2] flex flex-col h-screen'>
            <Navbar />
            <Routes>
                <Route path ="/" element={<Home />}></Route>
                <Route path ="/music" element={<Music />}></Route>
                <Route path ="/projects" element={<Projects/>}></Route>
                <Route path ="/contact" element={<Contact />}></Route>
                <Route path ="/future" element={<Future />}></Route>
            </Routes>
        </div>
    )
}

export default App;