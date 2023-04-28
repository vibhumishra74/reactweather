import logo from './logo.svg';
import './App.css';
import WeatherApp from './component/Weather';
import { Routes, Route, Link } from 'react-router-dom';
import HistoryPage from './component/HistoryPage';

function App() {
  return (
    
    <div className="App">
           <Routes>
        <Route
          path="/"
          element={
            <WeatherApp />
          }
        />
        <Route
          path="/history"
          element={<HistoryPage /> }
        />
      </Routes>
    </div>
  );
}

export default App;
