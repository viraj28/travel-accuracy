import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Service from './Pages/Service';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import PackageEdit from './Pages/Package/PackageEdit';
import PackageCreate from './Pages/Package/PackageCreate';

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Login />} />
        <Route
          path="/package/add"
          element={
            user && (user.role === 'admin' || user.role === 'dmc') ? (
              <PackageCreate />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/package/edit/:id"
          element={
            user && user.role === 'admin' ? (
              <PackageEdit />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default App;
