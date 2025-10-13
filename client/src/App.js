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
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import PublicRoute from './components/PublicRoute/publicRoute';

function App() {

  store.dispatch(getTotals())
  return (
     <div className='App'>
     <Provider store={store}>
        <Routes>
          <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
          <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
          <Route path="/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>}/>
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>}/>
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>}/>
          <Route path="/profile" element={<ProtectedRoute><Account/></ProtectedRoute>}/>
          <Route path="/item/:id" element={<ProtectedRoute><ParticularItem/></ProtectedRoute>}/>
          <Route path="/foodtype/:id" element={<ProtectedRoute><ParticularCuisines/></ProtectedRoute>}/>
          <Route path="/confirm" element={<ProtectedRoute><LastPage/></ProtectedRoute>} />
        </Routes>
        <Toaster position='top-right'/>
      </Provider>
     </div>
  );
}

export default App;
