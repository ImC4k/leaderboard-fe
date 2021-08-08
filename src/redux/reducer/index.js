import {combineReducers} from 'redux';
import score from './score.reducer';
import secret from './secret.reducer';

const rootReducer = combineReducers({
    score,
    secret
});

export default rootReducer;