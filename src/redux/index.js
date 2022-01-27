import { applyMiddleware, combineReducers, createStore } from 'redux';
import { reducerArticle } from './creatEditArt/reducer';
import { menuReducer } from './mainPage/reducer';
import { modalReducer } from './Modal/reduser';
import { commentsReducer } from './comments/reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  menu: menuReducer,
  modal: modalReducer,
  article: reducerArticle,
  comments: commentsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
