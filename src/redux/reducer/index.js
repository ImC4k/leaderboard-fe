import {combineReducers} from 'redux';
import score from './score.reducer';

const rootReducer = combineReducers({
    score
});

export default rootReducer;