import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Import the thunk middleware
import rootReducer from './rootReducer';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // Apply the middleware to the store
);

export default store;