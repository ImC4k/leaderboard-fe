import { BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from './routes';

import './App.css';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Switch>
					{routes
						.map((route) => (
							<Route
								key={route.name}
								path={route.path}
								component={route.component}
								exact
							/>
						))}
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
