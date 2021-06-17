import IRoute from '../interfaces/route';
import Login from '../components/Login/login'
import Admin from '../components/Admin/admin'
import ProductForm from '../components/ProductForm/ProductForm'
import Home from '../components/Home/Home';
import UserProducts from '../components/UserProducts/UserProducts'
import ProductDetails from '../components/ProductDetails/ProductDetails';
import ProductEdit from '../components/ProductEdit/ProductEdit';
import ProductsSearched from '../components/ProductsSearched/ProductsSearched';
import Landing from '../components/Landing/Landing';
import AboutUs from '../components/AboutUs/AboutUs'
import Signup from '../components/SignUp/SignUp';
import UserDashboard from '../components/UserDashboard/UserDashboard';
import UserOrders from '../components/UserOrders/UserOrders';
import Validate from '../components/Validate/Validate';


const routes: IRoute[] = [
    {
        path: '/',
        name: 'Landing',
        component: Landing,
        exact: true
    },
    {
        path: '/about',
        name: 'AboutUs',
        component: AboutUs,
        exact: true
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        exact: true
    },
    {
        path: '/user/',
        name: 'User',
        component: UserDashboard,
        exact: true
    },
    {
        path: '/user/orders',
        name: 'UserOrders',
        component: UserOrders,
        exact: true
    },
    {
        path: '/user/activeProducts',
        name: 'User',
        component: UserProducts,
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
        path: '/product/edit',
        name: 'ProductEdit',
        component: ProductEdit,
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
        exact: true
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        exact: true
    },
    {
        path: '/sign-up',
        name: 'Sign Up',
        component: Signup,
        exact: true
    },
    {
        path: '/validate',
        name: 'Validate',
        component: Validate,
        exact: true
    },
]

export default routes;