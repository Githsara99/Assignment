import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

import Header from './Components/headers/Header'
import AddLocation from './pages/Location/addLocation';
import ManageLocation from './pages/Location/manageLocation';
import EditLocation from './pages/Location/editLocation';

import AddDevice from './pages/Device/addDevice';
import ManageDevice from './pages/Device/manageDivice';
import EditDevice from './pages/Device/editDevice';

function App() {
  return (

 <Router>  
<Header />
    
   <Routes>
    
    <Route path="/addLocation" element={<AddLocation/>}></Route>
    <Route path="/manageLocation" element={<ManageLocation/>}></Route>
    <Route path="/editLocation/:id" element={<EditLocation/>}></Route> 

    <Route path="/addDevice" element={<AddDevice/>}></Route>
    <Route path="/manageDevice" element={<ManageDevice/>}></Route>
    <Route path="/editDevice/:id" element={<EditDevice/>}></Route>
   </Routes>
  
 </Router>   
  );
}

export default App;
