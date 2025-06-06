import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.tsx';
import Houses from './pages/Houses';
import BathComplex from './pages/BathComplex';
import Entertainment from './pages/Entertainment';
import Events from './pages/Events';
import {Header} from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import ScrollToTop from "./components/common/ScrollToTop.tsx";
import Reservation from "./pages/Reservation/Reservation.tsx";

function App() {
    return (
        <Router>
            <Header/>

            <main style={{ minHeight: '80vh' }}>

                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/houses" element={<Houses />} />
                    <Route path="/bath-complex" element={<BathComplex />} />
                    <Route path="/entertainment" element={<Entertainment />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/reservation" element={<Reservation />} />
                </Routes>
            </main>

            <Footer/>
        </Router>
    );
}

export default App;
