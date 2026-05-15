import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Relax from "./pages/Relax";
import Journal from "./pages/Journal";
import Profile from "./pages/Profile";

import BottomBar from "./components/bottombar/BottomBar";
import StickyNavbar from "./components/navbar/Navbar";
import Breath from "./components/relax/breath";
import SleepTimer from "./components/relax/SleepTimer";
import Music from './components/relax/Song';

export default function App() {
  return (
    <BrowserRouter>
   
      <div className="min-h-screen bg-[#04050a] text-white">

        {/* PAGE CONTENT */}
        <div className="pb-24 md:pb-0">
  <StickyNavbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/relax" element={<Relax />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/relax/breathing" element={<Breath />} />
            <Route path="/relax/sleep" element={<SleepTimer/>} />
            <Route path="/relax/music" element={<Music />}
/>
          </Routes>

        </div>

        {/* MOBILE APP BAR */}
        <BottomBar />

      </div>

    </BrowserRouter>
  );
}