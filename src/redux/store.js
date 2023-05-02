import categoriesReducer from "./reducers/categoriesReducers";
import booksReducer from "./reducers/booksReducers";
import { createStore, combineReducers } from "redux";

const rootReducer = combineReducers({
  categoriesState: categoriesReducer,
  booksState: booksReducer,
});

const store = createStore(rootReducer);

export default store;
