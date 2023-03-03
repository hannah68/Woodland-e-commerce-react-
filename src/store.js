import { createContext } from "react";


export const initialState = {
    shoppingCart : [],
    product: {},
    isSubmitReviewForm: false,
    searchValue: "",
    randomProducts: []
}

export const StoreContext = createContext();

export class StoreActions {
    static UPDATE_SHOPPINGCART = 'updateShoppingCart';
    static UPDATE_PRODUCT = 'updateProduct';
    static REMOVEITEM_FROMBASKET = 'removeItemFromBasket';
    static ADDMOREITEM_TOBASKET = 'addMoreItemToBasket';
    static FILTER_SHOPPINGCART = 'filterShoppingCart';
    static SHOPPINGCARD = 'shoppingCard';
    static UPDATE_SEARCHVALUE = 'updateSerachValue';
    static UPDATE_RANDOMPRODUCTS = 'updateRandomproducts';
    static SORTRANDOMBY_HIGHEST = 'sortRandomByHighest';
    static SORTRANDOMBY_LOWEST = 'sortRandomByLowest';
    static SHOW_RANDOMPRODUCTS = 'showRandomProducts';
}

export const shoppingCartReducer = (shoppingCart, action) =>{
  switch(action.type){
    case StoreActions.SHOPPINGCARD:
        return action.payload;
    case StoreActions.UPDATE_SHOPPINGCART:
        return shoppingCart.map((el) => {
            if (el.id === action.payload.id) {
                // StoreContext.dispatch({
                //     type: StoreActions.UPDATE_PRODUCT, 
                //     payload: {...el, quantity: Number(el.quantity) + Number(action.payload.quantity),}
                // })
                return { ...el, quantity: Number(el.quantity) + Number(action.payload.quantity) };
            } else {
                return el;
            }
        });

    case StoreActions.REMOVEITEM_FROMBASKET:
        return shoppingCart.map((el) => {
            if (el.id === action.payload.id) {
                // StoreContext.dispatch({
                //     type: StoreActions.UPDATE_PRODUCT,
                //     payload: { ...el, quantity: Number(el.quantity) - 1 }
                // });
                return { ...el, quantity: Number(el.quantity) - 1 };
            } else {
                return el;
            }
        });

    case StoreActions.ADDMOREITEM_TOBASKET:
        return shoppingCart.map((el) => {
			if (el.id === action.payload.id) {
				// setProduct({ ...el, quantity: Number(el.quantity) + 1 });
				return { ...el, quantity: Number(el.quantity) + 1 };
			} else {
				return el;
			}
		});

    
    case StoreActions.FILTER_SHOPPINGCART:
        return shoppingCart.filter((el) => el.id !== action.payload.id)
        
    default: 
        return shoppingCart;
  }
}



export const productReducer = (product, action) => {
    switch(action.type){
        case StoreActions.UPDATE_PRODUCT:
            return action.payload;
        default: 
            return product;
    }
}

export const searchValueReducer = (searchValue, action) => {
    switch(action.type){
        case StoreActions.UPDATE_SEARCHVALUE:
            return action.payload;
        default: 
            return searchValue;
    }
}

export const randomProductsReducer = (randomProducts, action) => {
    switch(action.type){
        case StoreActions.UPDATE_RANDOMPRODUCTS:
            return action.payload;

        case StoreActions.SORTRANDOMBY_HIGHEST:
            return action.payload.sort((a, b) => b.price - a.price);

        case StoreActions.SORTRANDOMBY_LOWEST:
            return action.payload.sort((a, b) => a.price - b.price);
        
        case StoreActions.SHOW_RANDOMPRODUCTS:
            return action.payload.data.filter(item => action.payload.productArrId.includes(item.id));
			
        default: 
            return randomProducts;
    }
}




const combineReducers = reducers => {
    return (state = {}, action) => {
      const newState = {}
      for (let key in reducers) {
        newState[key] = reducers[key](state[key], action)
      }
      return newState
    }
  }
  
export const rootReducer = combineReducers({
    shoppingCart: shoppingCartReducer,
    product: productReducer,
    searchValue: searchValueReducer,
    randomProducts: randomProductsReducer
})