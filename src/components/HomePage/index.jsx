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
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
      width: '50vw',
      align: 'center'
		},
		{
			title: 'Score',
			dataIndex: 'score',
			key: 'score',
      width: '50vw',
      align: 'center',
      sortDirection: ['ascend']
		},
	];

	useEffect(() => {
		getInitialScores();
	}, []);

	return (
		<div className='App'>
			<header className='App-header'>
				{JSON.stringify(scores, null, 4)}

				<Table 
          dataSource={scores} 
          columns={columns} 
          />
        <Button onClick={()=>{history.push('/admin')}}>
          Admin
        </Button>
			</header>
		</div>
	);
}
