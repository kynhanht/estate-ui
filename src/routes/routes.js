import Login from '~/pages/Login';
import Home from '~/components/Home';
import ListUser from '~/components/users/ListUser';
import AddOrEditUser from '~/components/users/AddOrEditUser';
import ListBuilding from '~/components/buildings/ListBuilding';
import AddOrEditBuilding from '~/components/buildings/AddOrEditBuilding';
import ListCustomer from '~/components/customers/ListCustomer';
import AddOrEditCustomer from '~/components/customers/AddOrEditCustomer';
import config from '~/config';
import Dashboard from '~/pages/Dashboard';

const publicRoutes = [
    { path: config.routes.login, component: Login, key: 'login', layout: null },
    { path: config.routes.home, component: Home, key: 'home', layout: Dashboard },
    { path: config.routes.listUser, component: ListUser, key: 'listUser', layout: Dashboard },
    { path: config.routes.addUser, component: AddOrEditUser, key: 'addUser', layout: Dashboard },
    { path: config.routes.editUser, component: AddOrEditUser, key: 'editUser', layout: Dashboard },
    { path: config.routes.listBuilding, component: ListBuilding, key: 'listBuilding', layout: Dashboard },
    { path: config.routes.addBuilding, component: AddOrEditBuilding, key: 'addBuilding', layout: Dashboard },
    { path: config.routes.editBuilding, component: AddOrEditBuilding, key: 'editBuilding', layout: Dashboard },
    { path: config.routes.listCustomer, component: ListCustomer, key: 'listCustomer', layout: Dashboard },
    { path: config.routes.addCustomer, component: AddOrEditCustomer, key: 'addCustomer', layout: Dashboard },
    { path: config.routes.editCustomer, component: AddOrEditCustomer, key: 'editCustomer', layout: Dashboard },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
