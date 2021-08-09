import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Table } from 'antd';
import { getInitialScores } from '../../services/scores.service';

import '../../App.css';
import { Button } from 'antd/lib/radio';

export default function HomePage() {
  const history = useHistory();
	const { scores } = useSelector((state) => state.score);

	const columns = [
		{
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
			width: '50vw',
			align: 'center'
		},
		{
			title: '積分',
			dataIndex: 'score',
			key: 'score',
			width: '50vw',
			align: 'center',
			defaultSortOrder: 'descend',
			sorter: (a, b) => a.score - b.score
		},
	];

	useEffect(() => {
		getInitialScores();
	}, []);

	return (
		<div className='App'>
			{/* {JSON.stringify(scores, null, 4)} */}
			<h1>
				大市集排行榜
			</h1>
			<Table 
			dataSource={scores} 
			columns={columns} 
			/>
			<Button onClick={()=>{history.push('/admin')}}>
				Admin
			</Button>
		</div>
	);
}
