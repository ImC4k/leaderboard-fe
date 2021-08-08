import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { isUndefined } from 'lodash';
import { useSelector } from 'react-redux';
import { Button, Input, Modal } from 'antd';
import { setSecret } from '../../redux/actions/secret.actions';

export default function AdminPage() {
    const dispatch = useDispatch();
    const { secret } = useSelector(state => state.secret);
    const [isShowSecretInputModal, setIsShowSecretInputModal] = useState(isUndefined(secret));
    const [secretInput, setSecretInput] = useState('');

    useEffect(() => {
        setIsShowSecretInputModal(isUndefined(secret));
    }, [secret]);

    return (
        <div>
            <p>
                this is admin page
            </p>
            <Modal 
                title='hi' 
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
            <Button onClick={()=>{setIsShowSecretInputModal(true)}}>
                Re-enter secret
            </Button>
        </div>
    )
}
