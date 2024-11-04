import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import TalentTank from '@/pages/TalentRank';
import Developer from '@/pages/Developer';
const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path="/talentrank" element={<TalentTank />} />
        <Route path="/developer" element={<Developer />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;