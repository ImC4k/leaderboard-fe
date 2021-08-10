import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { isEmpty, isUndefined } from 'lodash';
import { Button, Input, Modal, Select } from 'antd';
import { setSecret } from '../../redux/actions/secret.actions';
import { updateScore } from '../../redux/actions/score.actions';
import { getInitialScores } from '../../services/scores.service';

import './AdminPage.scss';

const { Option } = Select;

export default function AdminPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { secret } = useSelector(state => state.secret);
    const { scores } = useSelector(state => state.score);

    const [isShowSecretInputModal, setIsShowSecretInputModal] = useState(isUndefined(secret));
    const [secretInput, setSecretInput] = useState('');

    const [isShowPlayerModal, setIsShowPlayerModal] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState({name: '', score: 0});

    const [isShowMultiPlayerInputModal, setIsShowMultiPlayerInputModal] = useState(false);
    const [selectedPlayers, setSelectedPlayers] = useState([])

    const [diff, setDiff] = useState(0);

    useEffect(() => {
        if (isEmpty(scores)) {
            console.log('getting initial scores from api');
            getInitialScores();
        }
	}, []);

    useEffect(() => {
        setIsShowSecretInputModal(isUndefined(secret));
        setSecretInput(secret);
    }, [secret]);

    const goHome = () => {
        history.push('/');
    };

    const openPlayerModal = (playerIndex) => {
        setSelectedPlayer(scores[playerIndex]);
        setIsShowPlayerModal(true);
    };

    const handleMultiSelectOnChange = (selection) => {
        console.log(`values: ${JSON.stringify(selection, null, 4)}`);
        setSelectedPlayers(selection);
    };

    const batchUpdateScore = (modifier) => {
        selectedPlayers.forEach(player => {
            console.log(`dispatching for ${player}: ${parseInt(diff * modifier)}`);
            dispatch(updateScore({name: player, diff: parseInt(diff * modifier), isFromUi: true}));
        });

        setSelectedPlayers([]);
    }

    return (
        <div>
            <Modal 
                title='Admin secret'
                visible={isShowSecretInputModal}
                onCancel={()=>{setSecretInput(secret); setIsShowSecretInputModal(false);}}
                onOk={()=>{dispatch(setSecret(secretInput))}}>
                <Input 
                    placeholder='secret code here'
                    type='password'
                    value={secretInput}
                    onChange={e => {setSecretInput(e.target.value)}}
                />
            </Modal>
            <Modal
                title={`${selectedPlayer.name} (${selectedPlayer.score})`}
                visible={isShowPlayerModal}
                footer={null}
                onCancel={()=>{setIsShowPlayerModal(false); setSelectedPlayer({name: '', score: 0})}}
                >
                <div className='player-modal-container'>
                    <Input
                        placeholder='add/subtract score'
                        value={diff}
                        type='number'
                        onChange={e => {setDiff(e.target.value)}}
                    />
                    <div className='player-modal-cta-group'>
                        <Button 
                            type='danger' 
                            onClick={()=>{dispatch(updateScore({name: selectedPlayer.name, diff: parseInt(diff * -1), isFromUi: true})); setIsShowPlayerModal(false)}}
                            >
                            -
                        </Button>
                        <Button 
                            type='primary' 
                            onClick={()=>{dispatch(updateScore({name: selectedPlayer.name, diff: parseInt(diff), isFromUi: true})); setIsShowPlayerModal(false)}}
                            >
                            +
                        </Button>
                    </div>
                </div>
            </Modal>
            <Modal
                title='Batch update'
                visible={isShowMultiPlayerInputModal}
                // visible={true}
                footer={null}
                onCancel={()=>{setIsShowMultiPlayerInputModal(false); setSelectedPlayers([])}}
                >
                <div className='player-modal-container'>
                    <Select
                        mode='multiple'
                        allowClear
                        style={{width: '100%'}}
                        placeholder='players'
                        onChange={handleMultiSelectOnChange}
                        >
                        {scores.map(player => <Option key={player.name}>{player.name}</Option>)}
                    </Select>
                    <Input
                        placeholder='add/subtract score'
                        value={diff}
                        type='number'
                        onChange={e => {setDiff(e.target.value)}}
                    />
                    <div className='player-modal-cta-group'>
                        <Button 
                            type='danger' 
                            onClick={()=>{batchUpdateScore(-1); setIsShowMultiPlayerInputModal(false)}}
                            >
                            -
                        </Button>
                        <Button 
                            type='primary' 
                            onClick={()=>{batchUpdateScore(1); setIsShowMultiPlayerInputModal(false)}}
                            >
                            +
                        </Button>
                    </div>
                </div>
            </Modal>
            <h1>Players</h1>
            <div className='players'>
                <Button 
                    className='player'
                    type='dashed'
                    key={'multiple'} 
                    onClick={() => {setIsShowMultiPlayerInputModal(true)}}
                    >
                    multiple
                </Button>
                {
                    scores.map((player, playerIndex) => 
                        <Button 
                            className='player'
                            type='primary'
                            key={playerIndex} 
                            onClick={() => {openPlayerModal(playerIndex)}}
                            >
                            {player.name} ({player.score})
                        </Button>
                    )
                }
            </div>
            <Button 
                onClick={()=>{setIsShowSecretInputModal(true)}}
                >
                Re-enter secret
            </Button>
            <Button 
                onClick={goHome}
                >
                Leaderboard
            </Button>
        </div>
    )
}
