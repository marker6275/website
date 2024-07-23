import { React, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Home, Music, Projects, Contact, Future, Analyze } from './pages';
// import Resume from './pages/Resume';

// To update:
// npm run deploy
// change domain name to custom name on gh-pages

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
}

function App() {
    return (
        <body className='bg-[#D2D3D6] flex flex-col font-inter min-h-screen'>
            <Navbar />
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/music" element={<Music />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/future" element={<Future />} />
                <Route path="/analyze" element={<Analyze />} />
                {/* <Route path ="/resume" element={<Resume/>}/> */}
            </Routes>
        </body>
    )
}

export default App;