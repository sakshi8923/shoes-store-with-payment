import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Shop from './pages/Shop';
import Payment from './pages/Payment';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;