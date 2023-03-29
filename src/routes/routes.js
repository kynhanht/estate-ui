import config from '~/config';
import Building from '~/pages/Building';
import Customer from '~/pages/Customer';
import Home from '~/pages/Home';
import User from '~/pages/User';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.building, component: Building },
    { path: config.routes.user, component: User },
    { path: config.routes.customer, component: Customer },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
