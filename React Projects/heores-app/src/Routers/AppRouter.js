import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { AuthContext } from '../auth/AuthContext';

import { LoginScreen } from '../components/login/LoginScreen';
import { Navbar } from '../components/ui/NavBar';
import { HeroesApp } from '../HeroesApp';
import { DashBoardRoutes } from './DashBoardRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoutes } from './PublicRoutes';

export const AppRouter = () => {

    const { user } = useContext(AuthContext);

    return (
        <div >
            <Router>
                <div>
                    <Switch>
                        <PublicRoutes isAuthenticated={user.logged} exact path="/login" component={LoginScreen} />
                        <PrivateRoute isAuthenticated={user.logged} path="/" component={DashBoardRoutes} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}
