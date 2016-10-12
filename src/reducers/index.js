import authentication from './authentication';
import card from './card';

import { combineReducers } from 'redux';

export default combineReducers({
    authentication,
    card
});