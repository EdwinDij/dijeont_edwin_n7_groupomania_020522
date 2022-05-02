import {
  BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';

import Login from './pages/Login';
import Profil from './pages/Profil';
import Feed from './pages/Feed';


function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path ='/' element = {<Login />} />
        <Route path ='/feed' element = {<Feed />} />
        <Route path ='/profil' element = {<Profil />} />
   
    </Routes>
</BrowserRouter>
  );
}

export default App;
