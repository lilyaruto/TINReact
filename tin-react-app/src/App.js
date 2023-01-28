
import './App.css';
import Header from './components/fragments/Header';
import Navigation from './components/fragments/Navigation';
import Footer from './components/fragments/Footer';
import MainContent from './components/fragments/MainContent';
import ManufacturerList from './components/manufacturer/ManufacturerList';
import ManufacturerDetails from './components/manufacturer/ManufacturerDetails';
import ManufacturerForm from './components/manufacturer/ManufacturerForm';
import {Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Header />
      <Navigation />
      <Routes>
        <Route path='/' element={<MainContent />} />
        <Route path='/manufacturer'>
          <Route index={true} element={<ManufacturerList />} />
          <Route path='details/:manId' element={<ManufacturerDetails />} />
          <Route path='add' element={<ManufacturerForm />} />
          <Route path='modify/:manId' element={<ManufacturerForm />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;