import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import ProductsScreen from "./screens/ProductsScreen";

function App() {
  return (
    <div className=''>
      <Navbar />

      <Routes>
        <Route path='/products' element={<ProductsScreen />} />
      </Routes>
    </div>
  );
}

export default App;
