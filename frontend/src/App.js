import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Room from './components/Room';
import CreateRoom from './components/CreateRoom';
import Footer from './components/Footer';

import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.js';

const App = () => {
  return (
    <div className='App h-100'>
      <div className='w-100 h-100'>
        <Routes>
          <Route path="/" element={<CreateRoom />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="*" element={<Navigate to="/" /> } />
        </Routes>
      </div>
    </div>
  )
}

export default App