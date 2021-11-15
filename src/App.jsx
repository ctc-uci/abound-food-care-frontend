/* eslint-disable no-alert */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Button, DatePicker } from 'antd';
import './App.css';
import 'antd/dist/antd.css';

// Pages
import Login from './pages/Login';
import About from './pages/About';
import Partners from './pages/Partners';
import Solutions from './pages/Solutions';
import Events from './pages/Events';
import Volunteers from './pages/Volunteers';
import Profile from './pages/Profile';
import Event from './pages/Event';
import Waivers from './pages/Waivers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/partners" exact element={<Partners />} />
        <Route path="/solutions" exact element={<Solutions />} />
        <Route path="/events" exact element={<Events />} />
        <Route path="/volunteers" exact element={<Volunteers />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/event" exact element={<Event />} />
        <Route path="/waivers" exact element={<Waivers />} />
      </Routes>
    </Router>
  );
}

export default App;

/*
<div className="App">
      <header className="App-header">
        <p>
          *AntDesign provides a set of high-quality React components out of the box!*
          <br />
          <a href="https://ant.design/components/overview/" target="_blank" rel="noreferrer">
            Overview of available AntDesign components
          </a>
        </p>
        <br />
        <h1 style={{ color: 'white' }}>Example Ant Design Components</h1>
        <Button type="primary" onClick={() => alert('you clicked me!')}>
          dummy antdesign button
        </Button>
        <DatePicker placeholder="select date" />
      </header>
    </div>

*/
