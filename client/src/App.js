import './App.css';

import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Menu from './routes/Menu';
import Cart from './routes/Cart';
import Orders from './routes/Orders';
import Account from './routes/Account';
import LastPage from './routes/LastPage';
import ParticularItem from './routes/ParticularItem';
import { Provider } from 'react-redux';
import store from './components/store';
import { Toaster } from 'react-hot-toast';
import { getTotals } from './components/redux/ShoppingCart';
import ParticularCuisines from './routes/ParticularCuisines';
import Login from './routes/Login';
import Register from './routes/Register';

function App() {

  store.dispatch(getTotals())
  return (
     <div className='App'>
     <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/menu" element={<Menu />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/orders" element={<Orders />}/>
          <Route path="/profile" element={<Account/>}/>
          <Route path="/item/:id" element={<ParticularItem/>}/>
          <Route path="/foodtype/:id" element={<ParticularCuisines/>}/>
          <Route path="/confirm" element={<LastPage/>} />
        </Routes>
        <Toaster position='top-right'/>
      </Provider>
     </div>
  );
}

export default App;
