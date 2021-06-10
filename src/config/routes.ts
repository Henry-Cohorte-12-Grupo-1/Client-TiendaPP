import IRoute from '../interfaces/route';
import Client from '../components/Client/Client';
import ProductForm from '../components/ProductForm/ProductForm'
import Nav from '../components/Nav/Nav';
import Home from '../components/Home/Home';
import ProductDetails from '../components/ProductDetails/ProductDetails';

const routes: IRoute[] = [
    {
        path: '/client',
        name: 'Client',
        component: Client,
        exact: true
    },
    {
        path: '/client/create',
        name: 'Create',
        component: ProductForm,
        exact: true
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        exact: true
    },
    {
        path: '/Product/:id',
        name: 'Details',
        component: ProductDetails,
        exact: true
    },
    {
        path: '/',
        name: 'Nav',
        component: Nav,
        exact: false
    }
]

export default routes;