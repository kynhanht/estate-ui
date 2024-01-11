import Home from '~/components/Home';
import ListUser from '~/components/users/ListUser';
import AddOrEditUser from '~/components/users/AddOrEditUser';
import ListBuilding from '~/components/buildings/ListBuilding';
import AddOrEditBuilding from '~/components/buildings/AddOrEditBuilding';
import ListCustomer from '~/components/customers/ListCustomer';
import AddOrEditCustomer from '~/components/customers/AddOrEditCustomer';
import config from '~/config';

const publicRoutes = [
    { path: config.routes.home, component: Home, key: 'home' },
    { path: config.routes.listUser, component: ListUser, key: 'listUser' },
    { path: config.routes.addUser, component: AddOrEditUser, key: 'addUser' },
    { path: config.routes.editUser, component: AddOrEditUser, key: 'editUser' },
    { path: config.routes.listBuilding, component: ListBuilding, key: 'listBuilding' },
    { path: config.routes.addBuilding, component: AddOrEditBuilding, key: 'addBuilding' },
    { path: config.routes.editBuilding, component: AddOrEditBuilding, key: 'editBuilding' },
    { path: config.routes.listCustomer, component: ListCustomer, key: 'listCustomer' },
    { path: config.routes.addCustomer, component: AddOrEditCustomer, key: 'addCustomer' },
    { path: config.routes.editCustomer, component: AddOrEditCustomer, key: 'editCustomer' },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
