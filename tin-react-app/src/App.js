
import './App.css';
import Header from './components/fragments/Header';
import Navigation from './components/fragments/Navigation';
import Footer from './components/fragments/Footer';
import MainContent from './components/fragments/MainContent';

import ManufacturerList from './components/manufacturer/ManufacturerList';
import ManufacturerDetails from './components/manufacturer/ManufacturerDetails';
import ManufacturerForm from './components/manufacturer/ManufacturerForm';

import ModelList from './components/model/ModelList';
import ModelDetails from './components/model/ModelDetails';
import ModelForm from './components/model/ModelForm';

import AddressList from './components/address/AddressList';
import AddressDetails from './components/address/AddressDetails';
import AddressForm from './components/address/AddressForm';

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
        <Route path='/model'>
          <Route index={true} element={<ModelList />} />
          <Route path='details/:modId' element={<ModelDetails />} />
          <Route path='add' element={<ModelForm />} />
          <Route path='modify/:modId' element={<ModelForm />} />
        </Route>
        <Route path='/address'>
          <Route index={true} element={<AddressList />} />
          <Route path='details/:adrId' element={<AddressDetails />} />
          <Route path='add' element={<AddressForm />} />
          <Route path='modify/:adrId' element={<AddressForm />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;