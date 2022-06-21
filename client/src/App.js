
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom' ;
import Header from './components/Header';
import NewPet from './components/NewPet';
import Display from './components/Display';
import Pet from './components/Pet';
import UpdatePet from './components/UpdatePet';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Display />} />
          <Route path='/new' element={<NewPet />} />
          <Route path='/pets/:id' element={<Pet />} />
          <Route path='/pets/edit/:id' element={<UpdatePet />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
