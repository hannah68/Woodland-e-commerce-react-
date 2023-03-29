import { createContext } from "react";

export const initialState = {
    shoppingCart : [],
    basketItems:[],
    product: {},
    isSubmitReviewForm: false,
    searchValue: "",
    randomProducts: [],
    priceValue: 1000,
    filterData: {
		collection: [],
		category: [],
		color: [],
	}, 
    rating: null,
    ratingHover: null,
    reviewInfo: {
        reviewerName: "",
	    reviewerEmail: "",
	    stars: [],
	    feedback: "",
	    date: ""
    },
    isLoggedIn: false,
    user: null,
    quantity: 0
}

export const StoreContext = createContext();

export class StoreActions {
    static UPDATE_SHOPPINGCART = 'updateShoppingCart';
    static BASKETITEMS = 'baketItems';
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
    static UPDATE_FILTERDATA = 'updateFilterData';
    static ISEXISTED_FILTERNAME = 'isExistedFilterName';
    static NEW_FILTERNAME = 'newFilterName';
    static UPDATE_PRICEVALUE = 'updatePriceValue';
    static ADD_RATING = 'addRating';
    static ADD_HOVER = 'addHover';
    static UPDATE_REVIEWINFO = 'updateReviewInfo';
    static UPDATE_ISLOGGEDIN = 'isLoggedIn';
    static UPDATE_USER = 'updateUser';
    static UPDATE_QUANTITY = 'updateQuantity';
}

// shopping cart reducer======================================
export const shoppingCartReducer = (shoppingCart, action) =>{
  switch(action.type){
    case StoreActions.SHOPPINGCARD:
        return [...shoppingCart, action.payload];

    case StoreActions.UPDATE_SHOPPINGCART:
        return shoppingCart.map((el) => {
            if (el.id === action.payload.id) {
                return { 
                    ...el, 
                    quantity: Number(el.quantity) + Number(action.payload.quantity) 
                };
            } else {
                return el;
            }
        });

    case StoreActions.FILTER_SHOPPINGCART:
        return shoppingCart.filter((el) => el._id !== action.payload._id);
        
    default: 
        return shoppingCart;
  }
}


// basket items reducer======================================
export const basketItemsReducer = (basketItems, action) =>{
    switch(action.type){
      case StoreActions.BASKETITEMS:
          return action.payload;
      default: 
          return basketItems;
    }
  }
// product reducer========================================
export const productReducer = (product, action) => {
    switch(action.type){
        case StoreActions.UPDATE_PRODUCT:
            return action.payload;

        default: 
            return product;
    }
}

// search value reducer====================================
export const searchValueReducer = (searchValue, action) => {
    switch(action.type){
        case StoreActions.UPDATE_SEARCHVALUE:
            return action.payload;
        default: 
            return searchValue;
    }
}

// random product reducer=================================
export const randomProductsReducer = (randomProducts, action) => {
    switch(action.type){
        case StoreActions.UPDATE_RANDOMPRODUCTS:
            return action.payload;

        case StoreActions.SORTRANDOMBY_HIGHEST:
            return action.payload.sort((a, b) => b.price - a.price);

        case StoreActions.SORTRANDOMBY_LOWEST:
            return action.payload.sort((a, b) => a.price - b.price);
        
        case StoreActions.SHOW_RANDOMPRODUCTS:
            return action.payload.data.filter(item => action.payload.productArrId.includes(item._id));
			
        default: 
            return randomProducts;
    }
}

// filter data reducer ===================================
export const filterDataReducer = (filterData, action) => {
    switch(action.type){
        case StoreActions.UPDATE_FILTERDATA:
            return action.payload;

        case StoreActions.ISEXISTED_FILTERNAME:
            let previousfilterNameArr = [...filterData[action.payload.filterName]];
			const updatedfilterNameArr = previousfilterNameArr.filter(
				(el) => el !== action.payload.name
			);
			return { ...filterData, [action.payload.filterName]: updatedfilterNameArr };
        
        case StoreActions.NEW_FILTERNAME:
            return {
                ...filterData, 
                [action.payload.filterName]: [...filterData[action.payload.filterName], action.payload.name],
			};
        default: 
            return filterData;

    }
}

// price value reducer ====================================
export const priceValueReducer = (priceValue, action) => {
    switch(action.type){
        case StoreActions.UPDATE_PRICEVALUE:
            return action.payload;
        default:
            return priceValue;
    }
}

// rating reducer==========================================
export const ratingReducer = (rating, action) => {
    switch(action.type){
        case StoreActions.ADD_RATING:
            return action.payload;
        default:
            return rating;
    }
}

// is Logged In reducer====================================
export const isLoggedInReducer = (isLoggedIn, action) => {
    switch(action.type){
        case StoreActions.UPDATE_ISLOGGEDIN:
            return action.payload;
        default: 
            return isLoggedIn;
    }
}

// user reducer ====================================
export const userReducer = (isLoggedIn, action) => {
    switch(action.type){
        case StoreActions.UPDATE_USER:
            return action.payload;
        default: 
            return isLoggedIn;
    }
}

// user reducer ====================================
export const quantityReducer = (quantity, action) => {
    switch(action.type){
        case StoreActions.UPDATE_QUANTITY:
            return action.payload;
        default: 
            return quantity;
    }
}

// rating hover reducer==========================================
export const ratingHoverReducer = (ratingHover, action) => {
    switch(action.type){
        case StoreActions.ADD_HOVER:
            return action.payload;

        default:
            return ratingHover;
    }
}

// rating hover reducer==========================================
export const reviewInfoReducer = (reviewInfo, action) => {
    switch(action.type){
        case StoreActions.UPDATE_REVIEWINFO:
            return action.payload;
        default:
            return reviewInfo;
    }
}

//  combine reducers======================================
const combineReducers = reducers => {
    return (state = {}, action) => {
      const newState = {}
      for (let key in reducers) {
        newState[key] = reducers[key](state[key], action)
      }
      return newState
    }
  }

// export all reducers ===================================
export const rootReducer = combineReducers({
    shoppingCart: shoppingCartReducer,
    basketItems: basketItemsReducer,
    product: productReducer,
    searchValue: searchValueReducer,
    randomProducts: randomProductsReducer,
    filterData: filterDataReducer,
    priceValue: priceValueReducer,
    rating: ratingReducer,
    ratingHover: ratingHoverReducer,
    reviewInfo: reviewInfoReducer,
    isLoggedIn: isLoggedInReducer,
    user: userReducer,
    quantity: quantityReducer
})