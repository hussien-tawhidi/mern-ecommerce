import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import ProductDetials from "./screens/ProductDetials";
import Cart from "./screens/Cart";
import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Register from "./screens/Register";
import Footer from "./components/Footer";
import UpdateProfile from "./screens/UpdateProfile";
import Shipping from "./screens/Shipping";
import { useSelector } from "react-redux";
import Payment from "./screens/Payment";
import PlaceOrder from "./screens/PlaceOrder";
import OrderScreens from "./screens/OrderScreens";

function App() {
  const user = useSelector((state) => state?.user);
  const { userAuth } = user;
  return (
    <div className=''>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/product-details/:id' element={<ProductDetials />} />
        <Route path='/update-profile/:id' element={<UpdateProfile />} />
        <Route
          path='/profile/:id'
          element={userAuth ? <Profile /> : <Login />}
        />
        <Route path='/shipping' element={userAuth ? <Shipping /> : <Login />} />
        <Route
          path='/my-order/:id'
          element={userAuth ? <OrderScreens /> : <Login />}
        />
        <Route path='/payment' element={userAuth ? <Payment /> : <Login />} />
        <Route
          path='/place-order'
          element={userAuth ? <PlaceOrder /> : <Login />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
