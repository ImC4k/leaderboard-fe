import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Button} from 'antd';
import { updateScore } from './redux/actions/score.actions';
import { getInitialScores } from './services/scores.service';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const {scores} = useSelector(state => state.score);

  useEffect(() => {
    // TODO
    getInitialScores();
  }, []);

  const handleOnClick = () => {
    dispatch(updateScore({name: 'haha', diff: -1, isFromUi: true}));
  };

  return (
    <div className="App">
      <header className="App-header">
        {
          JSON.stringify(scores, null, 4)
        }
        <Button onClick={handleOnClick}>
          Click me :P
        </Button>
      </header>
    </div>
  );
}

export default App;
