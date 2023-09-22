import { publicRoutes } from '~/routes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '~/pages/Dashboard/Dashboard';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Dashboard>
                                        <Page />
                                    </Dashboard>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
