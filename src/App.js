import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Contact from './pages/Contact';
import Future from './pages/Future';
import Home from './pages/Home';
import Music from './pages/Music';
import Projects from './pages/Projects';
import Analyze from './pages/Analyze/Analyze';
// import Resume from './pages/Resume';
// To update:

// npm run deploy
// change domain name to custom name on gh-pages

const App = () => {
    return (
        <div className='bg-[#D2D3D6] flex flex-col h-screen font-inter'>
            <Navbar/>
            <Routes>
                <Route path ="/" element={<Home/>}/>
                <Route path ="/music" element={<Music/>}/>
                <Route path ="/projects" element={<Projects/>}/>
                <Route path ="/contact" element={<Contact/>}/>
                <Route path ="/future" element={<Future/>}/>
                <Route path ="/analyze" element={<Analyze/>}/>
                {/* <Route path ="/resume" element={<Resume/>}/> */}
            </Routes>
        </div>
    )
}

export default App;