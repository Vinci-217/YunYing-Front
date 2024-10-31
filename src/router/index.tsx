import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TalentTank from '@/pages/TalentRank';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/talentrank" element={<TalentTank />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;