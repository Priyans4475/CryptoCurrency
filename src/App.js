import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Home from './components/Home';
import Coins from './components/Coins';
import './styles/app.css'
import Exchanges from './components/Exchanges';
import CoinDetails from './components/CoinDetails';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
   <Router>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/coins' element={<Coins/>}/>
      <Route path='/exchanges' element={<Exchanges/>}/>
      <Route path='/coins/:id' element={<CoinDetails/>}/>

      {/* <Route path='/*' element={<CoinDetails/>}/> */}

      
  



    </Routes>
    <Footer/>
   </Router>
  );
}

export default App;
