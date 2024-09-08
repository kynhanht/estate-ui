import { publicRoutes, privateRoutes, protectedRouters } from '~/routes';
import { Route, Routes, useNavigate } from 'react-router-dom';
import NotFound from './pages/NotFound';
import React, { useEffect } from 'react';
import PrivateRouter from './components/PrivateRouter';
import ProtectedRouter from './components/ProtectedRouter';
import PublicRouter from './components/PublicRouter';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/actions/authAction';
import { isTokenExpired } from './helpers/common';
function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const jwtToken = useSelector((state) => state.jwtAuthReducer.token);
    const isAuthenticated = useSelector((state) => state.jwtAuthReducer.isAuthenticated);
    useEffect(() => {
        if (isAuthenticated && isTokenExpired(jwtToken)) {
            dispatch(logout(navigate));
        }
    }, [jwtToken, isAuthenticated, dispatch, navigate]);
    return (
        <div className="App">
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Layout = route.layout ? route.layout : React.Fragment;
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <PublicRouter>
                                    <Layout>
                                        <Page key={route.key} />
                                    </Layout>
                                </PublicRouter>
                            }
                        />
                    );
                })}
                {privateRoutes.map((route, index) => {
                    const Layout = route.layout ? route.layout : React.Fragment;
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <PrivateRouter>
                                    <Layout>
                                        <Page key={route.key} />
                                    </Layout>
                                </PrivateRouter>
                            }
                        />
                    );
                })}
                {protectedRouters.map((route, index) => {
                    const Layout = route.layout ? route.layout : React.Fragment;
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <ProtectedRouter>
                                    <Layout>
                                        <Page key={route.key} />
                                    </Layout>
                                </ProtectedRouter>
                            }
                        />
                    );
                })}

                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
