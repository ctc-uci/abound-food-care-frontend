import React from 'react';
import { Button, DatePicker } from 'antd';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';

function App() {
  return (
    <div className="App">
      <Header />
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
        <Button type="primary"> dummy antdesign button </Button>
        <DatePicker placeholder="select date" />
      </header>
      <Footer />
    </div>
  );
}

export default App;
