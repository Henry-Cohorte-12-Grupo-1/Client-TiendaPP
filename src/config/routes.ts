import IRoute from '../interfaces/route';
import Client from '../components/Client/Client';
import ProductForm from '../components/ProductForm/ProductForm'
import Home from '../components/Home/Home';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import ProductsSearched from '../components/ProductsSearched/ProductsSearched';

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
        path: '/ProductsSearched',
        name: 'ProductsSearched',
        component: ProductsSearched,
        exact:true
    },
]

export default routes;