import Login from '~/pages/Login';
import Home from '~/pages/Home';

import ListUser from '~/pages/UserManagement/ListUser';
import AddOrEditUser from '~/pages/UserManagement/AddOrEditUser';
import EditUserProfile from '~/pages/UserManagement/EditUserProfile';
import ChangeUserPassword from '~/pages/UserManagement/ChangeUserPassword';

import ListBuilding from '~/pages/BuildingManagement/ListBuilding';
import AddOrEditBuilding from '~/pages/BuildingManagement/AddOrEditBuilding';

import ListCustomer from '~/pages/CustomerManagement/ListCustomer';
import AddOrEditCustomer from '~/pages/CustomerManagement/AddOrEditCustomer';

import config from '~/config';
import MainLayout from '~/components/Layout/MainLayout';

const publicRoutes = [{ path: config.routes.login, component: Login, key: 'login', layout: null }];

const privateRoutes = [
    { path: config.routes.home, component: Home, key: 'home', layout: MainLayout },
    { path: config.routes.listBuilding, component: ListBuilding, key: 'listBuilding', layout: MainLayout },
    { path: config.routes.editBuilding, component: AddOrEditBuilding, key: 'editBuilding', layout: MainLayout },
    { path: config.routes.listCustomer, component: ListCustomer, key: 'listCustomer', layout: MainLayout },

    { path: config.routes.editCustomer, component: AddOrEditCustomer, key: 'editCustomer', layout: MainLayout },
    { path: config.routes.editUserProfile, component: EditUserProfile, key: 'editUserProfile', layout: MainLayout },
    {
        path: config.routes.changePassword,
        component: ChangeUserPassword,
        key: 'changeUserPassword',
        layout: MainLayout,
    },
];

const protectedRouters = [
    { path: config.routes.listUser, component: ListUser, key: 'listUser', layout: MainLayout },
    { path: config.routes.editUser, component: AddOrEditUser, key: 'editUser', layout: MainLayout },
    { path: config.routes.addUser, component: AddOrEditUser, key: 'addUser', layout: MainLayout },
    { path: config.routes.addBuilding, component: AddOrEditBuilding, key: 'addBuilding', layout: MainLayout },
    { path: config.routes.addCustomer, component: AddOrEditCustomer, key: 'addCustomer', layout: MainLayout },
];

export { publicRoutes, privateRoutes, protectedRouters };
