import logo from './logo.svg';
import './App.css';
import Issues from './Issues';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img  width="380" height="70" src={logo}  className="App-logo" alt="logo" />
      </header>
        <Issues/>
    </div>
  );
}

export default App;
