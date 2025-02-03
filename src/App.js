import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { useDispatch } from 'react-redux';
import { getAvailableModels } from "../src/store/actions/OpenAiActions";


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAvailableModels())
  }, [dispatch])

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
