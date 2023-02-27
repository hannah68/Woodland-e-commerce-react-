import { Route, Routes } from "react-router";
import {useState} from 'react';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import ProductInfos from "./pages/ProductInfos";
import About from './pages/About';
import Basket from "./pages/Basket";
import Footer from "./components/Footer";
import Header from "./components/Header";

import { PAGE_LINK } from "./config";

const App = () => {
  const [shoppingCart, setShoppingCart] = useState([]); 

  return (
    <>
      <Header shoppingCart={shoppingCart}/>
      <main>
        <Routes>
              <Route path={PAGE_LINK.home} element={<Home/>}/>
              <Route path={PAGE_LINK.shop} element={<Shop/>}/>
              <Route path={`${PAGE_LINK.shop}/:id`} element={<ProductInfos 
                shoppingCart={shoppingCart} 
                setShoppingCart={setShoppingCart}
              />}/>
              <Route path={PAGE_LINK.about} element={<About/>}/>
              <Route path={PAGE_LINK.contact} element={<Contact/>}/>
              <Route path={PAGE_LINK.basket} element={<Basket 
                shoppingCart={shoppingCart}
                setShoppingCart={setShoppingCart}
              />}/>
        </Routes>
      </main>
      <Footer/>
    </>
  );
}

export default App;
