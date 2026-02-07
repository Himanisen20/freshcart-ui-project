import "./App.css";
import {
  BrowserRouter,
  Link,
  Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import Home from "./pages/Home";
import { Details } from "./componant/Details";
import ProductPage from "./componant/ProductPage";
import AddProduct from "./componant/AddProduct";
import Footer from "./componant/Footer";
import CartPage from "./componant/CartPage";
import AuthPage from "./componant/AuthPage";
import Header from "./componant/Header";
import TopStrip from "./componant/TopStrip";
import Login from "./componant/Login";
import Signup from "./componant/Signup";
import ResetPassword from "./componant/Resetpass";
import Dashboard from "./componant/Dashboard";
import ProductDetail from "./componant/ProductDeatils";
import Wishlist from "./componant/wishlist";
import CustomerList from "./componant/Customer";
import EditProduct from "./componant/EditProduct"
import MyAccount from "./componant/Myaccount";
import Category from "./componant/Category";
import AddCategory from "./componant/Addcategory";
import Feauturecategory from "./componant/FeaturedCategories";
import CategoryProducts from "./componant/CategoryProducts";
import Reviewpage from "./componant/Review";
import Checkout from "./componant/Checkoutpage";
import AddressForm from "./componant/Address";
import OrderList from "./componant/OrderList";
import OrderSingle from "./componant/OrderSingle";




function App() {
  return (
    <>
      <BrowserRouter>
        <nav style={{ marginBottom: "20px" }}>
          <NavLink />
        </nav>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Auth" element={<AuthPage />} />
          <Route path="/features" element={<Feauturecategory/>} />
          <Route
            path="/categorycard/:categoryId"
            element={<CategoryProducts/>} />
         <Route path="/details" element={<Details />} />
          <Route path="/productpage" element={<ProductPage />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/resetpass" element={<ResetPassword/>} />
          <Route path="/productdeatil" element={<ProductDetail/>} />
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/customer" element={<CustomerList/>} />
          <Route path="/editproduct" element={<EditProduct/>} />
          <Route path="/myaccount" element={<MyAccount/>} />
          <Route path="/category" element={<Category/>} />
          <Route path="/addcategory" element={<AddCategory/>} />
          <Route path="/reviewpage" element={<Reviewpage/>} />
          <Route path="/checkoutpage" element={<Checkout/>} />
          <Route path="/Address" element={<AddressForm/>} />
          <Route path="/orderlist" element={<OrderList/>} />
          <Route path="/ordersingle" element={<OrderSingle/>} />

          
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
