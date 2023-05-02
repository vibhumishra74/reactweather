import WeatherApp from './component/weather';
import { Routes, Route } from 'react-router-dom';
import HistoryPage from './component/historypage';
import './App.css';

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
