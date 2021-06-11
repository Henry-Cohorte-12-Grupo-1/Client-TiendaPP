import IRoute from '../interfaces/route';
import Login from '../components/Login/login';
import ProductForm from '../components/ProductForm/ProductForm'
import Home from '../components/Home/Home';
import ProductDetails from '../components/ProductDetails/ProductDetails';

const routes: IRoute[] = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
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
    }
]

export default routes;