import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './home';
import TableBox from './table';
import SpellC from './spellChecker';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/table" element={<TableBox/>}/>
        <Route path="/spell" element={<SpellC/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
