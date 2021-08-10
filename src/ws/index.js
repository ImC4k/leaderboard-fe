import io from "socket.io-client";
import store from '../redux/store';
import { updateScore, UPDATE_SCORE } from "../redux/actions/score.actions";

const socket = io.connect('https://leaderboard-be.herokuapp.com/');
const WS_ACTIONS = {
    UPDATE_SCORE: 'UPDATE_SCORE',
};

export const wsUpdateScore = (payload) => {
    const secret = localStorage.getItem('leaderboard_secret');
    socket.emit(UPDATE_SCORE, {...payload, secret});
};

socket.on(WS_ACTIONS.UPDATE_SCORE, ({name, diff}) => {
    store.dispatch(updateScore({name, diff}));
});

export default socket;
