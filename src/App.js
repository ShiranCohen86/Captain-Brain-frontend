import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { useSelector } from 'react-redux';

function App() {
  const isShownKeyboard = useSelector((state) => state.UtilReducer.isShownKeyboard);
   //isShownKeyboard && setTimeout(() => document.querySelector('body').scrollIntoView({ behavior: "instant", inline: "start" }), 300);

  return (
    <Router>
      <div className="App main-layout">
        <Routes>
          <Route element={<HomePage />} path="/" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
