import { Route, Routes } from "react-router";
import { useReducer, useMemo, useState } from "react";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import ProductInfos from "./pages/ProductInfos";
import Basket from "./pages/Basket";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { PAGE_LINK } from "./config";
import { initialState, StoreContext, rootReducer } from "./store";

const App = () => {
	const [login, setLogin] = useState({ email: "", password: "" });
	const [register, setRegister] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [state, dispatch] = useReducer(rootReducer, initialState);

	const store = useMemo(() => {
		return { state: state, dispatch: dispatch };
	}, [state, dispatch]);

	return (
		<StoreContext.Provider value={store}>
			<Header />
			<main>
				<Routes>
					<Route path={PAGE_LINK.home} element={<Home />} />
					<Route path={PAGE_LINK.shop} element={<Shop />} />
					<Route
						path={PAGE_LINK.login}
						element={<Login setLogin={setLogin} login={login} />}
					/>
					<Route
						path={PAGE_LINK.register}
						element={<Register register={register} setRegister={setRegister} />}
					/>
					<Route path={`${PAGE_LINK.shop}/:id`} element={<ProductInfos />} />
					<Route path={PAGE_LINK.contact} element={<Contact />} />
					<Route path={PAGE_LINK.basket} element={<Basket />} />
				</Routes>
			</main>
			<Footer />
		</StoreContext.Provider>
	);
};

export default App;
