import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';

const routes = [
    {
        name: 'Home',
        path: '/',
        component: HomePage
    },
    {
        name: 'Admin',
        path: '/admin',
        component: AdminPage
    }
];

export default routes;