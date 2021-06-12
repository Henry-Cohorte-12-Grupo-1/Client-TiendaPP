import IRoute from '../interfaces/route';
import Login from '../components/Login/login'
import Admin from '../components/Admin/admin'
import ProductForm from '../components/ProductForm/ProductForm'
import Home from '../components/Home/Home';
import User from '../components/User/User'
import ProductDetails from '../components/ProductDetails/ProductDetails';
import ProductsSearched from '../components/ProductsSearched/ProductsSearched';

const routes: IRoute[] = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        exact: true
    },
    {
        path: '/user/',
        name: 'User',
        component: User,
        exact: true
    },
    {
        path: '/user/create',
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
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        exact: true
    }
]

export default routes;