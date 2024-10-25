import './App.css';
import Login from './Pages/Registration/Login';
import Calendar from './Pages/Calendar/Calendar';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('Ngo9BigBOggjHTQxAR8/V1NDaF5cWWtCf1JpR2BGfV5ycEVFallWTnZcUj0eQnxTdEFiWX1acXFQTmFdUEZwVg==');


function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/calendar' element={<Calendar />}/>
      </Routes>
    </Router>
  );
}

export default App;
