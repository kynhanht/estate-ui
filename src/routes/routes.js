import Home from '~/components/Home';
import ListUser from '~/components/users/ListUser';
import AddOrEditUser from '~/components/users/AddOrEditUser';
import ListBuilding from '~/components/buildings/ListBuilding';
import AddOrEditBuilding from '~/components/buildings/AddOrEditBuilding';
import ListCustomer from '~/components/customers/ListCustomer';
import AddOrEditCustomer from '~/components/customers/AddOrEditCustomer';
import config from '~/config';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.listUser, component: ListUser },
    { path: config.routes.addUser, component: AddOrEditUser },
    { path: config.routes.editUser, component: AddOrEditUser },
    { path: config.routes.listBuilding, component: ListBuilding },
    { path: config.routes.addBuilding, component: AddOrEditBuilding },
    { path: config.routes.editBuilding, component: AddOrEditBuilding },
    { path: config.routes.listCustomer, component: ListCustomer },
    { path: config.routes.addCustomer, component: AddOrEditCustomer },
    { path: config.routes.editCustomer, component: AddOrEditCustomer },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
