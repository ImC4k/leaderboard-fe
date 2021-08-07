import io from "socket.io-client";
import store from '../redux/store';
import { updateScore } from "../redux/actions/score.actions";

const socket = io.connect('ws://localhost:8081');
export const WS_ACTIONS = {
    UPDATE_SCORE: 'UPDATE_SCORE'
};

socket.on(WS_ACTIONS.UPDATE_SCORE, ({name, diff}) => {
    console.log(`received UPDATE_SCORE ws with payload: ${JSON.stringify({name, diff}, null, 4)}`);
    store.dispatch(updateScore({name, diff}));
})

export default socket;
